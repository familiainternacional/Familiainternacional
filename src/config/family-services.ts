import type { Locale } from '@/lib/i18n/config';
import { serviceLandings } from '@/config/service-landings';
import { getLocalizedServiceLanding } from '@/lib/i18n/service-landing';

const SLUG_TO_ADMIN_PAYLOAD_KEY: Record<string, string> = {
  'divorcios-internacionales': 'divorcios',
  'cuidado-sustraccion': 'cuidado',
  'filiacion-alimentos': 'filiacion',
  'exequatur': 'exequatur',
  'herencias-internacionales': 'herencias',
  'tramites-consulares': 'consulares',
  'autorizaciones-salida-pais': 'autorizaciones',
};

export const SERVICE_ADMIN_PAYLOAD_KEYS = serviceLandings.map(
  (service) => SLUG_TO_ADMIN_PAYLOAD_KEY[service.slug] ?? service.slug,
) as readonly string[];

export function getServiceAdminPayloadKey(slug: string) {
  return SLUG_TO_ADMIN_PAYLOAD_KEY[slug] ?? slug;
}

export type FamilyService = {
  num: string;
  slug: string;
  title: string;
  shortTitle: string;
  desc: string;
  intro: string;
  includes: string[];
  image: string;
};

export function getFamilyServices(locale: Locale): FamilyService[] {
  return serviceLandings.map((service) => {
    const localized = getLocalizedServiceLanding(service.slug, locale) ?? service;

    return {
      num: localized.eyebrow.replace(/^(Área|Area) /, ''),
      slug: localized.slug,
      title: localized.title,
      shortTitle: localized.shortTitle,
      desc: localized.seoDescription,
      intro: localized.intro,
      includes: [...localized.includes],
      image: localized.image,
    };
  });
}

/** @deprecated Use getFamilyServices(locale) */
export const familyServices = getFamilyServices('es');
