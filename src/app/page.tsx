import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/home/Navbar';
import ReplicaHero from '@/components/ReplicaHero';
import GuideProcessSection from '@/components/home/GuideProcessSection';
import ServicesHomePreview from '@/components/home/ServicesHomePreview';
import AboutSection from '@/components/home/AboutSection';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import CtaSection from '@/components/home/CtaSection';
import ReplicaMediaSection from '@/components/home/ReplicaMediaSection';
import ReplicaContactSection from '@/components/home/ReplicaContactSection';
import PaymentMethodsBanner from '@/components/home/PaymentMethodsBanner';
import Footer from '@/components/home/Footer';
import ScrollReveal from '@/components/home/ScrollReveal';
import JsonLd from '@/components/seo/JsonLd';
import SkipToContentLink from '@/components/i18n/SkipToContentLink';
import { siteConfig } from '@/config/site';
import { buildHomeStructuredData } from '@/lib/seo/structured-data';
import { getSiteSettings } from '@/lib/cms/site-settings';
import { getSiteSeoSettings } from '@/lib/cms/site-seo';
import { resolveSiteSeoDescription, resolveSiteSeoTitle } from '@/lib/seo/resolve-site-seo';
import { getAboutPageSettings } from '@/lib/cms/about-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const seoSettings = await getSiteSeoSettings().catch(() => null);
  const seoTitle = resolveSiteSeoTitle(seoSettings?.defaultTitleEs);
  const description = resolveSiteSeoDescription(seoSettings?.defaultDescriptionEs);
  const ogImage = seoSettings?.defaultOgImage?.trim() || undefined;

  return createPageMetadata({
    pathname: '/',
    title: siteConfig.metadata.documentTitle,
    openGraphTitle: seoTitle,
    description,
    absoluteTitle: true,
    images: ogImage,
    keywords: [...siteConfig.metadata.keywords],
  });
}

export default async function HomePage() {
  const [siteSettings, aboutSettings] = await Promise.all([
    getSiteSettings().catch(() => null),
    getAboutPageSettings().catch(() => null),
  ]);

  return (
    <>
      <JsonLd data={buildHomeStructuredData()} />

      <SkipToContentLink />

      <Navbar adminValues={siteSettings} />

      <main id="main-content">
        <ReplicaHero />

        <ScrollReveal>
          <GuideProcessSection />
        </ScrollReveal>

        <ScrollReveal>
          <ServicesHomePreview />
        </ScrollReveal>

        <ScrollReveal>
          <AboutSection adminValues={aboutSettings} />
        </ScrollReveal>

        <ScrollReveal>
          <GoogleReviewsSection limit={3} compact showViewAllLink />
        </ScrollReveal>

        <ScrollReveal>
          <CtaSection />
        </ScrollReveal>

        <ScrollReveal>
          <ReplicaMediaSection />
        </ScrollReveal>

        <ScrollReveal>
          <ReplicaContactSection adminValues={siteSettings} />
        </ScrollReveal>
      </main>

      <PaymentMethodsBanner />
      <Footer adminValues={siteSettings} />
    </>
  );
}
