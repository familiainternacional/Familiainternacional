import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import { buildGoogleReviewsStructuredData } from '@/lib/seo/google-reviews-structured-data';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.resenas;

  return createPageMetadata({
    pathname: '/reseñas',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function ResenasPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.resenas;

  return (
    <MarketingPageLayout>
      <JsonLd data={buildGoogleReviewsStructuredData('/reseñas')} />

      <InnerPageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        breadcrumbs={[
          { label: dict.common.home, href: '/' },
          { label: page.metaTitle },
        ]}
      />

      <GoogleReviewsSection />

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </MarketingPageLayout>
  );
}
