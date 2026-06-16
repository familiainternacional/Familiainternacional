import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/home/Navbar';
import ReplicaHero from '@/components/ReplicaHero';
import GuideProcessSection from '@/components/home/GuideProcessSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { buildHomeStructuredData } from '@/lib/seo/structured-data';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { getSiteSeoSettingsAdminValues } from '@/app/admin/seo/actions';
import { getAboutPageAdminValues } from '@/app/admin/nosotros/actions';
import { createPageMetadata } from '@/lib/seo/metadata';

const InsightsSection = dynamic(() => import('@/components/home/InsightsSection'));

const ServicesHomePreview = dynamic(() => import('@/components/home/ServicesHomePreview'));
const AboutSection = dynamic(() => import('@/components/home/AboutSection'));
const GoogleReviewsSection = dynamic(() => import('@/components/home/GoogleReviewsSection'));
const CtaSection = dynamic(() => import('@/components/home/CtaSection'));
const ReplicaMediaSection = dynamic(() => import('@/components/home/ReplicaMediaSection'));
const ReplicaContactSection = dynamic(() => import('@/components/home/ReplicaContactSection'));
const PaymentMethodsBanner = dynamic(() => import('@/components/home/PaymentMethodsBanner'));
const Footer = dynamic(() => import('@/components/home/Footer'));

export async function generateMetadata(): Promise<Metadata> {
  const seoSettings = await getSiteSeoSettingsAdminValues().catch(() => null);
  const seoTitle = seoSettings?.defaultTitleEs?.trim() || siteConfig.metadata.seoTitle;
  const description =
    seoSettings?.defaultDescriptionEs?.trim() || siteConfig.metadata.description;
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
          <InsightsSection />
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
