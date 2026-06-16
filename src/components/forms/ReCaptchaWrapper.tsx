'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useEffect, useRef, useState, type ReactNode } from 'react';

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
  const [active, setActive] = useState(!lazy || forceActive);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceActive) {
      setActive(true);
    }
  }, [forceActive]);

  useEffect(() => {
    if (!lazy || active || !siteKey) return;

    const root = rootRef.current;
    if (!root) return;

    const enable = () => setActive(true);

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
  }, [active, lazy, siteKey]);

  if (!siteKey) {
    console.warn('Recaptcha site key is missing');
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
