import React from 'react';
import { HOME_SECTION_ANCHOR_CLASS, HOME_SECTION_TITLE_MUTED_CLASS, HOME_STEP_TITLE_CLASS } from '@/lib/layout';

const processSteps = [
  {
    title: 'Evaluación inicial',
    description: 'País competente, convenios aplicables y grado de urgencia.',
  },
  {
    title: 'Estrategia jurídica',
    description: 'Vía en Chile, en el extranjero o combinada según su caso.',
  },
  {
    title: 'Medidas cautelares',
    description: 'Alertas y protección cuando el tiempo es crítico.',
  },
  {
    title: 'Litigación coordinada',
    description: 'Tribunales chilenos, autoridades centrales y abogados internacionales.',
  },
  {
    title: 'Seguimiento',
    description: 'Acuerdos, cumplimiento y próximos pasos claros.',
  },
];

export default function GuideProcessSection() {
  return (
    <section
      id="metodologia"
      className={`w-full bg-[#f9f8f6] py-16 font-sans sm:py-24 ${HOME_SECTION_ANCHOR_CLASS}`}
      aria-labelledby="process-guide-title"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="fi-eyebrow mb-4 text-[var(--color-primary)]">Cómo trabajamos</p>
            <h2 id="process-guide-title" className={`max-w-[18ch] ${HOME_SECTION_TITLE_MUTED_CLASS}`}>
              Un camino claro cuando el derecho cruza fronteras
            </h2>
          </div>
          <div className="md:pt-2">
            <p className="max-w-lg text-base leading-relaxed text-[#555555] sm:text-lg">
              No prometemos atajos: traducimos su situación en opciones concretas, plazos realistas y el orden
              procesal que corresponde en derecho de familia internacional.
            </p>
          </div>
        </div>

        <div className="mt-14 w-full sm:mt-20">
          <div className="space-y-4 lg:hidden">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-card border border-[#07234c]/10 bg-white p-5 shadow-sm">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#07234c]">Paso 0{index + 1}</p>
                <h3 className={`mb-2 ${HOME_STEP_TITLE_CLASS}`}>{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#555555]">{step.description}</p>
              </article>
            ))}
          </div>

          <div className="hidden grid-cols-1 gap-10 sm:grid-cols-2 lg:grid lg:grid-cols-5 lg:gap-6">
            {processSteps.map((step, index) => {
              const isActive = index === 0;

              return (
                <div key={step.title} className="relative flex flex-col items-start pt-6">
                  <div
                    className={`absolute left-0 top-0 h-[2px] w-full ${isActive ? 'bg-[#07234c]' : 'bg-[#1a1a1a]/10'}`}
                  />
                  <div
                    className={`absolute left-0 top-[-4px] h-2.5 w-2.5 rounded-full ${isActive ? 'bg-[#07234c] shadow-[0_0_0_4px_rgba(7,35,76,0.15)]' : 'bg-[#1a1a1a]/20'}`}
                  />

                  <span
                    className={`mb-3 text-[10px] font-bold uppercase tracking-[0.2em] sm:mb-4 sm:text-xs ${isActive ? 'text-[#07234c]' : 'text-[#1a1a1a]/40'}`}
                  >
                    Paso 0{index + 1}
                  </span>
                  <h3 className={`mb-2 ${HOME_STEP_TITLE_CLASS} ${isActive ? '' : 'text-[#1a1a1a]/70'}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555555]">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
