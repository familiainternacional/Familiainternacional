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

const metodologiaDescription =
  'Así trabaja Familia Internacional: consulta inicial, diagnóstico estratégico, propuesta clara y ejecución rigurosa en casos de familia internacional.';

export const metadata: Metadata = createPageMetadata({
  pathname: '/metodologia',
  title: 'Metodología',
  description: metodologiaDescription,
});

export default function MetodologiaPage() {
  const siteUrl = getDefaultCanonicalBaseUrl();

  return (
    <MarketingPageLayout>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteUrl}/metodologia#webpage`,
          url: `${siteUrl}/metodologia`,
          name: `Metodología | ${siteConfig.name}`,
          description: metadata.description,
          inLanguage: 'es-CL',
        }}
      />

      <InnerPageHero
        eyebrow="Cómo trabajamos"
        title="Metodología clara en cada etapa"
        description="Desde la primera consulta hasta la ejecución del caso, usted sabe qué esperar, qué plazos aplican y cómo avanzamos juntos."
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Metodología' },
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
