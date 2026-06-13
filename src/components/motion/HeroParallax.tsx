'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type HeroParallaxProps = {
  children: React.ReactNode;
};

export default function HeroParallax({ children }: HeroParallaxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !rootRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const background = rootRef.current.querySelector('[data-hero-bg]');
      const portrait = rootRef.current.querySelector('[data-hero-portrait]');
      const copy = rootRef.current.querySelector('[data-hero-copy]');

      if (background) {
        gsap.to(background, {
          y: 120,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (portrait) {
        gsap.to(portrait, {
          y: 90,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (copy) {
        gsap.to(copy, {
          y: -40,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div ref={rootRef} className="hero-parallax-root">
      {children}
    </div>
  );
}
