'use client';

import { useState } from 'react';
import EvaluaTuCasoForm from '@/components/forms/EvaluaTuCasoForm';
import BookCallButton from '@/components/home/BookCallButton';
import { PRIMARY_BUTTON_XL_CLASS, SITE_CONTAINER_CLASS, HOME_SECTION_ANCHOR_CLASS } from '@/lib/layout';

export default function ReplicaHero() {
  const [showMobileForm, setShowMobileForm] = useState(false);

  return (
    <section 
      className="relative w-full pb-10 pt-[84px] sm:pt-[100px] xl:pb-12 xl:pt-[104px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/hero-bg.png)' }}
    >
      <div className="absolute inset-0 bg-[#07234c]/30 backdrop-blur-[2px]"></div>
      <div className={`relative z-10 ${SITE_CONTAINER_CLASS}`}>
        <div
          id="home"
          className={`relative w-full overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/85 backdrop-blur-lg shadow-[0_30px_80px_rgba(0,0,0,0.2)] sm:rounded-[2rem] xl:rounded-[2.25rem] ${HOME_SECTION_ANCHOR_CLASS}`}
        >
          <div className="grid min-h-[500px] lg:min-h-[580px] lg:grid-cols-2 lg:items-stretch xl:min-h-[620px]">
            <div className="flex h-full min-h-0 flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:justify-between lg:px-10 lg:py-12 xl:px-14 xl:py-12 2xl:px-16">
              <div className="space-y-4 lg:space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b7280] sm:text-[13px]">
                  Derecho Internacional de Familia · Chile
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-[#111827] xl:leading-tight">
                  Somos el primer y único Estudio Jurídico en Chile dedicado exclusivamente al Derecho Internacional de Familia
                </h1>

                <p className="sr-only">
                  Familia Internacional — estudio jurídico en Chile especializado en Derecho Internacional de Familia:
                  divorcios internacionales, sustracción de menores, exequátur y custodia transfronteriza.
                </p>

                <p className="max-w-2xl text-[0.9375rem] font-medium leading-relaxed text-[#4b5563] sm:text-base lg:max-w-none lg:text-[1.0625rem] lg:leading-7 xl:max-w-xl">
                  Si su caso cruza países, le ayudamos a entender qué conviene, dónde actuar y cuál es el primer paso
                  procesal — con abogados especializados en convenios internacionales y tribunales chilenos.
                </p>
              </div>

              <div className="mt-8 w-full sm:mt-10 lg:mb-8 lg:mt-0 flex flex-col gap-4 items-center lg:items-start">
                <BookCallButton
                  text="Agendar Videollamada"
                  className={`${PRIMARY_BUTTON_XL_CLASS} w-full sm:w-auto [&_svg]:h-5 [&_svg]:w-5`}
                />
                
                <button
                  type="button"
                  onClick={() => setShowMobileForm(!showMobileForm)}
                  className={`${PRIMARY_BUTTON_XL_CLASS} w-full sm:w-auto lg:hidden bg-transparent border-2 border-[#07234c] text-[#07234c] hover:bg-[#07234c] hover:text-white transition-colors`}
                >
                  {showMobileForm ? 'Ocultar Formulario' : 'Formulario de Contacto'}
                </button>
              </div>
            </div>

            <div className={`flex flex-col lg:h-full lg:min-h-0 px-5 pb-8 lg:px-10 lg:py-12 xl:px-14 xl:py-12 2xl:px-16 ${showMobileForm ? 'flex' : 'hidden lg:flex'}`}>
              <EvaluaTuCasoForm variant="light" fillHeight />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
