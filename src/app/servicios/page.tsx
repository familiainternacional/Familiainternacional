import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import ServicesSection from '@/components/home/ServicesSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import { getFamilyServices } from '@/config/family-services';
import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { getServicesPageAdminValues } from '@/app/admin/servicios/actions';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.servicios;

  return createPageMetadata({
    pathname: '/servicios',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function ServicesIndexPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.servicios;
  const servicesValues = await getServicesPageAdminValues().catch(() => null);
  const familyServices = getFamilyServices(locale);
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
              name: `${page.metaTitle} | ${siteConfig.name}`,
              description: page.metaDescription,
              inLanguage: 'es-CL',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: familyServices.map((service, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: service.title,
                  url: `${siteUrl}/servicios/${service.slug}`,
                })),
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: dict.common.home, item: siteUrl },
                { '@type': 'ListItem', position: 2, name: page.metaTitle, item: `${siteUrl}/servicios` },
              ],
            },
          ],
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

      <ScrollReveal>
        <ServicesSection adminValues={servicesValues} />
      </ScrollReveal>

      <section className="border-t border-[#07234c]/5 bg-[#f8fafc] px-5 py-12 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="fi-section-intro mt-0 max-w-xl">{page.ctaBody}</p>
          <Link
            href="/evalua-tu-caso"
            className="inline-flex items-center justify-center rounded-full bg-[#07234c] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[#051830]"
          >
            {dict.common.evaluateCase}
          </Link>
        </div>
      </section>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </MarketingPageLayout>
  );
}
