import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';

/** Prefer WebP default hero (see `public/heroe.webp` + `npm run optimize:hero`). */
export function resolveHeroImageUrl(imageUrl: string): string {
  const trimmed = imageUrl.trim();
  if (trimmed === '/heroe.jpg' || trimmed.endsWith('/heroe.jpg')) {
    return resolveSiteAssetSrc('/heroe.webp');
  }
  return resolveSiteAssetSrc(trimmed);
}

export function isOptimizableLocalImage(src: string): boolean {
  return src.startsWith('/') && !src.startsWith('//');
}
