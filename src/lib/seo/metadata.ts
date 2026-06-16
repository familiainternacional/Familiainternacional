import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { buildCanonicalUrl, getDefaultCanonicalBaseUrl } from '@/config/seo-url';

export const DEFAULT_OG_IMAGE_PATH = '/opengraph-image';
export const DEFAULT_OG_IMAGE_ALT =
  'Familia Internacional - Estudio Jurídico de Derecho Internacional de Familia';

export function buildLanguageAlternates(pathname: string): NonNullable<Metadata['alternates']> {
  const baseUrl = getDefaultCanonicalBaseUrl();
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;

  return {
    canonical: path,
    languages: {
      'es-CL': buildCanonicalUrl(baseUrl, path, { locale: 'es' }),
      en: buildCanonicalUrl(baseUrl, path, { locale: 'en' }),
      'x-default': buildCanonicalUrl(baseUrl, path, { locale: 'es' }),
    },
  };
}

type OgImageInput = string | { url: string; width?: number; height?: number; alt?: string };

export function resolveOgImages(image?: OgImageInput | OgImageInput[]) {
  const images = image ? (Array.isArray(image) ? image : [image]) : [{ url: DEFAULT_OG_IMAGE_PATH }];

  return images.map((item) => {
    if (typeof item === 'string') {
      return {
        url: item,
        width: 1200,
        height: 630,
        alt: DEFAULT_OG_IMAGE_ALT,
      };
    }

    return {
      url: item.url,
      width: item.width ?? 1200,
      height: item.height ?? 630,
      alt: item.alt ?? DEFAULT_OG_IMAGE_ALT,
    };
  });
}

export function buildTwitterMetadata({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images?: OgImageInput | OgImageInput[];
}): NonNullable<Metadata['twitter']> {
  const resolvedImages = resolveOgImages(images).map((image) => image.url);

  return {
    card: 'summary_large_image',
    title,
    description,
    images: resolvedImages,
  };
}

type CreatePageMetadataInput = {
  pathname: string;
  title: string;
  description: string;
  keywords?: string[] | string;
  /** Meta title para Open Graph / Twitter cuando difiere del título de pestaña. */
  openGraphTitle?: string;
  absoluteTitle?: boolean;
  images?: OgImageInput | OgImageInput[];
  openGraphType?: 'website' | 'article';
  robots?: Metadata['robots'];
};

export function createPageMetadata({
  pathname,
  title,
  description,
  keywords,
  openGraphTitle,
  absoluteTitle = false,
  images,
  openGraphType = 'website',
  robots,
}: CreatePageMetadataInput): Metadata {
  const socialTitle =
    openGraphTitle ?? (absoluteTitle ? title : `${title} | ${siteConfig.name}`);
  const resolvedImages = resolveOgImages(images);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: buildLanguageAlternates(pathname),
    openGraph: {
      type: openGraphType,
      locale: 'es_CL',
      alternateLocale: ['en_US'],
      url: pathname,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: resolvedImages,
    },
    twitter: buildTwitterMetadata({
      title: socialTitle,
      description,
      images: resolvedImages.map((image) => image.url),
    }),
    ...(robots ? { robots } : {}),
  };
}

export const NOINDEX_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
};
