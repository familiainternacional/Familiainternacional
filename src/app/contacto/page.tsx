import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import OfficeMapSection from '@/components/home/OfficeMapSection';
import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { primaryContact } from '@/config/contact';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.contacto;

  return createPageMetadata({
    pathname: '/contacto',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function ContactoPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.contacto;
  const siteUrl = getDefaultCanonicalBaseUrl();
  const office = siteConfig.offices[0];

  return (
    <MarketingPageLayout>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': `${siteUrl}/contacto#webpage`,
          url: `${siteUrl}/contacto`,
          name: `${page.metaTitle} | ${siteConfig.name}`,
          description: page.metaDescription,
          inLanguage: 'es-CL',
          mainEntity: {
            '@type': 'LegalService',
            name: siteConfig.name,
            telephone: primaryContact.phoneHref.replace('tel:', ''),
            email: primaryContact.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: office.addressLines[0],
              addressLocality: office.addressLines[1],
              addressRegion: 'Región Metropolitana',
              addressCountry: 'CL',
            },
          },
        }}
      />

      <InnerPageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        breadcrumbs={[
          { label: dict.common.home, href: '/' },
          { label: page.metaTitle },
        ]}
      />

      <OfficeMapSection showPageHeader={false} />
    </MarketingPageLayout>
  );
}
