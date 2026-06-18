import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import MissionSection from '@/components/home/MissionSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import AboutSection from '@/components/home/AboutSection';
import ProcessSection from '@/components/home/ProcessSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { getAboutPageSettings } from '@/lib/cms/about-page';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.nosotros;

  return createPageMetadata({
    pathname: '/nosotros',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function NosotrosPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.nosotros;
  const aboutValues = await getAboutPageSettings().catch(() => null);
  const siteUrl = getDefaultCanonicalBaseUrl();

  return (
    <MarketingPageLayout>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${siteUrl}/nosotros#webpage`,
          url: `${siteUrl}/nosotros`,
          name: `${page.metaTitle} | ${siteConfig.name}`,
          description: page.metaDescription,
          inLanguage: 'es-CL',
          isPartOf: { '@id': `${siteUrl}/#website` },
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
        <MissionSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <WhyChooseUsSection />
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <ProcessSection />
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <AboutSection adminValues={aboutValues} />
      </ScrollReveal>

      <section className="border-t border-[#07234c]/5 bg-white px-5 py-12 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="fi-section-intro mt-0 max-w-xl">{page.jaimeTeaser}</p>
          <Link
            href="/equipo/jaime-soto-silva"
            className="fi-link-action rounded-full border border-[#07234c]/15 px-6 py-3 text-[#07234c] hover:bg-[#07234c] hover:text-white"
          >
            {page.jaimeProfileLink}
          </Link>
        </div>
      </section>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </MarketingPageLayout>
  );
}
