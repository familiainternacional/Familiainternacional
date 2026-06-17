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
import { siteConfig } from '@/config/site';
import { buildHomeStructuredData } from '@/lib/seo/structured-data';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { getSiteSeoSettingsAdminValues } from '@/app/admin/seo/actions';
import { resolveSiteSeoDescription, resolveSiteSeoTitle } from '@/lib/seo/resolve-site-seo';
import { getAboutPageAdminValues } from '@/app/admin/nosotros/actions';
import { createPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const seoSettings = await getSiteSeoSettingsAdminValues().catch(() => null);
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
    getSiteSettingsAdminValues().catch(() => null),
    getAboutPageAdminValues().catch(() => null),
  ]);

  return (
    <>
      <JsonLd data={buildHomeStructuredData()} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#07234c]"
      >
        Saltar al contenido principal
      </a>

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
