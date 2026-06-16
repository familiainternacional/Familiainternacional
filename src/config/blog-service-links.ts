import { getServiceLanding } from '@/config/service-landings';

/** Enlaces internos recomendados desde artículos de perspectivas hacia landings de servicio. */
const blogPostServiceLinks: Record<string, string[]> = {
  'convenio-la-haya-guia-familias': ['cuidado-sustraccion'],
  'divorcio-internacional-chile': ['divorcios-internacionales', 'exequatur'],
  'exequatur-sentencias-extranjeras': ['exequatur'],
  'pension-alimentos-internacional': ['filiacion-alimentos'],
};

export function getRelatedServiceSlugsForBlogPost(slug: string): string[] {
  const mapped = blogPostServiceLinks[slug];
  if (mapped?.length) return mapped;

  return ['divorcios-internacionales', 'cuidado-sustraccion'];
}

export function getRelatedServicesForBlogPost(slug: string) {
  return getRelatedServiceSlugsForBlogPost(slug)
    .map((serviceSlug) => getServiceLanding(serviceSlug))
    .filter((landing): landing is NonNullable<typeof landing> => Boolean(landing));
}
