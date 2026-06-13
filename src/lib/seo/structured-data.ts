import { siteConfig } from '@/config/site';
import { teamContacts } from '@/config/contact';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import type { ServiceLanding } from '@/config/service-landings';
import { googleBusinessProfile, googleReviews } from '@/config/google-reviews';
import { getSiteLogoSrc, resolveSiteAssetSrc } from '@/lib/storage/site-assets';

const OFFICE_LAT = -33.41628375;
const OFFICE_LNG = -70.5920947147805;

const practiceAreas = [
  'Divorcios Internacionales',
  'Sustracción Internacional de Menores',
  'Exequátur de Sentencias Extranjeras',
  'Visitas Internacionales',
  'Alimentos Internacionales',
  'Autorizaciones para Salir del País',
];

function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const baseUrl = getDefaultCanonicalBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

function organizationId() {
  return `${absoluteUrl('/')}#legal-service`;
}

function websiteId() {
  return `${absoluteUrl('/')}#website`;
}

function baseLegalService() {
  return {
    '@type': 'LegalService',
    '@id': organizationId(),
    name: siteConfig.name,
    legalName: siteConfig.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl(getSiteLogoSrc()),
    image: absoluteUrl(resolveSiteAssetSrc('/images/santiago-skyline.jpg')),
    description: siteConfig.metadata.description,
    email: teamContacts.map((contact) => contact.email),
    priceRange: '$$',
    employee: teamContacts.map((contact) => ({
      '@type': 'Person',
      name: contact.name,
      jobTitle: 'Abogado especialista en derecho de familia internacional',
      worksFor: {
        '@id': organizationId(),
      },
      email: contact.email,
    })),
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. San Josemaría Escrivá de Balaguer N°13.105, Of. 303',
      addressLocality: 'Lo Barnechea',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: OFFICE_LAT,
      longitude: OFFICE_LNG,
    },
    contactPoint: teamContacts.map((contact) => ({
      '@type': 'ContactPoint',
      contactType: 'legal advisory',
      email: contact.email,
      areaServed: 'CL',
      availableLanguage: ['es', 'en'],
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Familia Internacional',
      itemListElement: practiceAreas.map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
          provider: {
            '@id': organizationId(),
          },
          areaServed: 'CL',
        },
      })),
    },
    sameAs: [googleBusinessProfile.profileUrl],
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
  };
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    name: siteConfig.name,
    url: absoluteUrl('/'),
    inLanguage: 'es-CL',
    publisher: {
      '@id': organizationId(),
    },
  };
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

export function buildHomeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      baseLegalService(),
      website(),
      {
        '@type': 'WebPage',
        '@id': `${absoluteUrl('/')}#webpage`,
        url: absoluteUrl('/'),
        name: siteConfig.metadata.title,
        description: siteConfig.metadata.description,
        inLanguage: 'es-CL',
        isPartOf: {
          '@id': websiteId(),
        },
        about: {
          '@id': organizationId(),
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(resolveSiteAssetSrc('/images/santiago-skyline.jpg')),
        },
      },
      breadcrumb([{ name: 'Inicio', path: '/' }]),
    ],
  };
}

export function buildEvaluaTuCasoStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      baseLegalService(),
      {
        '@type': 'ContactPage',
        '@id': `${absoluteUrl('/evalua-tu-caso')}#webpage`,
        url: absoluteUrl('/evalua-tu-caso'),
        name: `Evalúa tu caso | ${siteConfig.name}`,
        description:
          'Formulario para solicitar una evaluación inicial en derecho de familia nacional e internacional con Familia Internacional.',
        inLanguage: 'es-CL',
        isPartOf: {
          '@id': websiteId(),
        },
        about: {
          '@id': organizationId(),
        },
        potentialAction: {
          '@type': 'CommunicateAction',
          target: absoluteUrl('/evalua-tu-caso'),
          name: 'Solicitar evaluación jurídica',
        },
      },
      breadcrumb([
        { name: 'Inicio', path: '/' },
        { name: 'Evalúa tu caso', path: '/evalua-tu-caso' },
      ]),
    ],
  };
}

export function buildServiceLandingStructuredData(landing: ServiceLanding) {
  const serviceUrl = absoluteUrl(`/servicios/${landing.slug}`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      baseLegalService(),
      {
        '@type': 'Service',
        '@id': `${serviceUrl}#service`,
        name: landing.title,
        description: landing.seoDescription,
        serviceType: landing.title,
        provider: {
          '@id': organizationId(),
        },
        areaServed: 'CL',
        url: serviceUrl,
        offers: {
          '@type': 'Offer',
          url: serviceUrl,
          priceCurrency: 'CLP',
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@id': `${serviceUrl}#service`,
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${serviceUrl}#webpage`,
        url: serviceUrl,
        name: landing.seoTitle,
        description: landing.seoDescription,
        inLanguage: 'es-CL',
        isPartOf: {
          '@id': websiteId(),
        },
        about: {
          '@id': `${serviceUrl}#service`,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${serviceUrl}#faq`,
        mainEntity: landing.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      breadcrumb([
        { name: 'Inicio', path: '/' },
        { name: 'Servicios', path: '/servicios' },
        { name: landing.title, path: `/servicios/${landing.slug}` },
      ]),
    ],
  };
}
