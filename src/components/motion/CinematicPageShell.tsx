'use client';

import dynamic from 'next/dynamic';
import { useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const GlobalTiltCanvas = dynamic(() => import('./three/GlobalTiltCanvas'), {
  ssr: false,
});

type CinematicPageShellProps = {
  children: ReactNode;
};

export default function CinematicPageShell({ children }: CinematicPageShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      {!prefersReducedMotion && <GlobalTiltCanvas shellRef={shellRef} />}
      <div
        ref={shellRef}
        className="cinematic-page-shell relative min-h-screen overflow-x-hidden bg-brand text-white font-sans"
      >
        {children}
      </div>
    </>
  );
}
