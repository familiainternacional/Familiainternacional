'use client';

import Image from 'next/image';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function WhyChooseUsSection() {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';

  return (
    <section className="bg-[#07234c] px-5 py-16 text-white md:px-12 md:py-28 lg:px-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-10 flex max-w-[65ch] flex-col items-start text-left md:mb-16">
          <h2 className="mb-6 font-serif text-h2 tracking-tight text-white">
            {isSpanish ? 'Por qué elegir Familia Internacional' : 'Why choose Familia Internacional'}
          </h2>
          <p className="text-body text-gray-400">
            {isSpanish
              ? 'Somos el único estudio en Chile dedicado exclusivamente al Derecho Internacional de Familia, con cientos de juicios tramitados y una red internacional de abogados.'
              : 'We are the only firm in Chile dedicated exclusively to International Family Law, with hundreds of successfully handled cases and an international attorney network.'}
          </p>
        </div>

        {/* Editorial Grid (Matching Reference Photo EXACTLY) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
          
          {/* Card 1: Tall Left */}
          <div className="flex flex-col overflow-hidden rounded-card bg-[#051830] p-5 rounded-card md:p-6 lg:col-span-1 lg:row-span-2 lg:p-8">
            {/* Inner box simulating light box from photo */}
            <div className="relative mb-6 flex h-[220px] w-full items-center justify-center overflow-hidden rounded-card bg-[#051830] md:mb-8 md:h-[350px] lg:h-[400px]">
              <div className="relative h-full w-full">
                <Image
                  src={resolveSiteAssetSrc('/bento_strategy.png')}
                  alt="Estrategia legal"
                  fill
                  className="object-contain mix-blend-screen opacity-90 p-4"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <h3 className="mb-7 text-h3 leading-snug tracking-tight md:mb-8">
                <span className="mb-2 block font-bold text-white">{isSpanish ? 'Experiencia comprobada.' : 'Proven experience.'}</span>
                <span className="text-body font-normal text-gray-400">
                  {isSpanish ? 'Cientos de juicios en familia internacional, Convenio de La Haya y coordinación con autoridades centrales.' : 'Hundreds of international family law cases, Hague Convention work, and coordination with central authorities.'}
                </span>
              </h3>
              <Link
                href="/equipo/jaime-soto-silva"
                className="mt-auto inline-flex w-full items-center justify-between gap-3 rounded-full bg-[var(--color-primary)] py-2 pl-5 pr-2 text-small font-bold text-white transition-transform hover:scale-105 sm:w-fit sm:justify-center sm:pl-6"
              >
                {isSpanish ? 'Conoce al Equipo' : 'Meet the Team'}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--color-primary)]">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>

          {/* Card 2: Top Middle */}
          <div className="flex flex-col overflow-hidden rounded-card bg-[#051830] rounded-card lg:col-span-1 lg:row-span-1">
            <div className="relative h-[55%] min-h-[160px] w-full">
              <Image
                src={resolveSiteAssetSrc('/handshake_distinct_execs.png')}
                alt="Confianza corporativa"
                fill
                className="object-cover object-top opacity-60 grayscale saturate-0 brightness-[0.42] contrast-125"
                style={{ filter: 'grayscale(1) saturate(0) brightness(0.42) contrast(1.25)' }}
              />
              <div className="absolute inset-0 bg-[#07234c]/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051830]/75 via-[#051830]/25 to-[#051830]/35" />
            </div>
            <div className="flex flex-col justify-center p-6 lg:p-8 flex-grow">
              <h3 className="text-h3 leading-snug tracking-tight">
                <span className="font-bold text-white block mb-1">{isSpanish ? 'Confidencialidad y cercanía.' : 'Confidentiality and care.'}</span>
                <span className="text-body font-normal text-gray-400">
                  {isSpanish ? 'Acompañamos a familias en momentos sensibles con claridad, contención y estrategia jurídica especializada.' : 'We guide families through sensitive moments with clarity, support, and specialized legal strategy.'}
                </span>
              </h3>
            </div>
          </div>

          {/* Card 3: Top Right */}
          <div className="relative flex min-h-[240px] items-center overflow-hidden rounded-card bg-[#051830] p-5 rounded-card md:p-6 lg:col-span-1 lg:row-span-1 lg:p-8">
            <div className="relative z-10 w-[68%] sm:w-[60%]">
              <h3 className="mb-2 font-serif text-h2 font-bold leading-tight tracking-tight text-white">
                {isSpanish ? 'Precisión' : 'Precision'}
              </h3>
              <p className="mb-2 text-h3 font-bold text-[var(--color-primary)]">{isSpanish ? 'especializados.' : 'specialists.'}</p>
              <p className="text-xs leading-snug text-gray-500">
                {isSpanish ? 'Enfoque exclusivo en familia internacional, sin diluir la práctica en otras áreas.' : 'Exclusive focus on international family law, without diluting the practice across other areas.'}
              </p>
            </div>
            {/* Isolated floating object on the right */}
            <div className="absolute bottom-0 right-0 top-0 w-[48%] sm:w-[55%]">
              <Image
                src={resolveSiteAssetSrc('/bento_precision.png')}
                alt="Precisión y velocidad"
                fill
                className="object-contain object-right mix-blend-screen opacity-90 scale-110 translate-x-4"
              />
            </div>
          </div>

          {/* Card 4: Bottom Right (Wide) */}
          <div className="relative flex flex-col overflow-hidden rounded-card bg-[#051830] md:flex-row rounded-card lg:col-span-2 lg:row-span-1">
            <div className="z-10 flex flex-col justify-center p-6 md:w-[65%] lg:p-10">
              <h3 className="max-w-[40ch] text-h3 leading-snug tracking-tight">
                <span className="font-bold text-white block mb-2">{isSpanish ? 'Comunicación clara.' : 'Clear communication.'}</span>
                <span className="text-body font-normal text-gray-400">
                  {isSpanish
                    ? 'Traducimos escenarios jurídicos complejos a alternativas claras.'
                    : 'We translate complex legal scenarios into clear options.'}
                </span>
              </h3>
            </div>
            
            {/* Right side isolated portrait */}
            <div className="relative h-52 md:absolute md:bottom-0 md:right-0 md:top-0 md:h-auto md:w-[45%]">
               <Image
                 src={resolveSiteAssetSrc('/bento_communication.png')}
                 alt="Comunicación clara"
                 fill
                 className="object-contain object-bottom mix-blend-screen opacity-70 translate-x-4 translate-y-4"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[#051830] via-[#051830]/80 to-transparent hidden md:block w-1/3"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
