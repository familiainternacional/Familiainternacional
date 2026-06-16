import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { siteConfig } from '@/config/site';
import { getSiteLogoSrc } from '@/lib/storage/site-assets';

function absoluteUrl(path = '/') {
  const baseUrl = getDefaultCanonicalBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

type PerspectivasHubPost = {
  slug: string;
  titleEs: string;
  excerptEs?: string | null;
  publishedAt?: Date | null;
};

export function buildPerspectivasHubStructuredData(posts: PerspectivasHubPost[]) {
  const pageUrl = absoluteUrl('/perspectivas');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Perspectivas jurídicas | Familia Internacional',
        description:
          'Artículos y guías sobre derecho de familia internacional, Convenio de La Haya, divorcio transfronterizo y exequátur en Chile.',
        isPartOf: {
          '@type': 'WebSite',
          name: siteConfig.name,
          url: absoluteUrl('/'),
        },
        inLanguage: 'es-CL',
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#item-list`,
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl(`/perspectivas/${post.slug}`),
          name: post.titleEs,
          description: post.excerptEs ?? undefined,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Perspectivas',
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

type BlogArticleStructuredDataInput = {
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: Date;
  updatedAt: Date;
  authorName: string;
};

export function buildPerspectivasArticleStructuredData({
  slug,
  title,
  description,
  image,
  publishedAt,
  updatedAt,
  authorName,
}: BlogArticleStructuredDataInput) {
  const pageUrl = absoluteUrl(`/perspectivas/${slug}`);
  const isPersonAuthor = authorName.toLowerCase().includes('jaime');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
        headline: title,
        description,
        image,
        author: isPersonAuthor
          ? {
              '@type': 'Person',
              name: authorName,
              jobTitle: 'Abogado especialista en derecho de familia internacional',
              worksFor: {
                '@type': 'LegalService',
                name: siteConfig.name,
                url: absoluteUrl('/'),
              },
            }
          : {
              '@type': 'Organization',
              name: authorName,
            },
        publisher: {
          '@type': 'LegalService',
          name: siteConfig.name,
          url: absoluteUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl(getSiteLogoSrc()),
          },
        },
        datePublished: publishedAt.toISOString(),
        dateModified: updatedAt.toISOString(),
        inLanguage: 'es-CL',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Perspectivas',
            item: absoluteUrl('/perspectivas'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
