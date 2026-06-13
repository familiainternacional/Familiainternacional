'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

const faqItems = [
  {
    question: '¿A quiénes está dirigida nuestra asesoría?',
    answer: 'Ruiz Leiva Abogados es un estudio jurídico ubicado en Las Condes, Santiago, orientado a empresas, empresarios y personas que enfrentan conflictos civiles, comerciales, regulatorios o corporativos de alta relevancia.'
  },
  {
    question: '¿Cómo abordamos cada caso legal?',
    answer: 'Nuestro trabajo combina análisis legal técnico con criterio estratégico. No entregamos respuestas aisladas: ordenamos escenarios, riesgos, costos y próximos pasos para que cada cliente pueda decidir con información real.'
  },
  {
    question: '¿Cuál es nuestra propuesta de valor?',
    answer: 'La propuesta de Ruiz Leiva Abogados se enfoca en prevención, negociación y litigación estratégica, con una mirada especialmente útil para quienes necesitan más que representación jurídica: necesitan un socio que entienda el negocio.'
  },
  {
    question: '¿Qué áreas de práctica cubrimos?',
    answer: 'Nuestra experiencia abarca litigación civil, derecho corporativo, derecho administrativo, compliance y negociación, brindando asesoría jurídica para empresas y personas que necesitan decisiones claras y resultados.'
  }
];

export default function SeoTextSection() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const { locale } = useI18n();
  const isSpanish = locale === 'es';

  return (
    <section
      aria-labelledby="faq-title"
      className="bg-white px-5 py-20 text-[#0f172a] md:px-12 md:py-32 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 md:pb-12 border-b border-slate-100">
          <h2 id="faq-title" className="text-2xl md:text-[2rem] font-medium tracking-tight text-[#0f172a]">
            {isSpanish ? 'Preguntas frecuentes' : 'Frequently asked questions'}
          </h2>
          
          <button className="group flex items-center gap-3 mt-6 md:mt-0">
            <span className="bg-white border border-slate-200 text-[#0f172a] px-6 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase transition-colors group-hover:bg-slate-50">
              {isSpanish ? 'CENTRO DE AYUDA' : 'HELP CENTRE'}
            </span>
            <span className="bg-white border border-slate-200 text-[#0f172a] p-2.5 rounded-full transition-colors group-hover:bg-slate-50 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </span>
          </button>
        </div>

        {/* Body Layout: Empty left, Accordion right */}
        <div className="mt-12 flex flex-col md:flex-row md:justify-end">
          <div className="w-full md:w-[65%] lg:w-[55%]">
            
            <div className="flex flex-col gap-3">
              {faqItems.map((item, idx) => {
                const isExpanded = expanded === idx;
                return (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-[1.5rem] transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? 'bg-[#111827] text-white shadow-lg'
                        : 'bg-[#f8fafc] text-[#0f172a] hover:bg-[#f1f5f9]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? null : idx)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6 text-left"
                    >
                      <h3
                        className={`text-[15px] md:text-[16px] font-medium leading-snug transition-colors duration-300 ${
                          isExpanded ? 'text-white' : 'text-[#0f172a]'
                        }`}
                      >
                        {item.question}
                      </h3>
                      
                      <div className="shrink-0 flex items-center justify-center">
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
                        <p className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-[14px] md:text-[15px] leading-[1.6] text-white/70 max-w-2xl">
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
