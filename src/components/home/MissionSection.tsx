'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function MissionSection() {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';

  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 text-[#0f172a] md:px-12 md:py-32 lg:px-24">
      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 md:pb-12 border-b border-slate-100">
          <h2 className="text-2xl md:text-[1.8rem] font-medium tracking-tight text-[#0f172a]">
            {isSpanish ? 'Nuestra misión' : 'Our mission'}
          </h2>
          
          <button className="group flex items-center gap-3 mt-6 md:mt-0">
            <span className="bg-white border border-slate-200 text-[#0f172a] px-6 py-2.5 rounded-full font-bold text-[11px] tracking-widest uppercase transition-colors group-hover:bg-slate-50">
              {isSpanish ? 'LEER MÁS' : 'READ MORE'}
            </span>
            <span className="bg-white border border-slate-200 text-[#0f172a] p-2.5 rounded-full transition-colors group-hover:bg-slate-50 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </span>
          </button>
        </div>

        {/* Body Layout: Empty left, Text right */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:justify-end">
          <div className="w-full md:w-[70%] lg:w-[65%]">
            <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.4] md:leading-[1.5] font-medium tracking-tight">
              <span className="text-[#0f172a]">
                {isSpanish
                  ? 'Hacemos que la ley sea accesible, clara y efectiva. Ruiz Leiva Abogados ayuda a empresas e individuos a resolver problemas legales de manera rápida, transparente y eficiente, '
                  : 'We make law accessible, clear, and effective. Ruiz Leiva Abogados helps businesses and individuals resolve legal issues quickly, transparently, and efficiently, '}
              </span>
              <span className="text-slate-500">
                {isSpanish
                  ? 'utilizando tecnología, experiencia y un enfoque personalizado para proteger sus intereses y asegurar confianza en el futuro.'
                  : 'using technology, expertise, and a personalized approach to protect their interests and ensure confidence in the future.'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative overlapping circles at the bottom */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] pointer-events-none opacity-[0.08] flex justify-center items-end overflow-hidden z-0">
        <div className="w-[400px] h-[400px] rounded-full border-[1.5px] border-slate-800 absolute -bottom-[200px] -ml-[250px]" />
        <div className="w-[400px] h-[400px] rounded-full border-[1.5px] border-slate-800 absolute -bottom-[200px] ml-[250px]" />
      </div>
    </section>
  );
}
