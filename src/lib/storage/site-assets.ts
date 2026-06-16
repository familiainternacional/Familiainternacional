/** Logo tipográfico — textofamilia.png (800×133 px, fondo transparente). */
const LOCAL_LOGO_PATH = '/logo/textofamilia.png';
export const LOCAL_LOGO_SRC = LOCAL_LOGO_PATH;
export const LOCAL_LOGO_DARK_SRC = LOCAL_LOGO_PATH;
export const LOCAL_LOGO_MASTER = LOCAL_LOGO_PATH;
export const SUPABASE_LOGO_PATH = 'brand/textofamilia.png';
export const SUPABASE_LOGO_URL =
  'https://cnyhhosxdzmrnyemiqic.supabase.co/storage/v1/object/public/rlu-assets/brand/textofamilia.png';
const PUBLIC_SUPABASE_SITE_ASSET_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET?.trim() || 'rlu-assets';

const LOCAL_PATH_OVERRIDES: Record<string, string> = {
  [LOCAL_LOGO_PATH]: SUPABASE_LOGO_PATH,
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

/** Logo del sitio. `light` = blanco (fondos oscuros). `dark` = azul (fondos claros). */
export function getSiteLogoSrc(variant: 'light' | 'dark' = 'light') {
  const local = variant === 'dark' ? LOCAL_LOGO_DARK_SRC : LOCAL_LOGO_SRC;

  if (!shouldUseSupabaseSiteImages()) {
    return local;
  }

  return getPublicSupabaseAssetUrl(SUPABASE_LOGO_PATH) ?? local;
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
