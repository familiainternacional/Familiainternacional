export const SUPABASE_SITE_ASSET_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET?.trim() ||
  process.env.SUPABASE_STORAGE_BUCKET?.trim() ||
  'rlu-assets';

export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required.');
  }

  return url;
}

export function getSupabasePublishableKey() {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required.');
  }

  return key;
}

export function getSupabaseSecretKey() {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim();

  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for server-side Storage operations.');
  }

  return key;
}
