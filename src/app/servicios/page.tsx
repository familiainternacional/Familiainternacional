import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import ServicesSection from '@/components/home/ServicesSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import { familyServices } from '@/config/family-services';
import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { getServicesPageAdminValues } from '@/app/admin/servicios/actions';
import { createPageMetadata } from '@/lib/seo/metadata';

const servicesDescription =
  'Divorcios internacionales, sustracción de menores, exequátur, alimentos, herencias y trámites consulares. Familia Internacional, especialistas en Chile.';

export const metadata: Metadata = createPageMetadata({
  pathname: '/servicios',
  title: 'Servicios de derecho de familia internacional',
  description: servicesDescription,
});

export default async function ServicesIndexPage() {
  const servicesValues = await getServicesPageAdminValues().catch(() => null);
  const siteUrl = getDefaultCanonicalBaseUrl();

  return (
    <MarketingPageLayout>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${siteUrl}/servicios#webpage`,
              url: `${siteUrl}/servicios`,
              name: `Servicios | ${siteConfig.name}`,
              description: servicesDescription,
              inLanguage: 'es-CL',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: familyServices.map((service, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: service.title.es,
                  url: `${siteUrl}/servicios/${service.slug}`,
                })),
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
                { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${siteUrl}/servicios` },
              ],
            },
          ],
        }}
      />

      <InnerPageHero
        eyebrow="Áreas de práctica"
        title="Servicios de familia internacional"
        description="Cada materia requiere experiencia transfronteriza. Seleccione el área más cercana a su situación o evalúe su caso con nuestro equipo."
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Servicios' },
        ]}
      />

      <ScrollReveal>
        <ServicesSection adminValues={servicesValues} />
      </ScrollReveal>

      <section className="border-t border-[#07234c]/5 bg-[#f8fafc] px-5 py-12 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="fi-section-intro mt-0 max-w-xl">
            ¿No está seguro de qué servicio necesita? Cuéntenos su situación y le orientamos sobre la vía jurídica
            aplicable.
          </p>
          <Link
            href="/evalua-tu-caso"
            className="inline-flex items-center justify-center rounded-full bg-[#07234c] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[#051830]"
          >
            Evaluar mi caso
          </Link>
        </div>
      </section>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </MarketingPageLayout>
  );
}
