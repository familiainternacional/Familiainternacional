'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { primaryContact } from '@/config/contact';

export default function ContactHomeTeaser() {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';

  return (
    <section id="contact" aria-labelledby="contact-teaser-title" className="border-t border-[#07234c]/5 bg-[#f8fafc] px-5 py-16 md:px-12 md:py-20 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="fi-eyebrow text-[var(--color-primary)]">{isSpanish ? 'Contacto' : 'Contact'}</p>
          <h2 id="contact-teaser-title" className="fi-section-heading text-[#07234c]">
            {isSpanish ? 'Hablemos de tu caso' : 'Let us discuss your case'}
          </h2>
          <p className="fi-section-intro">
            {isSpanish
              ? 'Agenda una evaluación o escríbenos. Respondemos con la mayor brevedad posible.'
              : 'Book an evaluation or write to us. We respond as promptly as possible.'}
          </p>

          <ul className="mt-6 space-y-3 text-body text-[#555555]">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden />
              <span>Lo Barnechea, Santiago</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden />
              <a href={primaryContact.phoneHref} className="font-semibold text-[#07234c] hover:underline">
                {primaryContact.displayPhone}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Link
            href="/evalua-tu-caso"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#07234c] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[#0d3566]"
          >
            {isSpanish ? 'Evaluar mi caso' : 'Evaluate my case'}
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#07234c]/15 bg-white px-7 py-4 text-base font-bold text-[#07234c] transition-colors hover:bg-[#07234c] hover:text-white"
          >
            {isSpanish ? 'Contacto completo' : 'Full contact'}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
