'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import BookCallButton from '@/components/home/BookCallButton';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { HOME_PROMO_CARD_SHELL_CLASS, HOME_SECTION_TITLE_INVERSE_CLASS, OFF_PAGE_LINK_DESKTOP_ONLY_CLASS } from '@/lib/layout';

export default function CtaSection() {
  const { t, dictionary } = useI18n();
  const cta = dictionary.home.cta;

  return (
    <section className="relative w-full overflow-hidden border-t border-[#07234c]/5 bg-white py-16 font-sans sm:py-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={resolveSiteAssetSrc('/santiago_las_condes.png')}
          alt=""
          fill
          className="object-cover object-center opacity-[0.08] mix-blend-luminosity"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] via-[#f8f9fa]/70 to-[#f8f9fa]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`${HOME_PROMO_CARD_SHELL_CLASS} bg-[#07234c]`}>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex-1 max-w-2xl text-center lg:text-left">
            <h2 className={`mb-6 ${HOME_SECTION_TITLE_INVERSE_CLASS}`}>{cta.title}</h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0 xl:max-w-2xl">
              {cta.body}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="h-[1px] w-8 sm:w-12 bg-white/20" />
              <p className="text-white/60 text-xs sm:text-sm">
                {cta.featuredPrefix}
                <span className="lg:hidden text-white font-medium">{cta.outletName}</span>
                <Link
                  href="/prensa"
                  className={`${OFF_PAGE_LINK_DESKTOP_ONLY_CLASS} text-white font-medium hover:text-white/80 transition-colors underline underline-offset-4 decoration-white/30`}
                >
                  {cta.outletName}
                </Link>
                {cta.featuredSuffix}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex shrink-0 flex-col items-center gap-3 sm:flex-row lg:flex-col">
            <BookCallButton
              text={t('common.bookVideoCall')}
              className="inline-flex min-h-[56px] w-full items-center justify-center whitespace-nowrap rounded-full bg-white px-8 text-base font-bold text-[#07234c] shadow-xl shadow-[#07234c]/20 transition-all hover:scale-[1.02] hover:bg-white/95 sm:w-auto sm:px-10 sm:text-lg lg:hidden"
            />
            <Link
              href="/evalua-tu-caso"
              className={`${OFF_PAGE_LINK_DESKTOP_ONLY_CLASS} min-h-[56px] items-center justify-center whitespace-nowrap rounded-full bg-white px-8 text-base font-bold text-[#07234c] shadow-xl shadow-[#07234c]/20 transition-all hover:scale-[1.02] hover:bg-white/95 sm:px-10 sm:text-lg`}
            >
              {t('common.evaluateCase')}
              <ArrowUpRight className="ml-2 h-5 w-5" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
