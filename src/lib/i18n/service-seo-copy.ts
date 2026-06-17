import type { ServiceSeoCopy } from '@/config/service-seo-copy';
import { getServiceSeoCopy } from '@/config/service-seo-copy';
import { enServiceSeoCopy } from '@/locales/en/service-seo-copy';
import type { Locale } from './config';

export function getLocalizedServiceSeoCopy(slug: string, locale: Locale): ServiceSeoCopy {
  if (locale === 'es') {
    return getServiceSeoCopy(slug);
  }

  const localized = enServiceSeoCopy[slug as keyof typeof enServiceSeoCopy];
  return localized ?? enServiceSeoCopy.default;
}
