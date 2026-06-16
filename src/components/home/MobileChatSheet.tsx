'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  getCliengoLauncherElement,
  mountMobileCliengoChat,
  mountMobileCliengoLauncher,
  setMobileCliengoChatOpen,
  unmountMobileCliengoChat,
  unmountMobileCliengoLauncher,
} from '@/lib/integrations/cliengo';

type MobileChatSheetProps = {
  open: boolean;
  onClose: () => void;
  locale: string;
};

const DISMISS_THRESHOLD_PX = 96;

export default function MobileChatSheet({ open, onClose, locale }: MobileChatSheetProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const launcherHostRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [chatActive, setChatActive] = useState(false);
  const isEnglish = locale === 'en';

  useEffect(() => {
    if (!open) {
      return;
    }

    setMobileCliengoChatOpen(true);

    return () => {
      unmountMobileCliengoLauncher();
      unmountMobileCliengoChat();
      setMobileCliengoChatOpen(false);
    };
  }, [open]);

  useEffect(() => {
    if (!open || chatActive) return;

    let attempts = 0;
    const mountLauncher = () => {
      if (!launcherHostRef.current) return;
      mountMobileCliengoLauncher(launcherHostRef.current);
      attempts += 1;
    };

    mountLauncher();
    const interval = window.setInterval(() => {
      mountLauncher();
      const launcher = getCliengoLauncherElement();
      if ((launcher && launcherHostRef.current?.contains(launcher)) || attempts >= 28) {
        window.clearInterval(interval);
      }
    }, 150);

    return () => {
      window.clearInterval(interval);
    };
  }, [open, chatActive]);

  useEffect(() => {
    if (!open || chatActive) return;

    let waitInterval: number | null = null;

    const activateChat = () => {
      if (waitInterval !== null) return;

      waitInterval = window.setInterval(() => {
        if (!bodyRef.current) return;
        if (mountMobileCliengoChat(bodyRef.current)) {
          setChatActive(true);
          if (waitInterval !== null) {
            window.clearInterval(waitInterval);
            waitInterval = null;
          }
        }
      }, 150);

      window.setTimeout(() => {
        if (waitInterval !== null) {
          window.clearInterval(waitInterval);
          waitInterval = null;
        }
      }, 12000);
    };

    const host = launcherHostRef.current;
    const launcher = host?.querySelector('#cliengo-button, .clgo-chat-launcher, #popupIframe');
    launcher?.addEventListener('click', activateChat);

    const observer = new MutationObserver(() => {
      const iframe = document.getElementById('chatIframe');
      if (iframe && iframe.offsetHeight > 0) {
        activateChat();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });

    return () => {
      launcher?.removeEventListener('click', activateChat);
      observer.disconnect();
      if (waitInterval !== null) {
        window.clearInterval(waitInterval);
      }
    };
  }, [open, chatActive]);

  useEffect(() => {
    if (!open || !chatActive || !bodyRef.current) return;

    unmountMobileCliengoLauncher();

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
        className="fi-mobile-chat-sheet__body relative min-h-0 flex-1 overflow-hidden bg-white pb-[env(safe-area-inset-bottom)]"
      >
        {!chatActive ? (
          <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center">
            <div
              ref={launcherHostRef}
              className="fi-mobile-chat-sheet__launcher-host flex min-h-[5.5rem] min-w-[5.5rem] items-center justify-center"
            />
            <p className="max-w-xs text-sm leading-relaxed text-neutral-600">
              {isEnglish ? 'Tap the icon to start chatting' : 'Haz click en el icono para chatear'}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
