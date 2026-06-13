import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import type { MediaMention } from '@/config/media-mentions';
import { getPressHubItems, pressHubSeo } from '@/config/media-mentions';
import { getSiteLogoSrc } from '@/lib/storage/site-assets';

function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  const baseUrl = getDefaultCanonicalBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

function organizationId() {
  return `${absoluteUrl('/')}#legal-service`;
}

function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildPressHubStructuredData() {
  const items = getPressHubItems();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${absoluteUrl('/prensa')}#webpage`,
        url: absoluteUrl('/prensa'),
        name: pressHubSeo.title,
        description: pressHubSeo.description,
        inLanguage: 'es-CL',
        isPartOf: {
          '@type': 'WebSite',
          name: siteConfig.name,
          url: absoluteUrl('/'),
        },
        about: {
          '@id': organizationId(),
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            url: item.detailPage ? absoluteUrl(`/prensa/${item.slug}`) : item.url,
          })),
        },
      },
      breadcrumb([
        { name: 'Inicio', path: '/' },
        { name: 'Prensa', path: '/prensa' },
      ]),
    ],
  };
}

export function buildPressArticleStructuredData(mention: MediaMention) {
  const pageUrl = absoluteUrl(`/prensa/${mention.slug}`);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: mention.seo?.title ?? mention.title,
      description: mention.seo?.description ?? mention.description,
      inLanguage: 'es-CL',
      datePublished: mention.date,
      about: mention.topics?.map((topic) => ({ '@type': 'Thing', name: topic })),
      isPartOf: {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: absoluteUrl('/'),
      },
      primaryImageOfPage: mention.thumbnail
        ? {
            '@type': 'ImageObject',
            url: absoluteUrl(mention.thumbnail),
          }
        : undefined,
    },
    {
      '@type': 'NewsArticle',
      '@id': `${pageUrl}#article`,
      headline: mention.title,
      description: mention.description,
      datePublished: mention.date,
      dateModified: mention.date,
      url: pageUrl,
      mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      image: mention.thumbnail ? [absoluteUrl(mention.thumbnail)] : undefined,
      author: {
        '@type': 'Person',
        name: mention.expertName ?? 'Jaime Soto Silva',
        jobTitle: 'Abogado especialista en derecho de familia internacional',
        worksFor: {
          '@type': 'LegalService',
          name: siteConfig.name,
          url: absoluteUrl('/'),
        },
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(getSiteLogoSrc()),
        },
      },
      isBasedOn: {
        '@type': 'NewsArticle',
        url: mention.url,
        publisher: {
          '@type': 'Organization',
          name: mention.source,
        },
      },
      citation: mention.url,
      keywords: mention.seo?.keywords.join(', '),
    },
    breadcrumb([
      { name: 'Inicio', path: '/' },
      { name: 'Prensa', path: '/prensa' },
      { name: mention.title, path: `/prensa/${mention.slug}` },
    ]),
  ];

  if (mention.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: mention.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
