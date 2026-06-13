'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { familyServices } from '@/config/family-services';

export default function ServicesHomePreview() {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';

  return (
    <section id="services" aria-labelledby="services-preview-title" className="bg-white px-5 py-16 md:px-12 md:py-24 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="fi-section-header flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="fi-eyebrow text-[var(--color-primary)]">
              {isSpanish ? 'Áreas de práctica' : 'Practice areas'}
            </p>
            <h2 id="services-preview-title" className="fi-section-heading text-[#0f172a]">
              {isSpanish ? '¿En qué podemos ayudarte?' : 'How can we help you?'}
            </h2>
            <p className="fi-section-intro">
              {isSpanish
                ? 'Especialización exclusiva en derecho de familia internacional. Selecciona el área más cercana a tu situación.'
                : 'Exclusive focus on international family law. Choose the area closest to your situation.'}
            </p>
          </div>

          <Link href="/servicios" className="fi-link-action shrink-0 text-[#07234c]">
            {isSpanish ? 'Ver todos los servicios' : 'View all services'}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {familyServices.map((service) => (
            <Link
              key={service.slug}
              href={`/servicios/${service.slug}`}
              className="group flex flex-col rounded-[1.25rem] border border-[#07234c]/8 bg-[#f8fafc] p-5 transition-colors hover:border-[#07234c]/20 hover:bg-white md:p-6"
            >
              <span className="fi-card-meta mb-3 text-[var(--color-primary)]">{service.num}</span>
              <h3 className="fi-card-title mb-2 text-[#0f172a]">
                {isSpanish ? service.title.es : service.title.en}
              </h3>
              <p className="fi-card-desc line-clamp-3 flex-1">{isSpanish ? service.desc.es : service.desc.en}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#07234c]">
                {isSpanish ? 'Conocer más' : 'Learn more'}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
