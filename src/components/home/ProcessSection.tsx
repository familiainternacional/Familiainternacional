'use client';

import React from 'react';
import Image from 'next/image';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function ProcessSection() {
  const { t, locale } = useI18n();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const featuresEs = [
    {
      title: 'Velocidad y precisión',
      desc: 'Diagnóstico jurídico rápido. Sin demoras innecesarias. Sabemos que el tiempo tiene valor en los negocios.',
      image: '/bento_precision.png',
    },
    {
      title: 'Estrategia, no solo ley',
      desc: 'Analizamos incentivos, riesgos y escenarios. Le decimos qué conviene, cuándo conviene y cómo ejecutarlo.',
      image: '/bento_strategy.png',
    },
    {
      title: 'Público + Privado',
      desc: 'Experiencia real en ambos mundos. Entendemos la lógica del Estado y la del mercado simultáneamente.',
      image: '/bento_handshake_bw.png',
    },
    {
      title: 'Comunicación clara',
      desc: 'Traducimos el lenguaje jurídico a términos entendibles. Usted toma decisiones con información real.',
      image: '/bento_communication.png',
    },
  ];

  const featuresEn = [
    {
      title: 'Speed and precision',
      desc: 'Rapid legal diagnosis. No unnecessary delays. We know time has value in business.',
      image: '/bento_precision.png',
    },
    {
      title: 'Strategy, not just law',
      desc: 'We analyze incentives, risks, and scenarios. We tell you what to do, when to do it, and how to execute.',
      image: '/bento_strategy.png',
    },
    {
      title: 'Public + Private',
      desc: 'Real experience in both worlds. We understand the logic of the State and the market simultaneously.',
      image: '/bento_handshake_bw.png',
    },
    {
      title: 'Clear communication',
      desc: 'We translate legal language into understandable terms. You make decisions with real information.',
      image: '/bento_communication.png',
    },
  ];

  const features = locale === 'es' ? featuresEs : featuresEn;
  const scrollToFeature = (index: number) => {
    const nextIndex = (index + features.length) % features.length;
    const target = carouselRef.current?.children[nextIndex];

    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setActiveIndex(nextIndex);
    }
  };

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const children = Array.from(carousel.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );
    const closest = children.reduce(
      (current, child, index) => {
        const distance = Math.abs(child.offsetLeft - carousel.scrollLeft);
        return distance < current.distance ? { index, distance } : current;
      },
      { index: activeIndex, distance: Number.POSITIVE_INFINITY }
    );

    setActiveIndex(closest.index);
  };

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="border-t border-[#07234c]/5 bg-[#f4f5f6] px-5 py-16 text-[#07234c] md:px-12 md:py-24 lg:px-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-[65ch] md:mb-14">
          <span className="mb-4 block text-small font-bold uppercase tracking-widest text-[var(--color-primary)]">
            {t('diferencial.label')}
          </span>
          <h2 id="process-title" className="mb-6 max-w-[18ch] font-serif text-h2 leading-snug tracking-tight text-[#07234c]">
            {t('diferencial.title1')}
            <span>{t('diferencial.title2')}</span>
          </h2>
          <p className="max-w-[65ch] text-body text-[#555555]">
            {t('diferencial.body')}
          </p>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] lg:gap-7 [&::-webkit-scrollbar]:hidden"
            aria-label={locale === 'es' ? 'Carrusel de diferenciales' : 'Advantages carousel'}
          >
            {features.map((item) => {
              return (
                <article
                  key={item.title}
                  className="group flex flex-col shrink-0 basis-full snap-start md:rlu-card-base md:rlu-card-light md:min-h-[500px] md:p-2 md:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1.167rem)]"
                >
                  <div className="relative block aspect-square w-full overflow-hidden rounded-[2rem] bg-[#f2f2f2] md:aspect-[1.55] md:rounded-[1.75rem]">
                    <Image
                      src={resolveSiteAssetSrc(item.image)}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 92vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03] grayscale-[15%]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#07234c]/28" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07234c]/55 via-[#07234c]/12 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col pt-3 md:px-5 md:pb-5 md:pt-7">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[1rem] font-semibold tracking-tight text-[#0d3566] md:mb-4 md:text-h3 md:font-bold md:text-brand">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-[65ch] text-[15px] leading-[1.6] text-slate-600 md:mb-8 md:mt-0 md:text-[16px] md:text-[#333333]">
                      {item.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {features.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => scrollToFeature(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === idx ? 'w-8 bg-[var(--color-primary)]' : 'w-2.5 bg-[#07234c]/20 hover:bg-[#07234c]/35'
                  }`}
                  aria-label={
                    locale === 'es'
                      ? `Ver diferencial ${idx + 1}`
                      : `Show advantage ${idx + 1}`
                  }
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToFeature(activeIndex - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#07234c]/15 text-[#07234c] transition-colors hover:border-[#185365] hover:bg-[#185365] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#185365]"
                aria-label={locale === 'es' ? 'Diferencial anterior' : 'Previous advantage'}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollToFeature(activeIndex + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#07234c]/15 text-[#07234c] transition-colors hover:border-[#185365] hover:bg-[#185365] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#185365]"
                aria-label={locale === 'es' ? 'Siguiente diferencial' : 'Next advantage'}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
