'use client';

import { useState } from 'react';
import EvaluaTuCasoForm from '@/components/forms/EvaluaTuCasoForm';
import BookCallButton from '@/components/home/BookCallButton';
import SectionBackgroundImage from '@/components/ui/SectionBackgroundImage';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { PRIMARY_BUTTON_XL_CLASS, SITE_CONTAINER_CLASS } from '@/lib/layout';

const HERO_BG_SRC = resolveSiteAssetSrc('/hero-bg.webp');

export default function ReplicaHero() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative w-full pb-10 pt-[140px] sm:pt-[140px] lg:pt-[160px] xl:pb-12 xl:pt-[180px]">
      <SectionBackgroundImage src={HERO_BG_SRC} priority className="-z-20" />
      <div className="absolute inset-0 -z-10 bg-[#07234c]/30" />
      <div className={`relative z-10 ${SITE_CONTAINER_CLASS}`}>
        <div
          id="home"
          className={`relative w-full overflow-hidden rounded-card border border-white/50 bg-white/90 shadow-[0_30px_80px_rgba(0,0,0,0.2)] scroll-mt-[9.5rem] sm:scroll-mt-[10rem] lg:scroll-mt-[9rem] transition-all duration-700 ease-in-out`}
        >
          <div className={`grid transition-all duration-700 lg:min-h-[580px] xl:min-h-[620px] ${showForm ? 'lg:grid-cols-2 lg:items-stretch' : 'grid-cols-1 items-center'}`}>
            <div className={`flex h-full min-h-0 flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 transition-all duration-700 ${showForm ? 'lg:justify-between lg:px-10 lg:py-12 xl:px-14 xl:py-12 2xl:px-16' : 'items-center text-center max-w-5xl mx-auto py-12 lg:py-24'}`}>
              <div className={`space-y-3 sm:space-y-4 lg:space-y-5 flex flex-col items-center transition-all duration-500 ${showForm ? 'lg:items-start text-center lg:text-left' : 'text-center'}`}>
                <p className="hidden text-xs font-bold uppercase tracking-[0.18em] text-[#6b7280] sm:text-[13px] lg:block">
                  Derecho Internacional de Familia · Chile
                </p>

                <h1 className={`font-extrabold tracking-tight text-[#111827] transition-all duration-500 ${showForm ? 'text-[1.65rem] leading-[1.15] sm:text-4xl lg:text-5xl xl:leading-tight' : 'text-3xl leading-tight sm:text-4xl lg:text-5xl xl:text-6xl xl:leading-[1.15]'}`}>
                  Somos el primer y único Estudio Jurídico en Chile dedicado exclusivamente al Derecho Internacional de Familia
                </h1>

                <p className="sr-only">
                  Familia Internacional — estudio jurídico en Chile especializado en Derecho Internacional de Familia:
                  divorcios internacionales, sustracción de menores, exequátur y custodia transfronteriza.
                </p>

                <p className={`font-medium leading-relaxed text-[#4b5563] transition-all duration-500 ${showForm ? 'max-w-2xl text-sm sm:text-base lg:max-w-none lg:text-[1.0625rem] lg:leading-7 xl:max-w-xl' : 'max-w-3xl text-base sm:text-lg lg:text-xl'}`}>
                  Si su caso cruza países, le ayudamos a entender qué conviene, dónde actuar y cuál es el primer paso
                  procesal — con abogados especializados en convenios internacionales y tribunales chilenos.
                </p>
              </div>

              <div className={`mt-8 w-full sm:mt-10 lg:mb-8 lg:mt-10 flex flex-row gap-2 sm:gap-4 items-stretch ${showForm ? 'justify-center lg:justify-start' : 'justify-center'}`}>
                <BookCallButton
                  text="Agendar Videollamada"
                  className={`${PRIMARY_BUTTON_XL_CLASS} flex-1 sm:flex-none sm:!w-[280px] !rounded-full !px-1 sm:!px-6 !text-[12px] sm:!text-base leading-tight [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-5 sm:[&_svg]:w-5`}
                />
                
                <button
                  type="button"
                  onClick={() => setShowForm(!showForm)}
                  className={`${PRIMARY_BUTTON_XL_CLASS} flex-1 sm:flex-none sm:!w-[280px] !rounded-full !px-1 sm:!px-6 !text-[12px] sm:!text-base leading-tight bg-transparent border-2 border-[#07234c] text-[#07234c] hover:bg-[#07234c] hover:text-white transition-colors`}
                >
                  {showForm ? 'Ocultar Formulario' : 'Desplegar Formulario'}
                </button>
              </div>
            </div>

            <div className={`flex-col px-5 pb-8 lg:h-full lg:min-h-0 lg:px-10 lg:py-12 xl:px-14 xl:py-12 2xl:px-16 ${showForm ? 'flex animate-in fade-in slide-in-from-right-8 duration-700' : 'hidden'}`}>
              <EvaluaTuCasoForm variant="light" fillHeight lazyRecaptcha={!showForm} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
