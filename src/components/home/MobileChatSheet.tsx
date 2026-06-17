'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import {
  activateCliengoChatFromLauncher,
  mountMobileCliengoChat,
  requestCliengoChatOpen,
  setMobileCliengoChatOpen,
  unmountMobileCliengoChat,
  unmountMobileCliengoLauncher,
  waitForChatIframeElement,
} from '@/lib/integrations/cliengo';

type MobileChatSheetProps = {
  open: boolean;
  onClose: () => void;
  locale: string;
};

const DISMISS_THRESHOLD_PX = 96;
const CHAT_OPEN_RETRY_MS = 400;
const CHAT_OPEN_MAX_WAIT_MS = 20_000;

export default function MobileChatSheet({ open, onClose, locale }: MobileChatSheetProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [chatActive, setChatActive] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const isEnglish = locale === 'en';

  useEffect(() => {
    if (!open) {
      return;
    }

    setChatActive(false);
    setOpenFailed(false);
    setMobileCliengoChatOpen(true);

    let cancelled = false;
    let mounted = false;
    let retryTimer: number | null = null;
    let waitTimeout: number | null = null;

    const clearRetries = () => {
      if (retryTimer !== null) {
        window.clearInterval(retryTimer);
        retryTimer = null;
      }
    };

    const mountChat = () => {
      if (cancelled || mounted || !bodyRef.current) {
        return false;
      }

      if (!mountMobileCliengoChat(bodyRef.current)) {
        return false;
      }

      mounted = true;
      setChatActive(true);
      setOpenFailed(false);
      clearRetries();
      return true;
    };

    const requestOpen = () => {
      if (cancelled) return;
      requestCliengoChatOpen();
      activateCliengoChatFromLauncher();
    };

    requestOpen();

    retryTimer = window.setInterval(() => {
      if (cancelled || mounted) return;
      if (mountChat()) return;
      requestOpen();
    }, CHAT_OPEN_RETRY_MS);

    const stopWaiting = waitForChatIframeElement(() => {
      if (cancelled) return;
      mountChat();
    }, CHAT_OPEN_MAX_WAIT_MS);

    waitTimeout = window.setTimeout(() => {
      if (cancelled || mounted) return;
      if (mountChat()) return;
      setOpenFailed(true);
    }, CHAT_OPEN_MAX_WAIT_MS);

    return () => {
      cancelled = true;
      stopWaiting();
      clearRetries();
      if (waitTimeout !== null) {
        window.clearTimeout(waitTimeout);
      }
      unmountMobileCliengoLauncher();
      unmountMobileCliengoChat();
      setMobileCliengoChatOpen(false);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !chatActive || !bodyRef.current) {
      return;
    }

    let attempts = 0;
    const mount = () => {
      if (!bodyRef.current) return;
      mountMobileCliengoChat(bodyRef.current);
      attempts += 1;
    };

    mount();
    const interval = window.setInterval(() => {
      mount();
      if (attempts >= 28) {
        window.clearInterval(interval);
      }
    }, 150);

    return () => {
      window.clearInterval(interval);
    };
  }, [open, chatActive]);

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
        className={`fi-mobile-chat-sheet__body relative min-h-0 flex-1 overflow-hidden bg-white pb-[env(safe-area-inset-bottom)] ${
          chatActive ? 'fi-mobile-chat-sheet__body--chat-active' : ''
        }`}
      >
        {!chatActive && openFailed ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center text-neutral-600">
            <p className="max-w-xs text-sm leading-relaxed">
              {isEnglish
                ? 'We could not open the chat. Please try again in a moment.'
                : 'No pudimos abrir el chat. Intenta de nuevo en unos segundos.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setOpenFailed(false);
                requestCliengoChatOpen();
                activateCliengoChatFromLauncher();
              }}
              className="rounded-full bg-[#07234c] px-5 py-2.5 text-sm font-bold text-white"
            >
              {isEnglish ? 'Retry' : 'Reintentar'}
            </button>
          </div>
        ) : null}
        {!chatActive && !openFailed ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center text-neutral-600">
            <Loader2 className="h-8 w-8 animate-spin text-[#07234c]" aria-hidden />
            <p className="text-sm">
              {isEnglish ? 'Opening chat…' : 'Abriendo chat…'}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
