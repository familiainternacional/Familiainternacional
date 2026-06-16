'use client';

import Link from 'next/link';
import { Home, Briefcase, Info, MessageCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { buildWhatsAppWidgetHref } from '@/lib/contact/links';
import { navigateToHomeSection, type NavSection } from '@/config/nav';
import {
  closeMobileCliengoChat,
  isCliengoEnabled,
  isMobileTabBarViewport,
  openCliengoChat,
  subscribeCliengoProactivePrompt,
} from '@/lib/integrations/cliengo';
import MobileChatSheet from '@/components/home/MobileChatSheet';
import { siteConfig } from '@/config/site';

function isEditableFormField(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
    return true;
  }

  if (target instanceof HTMLInputElement) {
    const type = target.type.toLowerCase();
    return !['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'reset', 'submit'].includes(type);
  }

  return target.isContentEditable;
}

const TAB_BAR_REVEAL_SCROLL_PX = 80;
const MOBILE_TAB_BAR_REVEALED_BODY_CLASS = 'fi-mobile-tab-bar-revealed';

export default function MobileTabBar({ whatsappNumber }: { whatsappNumber?: string }) {
  const pathname = usePathname();
  const { locale } = useI18n();
  const lenis = useLenis();
  const phone = whatsappNumber || siteConfig.contact.whatsappNumber;
  const whatsappHref = buildWhatsAppWidgetHref(phone, locale);
  const [chatOpen, setChatOpen] = useState(false);
  const [hiddenByFormFocus, setHiddenByFormFocus] = useState(false);
  const [revealedByScroll, setRevealedByScroll] = useState(false);
  const [chatPromptActive, setChatPromptActive] = useState(false);
  const hiddenByFormFocusRef = useRef(false);

  const closeChat = () => {
    setChatOpen(false);
    closeMobileCliengoChat();
  };

  useEffect(() => {
    hiddenByFormFocusRef.current = hiddenByFormFocus;
  }, [hiddenByFormFocus]);

  useEffect(() => {
    const onResize = () => {
      if (!isMobileTabBarViewport()) {
        setChatOpen(false);
        setHiddenByFormFocus(false);
        setRevealedByScroll(false);
        setChatPromptActive(false);
        document.body.classList.remove(MOBILE_TAB_BAR_REVEALED_BODY_CLASS);
        closeMobileCliengoChat();
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const readScrollY = () => (lenis ? lenis.scroll : window.scrollY);

    const onFocusIn = (event: FocusEvent) => {
      if (!isMobileTabBarViewport()) return;
      if (isEditableFormField(event.target)) {
        setHiddenByFormFocus(true);
      }
    };

    let scrollRaf: number | null = null;
    const onScroll = () => {
      if (!isMobileTabBarViewport()) return;

      if (scrollRaf !== null) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = null;

        const scrollY = readScrollY();
        setRevealedByScroll(scrollY > TAB_BAR_REVEAL_SCROLL_PX);

        if (hiddenByFormFocusRef.current && scrollY > 0) {
          setHiddenByFormFocus(false);
        }
      });
    };

    onScroll();
    document.addEventListener('focusin', onFocusIn);
    window.addEventListener('scroll', onScroll, { passive: true });
    lenis?.on('scroll', onScroll);

    return () => {
      document.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('scroll', onScroll);
      lenis?.off('scroll', onScroll);
      if (scrollRaf !== null) {
        window.cancelAnimationFrame(scrollRaf);
      }
    };
  }, [lenis]);

  const isTabBarVisible = revealedByScroll && !hiddenByFormFocus && !chatOpen;

  useEffect(() => {
    if (!isMobileTabBarViewport()) {
      document.body.classList.remove(MOBILE_TAB_BAR_REVEALED_BODY_CLASS);
      return;
    }

    document.body.classList.toggle(MOBILE_TAB_BAR_REVEALED_BODY_CLASS, isTabBarVisible);

    return () => {
      document.body.classList.remove(MOBILE_TAB_BAR_REVEALED_BODY_CLASS);
    };
  }, [isTabBarVisible]);

  useEffect(() => {
    if (!isCliengoEnabled() || !isMobileTabBarViewport()) {
      return;
    }

    return subscribeCliengoProactivePrompt(() => {
      setChatPromptActive(true);
    });
  }, []);

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (chatOpen) {
      closeChat();
      return;
    }

    if (isCliengoEnabled() && openCliengoChat()) {
      setChatPromptActive(false);
      setChatOpen(true);
      return;
    }

    window.open(whatsappHref, '_blank', 'noopener,noreferrer');
  };

  const tabItemClass =
    'flex flex-col items-center justify-center gap-1 text-[#555555] transition-colors hover:text-[#07234c]';

  const handleSectionNav = (event: React.MouseEvent<HTMLAnchorElement>, section: NavSection, href: string) => {
    if (navigateToHomeSection(pathname, href, section)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <MobileChatSheet key={chatOpen ? 'open' : 'closed'} open={chatOpen} onClose={closeChat} locale={locale} />

      <div
        className={`fixed bottom-4 left-4 right-4 z-40 lg:hidden pointer-events-none transition-all duration-300 ease-out ${
          isTabBarVisible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-[calc(100%+1.5rem)] opacity-0'
        }`}
      >
        <nav className="mx-auto flex w-full max-w-sm items-center justify-between rounded-card bg-white px-4 py-3 pointer-events-auto">
          <Link href="/#home" className={tabItemClass} onClick={(event) => handleSectionNav(event, 'home', '/#home')}>
            <Home size={22} strokeWidth={2} />
            <span className="text-[10px] font-bold tracking-wide">Inicio</span>
          </Link>
          <Link
            href="/#services"
            className={tabItemClass}
            onClick={(event) => handleSectionNav(event, 'services', '/#services')}
          >
            <Briefcase size={22} strokeWidth={2} />
            <span className="text-[10px] font-bold tracking-wide">Servicios</span>
          </Link>
          <Link href="/#about" className={tabItemClass} onClick={(event) => handleSectionNav(event, 'about', '/#about')}>
            <Info size={22} strokeWidth={2} />
            <span className="text-[10px] font-bold tracking-wide">Nosotros</span>
          </Link>
          <button
            type="button"
            onClick={handleChatClick}
            aria-expanded={chatOpen}
            aria-label={locale === 'en' ? 'Open chat' : 'Abrir chat'}
            className={`flex flex-col items-center justify-center gap-1 rounded-card px-2 py-1 transition-colors ${
              chatOpen
                ? 'bg-[#07234c] text-white'
                : chatPromptActive
                  ? 'text-[#1a9e4b] hover:text-[#25D366]'
                  : 'text-[#07234c] hover:text-[#0a3169]'
            }`}
          >
            <MessageCircle size={22} strokeWidth={2} />
            <span className="text-[10px] font-bold tracking-wide">Chat</span>
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 text-[#1a9e4b] transition-colors hover:text-[#25D366]"
          >
            <WhatsAppIcon size={22} />
            <span className="text-[10px] font-bold tracking-wide">WhatsApp</span>
          </a>
        </nav>
      </div>
    </>
  );
}
