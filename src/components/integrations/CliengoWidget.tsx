'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { getCliengoScriptUrl } from '@/lib/integrations/cliengo';

export default function CliengoWidget() {
  const pathname = usePathname();
  const scriptUrl = getCliengoScriptUrl();

  if (!scriptUrl || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <Script
      id="cliengo-weboptimizer"
      src={scriptUrl}
      strategy="afterInteractive"
    />
  );
}
