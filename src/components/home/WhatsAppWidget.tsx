'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buildWhatsAppWidgetHref, digitsOnly } from '@/lib/contact/links';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { SiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { isCliengoEnabled } from '@/lib/integrations/cliengo';

export default function WhatsAppWidget({ adminValues }: { adminValues?: SiteSettingsAdminValues | null }) {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';
  const [isOpen, setIsOpen] = React.useState(false);

  if (isCliengoEnabled()) {
    return null;
  }

  const whatsappNumber = adminValues?.whatsappNumber || siteConfig.contact.whatsappNumber;
  const href = buildWhatsAppWidgetHref(whatsappNumber, locale);
  const hasWhatsAppNumber = digitsOnly(whatsappNumber).length > 0;

  const toggleWidget = () => {
    setIsOpen((value) => !value);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[55] hidden flex-col items-end gap-3 md:flex md:bottom-8 md:right-8">
      <div
        className={`w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-[20px] border border-white/10 bg-[#181818]/95 text-white backdrop-blur-xl transition-all duration-300 ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-small font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              WhatsApp
            </p>
            <h2 className="mt-1 text-h3 text-white">
              {isSpanish ? 'Conversemos' : 'Let us talk'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/20 hover:text-white"
            aria-label={isSpanish ? 'Cerrar widget de WhatsApp' : 'Close WhatsApp widget'}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="max-w-[65ch] text-body text-gray-300">
            {isSpanish
              ? 'Escribanos y coordinaremos una primera evaluacion clara, tecnica y confidencial.'
              : 'Write to us and we will coordinate a clear, technical and confidential first review.'}
          </p>

          <Link
            href={href}
            target={hasWhatsAppNumber ? '_blank' : undefined}
            rel={hasWhatsAppNumber ? 'noopener noreferrer' : undefined}
            className="rlu-button rlu-button-primary mt-5 min-h-11 w-full px-5"
          >
            <MessageCircle className="h-4 w-4" />
            {hasWhatsAppNumber
              ? isSpanish
                ? 'Escribir por WhatsApp'
                : 'Message on WhatsApp'
              : isSpanish
                ? 'Evalua tu caso'
                : 'Evaluate your case'}
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleWidget}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#25D366] text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#07234c] md:h-16 md:w-16"
        aria-label={
          isOpen
            ? isSpanish
              ? 'Cerrar widget de WhatsApp'
              : 'Close WhatsApp widget'
            : isSpanish
              ? 'Abrir widget de WhatsApp'
              : 'Open WhatsApp widget'
        }
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  );
}
