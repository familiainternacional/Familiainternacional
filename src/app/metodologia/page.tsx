import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import HowWeWorkSection from '@/components/home/HowWeWorkSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.metodologia;

  return createPageMetadata({
    pathname: '/metodologia',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function MetodologiaPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.metodologia;
  const siteUrl = getDefaultCanonicalBaseUrl();

  return (
    <MarketingPageLayout>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteUrl}/metodologia#webpage`,
          url: `${siteUrl}/metodologia`,
          name: `${page.metaTitle} | ${siteConfig.name}`,
          description: page.metaDescription,
          inLanguage: 'es-CL',
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
        <HowWeWorkSection />
      </ScrollReveal>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </MarketingPageLayout>
  );
}
