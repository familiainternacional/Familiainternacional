import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/home/Navbar';
import ReplicaHero from '@/components/ReplicaHero';
import ServicesHomePreview from '@/components/home/ServicesHomePreview';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import MediaHighlightHome from '@/components/home/MediaHighlightHome';
import CtaSection from '@/components/home/CtaSection';
import ContactHomeTeaser from '@/components/home/ContactHomeTeaser';
import Footer from '@/components/home/Footer';
import ScrollReveal from '@/components/home/ScrollReveal';
import CinematicSection from '@/components/motion/CinematicSection';
import CinematicPageShell from '@/components/motion/CinematicPageShell';
import WhatsAppWidget from '@/components/home/WhatsAppWidget';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { buildHomeStructuredData } from '@/lib/seo/structured-data';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';

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
  const siteSettings = await getSiteSettingsAdminValues().catch(() => null);

  return (
    <CinematicPageShell>
      <JsonLd data={buildHomeStructuredData()} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#07234c]"
      >
        Saltar al contenido principal
      </a>

      <Navbar adminValues={siteSettings} />

      <main id="main-content" className="cinematic-main">
        <ReplicaHero />
        <ScrollReveal>
          <ServicesHomePreview />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <MediaHighlightHome />
        </ScrollReveal>
        <ScrollReveal delay={0.06}>
          <GoogleReviewsSection limit={3} compact showViewAllLink />
        </ScrollReveal>
        <CinematicSection parallax={-80}>
          <ScrollReveal delay={0.06}>
            <CtaSection />
          </ScrollReveal>
        </CinematicSection>
        <ScrollReveal>
          <ContactHomeTeaser />
        </ScrollReveal>
      </main>

      <WhatsAppWidget adminValues={siteSettings} />
      <Footer adminValues={siteSettings} />
    </CinematicPageShell>
  );
}
