'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { getPressHubItems, type MediaMention } from '@/config/media-mentions';
import { useI18n } from '@/lib/i18n/I18nProvider';

function formatMediaDate(date: string, locale: string) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getPressBannerItems(): MediaMention[] {
  return getPressHubItems().filter((item) => item.kind === 'press' && item.thumbnail);
}

export default function PressCarouselBanner() {
  const { locale } = useI18n();
  const isEnglish = locale === 'en';
  const items = getPressBannerItems();
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  const item = items[activeIndex];
  const hasMultiple = items.length > 1;

  function goTo(index: number) {
    setActiveIndex((index + items.length) % items.length);
  }

  return (
    <div className="relative mb-12 w-full sm:mb-16">
      <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-[#dbe4e2] shadow-[0_16px_48px_rgba(15,23,42,0.1)] sm:min-h-[460px] sm:rounded-[2rem] xl:min-h-[500px] xl:rounded-[2.25rem]">
        <Image
          key={item.id}
          src={item.thumbnail!}
          alt={isEnglish ? `Press clipping: ${item.title}` : `Recorte de prensa: ${item.title}`}
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover object-top"
          priority={activeIndex === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07234c]/90 via-[#07234c]/35 to-[#07234c]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07234c]/55 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end p-4 sm:min-h-[460px] sm:p-6 xl:min-h-[500px] xl:p-8">
          <article className="w-full max-w-xl rounded-[1.25rem] border border-white/15 bg-white/95 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.18)] backdrop-blur-sm sm:rounded-[1.5rem] sm:p-6 lg:max-w-lg xl:max-w-xl xl:p-7">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#07234c]/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#07234c] sm:text-[11px]">
              <Newspaper className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
              {isEnglish ? 'Featured press' : 'Prensa destacada'}
            </div>

            <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#07234c]/80 sm:text-[11px]">
              <span>{item.source}</span>
              <span className="text-neutral-300" aria-hidden>
                ·
              </span>
              <time dateTime={item.date}>{formatMediaDate(item.date, locale)}</time>
            </div>

            <h3 className="mb-3 text-lg font-bold leading-snug tracking-tight text-[#1a1a1a] sm:text-xl lg:text-[1.35rem]">
              {item.title}
            </h3>

            <p className="mb-4 text-sm leading-relaxed text-[#555555] sm:text-[15px]">{item.description}</p>

            {item.expertQuote ? (
              <blockquote className="mb-5 border-l-[3px] border-[#d4af37] pl-3 text-sm italic leading-relaxed text-[#374151] sm:text-[15px]">
                “{isEnglish ? item.expertQuote.en : item.expertQuote.es}”
                {item.expertName ? (
                  <footer className="mt-2 not-italic text-xs font-semibold text-[#07234c] sm:text-sm">
                    — {item.expertName}
                  </footer>
                ) : null}
              </blockquote>
            ) : null}

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#07234c]/15 bg-white px-4 py-2.5 text-xs font-bold text-[#07234c] transition-colors hover:bg-[#07234c]/5 sm:px-5 sm:py-3 sm:text-sm"
              >
                {isEnglish ? 'View original article' : 'Ver nota original'}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </article>
        </div>

        {hasMultiple ? (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/90 text-[#07234c] shadow-lg transition-colors hover:bg-white sm:left-5"
              aria-label={isEnglish ? 'Previous press item' : 'Aparición anterior'}
              onClick={() => goTo(activeIndex - 1)}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/90 text-[#07234c] shadow-lg transition-colors hover:bg-white sm:right-5"
              aria-label={isEnglish ? 'Next press item' : 'Siguiente aparición'}
              onClick={() => goTo(activeIndex + 1)}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>

            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 sm:bottom-6 sm:right-6">
              {items.map((pressItem, index) => (
                <button
                  key={pressItem.id}
                  type="button"
                  aria-label={`${isEnglish ? 'Go to slide' : 'Ir a la diapositiva'} ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? 'w-7 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
