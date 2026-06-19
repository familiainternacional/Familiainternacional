'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { isRecaptchaConfiguredOnClient } from '@/lib/security/recaptcha-config';

type ReCaptchaWrapperProps = {
  children: ReactNode;
  /** Defer loading the reCAPTCHA script until the form is near the viewport or focused. */
  lazy?: boolean;
  /** Force-load reCAPTCHA (e.g. when a hidden mobile form becomes visible). */
  forceActive?: boolean;
};

export default function ReCaptchaWrapper({
  children,
  lazy = false,
  forceActive = false,
}: ReCaptchaWrapperProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaActive = isRecaptchaConfiguredOnClient();
  const [lazyActivated, setLazyActivated] = useState(!lazy);
  const active = lazyActivated || forceActive;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy || active || !recaptchaActive || !siteKey) return;

    const root = rootRef.current;
    if (!root) return;

    const enable = () => setLazyActivated(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          enable();
          observer.disconnect();
        }
      },
      { rootMargin: '240px' },
    );
    observer.observe(root);
    root.addEventListener('focusin', enable, { once: true });

    const idleId =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(enable, { timeout: 6000 })
        : window.setTimeout(enable, 6000);

    return () => {
      observer.disconnect();
      root.removeEventListener('focusin', enable);
      if (typeof idleId === 'number') {
        window.clearTimeout(idleId);
      } else {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [active, lazy, recaptchaActive, siteKey]);

  if (!recaptchaActive || !siteKey) {
    return <div ref={rootRef}>{children}</div>;
  }

  if (!active) {
    return <div ref={rootRef}>{children}</div>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <div ref={rootRef}>{children}</div>
    </GoogleReCaptchaProvider>
  );
}
