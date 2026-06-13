'use client';

import { ReactLenis } from 'lenis/react';
import type { LenisOptions } from 'lenis';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import GsapLenisSync from '@/components/motion/GsapLenisSync';
import 'lenis/dist/lenis.css';

interface LenisProviderProps {
  children: React.ReactNode;
}

const LENIS_OPTIONS: LenisOptions = {
  autoRaf: false,
  lerp: 0.085,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 0.95,
  touchMultiplier: 1.6,
  infinite: false,
};

/**
 * Global smooth-scroll provider (Lenis).
 * Successor to the deprecated `@studio-freight/react-lenis` — uses `lenis/react`.
 */
export default function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
