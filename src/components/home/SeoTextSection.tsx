'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { homeFaqItems } from '@/config/home-faq';

export default function SeoTextSection({ showPageHeader = true }: { showPageHeader?: boolean }) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const { locale } = useI18n();
  const isSpanish = locale === 'es';
  const faqItems = homeFaqItems[locale];

  return (
    <section
      aria-labelledby="faq-title"
      className="bg-white px-5 py-20 text-[#0f172a] md:px-12 md:py-32 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {showPageHeader ? (
          <div className="flex flex-col justify-between border-b border-slate-100 pb-8 md:flex-row md:items-center md:pb-12">
            <div>
              <p className="fi-eyebrow text-[var(--color-primary)]">
                {isSpanish ? 'Consultas frecuentes' : 'Common questions'}
              </p>
              <h2 id="faq-title" className="fi-section-heading text-[#0f172a]">
                {isSpanish ? 'Preguntas frecuentes' : 'Frequently asked questions'}
              </h2>
            </div>

            <Link href="/evalua-tu-caso" className="group mt-6 flex items-center gap-3 md:mt-0">
              <span className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#0f172a] transition-colors group-hover:bg-slate-50">
                {isSpanish ? 'EVALÚA TU CASO' : 'EVALUATE YOUR CASE'}
              </span>
              <span className="flex items-center justify-center rounded-full border border-slate-200 bg-white p-2.5 text-[#0f172a] transition-colors group-hover:bg-slate-50">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        ) : null}

        <div className={`flex flex-col md:flex-row md:justify-end ${showPageHeader ? 'mt-12' : ''}`}>
          <div className="w-full md:w-[65%] lg:w-[55%]">
            <div className="flex flex-col gap-3">
              {faqItems.map((item, idx) => {
                const isExpanded = expanded === idx;
                return (
                  <div
                    key={item.question}
                    className={`overflow-hidden rounded-card transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? 'bg-[#111827] text-white shadow-lg'
                        : 'bg-[#f8fafc] text-[#0f172a] hover:bg-[#f1f5f9]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? null : idx)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
                    >
                      <h3
                        className={`fi-card-title transition-colors duration-300 ${
                          isExpanded ? 'text-white' : 'text-[#0f172a]'
                        }`}
                      >
                        {item.question}
                      </h3>

                      <div className="flex shrink-0 items-center justify-center">
                        {isExpanded ? (
                          <Minus className="h-5 w-5 text-white/70" strokeWidth={2} />
                        ) : (
                          <Plus className="h-5 w-5 text-[#64748b]" strokeWidth={2} />
                        )}
                      </div>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="fi-card-desc max-w-2xl px-6 pb-6 pt-0 text-white/78 md:px-8 md:pb-8">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
