'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getCliengoScriptUrl, syncMobileFloatingLaunchers, applyMobileCliengoChatLayout, subscribeCliengoProactivePrompt } from '@/lib/integrations/cliengo';

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

    const unsubscribePrompt = subscribeCliengoProactivePrompt(() => {
      document.body.classList.add('fi-cliengo-has-notification');
    });

    return () => {
      observer.disconnect();
      media.removeEventListener('change', sync);
      unsubscribePrompt();
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
