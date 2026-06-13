'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type CinematicSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Vertical parallax distance while scrolling through the section. */
  parallax?: number;
};

export default function CinematicSection({
  children,
  className = '',
  id,
  parallax = -100,
}: CinematicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current || !contentRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        contentRef.current,
        {
          y: Math.abs(parallax) * 0.35,
        },
        {
          y: parallax,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.85,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [parallax, prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`cinematic-section ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div ref={contentRef} className="cinematic-section__content will-change-transform">
        {children}
      </div>
    </section>
  );
}
