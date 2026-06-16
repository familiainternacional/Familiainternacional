import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import MarketingPageLayout from '@/components/marketing/MarketingPageLayout';
import InnerPageHero from '@/components/marketing/InnerPageHero';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import CtaSection from '@/components/home/CtaSection';
import ScrollReveal from '@/components/home/ScrollReveal';
import { buildGoogleReviewsStructuredData } from '@/lib/seo/google-reviews-structured-data';
import { createPageMetadata } from '@/lib/seo/metadata';

const resenasDescription =
  'Reseñas verificadas de clientes de Familia Internacional en Google Business Profile. Experiencias en derecho de familia internacional.';

export const metadata: Metadata = createPageMetadata({
  pathname: '/reseñas',
  title: 'Reseñas de Google',
  description: resenasDescription,
});

export default function ResenasPage() {
  return (
    <MarketingPageLayout>
      <JsonLd data={buildGoogleReviewsStructuredData('/reseñas')} />

      <InnerPageHero
        eyebrow="Google Business Profile"
        title="Reseñas verificadas de nuestros clientes"
        description="Estas opiniones provienen directamente de nuestro perfil público en Google. Puede verificar cada reseña y dejar la suya después de trabajar con nosotros."
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Reseñas' },
        ]}
      />

      <GoogleReviewsSection />

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </MarketingPageLayout>
  );
}
