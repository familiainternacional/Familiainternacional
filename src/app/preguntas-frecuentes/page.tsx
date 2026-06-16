import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import SeoTextSection from '@/components/home/SeoTextSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import { siteConfig } from '@/config/site';
import { homeFaqItems } from '@/config/home-faq';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { createPageMetadata } from '@/lib/seo/metadata';

const faqDescription =
  'Respuestas sobre derecho de familia internacional, Convenio de La Haya, sustracción de menores, exequátur y cómo evaluar su caso con Familia Internacional.';

export const metadata: Metadata = createPageMetadata({
  pathname: '/preguntas-frecuentes',
  title: 'Preguntas frecuentes',
  description: faqDescription,
});

export default function PreguntasFrecuentesPage() {
  const siteUrl = getDefaultCanonicalBaseUrl();
  const pageDescription = faqDescription;

  return (
    <MarketingPageLayout>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteUrl}/preguntas-frecuentes#webpage`,
          url: `${siteUrl}/preguntas-frecuentes`,
          name: `Preguntas frecuentes | ${siteConfig.name}`,
          description: pageDescription,
          inLanguage: 'es-CL',
          mainEntity: {
            '@type': 'FAQPage',
            mainEntity: homeFaqItems.es.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          },
        }}
      />

      <InnerPageHero
        eyebrow="Consultas frecuentes"
        title="Preguntas frecuentes"
        description="Información clara sobre nuestro enfoque, el Convenio de La Haya y cómo dar el primer paso si su familia enfrenta un conflicto transfronterizo."
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Preguntas frecuentes' },
        ]}
      />

      <ScrollReveal>
        <SeoTextSection showPageHeader={false} />
      </ScrollReveal>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </MarketingPageLayout>
  );
}
