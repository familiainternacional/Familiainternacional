'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Keeps Lenis smooth scroll and GSAP ScrollTrigger in sync.
 * Requires Lenis `autoRaf: false` so GSAP's ticker drives Lenis.
 */
export default function GsapLenisSync() {
  const lenis = useLenis();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !lenis) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [lenis, prefersReducedMotion]);

  return null;
}
