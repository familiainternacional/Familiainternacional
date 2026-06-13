'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { premiumEase } from '@/lib/motion/easings';

export default function CtaSection() {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current || !bgRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      gsap.to(bgRef.current, {
        y: 80,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section className="px-4 py-16 md:px-8 lg:px-12 bg-white">
      <div
        ref={sectionRef}
        id="vision"
        aria-labelledby="vision-title"
        className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-neutral-900 mx-auto w-full max-w-[1400px]"
      >
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image
            src={resolveSiteAssetSrc('/library.png')}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-60 grayscale"
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-neutral-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-neutral-900/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: premiumEase }}
          className="relative z-10 mx-auto flex min-h-[350px] md:min-h-[450px] flex-col items-center justify-center text-center px-6 py-16 md:py-24"
        >
          <h2 id="vision-title" className="fi-section-heading mb-4 text-white">
            {isSpanish ? '¿Necesitas asesoría legal?' : 'Need legal guidance?'}
          </h2>

          <p className="fi-section-intro fi-section-intro--center fi-section-intro--inverse mx-auto mb-8 max-w-xl font-medium">
            {isSpanish
              ? 'Asesoría experta en derecho de familia nacional e internacional. Agenda tu hora online con nuestros abogados.'
              : 'Expert guidance in national and international family law. Book your online consultation with our attorneys.'}
          </p>

          <p className="mb-10 text-sm text-white/60">
            {isSpanish ? 'Consultados por ' : 'Featured in '}
            <Link href="/prensa" className="font-semibold text-white/85 underline-offset-4 hover:underline">
              Las Últimas Noticias
            </Link>
            {isSpanish ? ' en casos de sustracción internacional.' : ' on international child abduction cases.'}
          </p>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
            <Link
              href="/evalua-tu-caso"
              className="group flex items-center justify-center gap-3"
            >
              <div className="rounded-full bg-white px-8 py-4 text-base font-bold uppercase tracking-wide text-black transition-colors hover:bg-neutral-100">
                {isSpanish ? 'Solicitar una consulta' : 'Request a consultation'}
              </div>
              <div className="flex items-center justify-center rounded-full bg-white p-3.5 text-black transition-colors hover:bg-neutral-100">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
