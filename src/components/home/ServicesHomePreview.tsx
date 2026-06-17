'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { getFamilyServices } from '@/config/family-services';
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
  const { locale, t, dictionary } = useI18n();
  const services = dictionary.home.services;
  const familyServices = getFamilyServices(locale);

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
            <p className="fi-eyebrow text-[var(--color-primary)]">{services.eyebrow}</p>
            <h2 id="services-preview-title" className={`mb-4 ${HOME_SECTION_TITLE_MUTED_CLASS}`}>
              {services.title}
            </h2>
            <p className="fi-section-intro">{services.intro}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-[15px]">{services.languageNote}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {familyServices.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col rounded-card border border-white/40 bg-white/60 p-8 sm:p-10"
            >
              <div className="mb-4 flex items-baseline gap-3 sm:gap-4">
                <span
                  className="shrink-0 text-[clamp(2rem,4.5vw,2.75rem)] font-light leading-none tracking-[-0.04em] text-[#07234c] tabular-nums"
                  aria-hidden
                >
                  {service.num}
                </span>
                <h3 className={HOME_CARD_TITLE_CLASS}>{service.title}</h3>
              </div>

              <p className="mb-6 flex-1 text-sm leading-relaxed text-[#555555] sm:text-base">{service.intro}</p>

              <div className="mb-8 space-y-2">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#07234c]">
                  {t('common.includes')}
                </h4>
                <ul className="space-y-2">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#1a1a1a]">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#07234c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={localizedHref(`/servicios/${service.slug}`, locale)}
                className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#07234c] transition-colors hover:text-[#051830]"
              >
                {t('common.viewDetails')}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
