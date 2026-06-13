'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const AUTOPLAY_MS = 4500;

const steps = [
  {
    id: 1,
    title: 'Consulta inicial',
    description:
      'Entendemos su problema, evaluamos la viabilidad y determinamos si somos el equipo adecuado para su caso.',
    image: '/hero-familia.png',
    alt: 'Consulta inicial con el equipo de Familia Internacional',
  },
  {
    id: 2,
    title: 'Diagnóstico estratégico',
    description:
      'Realizamos un análisis jurídico profundo para mapear riesgos, escenarios y opciones legales reales.',
    image: '/hero-defensa.png',
    alt: 'Análisis jurídico y diagnóstico estratégico del caso',
  },
  {
    id: 3,
    title: 'Propuesta clara',
    description:
      'Presentamos una estrategia con objetivos definidos, plazos estimados y estructura de honorarios transparente.',
    image: '/hero-santiago.png',
    alt: 'Propuesta legal clara con objetivos y plazos definidos',
  },
  {
    id: 4,
    title: 'Ejecución y rigor',
    description:
      'Implementamos la estrategia con determinación, manteniéndole informado en cada avance del proceso.',
    image: '/hero-defensa.png',
    alt: 'Ejecución rigurosa del caso con seguimiento continuo',
  },
] as const;

export default function HowWeWorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const goToStep = useCallback((index: number) => {
    const nextIndex = (index + steps.length) % steps.length;
    setActiveIndex(nextIndex);

    const card = cardsRef.current?.children[nextIndex];
    if (card instanceof HTMLElement) {
      card.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % steps.length;
        const card = cardsRef.current?.children[next];
        if (card instanceof HTMLElement) {
          card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        return next;
      });
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  return (
    <section
      id="metodologia"
      aria-labelledby="metodologia-title"
      className="w-full bg-white px-5 py-20 text-[#0f172a] md:px-12 md:py-32 lg:px-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 id="metodologia-title" className="text-2xl font-medium tracking-tight text-[#0f172a] md:text-[2rem]">
            Metodología.
          </h2>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          {/* Carrusel automático de imágenes */}
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#f8fafc] sm:aspect-[5/4] lg:sticky lg:top-28 lg:aspect-auto lg:min-h-[520px]"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[activeIndex].id}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={resolveSiteAssetSrc(steps[activeIndex].image)}
                  alt={steps[activeIndex].alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                  priority={activeIndex === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07234c]/55 via-[#07234c]/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <p className="max-w-[18ch] text-lg font-light leading-tight text-white md:text-2xl">
                {steps[activeIndex].title}
              </p>
              <div className="flex shrink-0 items-center gap-2" aria-hidden="true">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => goToStep(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/45 hover:bg-white/70'
                    }`}
                    aria-label={`Ver paso ${index + 1}: ${step.title}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tarjetas de pasos sincronizadas con el carrusel */}
          <div
            ref={cardsRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {steps.map((step, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goToStep(index)}
                  className={`group relative flex w-[280px] shrink-0 snap-center flex-col justify-end rounded-[2rem] p-6 text-left transition-all duration-500 ease-out sm:w-[320px] lg:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#185365] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-[#185365] shadow-xl lg:min-h-[118px] lg:py-7'
                      : 'bg-[#f8fafc] hover:bg-[#f1f5f9] lg:min-h-[118px] lg:py-7'
                  }`}
                >
                  <span
                    className={`mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? 'text-white/60' : 'text-slate-400'
                    }`}
                  >
                    Paso {String(step.id).padStart(2, '0')}
                  </span>
                  <h3
                    className={`mb-3 text-xl font-light leading-[1.15] tracking-tight transition-colors duration-500 lg:text-[1.75rem] ${
                      isActive ? 'text-white' : 'text-[#0f172a]'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-[14px] leading-relaxed transition-colors duration-500 lg:text-[15px] ${
                      isActive ? 'text-white/80' : 'text-slate-500'
                    }`}
                  >
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
