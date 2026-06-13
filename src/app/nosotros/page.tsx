import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import MissionSection from '@/components/home/MissionSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import AboutSection from '@/components/home/AboutSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { getAboutPageAdminValues } from '@/app/admin/nosotros/actions';

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conoce Familia Internacional: el primer estudio en Chile dedicado exclusivamente al Derecho Internacional de Familia, liderado por Jaime Soto Silva.',
  alternates: { canonical: '/nosotros' },
  openGraph: {
    title: `Nosotros | ${siteConfig.name}`,
    description:
      'Misión, equipo y diferenciales de Familia Internacional en divorcios internacionales, sustracción de menores y exequátur.',
    url: '/nosotros',
  },
};

export default async function NosotrosPage() {
  const aboutValues = await getAboutPageAdminValues().catch(() => null);
  const siteUrl = getDefaultCanonicalBaseUrl();
  const pageDescription =
    'Conoce Familia Internacional: el primer estudio en Chile dedicado exclusivamente al Derecho Internacional de Familia, liderado por Jaime Soto Silva.';

  return (
    <MarketingPageLayout>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${siteUrl}/nosotros#webpage`,
          url: `${siteUrl}/nosotros`,
          name: `Nosotros | ${siteConfig.name}`,
          description: pageDescription,
          inLanguage: 'es-CL',
          isPartOf: { '@id': `${siteUrl}/#website` },
        }}
      />

      <InnerPageHero
        eyebrow="El estudio"
        title="Expertos en familia internacional"
        description="Somos el primer y único estudio jurídico en Chile dedicado exclusivamente a la protección de familias y menores cuando sus derechos cruzan fronteras."
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Nosotros' },
        ]}
      />

      <ScrollReveal>
        <MissionSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <WhyChooseUsSection />
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <AboutSection adminValues={aboutValues} />
      </ScrollReveal>

      <section className="border-t border-[#07234c]/5 bg-white px-5 py-12 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="fi-section-intro mt-0 max-w-xl">
            Conoce la trayectoria completa de Jaime Soto Silva, su experiencia en el Convenio de La Haya y su
            participación como autoridad central.
          </p>
          <Link
            href="/equipo/jaime-soto-silva"
            className="fi-link-action rounded-full border border-[#07234c]/15 px-6 py-3 text-[#07234c] hover:bg-[#07234c] hover:text-white"
          >
            Perfil de Jaime Soto
          </Link>
        </div>
      </section>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </MarketingPageLayout>
  );
}
