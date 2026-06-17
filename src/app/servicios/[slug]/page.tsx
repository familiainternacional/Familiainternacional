import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  CheckCircle,
  CircleDot,
  Scale,
} from 'lucide-react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import ScrollReveal from '@/components/home/ScrollReveal';
import JsonLd from '@/components/seo/JsonLd';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { serviceLandings } from '@/config/service-landings';
import { siteConfig } from '@/config/site';
import { buildServiceLandingStructuredData } from '@/lib/seo/structured-data';
import { buildLanguageAlternates, buildTwitterMetadata, NOINDEX_ROBOTS } from '@/lib/seo/metadata';
import {
  SLUG_PAGE_HERO_DIVIDER_CLASS,
  SLUG_PAGE_SECTION_CLASS,
  SLUG_PAGE_SECTION_DIVIDER_CLASS,
  SLUG_PAGE_SECTION_SHELL_CLASS,
} from '@/lib/layout';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { getServerLocale } from '@/lib/i18n/server';
import { formatTranslation, getDictionary } from '@/lib/i18n/dictionaries';
import {
  getLocalizedServiceLanding,
  getLocalizedServiceLandings,
} from '@/lib/i18n/service-landing';
import { getLocalizedServiceSeoCopy } from '@/lib/i18n/service-seo-copy';

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return serviceLandings.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const landing = getLocalizedServiceLanding(slug, locale);

  if (!landing) {
    return {
      title: dict.common.serviceNotFound,
      robots: NOINDEX_ROBOTS,
    };
  }

  const seoCopy = getLocalizedServiceSeoCopy(landing.slug, locale);
  const ogImage = `/servicios/${landing.slug}/opengraph-image`;
  const openGraphTitle = `${landing.seoTitle} | ${siteConfig.name}`;

  return {
    title: landing.seoTitle,
    description: landing.seoDescription,
    keywords: seoCopy.keywords,
    alternates: buildLanguageAlternates(`/servicios/${landing.slug}`),
    openGraph: {
      title: openGraphTitle,
      description: landing.seoDescription,
      url: `/servicios/${landing.slug}`,
      type: 'website',
      locale: 'es_CL',
      alternateLocale: ['en_US'],
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${landing.title} - ${siteConfig.name}`,
        },
      ],
    },
    twitter: buildTwitterMetadata({
      title: openGraphTitle,
      description: landing.seoDescription,
      images: ogImage,
    }),
  };
}

export default async function ServiceLandingPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const landing = getLocalizedServiceLanding(slug, locale);
  const ui = dict.servicesUi;

  if (!landing) {
    notFound();
  }

  const relatedServices = getLocalizedServiceLandings(locale)
    .filter((service) => service.slug !== landing.slug)
    .slice(0, 3);
  const seoCopy = getLocalizedServiceSeoCopy(landing.slug, locale);
  const heroStats = [
    { value: '01', label: ui.stats.initialDiagnosis },
    { value: String(landing.approach.length).padStart(2, '0'), label: ui.stats.strategyPhases },
    { value: String(landing.includes.length).padStart(2, '0'), label: ui.stats.includedServices },
    { value: '100%', label: ui.stats.confidentiality },
  ];
  const guideColumns = seoCopy.decisionPoints.slice(0, 3).map((point, index) => ({
    point,
    title: ui.guideColumns[index],
    Icon: [Scale, CheckCircle, CircleDot][index],
  }));

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white font-sans text-[#07234c] scroll-smooth">
      <JsonLd data={buildServiceLandingStructuredData(landing)} />

      <Navbar />

      <main>
        <section
          aria-labelledby="service-hero-title"
          className={`relative z-10 min-h-[620px] w-full max-w-full overflow-hidden bg-white lg:h-screen lg:min-h-[800px] lg:overflow-visible ${SLUG_PAGE_HERO_DIVIDER_CLASS}`}
        >
          <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
            <Image
              src={resolveSiteAssetSrc('/images/santiago-skyline.jpg')}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-15 grayscale-[15%]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/75 to-white/60" />
          </div>

          <div className="absolute inset-0 lg:hidden">
            <Image
              src={resolveSiteAssetSrc(landing.image)}
              alt={landing.title}
              fill
              sizes="100vw"
              className="object-cover object-center grayscale contrast-125"
              priority
            />
            <div className="absolute inset-0 bg-white/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[620px] w-full flex-col justify-start pb-12 pt-36 md:px-8 lg:mx-0 lg:h-full lg:w-[55%] lg:justify-center lg:px-0 lg:pl-32 lg:pt-0 xl:w-[60%]">
            <div className="mx-auto max-w-[343px] px-2 text-center lg:mx-0 lg:mt-16 lg:max-w-2xl lg:pr-0 lg:text-left">
              <Link
                href="/servicios"
                className="mb-7 inline-flex items-center text-small font-semibold text-[#07234c]/70 underline decoration-[#07234c]/20 underline-offset-4 transition-colors hover:text-[#07234c]"
              >
                {ui.breadcrumb}
              </Link>

              <span className="mb-5 block text-small font-bold uppercase tracking-widest text-brand">
                {landing.eyebrow} / {landing.title}
              </span>
              <h1
                id="service-hero-title"
                className="mb-5 font-serif text-[2.65rem] leading-[1.05] tracking-tight text-[#07234c] sm:text-[3rem] lg:mb-10 lg:text-h1"
              >
                {landing.heroTitle}
              </h1>

              <p className="mx-auto mb-7 max-w-[65ch] text-base leading-relaxed text-[#334155] lg:mx-0 lg:mb-9 lg:text-body">
                {landing.heroSubtitle}
              </p>

              <Link
                href="/evalua-tu-caso"
                className="rlu-button rlu-button-primary min-h-12 px-6 uppercase tracking-wide lg:px-7"
              >
                {landing.ctaLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mx-auto mt-12 grid w-full max-w-[343px] grid-cols-2 gap-x-8 gap-y-6 px-2 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-2 lg:absolute lg:bottom-12 lg:left-32 lg:right-auto lg:mx-0 lg:mt-0 lg:flex lg:w-[80%] lg:max-w-3xl lg:justify-between lg:gap-16 lg:overflow-visible lg:px-0 lg:pr-12">
              {heroStats.map((stat) => (
                <div key={stat.label} className="min-w-0 pr-2 lg:flex-shrink-0 lg:pr-0">
                  <p className="mb-1 font-serif text-h3 text-[#07234c] lg:mb-3">
                    {stat.value}
                  </p>
                  <p className="max-w-[13ch] text-small text-[#475569] lg:max-w-[120px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="absolute bottom-20 hidden h-[1px] bg-[#07234c]/10 lg:left-32 lg:block lg:w-[80%] lg:max-w-3xl" />
          </div>

          <div className="absolute bottom-0 right-0 top-24 hidden w-full border-l border-t border-[#07234c]/10 bg-white lg:right-12 lg:block lg:w-[45%] xl:w-[40%]">
            <div className="absolute inset-0">
              <Image
                src={resolveSiteAssetSrc(landing.image)}
                alt={landing.title}
                fill
                sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 45vw, 100vw"
                className="object-cover object-center opacity-90 grayscale contrast-125"
                priority
              />
              <div className="absolute inset-0 bg-white/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
            </div>
          </div>
        </section>

        <ScrollReveal>
          <section className={`${SLUG_PAGE_SECTION_CLASS} py-20 md:py-28`}>
            <div className="mx-auto max-w-7xl">
              <span className="mb-4 block text-small font-bold uppercase tracking-widest text-brand">
                {ui.focus}
              </span>
              <h2 className="max-w-[18ch] font-serif text-h2 font-bold tracking-tight">
                {formatTranslation(locale, 'servicesUi.approachTitle', {
                  area: landing.shortTitle.toLowerCase(),
                })}
              </h2>
              <p className="mt-6 max-w-[70ch] text-body leading-relaxed text-[#555555]">
                {landing.intro}
              </p>

              <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
                {landing.approach.map((item, index) => (
                  <article
                    key={item}
                    className="border-t border-[#07234c]/35 pt-12 pb-8 text-left"
                  >
                    <span className="block text-[0.7rem] font-semibold text-[#777777]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-10 max-w-[13ch] text-small font-bold uppercase leading-tight text-[#07234c]">
                      {ui.approachStages[index] ??
                        formatTranslation(locale, 'servicesUi.stageFallback', {
                          n: String(index + 1),
                        })}
                    </h3>
                    <p className="mt-5 max-w-[32ch] text-small leading-relaxed text-[#333333]">
                      {item}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className={`${SLUG_PAGE_SECTION_CLASS} py-20 md:py-28`}>
            <div className="mx-auto max-w-7xl">
              <Scale className="h-10 w-10 text-[#07234c]" strokeWidth={1.7} />
              <h2 className="mt-6 max-w-[18ch] font-serif text-h2 font-bold tracking-tight">
                {ui.problemsTitle}
              </h2>
              
              <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
                <div className="space-y-4">
                  <p className="max-w-[65ch] text-body text-[#333333]">
                    {ui.problemsIntro1}
                  </p>
                  <p className="max-w-[65ch] text-body text-[#333333]">
                    {ui.problemsIntro2}
                  </p>
                  <div className="pt-8">
                    <Link
                      href="/evalua-tu-caso"
                      className="rlu-button rlu-button-primary min-h-12 px-8 uppercase tracking-wide"
                    >
                      {landing.ctaLabel}
                    </Link>
                  </div>
                </div>
                
                <ul className="space-y-5 lg:pt-2">
                  {landing.problems.map((problem) => (
                    <li key={problem} className="flex items-start gap-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span className="text-body font-medium text-[#333333]">{problem.replace(/\.$/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className={SLUG_PAGE_SECTION_SHELL_CLASS}>
            <div className={`${SLUG_PAGE_SECTION_DIVIDER_CLASS} px-0 py-16 md:py-24 lg:px-0`}>
              <div className="mx-auto max-w-7xl px-5 md:px-12 lg:px-24">
                <span className="mb-4 block text-small font-bold uppercase tracking-widest text-brand">
                  {ui.guideEyebrow}
                </span>
                <h2 className="max-w-[18ch] font-serif text-h2 font-bold tracking-tight">
                  {seoCopy.intentTitle}
                </h2>
                <p className="mt-5 max-w-[65ch] text-body text-[#333333]">
                  {seoCopy.intentSummary}
                </p>

                <div className="mt-14 grid gap-10 md:grid-cols-3 lg:gap-16">
                  {guideColumns.map(({ point, title, Icon }) => (
                    <article key={point} className="max-w-[32ch]">
                      <Icon className="mb-5 h-8 w-8 text-[#07234c]" strokeWidth={1.7} />
                      <h3 className="text-small font-bold text-[#07234c]">
                        {title}
                      </h3>
                      <p className="mt-4 text-small leading-relaxed text-[#333333]">
                        {point}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${SLUG_PAGE_SECTION_DIVIDER_CLASS} px-5 py-20 md:px-12 md:py-28 lg:px-24`}>
              <div className="mx-auto max-w-7xl">
                <h2 className="max-w-[18ch] font-serif text-h2 font-bold tracking-tight">
                  {seoCopy.decisionTitle}
                </h2>
                <p className="mt-5 max-w-[70ch] text-body leading-relaxed text-[#333333]">
                  {seoCopy.decisionIntro}
                </p>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                  {seoCopy.decisionPoints.map((point, index) => (
                    <article
                      key={point}
                      className="border border-[#07234c]/5 bg-white p-7 shadow-[0_14px_36px_rgba(0,0,0,0.06)] md:p-8"
                    >
                      <h3 className="text-small font-bold text-[#07234c]">
                        {formatTranslation(locale, 'servicesUi.stepLabel', {
                          n: String(index + 1).padStart(2, '0'),
                        })}
                      </h3>
                      <p className="mt-4 max-w-[44ch] text-body leading-relaxed text-[#333333]">
                        {point}
                      </p>
                    </article>
                  ))}
                </div>

                <section className={`mt-16 ${SLUG_PAGE_SECTION_DIVIDER_CLASS} pt-12`}>
                  <h2 className="font-serif text-h3 tracking-tight text-[#07234c]">
                    {seoCopy.localTitle}
                  </h2>
                  <div className="mt-5 grid gap-6 md:grid-cols-2">
                    {seoCopy.localParagraphs.map((paragraph) => (
                      <p key={paragraph} className="max-w-[65ch] text-body leading-relaxed text-[#333333]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                    {seoCopy.relatedSearches.map((search) => (
                      <li
                        key={search}
                        className="flex items-center gap-2 text-small font-semibold text-[#555555]"
                      >
                        <CircleDot className="h-3 w-3 text-brand/60" />
                        {search}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className={`${SLUG_PAGE_SECTION_CLASS} py-16 md:py-24`}>
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 max-w-[65ch]">
                <span className="mb-4 block text-small font-bold uppercase tracking-widest text-brand">
                  {ui.includesTitle}
                </span>
                <h2 className="font-serif text-h2 font-bold tracking-tight">
                  {ui.includesHeading}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-7">
                {landing.includes.map((item, index) => {
                  const includeNumber = String(index + 1).padStart(2, '0');

                  return (
                    <article
                      key={item}
                      className="group flex flex-col md:rlu-card-base md:rlu-card-light md:min-h-[360px] md:p-2"
                    >
                      <div className="relative block aspect-square w-full overflow-hidden rounded-card bg-[#f2f2f2] md:aspect-[1.35] md:rounded-card">
                        <Image
                          src={resolveSiteAssetSrc(landing.image)}
                          alt={`${landing.title} - ${item}`}
                          fill
                          sizes="(min-width: 1024px) 23vw, (min-width: 768px) 48vw, 92vw"
                          className="object-cover grayscale-[15%] transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-white/35" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />

                        <div className="absolute right-4 top-4 md:hidden">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[0.875rem] font-semibold text-[#07234c] backdrop-blur-md">
                            {includeNumber}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col pt-3 md:px-5 md:pb-5 md:pt-7">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-[1rem] font-semibold tracking-tight text-[#0d3566] md:mb-4 md:text-h3 md:font-bold md:text-brand">
                            {item}
                          </h3>
                          <span className="flex shrink-0 items-center gap-1.5 text-[0.875rem] font-medium text-[#0d3566] md:hidden">
                            {includeNumber}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center md:mt-auto md:justify-between md:gap-4 md:pt-2">
                          <span className="hidden text-small text-[#07234c] md:block">
                            {ui.includePrefix} {includeNumber}
                          </span>
                          <CircleDot className="hidden h-4 w-4 text-brand md:block" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className={`${SLUG_PAGE_SECTION_CLASS} py-20 md:py-28`}>
            <div className="mx-auto max-w-7xl">
              <span className="mb-4 block text-small font-bold uppercase tracking-widest text-brand">
                {ui.faqTitle}
              </span>
              <h2 className="max-w-[14ch] font-serif text-h2 font-bold tracking-tight">
                {ui.beforeAdvancing}
              </h2>

              <div className="mt-10 max-w-4xl">
                <FaqAccordion items={landing.faqs} />
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className={`${SLUG_PAGE_SECTION_CLASS} py-16 md:py-24`}>
            <div className="mx-auto max-w-7xl">
              <div className="max-w-[760px]">
                <span className="mb-4 block text-small font-bold uppercase tracking-widest text-brand">
                  {ui.nextStep}
                </span>
                <h2 className="max-w-[18ch] font-serif text-h2 font-bold tracking-tight">
                  {landing.ctaTitle}
                </h2>
                <p className="mt-5 max-w-[65ch] text-body text-[#555555]">
                  {landing.ctaDescription}
                </p>
                <Link
                  href="/evalua-tu-caso"
                  className="rlu-button rlu-button-primary mt-8 min-h-12 w-full px-8 md:w-auto"
                >
                  {landing.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className={`${SLUG_PAGE_SECTION_CLASS} py-16 md:py-20`}>
            <div className="mx-auto max-w-7xl">
              <h2 className="font-serif text-h2 font-bold tracking-tight">
                {ui.otherServices}
              </h2>
              <p className="mt-3 max-w-[65ch] text-body text-[#555555]">
                {ui.relatedServicesIntro}
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedServices.map((service) => (
                  <article
                    key={service.slug}
                    className="rlu-card-base rlu-card-light p-3"
                  >
                    <div className="relative aspect-[1.55] overflow-hidden rounded-card bg-[#f2f2f2]">
                      <Image
                        src={resolveSiteAssetSrc(service.image)}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 30vw, 92vw"
                        className="object-cover grayscale-[15%]"
                      />
                      <div className="absolute inset-0 bg-white/35" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
                    </div>
                    <div className="p-5">
                      <span className="text-small font-bold uppercase tracking-widest text-brand">
                        {service.eyebrow}
                      </span>
                      <h3 className="mt-3 text-h3 text-[#07234c]">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-[65ch] text-body text-[#555555]">
                        {service.seoDescription}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
