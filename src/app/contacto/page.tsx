import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import OfficeMapSection from '@/components/home/OfficeMapSection';
import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { primaryContact } from '@/config/contact';
import { createPageMetadata } from '@/lib/seo/metadata';

const contactoDescription =
  'Contacte a Familia Internacional en Lo Barnechea, Santiago. Teléfono, correo, mapa y formulario para evaluar su caso de familia internacional.';

export const metadata: Metadata = createPageMetadata({
  pathname: '/contacto',
  title: 'Contacto',
  description: contactoDescription,
});

export default function ContactoPage() {
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
          name: `Contacto | ${siteConfig.name}`,
          description: metadata.description,
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
        eyebrow="Contacto"
        title="Estamos para escucharte"
        description="Escríbenos, llámanos o completa el formulario. Un abogado especializado revisará su consulta."
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Contacto' },
        ]}
      />

      <OfficeMapSection showPageHeader={false} />
    </MarketingPageLayout>
  );
}
