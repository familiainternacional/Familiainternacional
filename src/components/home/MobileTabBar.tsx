'use client';

import Link from 'next/link';
import { Home, Briefcase, Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { buildWhatsAppWidgetHref } from '@/lib/contact/links';
import { navigateToHomeSection, type NavSection } from '@/config/nav';
import { isMobileTabBarViewport } from '@/lib/integrations/cliengo';
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
  const { locale, t } = useI18n();
  const lenis = useLenis();
  const phone = whatsappNumber || siteConfig.contact.whatsappNumber;
  const whatsappHref = buildWhatsAppWidgetHref(phone, locale);
  const [hiddenByFormFocus, setHiddenByFormFocus] = useState(false);
  const [revealedByScroll, setRevealedByScroll] = useState(false);
  const hiddenByFormFocusRef = useRef(false);

  useEffect(() => {
    hiddenByFormFocusRef.current = hiddenByFormFocus;
  }, [hiddenByFormFocus]);

  useEffect(() => {
    const onResize = () => {
      if (!isMobileTabBarViewport()) {
        setHiddenByFormFocus(false);
        setRevealedByScroll(false);
        document.body.classList.remove(MOBILE_TAB_BAR_REVEALED_BODY_CLASS);
        window.requestAnimationFrame(() => {
          lenis?.start();
          lenis?.resize();
        });
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [lenis]);

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

  const isTabBarVisible = revealedByScroll && !hiddenByFormFocus;

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

  const tabItemClass =
    'flex flex-col items-center justify-center gap-1 text-[#555555] transition-colors hover:text-[#07234c]';

  const handleSectionNav = (event: React.MouseEvent<HTMLAnchorElement>, section: NavSection, href: string) => {
    if (navigateToHomeSection(pathname, href, section)) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 right-[84px] z-40 lg:hidden pointer-events-none transition-all duration-300 ease-out ${
        isTabBarVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-[calc(100%+1.5rem)] opacity-0'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[320px] items-center justify-between rounded-[2rem] bg-white px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] pointer-events-auto">
        <Link href="/#home" className={tabItemClass} onClick={(event) => handleSectionNav(event, 'home', '/#home')}>
          <Home size={20} strokeWidth={2} />
          <span className="text-[9px] font-bold tracking-wide">{t('mobile.tabs.home')}</span>
        </Link>
        <Link
          href="/#services"
          className={tabItemClass}
          onClick={(event) => handleSectionNav(event, 'services', '/#services')}
        >
          <Briefcase size={20} strokeWidth={2} />
          <span className="text-[9px] font-bold tracking-wide">{t('mobile.tabs.services')}</span>
        </Link>
        <Link href="/#about" className={tabItemClass} onClick={(event) => handleSectionNav(event, 'about', '/#about')}>
          <Info size={20} strokeWidth={2} />
          <span className="text-[9px] font-bold tracking-wide">{t('mobile.tabs.about')}</span>
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-[#1a9e4b] transition-colors hover:text-[#25D366]"
        >
          <WhatsAppIcon size={20} />
          <span className="text-[9px] font-bold tracking-wide">{t('mobile.tabs.whatsapp')}</span>
        </a>
      </nav>
    </div>
  );
}
