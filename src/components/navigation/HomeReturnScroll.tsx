'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import type Lenis from 'lenis';

export function scrollToHomeHero(lenis?: Lenis | null) {
  const hero = document.getElementById('home');

  if (lenis) {
    lenis.scrollTo(hero ?? 0, { immediate: true });
  } else if (hero) {
    hero.scrollIntoView({ block: 'start' });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  if (window.location.hash !== '#home') {
    window.history.replaceState(null, '', '/#home');
  }
}

export default function HomeReturnScroll() {
  const pathname = usePathname();
  const lenis = useLenis();
  const previousPathnameRef = useRef(pathname);
  const pendingHeroScrollRef = useRef(false);

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;
    previousPathnameRef.current = pathname;

    if (pathname === '/' && previousPathname !== '/') {
      pendingHeroScrollRef.current = true;
    }
  }, [pathname]);

  useEffect(() => {
    if (!pendingHeroScrollRef.current || pathname !== '/') {
      return;
    }

    let attempts = 0;
    let frameId = 0;

    const run = () => {
      scrollToHomeHero(lenis);
      attempts += 1;

      if (!lenis && attempts < 12) {
        frameId = window.requestAnimationFrame(run);
        return;
      }

      pendingHeroScrollRef.current = false;
    };

    frameId = window.requestAnimationFrame(run);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname, lenis]);

  return null;
}
