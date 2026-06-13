import { siteConfig } from '@/config/site';
import type { TeamMember } from '@/config/team';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { getSiteLogoSrc } from '@/lib/storage/site-assets';

function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  const baseUrl = getDefaultCanonicalBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function buildTeamMemberStructuredData(member: TeamMember) {
  const pageUrl = absoluteUrl(`/equipo/${member.slug}`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: member.seo.title,
        description: member.seo.description,
        inLanguage: 'es-CL',
        mainEntity: { '@id': `${pageUrl}#person` },
      },
      {
        '@type': 'Person',
        '@id': `${pageUrl}#person`,
        name: member.name,
        jobTitle: member.role.es,
        email: member.email,
        url: pageUrl,
        image: absoluteUrl(member.image),
        worksFor: {
          '@type': 'LegalService',
          name: siteConfig.name,
          url: absoluteUrl('/'),
          logo: absoluteUrl(getSiteLogoSrc()),
        },
        knowsAbout: member.tags,
        description: member.seo.description,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Equipo', item: absoluteUrl('/equipo/jaime-soto-silva') },
          { '@type': 'ListItem', position: 3, name: member.name, item: pageUrl },
        ],
      },
    ],
  };
}
