import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/home/Navbar';
import ReplicaHero from '@/components/ReplicaHero';
import ServicesHomePreview from '@/components/home/ServicesHomePreview';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import AboutSection from '@/components/home/AboutSection';
import CtaSection from '@/components/home/CtaSection';
import Footer from '@/components/home/Footer';
import ScrollReveal from '@/components/home/ScrollReveal';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { buildHomeStructuredData } from '@/lib/seo/structured-data';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { getAboutPageAdminValues } from '@/app/admin/nosotros/actions';
import GuideProcessSection from '@/components/home/GuideProcessSection';
import ReplicaContactSection from '@/components/home/ReplicaContactSection';
import ReplicaMediaSection from '@/components/home/ReplicaMediaSection';

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.metadata.title,
  },
  description: siteConfig.metadata.description,
  alternates: {
    canonical: '/',
  },
};

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

      <Footer adminValues={siteSettings} />
    </>
  );
}
