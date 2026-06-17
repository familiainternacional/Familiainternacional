import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import SeoTextSection from '@/components/home/SeoTextSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import { siteConfig } from '@/config/site';
import { homeFaqItems } from '@/config/home-faq';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.faq;

  return createPageMetadata({
    pathname: '/preguntas-frecuentes',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function PreguntasFrecuentesPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.faq;
  const siteUrl = getDefaultCanonicalBaseUrl();

  return (
    <MarketingPageLayout>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteUrl}/preguntas-frecuentes#webpage`,
          url: `${siteUrl}/preguntas-frecuentes`,
          name: `${page.metaTitle} | ${siteConfig.name}`,
          description: page.metaDescription,
          inLanguage: 'es-CL',
          mainEntity: {
            '@type': 'FAQPage',
            mainEntity: homeFaqItems.es.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
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

      <ScrollReveal>
        <SeoTextSection showPageHeader={false} />
      </ScrollReveal>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </MarketingPageLayout>
  );
}
