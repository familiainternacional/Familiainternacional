'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getCliengoScriptUrl, syncMobileFloatingLaunchers, applyMobileCliengoChatLayout } from '@/lib/integrations/cliengo';

export default function CliengoWidget() {
  const pathname = usePathname();
  const scriptUrl = getCliengoScriptUrl();
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    if (!scriptUrl || isAdmin) return;

    const sync = () => {
      syncMobileFloatingLaunchers();
      applyMobileCliengoChatLayout();
    };
    sync();

    const media = window.matchMedia('(max-width: 1023px)');
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    media.addEventListener('change', sync);

    return () => {
      observer.disconnect();
      media.removeEventListener('change', sync);
    };
  }, [isAdmin, scriptUrl]);

  if (!scriptUrl || isAdmin) {
    return null;
  }

  return (
    <Script
      id="cliengo-weboptimizer"
      src={scriptUrl}
      strategy="lazyOnload"
      onLoad={() => syncMobileFloatingLaunchers()}
    />
  );
}
