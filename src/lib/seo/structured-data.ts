import { siteConfig } from '@/config/site';
import { teamContacts } from '@/config/contact';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import type { ServiceLanding } from '@/config/service-landings';
import { getSiteLogoSrc, resolveSiteAssetSrc } from '@/lib/storage/site-assets';

const OFFICE_LAT = -33.41628375;
const OFFICE_LNG = -70.5920947147805;

const practiceAreas = [
  'Litigación Civil',
  'Derecho Corporativo',
  'Derecho Administrativo',
  'Compliance',
  'Resolución de Conflictos',
  'Asesoría Empresarial',
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
    legalName: 'Ruiz Leiva Abogados Limitada',
    url: absoluteUrl('/'),
    logo: absoluteUrl(getSiteLogoSrc()),
    image: absoluteUrl(resolveSiteAssetSrc('/images/santiago-skyline.jpg')),
    description: siteConfig.metadata.description,
    email: teamContacts.map((contact) => contact.email),
    priceRange: '$$',
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Apoquindo 3669',
      addressLocality: 'Las Condes',
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
      name: 'Servicios jurídicos Ruiz Leiva Abogados',
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
        name: 'Evalúa tu caso | Ruiz Leiva Abogados',
        description:
          'Formulario para solicitar una evaluación inicial de un caso jurídico con Ruiz Leiva Abogados.',
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
