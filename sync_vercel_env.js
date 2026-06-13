const envsToSync = [
  'DATABASE_URL',
  'DIRECT_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'AUTH_TRUST_HOST',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_USE_SUPABASE_SITE_IMAGES',
  'SUPABASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
  'RECAPTCHA_SECRET_KEY',
];

async function main() {
  const { readFileSync } = await import('node:fs');
  const { execFileSync } = await import('node:child_process');
  const content = readFileSync('.env.local', 'utf-8');
  const lines = content.split('\n');

  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;

    const [key, ...valueParts] = line.split('=');
    if (!key || !envsToSync.includes(key)) continue;

    let value = valueParts.join('=').trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }

    console.log(`Syncing ${key}...`);

    try {
      try {
        execFileSync('npx', ['vercel', 'env', 'rm', key, 'production', '-y'], {
          stdio: 'ignore',
          shell: true,
        });
      } catch {
        // Missing variables are fine; they will be created below.
      }

      execFileSync('npx', ['vercel', 'env', 'add', key, 'production'], {
        input: value,
        stdio: ['pipe', 'inherit', 'inherit'],
        shell: true,
      });
      console.log(`Synced ${key}`);
    } catch (error) {
      console.error(`Failed to sync ${key}`, error instanceof Error ? error.message : error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
