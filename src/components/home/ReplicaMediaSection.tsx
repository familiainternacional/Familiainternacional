'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { pressOutletLogos } from '@/config/press-outlet-logos';
import { useIsLgViewport } from '@/lib/hooks/use-is-lg-viewport';

import PressListing from '@/components/press/PressListing';
import PressCarouselBanner from '@/components/home/PressCarouselBanner';
import { HOME_SECTION_ANCHOR_CLASS, HOME_SECTION_TITLE_CLASS } from '@/lib/layout';

export default function ReplicaMediaSection() {
  const isLg = useIsLgViewport();
  // Duplicamos los logos varias veces para crear el efecto infinito continuo
  const duplicatedLogos = [...pressOutletLogos, ...pressOutletLogos, ...pressOutletLogos, ...pressOutletLogos, ...pressOutletLogos, ...pressOutletLogos];

  return (
    <section id="prensa" className={`w-full bg-white py-16 font-sans sm:py-24 ${HOME_SECTION_ANCHOR_CLASS}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="fi-section-header w-full text-left">
          <h2 className={`mb-4 ${HOME_SECTION_TITLE_CLASS} text-black`}>
            Menciones en Medios y Publicaciones
          </h2>

          <p className="fi-section-intro mb-0 max-w-2xl">
            Cobertura verificable en medios chilenos donde Jaime Soto Silva ha sido consultado como experto en
            derecho de familia internacional.
          </p>
        </div>

        <PressCarouselBanner />

        {/* Marquee Container */}
        <div className="relative mb-16 flex w-full max-w-6xl overflow-hidden mask-horizontal py-4">
          <motion.div
            className="flex w-max items-center gap-x-12 sm:gap-x-24"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
          >
            {duplicatedLogos.map((media, index) => {
              const logo = (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media.src}
                  alt={`Logo ${media.name}`}
                  width={media.width}
                  height={media.height}
                  loading="lazy"
                  className="h-7 w-auto max-w-[140px] object-contain sm:h-9 sm:max-w-[180px]"
                />
              );

              if (isLg) {
                return (
                  <Link
                    key={`${media.name}-${index}`}
                    href={media.href}
                    className="flex items-center justify-center opacity-50 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                    aria-label={`Ver cobertura en ${media.name}`}
                  >
                    {logo}
                  </Link>
                );
              }

              return (
                <div
                  key={`${media.name}-${index}`}
                  className="flex items-center justify-center opacity-50 grayscale"
                  aria-hidden
                >
                  {logo}
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="w-full text-left">
          <PressListing showFeatured={false} filterKind="video" limit={3} />
        </div>
      </div>
    </section>
  );
}
