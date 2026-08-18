import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileText,
  Globe2,
  MessageCircle,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import EvaluaTuCasoForm from '@/components/forms/EvaluaTuCasoForm';
import Footer from '@/components/home/Footer';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import {
  campaignLandings,
  getCampaignLanding,
  getCampaignService,
} from '@/config/campaign-landings';
import { logoImageSizes } from '@/config/logo';
import { siteConfig } from '@/config/site';
import { buildWhatsAppWidgetHref } from '@/lib/contact/links';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getSiteSettings } from '@/lib/cms/site-settings';
import { getSiteLogoSrc, resolveSiteAssetSrc } from '@/lib/storage/site-assets';

type CampaignPageProps = {
  params: Promise<{
    tema: string;
  }>;
};

export function generateStaticParams() {
  return campaignLandings.map((landing) => ({
    tema: landing.slug,
  }));
}

export async function generateMetadata({ params }: CampaignPageProps): Promise<Metadata> {
  const { tema } = await params;
  const landing = getCampaignLanding(tema);

  if (!landing) {
    return {
      title: 'Asesoria no encontrada',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createPageMetadata({
    pathname: `/asesoria/${landing.slug}`,
    title: landing.metaTitle,
    description: landing.metaDescription,
    absoluteTitle: true,
    images: landing.image,
  });
}

export default async function CampaignLandingPage({ params }: CampaignPageProps) {
  const { tema } = await params;
  const landing = getCampaignLanding(tema);

  if (!landing) {
    notFound();
  }

  const [siteSettings] = await Promise.all([
    getSiteSettings().catch(() => null),
  ]);
  const service = getCampaignService(landing);
  const whatsappNumber = siteSettings?.whatsappNumber || siteConfig.contact.whatsappNumber;
  const whatsappHref = buildWhatsAppWidgetHref(whatsappNumber, 'es');
  const logo = getSiteLogoSrc('dark');
  const heroImage = resolveSiteAssetSrc(landing.image);
  const relatedCampaigns = campaignLandings
    .filter((item) => item.slug !== landing.slug)
    .slice(0, 3);
  const serviceIncludes = service?.includes.slice(0, 4) ?? landing.advisoryIncludes;

  return (
    <div className="min-h-screen bg-white text-[#07234c] selection:bg-[#0d3566] selection:text-white">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#07234c]/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex min-w-0 items-center" aria-label={siteConfig.name}>
            <Image
              src={logo}
              alt={siteConfig.name}
              width={logoImageSizes.navbar.width}
              height={logoImageSizes.navbar.height}
              priority
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <nav className="hidden items-center gap-3 md:flex" aria-label="Acciones de asesoria">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#07234c]/20 px-4 text-sm font-semibold text-[#07234c] transition hover:bg-[#07234c]/5"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
            <a
              href="#campaign-form"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#07234c] px-5 text-sm font-bold text-white transition hover:bg-[#0d3566]"
            >
              {landing.ctaLabel}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#07234c]/10 pt-20">
          <div className="absolute inset-0 bg-[#f7f7f3]" aria-hidden />
          <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block" aria-hidden>
            <Image
              src={heroImage}
              alt=""
              fill
              sizes="46vw"
              priority
              className="object-cover grayscale-[15%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7f7f3] via-[#f7f7f3]/50 to-transparent" />
            <div className="absolute inset-0 bg-white/20" />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#07234c]/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0d3566]">
                <Scale className="h-4 w-4" aria-hidden />
                {landing.eyebrow}
              </p>
              <h1 className="max-w-[13ch] font-serif text-[2.8rem] font-bold leading-[1.02] tracking-tight text-[#07234c] sm:text-[4rem] lg:text-[5rem]">
                {landing.title}
              </h1>
              <p className="mt-6 max-w-[64ch] text-lg leading-relaxed text-[#334155]">
                {landing.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#campaign-form"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#07234c] px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#0d3566]"
                >
                  {landing.ctaLabel}
                  <ArrowDown className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#07234c]/20 bg-white/70 px-6 text-sm font-bold uppercase tracking-wide text-[#07234c] transition hover:bg-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {landing.secondaryCtaLabel}
                </a>
              </div>

              <p className="mt-7 max-w-[58ch] border-l-2 border-[#b38b59] pl-4 text-sm font-semibold leading-relaxed text-[#475569]">
                {landing.urgencyLine}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {landing.proofPoints.map((point) => (
                  <div key={point.label} className="border-t border-[#07234c]/20 pt-4">
                    <p className="font-serif text-2xl font-bold text-[#07234c]">{point.value}</p>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-[#64748b]">
                      {point.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside
              id="campaign-form"
              className="scroll-mt-28 rounded-card border border-[#07234c]/10 bg-white p-5 shadow-[0_24px_70px_rgba(7,35,76,0.16)] sm:p-6"
              aria-label="Formulario de asesoria"
            >
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-wide text-[#b38b59]">
                  Evaluacion inicial
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#07234c]">
                  Cuente su caso
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                  Dejemos sus datos y el equipo le contactara para orientar el siguiente paso.
                </p>
              </div>
              <EvaluaTuCasoForm
                variant="light"
                leadSource={landing.leadSource}
                lazyRecaptcha={false}
              />
            </aside>
          </div>
        </section>

        <section className="border-b border-[#07234c]/10 bg-white py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="fi-eyebrow text-[#0d3566]">Cuando conviene consultar</p>
              <h2 className="mt-4 max-w-[12ch] font-serif text-4xl font-bold leading-tight tracking-tight text-[#07234c] md:text-5xl">
                Este servicio es para usted si...
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {landing.painPoints.map((point) => (
                <article
                  key={point}
                  className="rounded-card border border-[#07234c]/10 bg-[#f8fafc] p-6"
                >
                  <CheckCircle2 className="mb-5 h-6 w-6 text-[#b38b59]" aria-hidden />
                  <p className="text-base font-semibold leading-relaxed text-[#24364b]">
                    {point.replace(/\.$/, '')}.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#07234c]/10 bg-[#f7f7f3] py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="fi-eyebrow text-[#0d3566]">Que incluye la asesoria</p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-[#07234c] md:text-5xl">
                Claridad antes de tomar una decision legal.
              </h2>
              <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-[#475569]">
                La primera conversacion debe ordenar el mapa: que pais importa, que documentos faltan,
                que riesgo existe y cual es la via mas razonable para avanzar.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {landing.advisoryIncludes.map((item, index) => {
                const Icon = [Globe2, FileText, Clock3, ShieldCheck][index] ?? CheckCircle2;

                return (
                  <article key={item} className="rounded-card bg-white p-6 shadow-sm">
                    <Icon className="h-7 w-7 text-[#0d3566]" aria-hidden />
                    <p className="mt-6 text-sm font-bold text-[#94a3b8]">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-base font-bold leading-snug text-[#07234c]">
                      {item}
                    </h3>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[#07234c]/10 bg-white py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="fi-eyebrow text-[#0d3566]">Como trabajamos</p>
              <h2 className="mt-4 max-w-[13ch] font-serif text-4xl font-bold leading-tight tracking-tight text-[#07234c] md:text-5xl">
                Tres pasos para avanzar sin improvisar.
              </h2>
            </div>
            <div className="divide-y divide-[#07234c]/10 border-y border-[#07234c]/10">
              {landing.processSteps.map((step, index) => (
                <article key={step.title} className="grid gap-5 py-8 sm:grid-cols-[96px_1fr]">
                  <p className="font-serif text-4xl font-bold text-[#b38b59]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <h3 className="text-xl font-bold text-[#07234c]">{step.title}</h3>
                    <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-[#475569]">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#07234c]/10 bg-[#07234c] py-16 text-white md:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white/60">
                Alcance del servicio
              </p>
              <h2 className="mt-4 max-w-[12ch] font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                En que podemos ayudar.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {serviceIncludes.map((item) => (
                <article key={item} className="border-t border-white/20 pt-5">
                  <CheckCircle2 className="mb-4 h-5 w-5 text-[#d8b06f]" aria-hidden />
                  <p className="text-base font-semibold leading-relaxed text-white/90">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <GoogleReviewsSection limit={3} compact showViewAllLink />

        <section className="border-y border-[#07234c]/10 bg-white py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="fi-eyebrow text-[#0d3566]">Preguntas frecuentes</p>
              <h2 className="mt-4 max-w-[12ch] font-serif text-4xl font-bold leading-tight tracking-tight text-[#07234c] md:text-5xl">
                Antes de agendar.
              </h2>
            </div>
            <div className="divide-y divide-[#07234c]/10 border-y border-[#07234c]/10">
              {landing.faqs.map((faq) => (
                <details key={faq.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-lg font-bold text-[#07234c]">
                    {faq.question}
                    <span className="mt-1 text-[#b38b59] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-[#475569]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f3] py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
            <div>
              <p className="fi-eyebrow text-[#0d3566]">Siguiente paso</p>
              <h2 className="mt-4 max-w-[15ch] font-serif text-4xl font-bold leading-tight tracking-tight text-[#07234c] md:text-5xl">
                Agende una asesoria y ordenemos su caso.
              </h2>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[#475569]">
                Complete el formulario y cuentenos el tema, el pais involucrado y el plazo que le preocupa.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href="#campaign-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#07234c] px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#0d3566]"
              >
                {landing.ctaLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#07234c]/20 bg-white px-6 text-sm font-bold uppercase tracking-wide text-[#07234c] transition hover:bg-[#f8fafc]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-[#07234c]/10 bg-white py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-wide text-[#64748b]">
              Otras asesorias disponibles
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {relatedCampaigns.map((item) => (
                <Link
                  key={item.slug}
                  href={`/asesoria/${item.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-[#07234c]/10 px-4 text-sm font-semibold text-[#07234c] transition hover:bg-[#07234c]/5"
                >
                  {item.eyebrow}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer adminValues={siteSettings} />
    </div>
  );
}

