import { siteConfig } from '@/config/site';

const LEGACY_BRAND_PATTERN =
  /ruiz\s*leiva|rlu\s*abogados|rluabogados|luis\s*leiva|asesor[ií]a jur[ií]dica estrat[eé]gica en santiago/i;

export function containsLegacyBrandReference(value: string): boolean {
  return LEGACY_BRAND_PATTERN.test(value);
}

export function resolveSiteSeoTitle(value?: string | null): string {
  const trimmed = value?.trim();
  if (!trimmed || containsLegacyBrandReference(trimmed)) {
    return siteConfig.metadata.seoTitle;
  }
  return trimmed;
}

export function resolveSiteSeoDescription(value?: string | null): string {
  const trimmed = value?.trim();
  if (!trimmed || containsLegacyBrandReference(trimmed)) {
    return siteConfig.metadata.description;
  }
  return trimmed;
}

export const FAMILIA_INTERNACIONAL_SEO_DEFAULTS = {
  siteName: siteConfig.name,
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultTitleEs: siteConfig.metadata.seoTitle,
  defaultDescriptionEs: siteConfig.metadata.description,
  canonicalBaseUrl: 'https://www.familiainternacional.cl',
  keywords: JSON.stringify(siteConfig.metadata.keywords),
  serviceAreas: JSON.stringify(siteConfig.serviceAreas),
} as const;
