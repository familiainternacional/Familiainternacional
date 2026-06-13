import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/home/Navbar';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import HeroSection from '@/components/home/HeroSection';
import ReplicaHero from '@/components/ReplicaHero';
import AboutSection from '@/components/home/AboutSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import MediaMentionsSection from '@/components/home/MediaMentionsSection';
import SeoTextSection from '@/components/home/SeoTextSection';
import MissionSection from '@/components/home/MissionSection';
import HowWeWorkSection from '@/components/home/HowWeWorkSection';
import ProcessSection from '@/components/home/ProcessSection';
import CtaSection from '@/components/home/CtaSection';
import InsightsSection from '@/components/home/InsightsSection';
import OfficeMapSection from '@/components/home/OfficeMapSection';
import Footer from '@/components/home/Footer';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import CinematicSection from '@/components/motion/CinematicSection';
import CinematicPageShell from '@/components/motion/CinematicPageShell';
import WhatsAppWidget from '@/components/home/WhatsAppWidget';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { buildHomeStructuredData } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.metadata.title,
  },
  description: siteConfig.metadata.description,
  alternates: {
    canonical: '/',
  },
};

import { getHomeHeroAdminValues } from '@/app/admin/inicio/actions';
import { getServicesPageAdminValues } from '@/app/admin/servicios/actions';
import { getAboutPageAdminValues } from '@/app/admin/nosotros/actions';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { getTestimonials } from '@/app/admin/testimonios/actions';

export default async function HomePage() {
  const [homeHeroValues, servicesValues, aboutValues, siteSettings, testimonials] = await Promise.all([
    getHomeHeroAdminValues().catch(() => null),
    getServicesPageAdminValues().catch(() => null),
    getAboutPageAdminValues().catch(() => null),
    getSiteSettingsAdminValues().catch(() => null),
    getTestimonials().catch(() => []),
  ]);

  return (
    <CinematicPageShell>
      <JsonLd data={buildHomeStructuredData()} />

      {/* Background image removed for new ReplicaHero */}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#07234c]"
      >
        Saltar al contenido principal
      </a>

      <Navbar adminValues={siteSettings} />
      
      <main id="main-content" className="cinematic-main">
        <ReplicaHero />
        <CinematicSection parallax={-80}>
          <ScrollReveal>
            <ReviewsSection />
          </ScrollReveal>
        </CinematicSection>
        <CinematicSection parallax={-70}>
          <ScrollReveal delay={0.05}>
            <MediaMentionsSection />
          </ScrollReveal>
        </CinematicSection>
        <CinematicSection parallax={-60}>
          <ScrollReveal delay={0.05}>
            <HowWeWorkSection />
          </ScrollReveal>
        </CinematicSection>
        <ScrollReveal delay={0.05}>
          <SeoTextSection />
        </ScrollReveal>
        <ScrollReveal delay={0.06}>
          <MissionSection />
        </ScrollReveal>
        <CinematicSection parallax={-70}>
          <ScrollReveal delay={0.08}>
            <ProcessSection />
          </ScrollReveal>
        </CinematicSection>
        <CinematicSection parallax={-90}>
          <ScrollReveal delay={0.1}>
            <AboutSection adminValues={aboutValues} />
          </ScrollReveal>
        </CinematicSection>
        <CinematicSection parallax={-50}>
          <ScrollReveal delay={0.05}>
            <TestimonialsSection testimonials={testimonials.filter(t => t.published)} />
          </ScrollReveal>
        </CinematicSection>
        <ScrollReveal>
          <InsightsSection />
        </ScrollReveal>
        <CinematicSection parallax={-110}>
          <ScrollReveal delay={0.08}>
            <CtaSection />
          </ScrollReveal>
        </CinematicSection>
        <ScrollReveal>
          <OfficeMapSection />
        </ScrollReveal>
      </main>

      <WhatsAppWidget adminValues={siteSettings} />
      <Footer adminValues={siteSettings} />
    </CinematicPageShell>
  );
}
