import { serviceLandings } from '@/config/service-landings';

export type FamilyService = {
  num: string;
  slug: string;
  title: { es: string; en: string };
  shortTitle: { es: string; en: string };
  desc: { es: string; en: string };
  intro: { es: string; en: string };
  includes: { es: string[]; en: string[] };
  image: string;
};

/** Deriva la lista de servicios FI para home/nav desde las landings. */
export const familyServices: FamilyService[] = serviceLandings.map((service) => ({
  num: service.eyebrow.replace('Área ', ''),
  slug: service.slug,
  title: { es: service.title, en: service.title },
  shortTitle: { es: service.shortTitle, en: service.shortTitle },
  desc: { es: service.seoDescription, en: service.seoDescription },
  intro: { es: service.intro, en: service.intro },
  includes: { es: [...service.includes], en: [...service.includes] },
  image: service.image,
}));
