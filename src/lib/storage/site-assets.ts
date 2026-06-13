/** Logo oficial: logoabogados_VERSIONES-04 (blanco sobre fondo #07234c) */
export const LOCAL_LOGO_SRC = '/logo/logo-familia.png';
export const LOCAL_LOGO_MASTER = '/Logo Familia Internacional/logoabogados_VERSIONES-04.png';
export const SUPABASE_LOGO_PATH = 'brand/logo-familia.png';
export const SUPABASE_LOGO_URL =
  'https://cnyhhosxdzmrnyemiqic.supabase.co/storage/v1/object/public/rlu-assets/brand/logo-familia.png';
const PUBLIC_SUPABASE_SITE_ASSET_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET?.trim() || 'rlu-assets';

const LOCAL_PATH_OVERRIDES: Record<string, string> = {
  [LOCAL_LOGO_SRC]: SUPABASE_LOGO_PATH,
  [LOCAL_LOGO_MASTER]: SUPABASE_LOGO_PATH,
};

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif']);

export function shouldUseSupabaseSiteImages() {
  if (process.env.NEXT_PUBLIC_USE_SUPABASE_SITE_IMAGES === 'false') {
    return false;
  }

  if (process.env.NEXT_PUBLIC_USE_SUPABASE_SITE_IMAGES === 'true') {
    return true;
  }

  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim());
}

export function getPublicSupabaseAssetUrl(path: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  if (!supabaseUrl || !PUBLIC_SUPABASE_SITE_ASSET_BUCKET) {
    return null;
  }

  const normalizedBase = supabaseUrl.replace(/\/$/, '');
  const normalizedPath = path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `${normalizedBase}/storage/v1/object/public/${PUBLIC_SUPABASE_SITE_ASSET_BUCKET}/${normalizedPath}`;
}

export function localPublicPathToSupabasePath(localPath: string) {
  const normalized = localPath.startsWith('/') ? localPath : `/${localPath}`;

  if (LOCAL_PATH_OVERRIDES[normalized]) {
    return LOCAL_PATH_OVERRIDES[normalized];
  }

  return `site${normalized}`;
}

export function resolveSiteAssetSrc(localPath: string) {
  if (!localPath.startsWith('/')) {
    return localPath;
  }

  if (!shouldUseSupabaseSiteImages()) {
    return localPath;
  }

  const supabasePath = localPublicPathToSupabasePath(localPath);
  return getPublicSupabaseAssetUrl(supabasePath) ?? localPath;
}

/** Logo VERSIONES-04. `dark` se mantiene por compatibilidad pero apunta al mismo asset. */
export function getSiteLogoSrc(_variant?: 'light' | 'dark') {
  if (!shouldUseSupabaseSiteImages()) {
    return LOCAL_LOGO_SRC;
  }

  return getPublicSupabaseAssetUrl(SUPABASE_LOGO_PATH) ?? LOCAL_LOGO_SRC;
}

export function isSiteImageExtension(fileName: string) {
  const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  return IMAGE_EXTENSIONS.has(extension);
}

export function publicFileToSupabasePath(relativePath: string) {
  const normalized = relativePath.replace(/\\/g, '/');
  const parts = normalized.split('/');
  const fileName = parts.pop();

  if (!fileName) {
    throw new Error(`Invalid public asset path: ${relativePath}`);
  }

  const directory = parts.join('/');

  return directory ? `site/${directory}/${fileName}` : `site/${fileName}`;
}
