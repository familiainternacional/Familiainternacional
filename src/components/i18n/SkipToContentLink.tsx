'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';

export default function SkipToContentLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#07234c]"
    >
      {t('common.skipToContent')}
    </a>
  );
}
