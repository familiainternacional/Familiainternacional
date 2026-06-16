import { googleBusinessProfile, googleReviews } from '@/config/google-reviews';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { siteConfig } from '@/config/site';

export function buildGoogleReviewsStructuredData(pagePath: '/' | '/reseñas' = '/') {
  const siteUrl = getDefaultCanonicalBaseUrl();
  const pageUrl = `${siteUrl}${pagePath === '/' ? '' : pagePath}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': `${siteUrl}/#legal-service`,
        name: siteConfig.name,
        url: siteUrl,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: googleBusinessProfile.aggregateRating.ratingValue,
          reviewCount: googleBusinessProfile.aggregateRating.reviewCount,
          bestRating: googleBusinessProfile.aggregateRating.bestRating,
          worstRating: googleBusinessProfile.aggregateRating.worstRating,
        },
        review: googleReviews.map((review) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: review.author,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: review.text.es,
          ...(review.datePublished ? { datePublished: review.datePublished } : {}),
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#reviews`,
        url: pageUrl,
        name: pagePath === '/' ? siteConfig.metadata.seoTitle : `Reseñas de Google | ${siteConfig.name}`,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#legal-service` },
      },
    ],
  };
}
