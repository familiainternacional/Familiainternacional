'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { familyServices } from '@/config/family-services';
import {
  HOME_CARD_TITLE_CLASS,
  HOME_SECTION_ANCHOR_CLASS,
  HOME_SECTION_TITLE_MUTED_CLASS,
} from '@/lib/layout';
import SectionBackgroundImage from '@/components/ui/SectionBackgroundImage';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { localizedHref } from '@/lib/i18n/localized-href';
const SERVICES_BG_SRC = resolveSiteAssetSrc('/internacionales-bg.webp');

export default function ServicesHomePreview() {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';

  return (
    <section
      id="services"
      aria-labelledby="services-preview-title"
      className={`relative w-full py-16 font-sans sm:py-24 ${HOME_SECTION_ANCHOR_CLASS}`}
    >
      <SectionBackgroundImage src={SERVICES_BG_SRC} className="-z-20" />
      <div className="absolute inset-0 -z-10 bg-white/85" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fi-section-header">
            <div className="max-w-xl">
              <p className="fi-eyebrow text-[var(--color-primary)]">
                {isSpanish ? 'Áreas de práctica' : 'Practice areas'}
              </p>
              <h2 id="services-preview-title" className={`mb-4 ${HOME_SECTION_TITLE_MUTED_CLASS}`}>
                {isSpanish ? '¿En qué podemos ayudarte?' : 'How can we help you?'}
              </h2>
              <p className="fi-section-intro">
                {isSpanish
                  ? 'Especialización exclusiva en derecho de familia internacional. Selecciona el área más cercana a tu situación.'
                  : 'Exclusive focus on international family law. Choose the area closest to your situation.'}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
            {familyServices.map((service) => (
              <Link
                key={service.slug}
                href={localizedHref(`/servicios/${service.slug}`, locale)}
                className="group flex flex-col rounded-card border border-white/40 bg-white/60 p-8 transition-all hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl sm:p-10"
              >
                <div className="mb-4 flex items-baseline gap-3 sm:gap-4">
                  <span
                    className="shrink-0 text-[clamp(2rem,4.5vw,2.75rem)] font-light leading-none tracking-[-0.04em] text-[#07234c] tabular-nums"
                    aria-hidden
                  >
                    {service.num}
                  </span>
                  <h3 className={HOME_CARD_TITLE_CLASS}>
                    {isSpanish ? service.title.es : service.title.en}
                  </h3>
                </div>
                
                <p className="text-[#555555] mb-6 leading-relaxed flex-1 text-sm sm:text-base">
                  {isSpanish ? service.intro.es : service.intro.en}
                </p>

                <div className="mb-8 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#07234c] mb-3">
                    {isSpanish ? 'Incluye:' : 'Includes:'}
                  </h4>
                  <ul className="space-y-2">
                    {(isSpanish ? service.includes.es : service.includes.en).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#1a1a1a]">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#07234c]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#07234c] transition-colors group-hover:text-[#051830]">
                  {isSpanish ? 'Ver servicio' : 'View service'}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
      </div>
    </section>
  );
}
