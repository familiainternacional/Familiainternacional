'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function CtaSection() {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';

  return (
    <section className="w-full bg-white py-16 font-sans sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex w-full flex-col items-center justify-between gap-12 overflow-hidden rounded-[1.75rem] bg-[#07234c] px-5 py-14 shadow-2xl sm:rounded-[2rem] sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:px-10 lg:py-20 xl:rounded-[2.25rem] xl:px-14 xl:py-24">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Content */}
          <div className="relative z-10 flex-1 max-w-2xl text-center lg:text-left">
            <h2 className="mb-6 text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
              {isSpanish ? '¿Necesitas asesoría legal experta?' : 'Need expert legal guidance?'}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0 xl:max-w-2xl">
              {isSpanish
                ? 'Asesoría en derecho de familia nacional e internacional. Agenda tu hora online con nuestros abogados y protege lo que más importa.'
                : 'National and international family law advice. Book your online consultation with our lawyers and protect what matters most.'}
            </p>
            
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="h-[1px] w-8 sm:w-12 bg-white/20"></div>
              <p className="text-white/60 text-xs sm:text-sm">
                {isSpanish ? 'Consultados por ' : 'Featured in '}
                <Link href="/prensa" className="text-white font-medium hover:text-white/80 transition-colors underline underline-offset-4 decoration-white/30">
                  Las Últimas Noticias
                </Link>
                {isSpanish ? ' en casos de sustracción internacional.' : ' on international child abduction cases.'}
              </p>
            </div>
          </div>

          {/* Right Action */}
          <div className="relative z-10 flex-shrink-0">
            <Link
              href="/evalua-tu-caso"
              className="inline-flex min-h-[56px] items-center justify-center whitespace-nowrap rounded-full bg-white px-8 text-base font-bold text-[#07234c] shadow-xl shadow-[#07234c]/20 transition-all hover:scale-[1.02] hover:bg-white/95 sm:px-10 sm:text-lg"
            >
              {isSpanish ? 'Evaluar mi caso' : 'Evaluate my case'}
              <ArrowUpRight className="ml-2 h-5 w-5" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
