import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import {
  isSiteImageExtension,
  publicFileToSupabasePath,
} from '../src/lib/storage/site-assets';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET?.trim() ||
  process.env.SUPABASE_STORAGE_BUCKET?.trim() ||
  'rlu-assets';

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
};

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim();

  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Run with --env-file=.env.local',
    );
  }

  return { url, key };
}

async function collectPublicImages(directory = PUBLIC_DIR, relativeDir = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(...(await collectPublicImages(path.join(directory, entry.name), relativePath)));
      continue;
    }

    if (isSiteImageExtension(entry.name)) {
      files.push(relativePath);
    }
  }

  return files;
}

function getContentType(fileName: string) {
  const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  return MIME_TYPES[extension] ?? 'application/octet-stream';
}

async function main() {
  const { url, key } = getSupabaseConfig();
  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const files = await collectPublicImages();
  let uploaded = 0;
  let failed = 0;

  console.info(`Uploading ${files.length} images to bucket "${BUCKET}"...`);

  for (const relativePath of files.sort()) {
    const localFilePath = path.join(PUBLIC_DIR, relativePath);
    const storagePath = publicFileToSupabasePath(relativePath);
    const fileBuffer = await readFile(localFilePath);
    const contentType = getContentType(relativePath);

    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, fileBuffer, {
      contentType,
      upsert: true,
      cacheControl: '31536000',
    });

    if (error) {
      failed += 1;
      console.error(`FAILED ${relativePath} -> ${storagePath}: ${error.message}`);
      continue;
    }

    uploaded += 1;
    console.info(`OK ${relativePath} -> ${storagePath}`);
  }

  console.info(`Done. Uploaded: ${uploaded}, failed: ${failed}`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
