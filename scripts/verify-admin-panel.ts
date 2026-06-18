import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

type Finding = { level: 'error' | 'warn'; message: string };

const findings: Finding[] = [];

function read(path: string) {
  return readFileSync(join(ROOT, path), 'utf8');
}

function walk(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }

  return files;
}

function rel(path: string) {
  return relative(ROOT, path).replace(/\\/g, '/');
}

function checkAdminMutationsRequireSession() {
  const adminActionFiles = walk(join(SRC, 'app', 'admin')).filter((file) => file.endsWith('actions.ts'));

  const mutationPattern = /export async function (update|delete|create|save|mark|logout)/;
  const exempt = new Set(['loginAdmin']);

  for (const file of adminActionFiles) {
    const content = read(rel(file));
    if (!content.includes("'use server'")) continue;

    const functions = [...content.matchAll(/export async function (\w+)\([^)]*\)\s*\{([\s\S]*?)(?=\nexport async function |\n*$)/g)];

    for (const match of functions) {
      const name = match[1];
      const body = match[2];

      if (exempt.has(name)) continue;
      if (!mutationPattern.test(name)) continue;
      if (!body.includes('requireAdminSession()')) {
        findings.push({
          level: 'error',
          message: `Server Action "${name}" in ${rel(file)} mutates data without requireAdminSession().`,
        });
      }
    }
  }
}

function checkAdminActionsDoNotExportReaders() {
  const sharedReaders = [
    'getHomeHeroAdminValues',
    'getAboutPageAdminValues',
    'getServicesPageAdminValues',
    'getSiteSettingsAdminValues',
    'getSiteSeoSettingsAdminValues',
  ];

  const adminActionFiles = walk(join(SRC, 'app', 'admin')).filter((file) => file.endsWith('actions.ts'));

  for (const file of adminActionFiles) {
    const content = read(rel(file));
    if (!content.includes("'use server'")) continue;

    for (const reader of sharedReaders) {
      if (content.includes(`export async function ${reader}`) || content.includes(`export const ${reader}`)) {
        findings.push({
          level: 'error',
          message: `CMS reader "${reader}" must live in src/lib/cms, not ${rel(file)}.`,
        });
      }
    }
  }
}

function checkServiceAdminKeysAligned() {
  const familyServices = read('src/config/family-services.ts');
  const form = read('src/app/admin/servicios/ServicesPageForm.tsx');
  const section = read('src/components/home/ServicesSection.tsx');

  if (!familyServices.includes('SERVICE_ADMIN_PAYLOAD_KEYS')) {
    findings.push({ level: 'error', message: 'SERVICE_ADMIN_PAYLOAD_KEYS is missing from family-services.ts.' });
  }

  if (!form.includes('getServiceAdminPayloadKey')) {
    findings.push({ level: 'error', message: 'ServicesPageForm must use getServiceAdminPayloadKey().' });
  }

  if (!section.includes('SERVICE_ADMIN_PAYLOAD_KEYS')) {
    findings.push({ level: 'error', message: 'ServicesSection must use SERVICE_ADMIN_PAYLOAD_KEYS.' });
  }
}

function checkAdminDynamicParams() {
  const adminPages = walk(join(SRC, 'app', 'admin')).filter((file) => file.endsWith('page.tsx') && file.includes('[id]'));

  for (const file of adminPages) {
    const content = read(rel(file));
    if (!content.includes('params: Promise<')) {
      findings.push({
        level: 'error',
        message: `${rel(file)} must type params as Promise<{ id: string }> for Next 16.`,
      });
    }

    if (content.includes('params.id') && !content.includes('await params')) {
      findings.push({
        level: 'error',
        message: `${rel(file)} must await params before reading id.`,
      });
    }
  }
}

function checkMediaUploadAcceptsMatch() {
  const mediaLibrary = read('src/app/admin/media/MediaLibrary.tsx');
  const uploadRoute = read('src/app/api/admin/storage/upload/route.ts');

  const libraryAccept = mediaLibrary.match(/accept="([^"]+)"/)?.[1] ?? '';
  const allowedTypes = [...uploadRoute.matchAll(/'([^']+)'/g)]
    .map((match) => match[1])
    .filter((value) => value.startsWith('image/'));

  for (const type of allowedTypes) {
    if (!libraryAccept.includes(type)) {
      findings.push({
        level: 'error',
        message: `MediaLibrary accept is missing ${type} allowed by upload route.`,
      });
    }
  }

  if (libraryAccept.includes('application/pdf')) {
    findings.push({
      level: 'error',
      message: 'MediaLibrary must not accept application/pdf because upload route rejects it.',
    });
  }
}

function checkLegacyNextAuthRemoved() {
  const legacyPaths = [
    'src/lib/auth/auth.ts',
    'src/lib/auth/require-admin.ts',
    'src/types/next-auth.d.ts',
  ];

  for (const path of legacyPaths) {
    if (existsSync(join(ROOT, path))) {
      findings.push({
        level: 'error',
        message: `Legacy NextAuth file still exists at ${path}.`,
      });
    }
  }

  const packageJson = read('package.json');
  if (packageJson.includes('"next-auth"')) {
    findings.push({
      level: 'error',
      message: 'next-auth dependency must be removed from package.json.',
    });
  }
}

function checkVerifyScriptExists() {
  if (!existsSync(join(ROOT, 'scripts/verify-admin-panel.ts'))) {
    findings.push({ level: 'error', message: 'scripts/verify-admin-panel.ts is missing.' });
  }
}

checkVerifyScriptExists();
checkAdminMutationsRequireSession();
checkAdminActionsDoNotExportReaders();
checkServiceAdminKeysAligned();
checkAdminDynamicParams();
checkMediaUploadAcceptsMatch();
checkLegacyNextAuthRemoved();

const errors = findings.filter((finding) => finding.level === 'error');
const warnings = findings.filter((finding) => finding.level === 'warn');

for (const finding of findings) {
  const prefix = finding.level === 'error' ? 'ERROR' : 'WARN';
  console.log(`${prefix}: ${finding.message}`);
}

if (errors.length === 0) {
  console.log(`\nAdmin panel checks passed (${warnings.length} warning(s)).`);
  process.exit(0);
}

console.error(`\nAdmin panel checks failed with ${errors.length} error(s).`);
process.exit(1);
