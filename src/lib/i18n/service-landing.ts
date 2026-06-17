import type { Locale } from './config';
import type { ServiceLanding } from '@/config/service-landings';
import { getServiceLanding, serviceLandings } from '@/config/service-landings';
import { enServiceLandings } from '@/locales/en/service-landings';

export function getLocalizedServiceLanding(slug: string, locale: Locale): ServiceLanding | null {
  const landing = getServiceLanding(slug);
  if (!landing) return null;
  if (locale === 'es') return landing;

  const en = enServiceLandings[slug as keyof typeof enServiceLandings];
  if (!en) return landing;

  return {
    ...landing,
    ...en,
    faqs: en.faqs ?? landing.faqs,
    problems: en.problems ?? landing.problems,
    approach: en.approach ?? landing.approach,
    includes: en.includes ?? landing.includes,
  };
}

export function getLocalizedServiceLandings(locale: Locale): ServiceLanding[] {
  return serviceLandings.map((landing) => getLocalizedServiceLanding(landing.slug, locale) ?? landing);
}
