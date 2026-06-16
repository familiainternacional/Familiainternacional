import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const scope = 'jaime-soto-s-projects';
const overrides = {
  NEXT_PUBLIC_SITE_URL: 'https://familiainternacional.vercel.app',
  APP_ORIGIN: 'https://familiainternacional.vercel.app',
  AUTH_URL: 'https://familiainternacional.vercel.app',
};
const sensitive = new Set([
  'DATABASE_URL',
  'DIRECT_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'AUTH_SECRET',
  'ADMIN_PASSWORD',
  'SMTP_PASSWORD',
  'RECAPTCHA_SECRET_KEY',
  'META_CAPI_ACCESS_TOKEN',
]);

const lines = readFileSync(join(root, '.env.local'), 'utf8').split(/\r?\n/);

for (const line of lines) {
  if (!line || /^\s*#/.test(line)) continue;
  const match = line.match(/^\s*([^=]+)=(.*)$/);
  if (!match) continue;

  const name = match[1].trim();
  let value = match[2].trim().replace(/^"|"$/g, '');
  if (overrides[name]) value = overrides[name];
  if (!value) continue;

  for (const env of ['production', 'preview', 'development']) {
    const sensitiveFlag = sensitive.has(name) ? ' --sensitive' : '';
    const command = `npx vercel env add ${name} ${env} --value "${value.replace(/"/g, '\\"')}" --yes --force --scope ${scope}${sensitiveFlag}`;

    try {
      execSync(command, {
        cwd: root,
        stdio: 'ignore',
        windowsHide: true,
      });
    } catch {
      // Variable may already exist for this environment.
    }
  }

  process.stdout.write(`Synced ${name}\n`);
}

process.stdout.write('Done.\n');
