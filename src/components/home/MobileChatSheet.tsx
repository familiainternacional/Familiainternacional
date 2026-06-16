'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import {
  MOBILE_CHAT_OPEN_BODY_CLASS,
  mountMobileCliengoChat,
  unmountMobileCliengoChat,
} from '@/lib/integrations/cliengo';

type MobileChatSheetProps = {
  open: boolean;
  onClose: () => void;
  locale: string;
};

const DISMISS_THRESHOLD_PX = 96;

export default function MobileChatSheet({ open, onClose, locale }: MobileChatSheetProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isEnglish = locale === 'en';

  useEffect(() => {
    if (!open) {
      document.body.classList.remove(MOBILE_CHAT_OPEN_BODY_CLASS);
      unmountMobileCliengoChat();
      return;
    }

    document.body.classList.add(MOBILE_CHAT_OPEN_BODY_CLASS);

    let attempts = 0;
    const mount = () => {
      if (!bodyRef.current) return;
      mountMobileCliengoChat(bodyRef.current);
      attempts += 1;
    };

    mount();
    const interval = window.setInterval(() => {
      mount();
      if (document.getElementById('chatIframe') || attempts >= 28) {
        window.clearInterval(interval);
      }
    }, 150);

    return () => {
      window.clearInterval(interval);
      document.body.classList.remove(MOBILE_CHAT_OPEN_BODY_CLASS);
      unmountMobileCliengoChat();
    };
  }, [open]);

  useEffect(() => {
    const header = headerRef.current;
    const body = bodyRef.current;
    if (!open || !header) return;

    let startY = 0;
    let dragging = false;
    let deltaY = 0;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      dragging = true;
      startY = event.touches[0].clientY;
      deltaY = 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!dragging || event.touches.length !== 1) return;
      deltaY = Math.max(0, event.touches[0].clientY - startY);
      header.style.transform = `translate3d(0, ${deltaY}px, 0)`;
      if (body) {
        body.style.transform = `translate3d(0, ${deltaY}px, 0)`;
      }
      if (deltaY > 0) event.preventDefault();
    };

    const onTouchEnd = () => {
      if (!dragging) return;
      dragging = false;
      header.style.transform = '';
      if (body) body.style.transform = '';

      if (deltaY >= DISMISS_THRESHOLD_PX) {
        onClose();
      }
    };

    header.addEventListener('touchstart', onTouchStart, { passive: true });
    header.addEventListener('touchmove', onTouchMove, { passive: false });
    header.addEventListener('touchend', onTouchEnd);
    header.addEventListener('touchcancel', onTouchEnd);

    return () => {
      header.removeEventListener('touchstart', onTouchStart);
      header.removeEventListener('touchmove', onTouchMove);
      header.removeEventListener('touchend', onTouchEnd);
      header.removeEventListener('touchcancel', onTouchEnd);
      header.style.transform = '';
      if (body) body.style.transform = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={isEnglish ? 'Chat' : 'Chat en línea'}
    >
      <div
        ref={headerRef}
        className="fi-mobile-chat-sheet__header flex shrink-0 touch-none flex-col border-b border-black/5 bg-white px-4 pb-3 pt-[max(0.5rem,env(safe-area-inset-top))]"
      >
        <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-neutral-300" aria-hidden />
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[#07234c]">
              {isEnglish ? 'Online chat' : 'Chat en línea'}
            </p>
            <p className="text-xs text-neutral-500">
              {isEnglish ? 'Swipe down to close' : 'Desliza hacia abajo para cerrar'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#07234c] transition-colors hover:bg-black/5"
            aria-label={isEnglish ? 'Close chat' : 'Cerrar chat'}
          >
            <X size={20} aria-hidden />
          </button>
        </div>
      </div>
      <div
        ref={bodyRef}
        className="fi-mobile-chat-sheet__body relative min-h-0 flex-1 overflow-hidden bg-white pb-[env(safe-area-inset-bottom)]"
      />
    </div>
  );
}
