'use client';

import { Calendar } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { PRIMARY_BUTTON_CLASS } from '@/lib/layout';

interface BookCallButtonProps {
  className?: string;
  style?: CSSProperties;
  text?: string;
  children?: ReactNode;
  showIcon?: boolean;
  iconSize?: number;
  ariaLabel?: string;
  calLink?: string;
}

export default function BookCallButton({
  className = `${PRIMARY_BUTTON_CLASS} inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold`,
  style,
  text,
  children,
  showIcon = true,
  iconSize = 20,
  ariaLabel,
  calLink = 'sebastian-leiva-gutierrez-unljsw/30min',
}: BookCallButtonProps) {
  const { t } = useI18n();
  const displayText = text !== undefined ? text : t('common.bookVideoCall');
  const bookingUrl =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL?.trim() || `https://cal.com/${calLink}`;

  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {showIcon ? <Calendar size={iconSize} className="shrink-0" aria-hidden /> : null}
      {children ?? displayText}
    </a>
  );
}
