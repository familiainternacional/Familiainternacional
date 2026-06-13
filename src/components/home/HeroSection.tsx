'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BookCallButton from './BookCallButton';
import HeroParallax from '@/components/motion/HeroParallax';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import type { TranslationKey } from '@/lib/i18n/dictionaries';

const heroStats = [
  { value: 'hero.stats.0.value', label: 'hero.stats.0.label' },
  { value: 'hero.stats.1.value', label: 'hero.stats.1.label' },
  { value: 'hero.stats.2.value', label: 'hero.stats.2.label' },
  { value: 'hero.stats.3.value', label: 'hero.stats.3.label' },
] as const satisfies ReadonlyArray<{ value: TranslationKey; label: TranslationKey }>;

import type { HomeHeroSettingsAdminValues } from '@/app/admin/inicio/actions';

export default function HeroSection({ adminValues }: { adminValues?: HomeHeroSettingsAdminValues | null }) {
  const { t } = useI18n();

  return (
    <HeroParallax>
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative z-10 min-h-[520px] w-full max-w-full overflow-hidden lg:h-screen lg:min-h-[800px] lg:overflow-visible"
    >
      <div className="absolute inset-0 lg:hidden" data-hero-bg>
        <Image
          src="/images/santiago-skyline.jpg"
          alt="Santiago de Chile con la cordillera de los Andes"
          fill
          sizes="100vw"
          className="object-cover object-center grayscale contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-[#07234c]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07234c]/55 via-[#07234c]/35 to-[#07234c]/90" />
      </div>

      
      {/* Left Content Area */}
      <div className="relative z-10 mx-auto flex min-h-[520px] w-full flex-col justify-start pb-12 pt-36 md:px-8 lg:mx-0 lg:h-full lg:w-[55%] lg:justify-center lg:px-0 lg:pl-32 lg:pt-0 xl:w-[60%]">
        
        {/* Main Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          data-hero-copy
          className="mx-auto max-w-[343px] px-2 text-center lg:mx-0 lg:max-w-2xl lg:pr-0 lg:text-left lg:mt-16"
        >
          <h1 id="hero-title" className="mb-5 font-serif text-[3.25rem] leading-[1.05] tracking-tight text-white lg:mb-12 lg:text-h1">
            <span className="block">{adminValues?.titleLine1Es || t('hero.title1')}</span>
            <span className="block">{adminValues?.titleLine2Es || t('hero.title2')}</span>
            {(!adminValues?.titleLine1Es && !adminValues?.titleLine2Es) && (
              <span className="block">{t('hero.title3')}</span>
            )}
          </h1>

          <p className="mb-7 mx-auto max-w-[65ch] text-base leading-relaxed text-white/90 lg:mx-0 lg:mb-9 lg:text-body whitespace-pre-wrap">
            {adminValues?.subtitleEs || t('hero.subtitle')}
          </p>
          
          <div className="mb-10 lg:mb-24">
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <BookCallButton 
                className="rlu-button rlu-button-primary inline-flex items-center justify-center gap-2 min-h-12 px-6 uppercase tracking-wide lg:px-7 w-full sm:w-auto"
              />
              <Link 
                href="/evalua-tu-caso" 
                className="rlu-button rlu-button-primary min-h-12 px-6 uppercase tracking-wide lg:px-7 w-full sm:w-auto"
              >
                {t('hero.cta')}
              </Link>
            </div>
            <p className="mt-4 text-xs font-medium tracking-wide text-white/50 lg:text-sm lg:mt-5 max-w-[40ch] mx-auto lg:mx-0">
              Litigación civil, derecho corporativo, regulación, compliance y conflictos empresariales.
            </p>
          </div>
        </motion.div>

        {/* Statistics Bottom Left */}
        <motion.div 
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden w-full max-w-[343px] grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-2 md:max-w-none lg:absolute lg:bottom-12 lg:left-32 lg:right-auto lg:flex lg:w-[80%] lg:max-w-3xl lg:justify-between lg:gap-16 lg:overflow-visible lg:pr-12"
        >
          {heroStats.map((stat) => (
            <div key={stat.value} className="min-w-0 pr-2 lg:flex-shrink-0 lg:pr-0">
              <p className="mb-1 font-serif text-h3 text-white lg:mb-3">
                {t(stat.value)}
              </p>
              <p className="max-w-[13ch] text-small text-gray-200 lg:max-w-[120px]">
                {t(stat.label)}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Faint Horizontal Line spanning across the stats as seen in design */}
        <div className="absolute bottom-20 hidden h-[1px] bg-white/10 lg:left-32 lg:block lg:w-[80%] lg:max-w-3xl"></div>
      </div>



      {/* Right Content - Portrait Box */}
      {/* Box starts below Navbar (top-24), leaves a gap on the right (right-12) and touches bottom */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        data-hero-portrait
        className="absolute right-0 lg:right-12 top-24 bottom-0 w-full lg:w-[45%] xl:w-[40%] hidden lg:block bg-[#07234c] border-l border-t border-white/5"
      >
        <div className="absolute inset-0">
          <Image
            src={resolveSiteAssetSrc('/Las-Condes.jpg')}
            alt="Las Condes, Santiago de Chile"
            fill
            sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center filter grayscale contrast-125 opacity-90"
            priority
          />
        </div>
      </motion.div>
      
    </section>
    </HeroParallax>
  );
}
