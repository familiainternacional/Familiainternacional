'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function MissionSection() {
  const { locale } = useI18n();
  const copy = siteConfig.copy.mission;

  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 text-[#0f172a] md:px-12 md:py-28 lg:px-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between border-b border-slate-100 pb-8 md:flex-row md:items-end md:pb-10">
          <div className="fi-section-header mb-0">
            <p className="fi-eyebrow text-[var(--color-primary)]">{locale === 'es' ? 'Propuesta' : 'Our approach'}</p>
            <h2 className="fi-section-heading text-[#0f172a]">{copy.title[locale]}</h2>
          </div>

          <Link href="/nosotros" className="group mt-6 flex items-center gap-3 md:mt-0">
            <span className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-[#0f172a] transition-colors group-hover:bg-slate-50">
              {locale === 'es' ? 'Conocer más' : 'Learn more'}
            </span>
            <span className="flex items-center justify-center rounded-full border border-slate-200 bg-white p-2.5 text-[#0f172a] transition-colors group-hover:bg-slate-50">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </span>
          </Link>
        </div>

        <div className="mt-10 flex flex-col md:mt-14 md:flex-row md:justify-end">
          <div className="fi-prose w-full md:w-[72%] lg:w-[65%]">
            <p className="fi-section-lead leading-relaxed">
              {copy.lead[locale]}
              <span className="text-slate-600">{copy.supporting[locale]}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-32 left-1/2 z-0 flex h-[300px] w-full max-w-5xl -translate-x-1/2 items-end justify-center overflow-hidden opacity-[0.08]">
        <div className="absolute -bottom-[200px] -ml-[250px] h-[400px] w-[400px] rounded-full border-[1.5px] border-slate-800" />
        <div className="absolute -bottom-[200px] ml-[250px] h-[400px] w-[400px] rounded-full border-[1.5px] border-slate-800" />
      </div>
    </section>
  );
}
