'use client';

import { useEffect, useState } from 'react';

const LG_MEDIA_QUERY = '(min-width: 1024px)';

function readIsLgViewport() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(LG_MEDIA_QUERY).matches;
}

export function useIsLgViewport() {
  const [isLg, setIsLg] = useState(readIsLgViewport);

  useEffect(() => {
    const media = window.matchMedia(LG_MEDIA_QUERY);
    const update = () => setIsLg(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isLg;
}
