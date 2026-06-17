'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Loader2, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  mountMobileCliengoChat,
  mountMobileCliengoLauncher,
  setMobileCliengoChatOpen,
  unmountMobileCliengoChat,
  unmountMobileCliengoLauncher,
  waitForChatIframeVisible,
} from '@/lib/integrations/cliengo';

type MobileChatSheetProps = {
  open: boolean;
  onClose: () => void;
  locale: string;
};

const LAUNCHER_MOUNT_RETRY_MS = 400;
const LAUNCHER_MOUNT_MAX_WAIT_MS = 20_000;

export default function MobileChatSheet({ open, onClose }: MobileChatSheetProps) {
  const { t, dictionary } = useI18n();
  const chat = dictionary.mobile.chat;
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const launcherHostRef = useRef<HTMLDivElement>(null);
  const [launcherReady, setLauncherReady] = useState(false);
  const [launcherFailed, setLauncherFailed] = useState(false);
  const [chatActive, setChatActive] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setLauncherReady(false);
    setLauncherFailed(false);
    setChatActive(false);
    setMobileCliengoChatOpen(true);

    let cancelled = false;
    let retryTimer: number | null = null;
    let waitTimeout: number | null = null;

    const clearRetries = () => {
      if (retryTimer !== null) {
        window.clearInterval(retryTimer);
        retryTimer = null;
      }
    };

    const mountLauncher = () => {
      if (cancelled || !launcherHostRef.current) {
        return false;
      }

      if (!mountMobileCliengoLauncher(launcherHostRef.current)) {
        return false;
      }

      setLauncherReady(true);
      setLauncherFailed(false);
      clearRetries();
      return true;
    };

    const mountChat = () => {
      if (cancelled || !bodyRef.current) {
        return false;
      }

      if (!mountMobileCliengoChat(bodyRef.current)) {
        return false;
      }

      setChatActive(true);
      unmountMobileCliengoLauncher();
      return true;
    };

    retryTimer = window.setInterval(() => {
      if (cancelled || launcherReady) return;
      mountLauncher();
    }, LAUNCHER_MOUNT_RETRY_MS);

    waitTimeout = window.setTimeout(() => {
      if (cancelled || launcherReady) return;
      if (mountLauncher()) return;
      setLauncherFailed(true);
      clearRetries();
    }, LAUNCHER_MOUNT_MAX_WAIT_MS);

    const stopWaitingForChat = waitForChatIframeVisible(() => {
      if (cancelled) return;
      mountChat();
    });

    return () => {
      cancelled = true;
      stopWaitingForChat();
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
      if (attempts >= 20) {
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

      if (deltaY >= 96) {
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

  const retryLauncher = () => {
    setLauncherFailed(false);
    setLauncherReady(false);
    if (launcherHostRef.current) {
      window.setTimeout(() => {
        if (mountMobileCliengoLauncher(launcherHostRef.current!)) {
          setLauncherReady(true);
        }
      }, 0);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col overscroll-none bg-white touch-none lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={chat.title}
    >
      <div
        ref={headerRef}
        className="fi-mobile-chat-sheet__header flex shrink-0 touch-none flex-col border-b border-black/5 bg-white px-4 pb-3 pt-[max(0.5rem,env(safe-area-inset-top))]"
      >
        <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-neutral-300" aria-hidden />
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[#07234c]">{chat.title}</p>
            <p className="text-xs text-neutral-500">{chat.swipeToClose}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#07234c] transition-colors hover:bg-black/5"
            aria-label={t('mobile.chat.close')}
          >
            <X size={20} aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={bodyRef}
        className={`fi-mobile-chat-sheet__body relative min-h-0 flex-1 touch-pan-y overflow-hidden bg-white pb-[env(safe-area-inset-bottom)] ${
          chatActive ? 'fi-mobile-chat-sheet__body--chat-active' : ''
        }`}
      >
        {!chatActive ? (
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <h2 className="max-w-sm text-lg font-bold leading-snug text-[#07234c]">
              {chat.orientationTitle}
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">
              {chat.orientationBody}
            </p>

            {!launcherReady && !launcherFailed ? (
              <div className="mt-8 flex flex-col items-center gap-3 text-neutral-500">
                <Loader2 className="h-7 w-7 animate-spin text-[#07234c]" aria-hidden />
                <p className="text-sm">{chat.launcherLoading}</p>
              </div>
            ) : null}

            {launcherFailed ? (
              <div className="mt-8 flex flex-col items-center gap-4">
                <p className="max-w-xs text-sm text-neutral-600">{chat.error}</p>
                <button
                  type="button"
                  onClick={retryLauncher}
                  className="rounded-full bg-[#07234c] px-5 py-2.5 text-sm font-bold text-white"
                >
                  {chat.retry}
                </button>
              </div>
            ) : null}

            {launcherReady ? (
              <ChevronDown
                className="mt-6 h-6 w-6 animate-bounce text-[#07234c]/50"
                strokeWidth={2.5}
                aria-hidden
              />
            ) : null}

            <div
              ref={launcherHostRef}
              className={`fi-mobile-chat-sheet__launcher-host mt-4 ${launcherReady ? '' : 'sr-only'}`}
              aria-hidden={!launcherReady}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
