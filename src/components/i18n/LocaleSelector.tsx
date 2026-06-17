'use client';

import { Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

interface LocaleSelectorProps {
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
}

export default function LocaleSelector({
  triggerClassName = 'fi-nav-action fi-nav-action--icon',
  triggerStyle,
}: LocaleSelectorProps) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  return (
    <div className="locale-selector" ref={rootRef}>
      <button
        type="button"
        className={triggerClassName}
        style={triggerStyle}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={t('mobile.locale.select')}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe size={18} aria-hidden />
      </button>

      {open ? (
        <div className="lang-popover" role="dialog" aria-label={t('mobile.locale.dialog')}>
          <span className="lang-popover-section-label">{t('mobile.locale.label')}</span>
          {(['es', 'en'] as const).map((option) => (
            <button
              key={option}
              type="button"
              className="lang-row"
              onClick={() => {
                setLocale(option);
                setOpen(false);
              }}
            >
              <span className="lang-label">{option === 'es' ? t('mobile.locale.spanish') : t('mobile.locale.english')}</span>
              <label className="switch" aria-hidden="true">
                <input type="checkbox" checked={locale === option} readOnly tabIndex={-1} />
                <span className="slider" />
              </label>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
