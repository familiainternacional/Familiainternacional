'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
} from 'lucide-react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import LocaleSelector from '@/components/i18n/LocaleSelector';
import BookCallButton from '@/components/home/BookCallButton';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { SITE_CONTAINER_CLASS } from '@/lib/layout';
import { buildWhatsAppWidgetHref, digitsOnly } from '@/lib/contact/links';
import { isCliengoEnabled } from '@/lib/integrations/cliengo';
import { siteConfig } from '@/config/site';
import {
  getMainNavItems,
  HOME_NAV_SECTIONS,
  isNavPathActive,
  type NavMenuLink,
  type NavSection,
} from '@/config/nav';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { LOCAL_LOGO_MASTER, getSiteLogoSrc } from '@/lib/storage/site-assets';
import { resolveSiteContact } from '@/lib/site-contact';
import type { SiteSettingsAdminValues } from '@/app/admin/ajustes/actions';

const SCROLL_OFFSET = 12;
const SCROLL_RANGE = 180;

const NAV_LOGO_HEIGHT = { min: 42, max: 72 } as const;
const NAV_LOGO_MAX_WIDTH = { min: 260, max: 460 } as const;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

function getScrollProgress(scrollY: number) {
  const raw = (scrollY - SCROLL_OFFSET) / SCROLL_RANGE;
  return easeOutCubic(clamp01(raw));
}

type NavExpandMetrics = {
  headerPaddingY: number;
  shellPaddingX: number;
  shellPaddingY: number;
  shellGap: number;
  logoHeight: number;
  logoMaxWidth: number;
  actionHeight: number;
  actionGap: number;
  navFontSize: number;
  navGap: number;
  dividerHeight: number;
  phoneIconSize: number;
  ctaFontSize: number;
  ctaPaddingX: number;
  boxShadow: string;
};

function getNavExpandMetrics(t: number): NavExpandMetrics {
  return {
    headerPaddingY: lerp(28, 6, t),
    shellPaddingX: lerp(38, 12, t),
    shellPaddingY: lerp(22, 8, t),
    shellGap: lerp(18, 7, t),
    logoHeight: lerp(NAV_LOGO_HEIGHT.max, NAV_LOGO_HEIGHT.min, t),
    logoMaxWidth: lerp(NAV_LOGO_MAX_WIDTH.max, NAV_LOGO_MAX_WIDTH.min, t),
    actionHeight: lerp(56, 36, t),
    actionGap: lerp(13, 6, t),
    navFontSize: lerp(14, 11, t),
    navGap: lerp(34, 20, t),
    dividerHeight: lerp(34, 20, t),
    phoneIconSize: lerp(21, 15, t),
    ctaFontSize: lerp(14.5, 11, t),
    ctaPaddingX: lerp(30, 12, t),
    boxShadow: `0 ${lerp(22, 6, t).toFixed(1)}px ${lerp(52, 18, t).toFixed(1)}px rgba(15,23,42,${lerp(0.18, 0.05, t).toFixed(3)})`,
  };
}

type NavbarProps = {
  adminValues?: SiteSettingsAdminValues | null;
  /** Home con ReplicaHero: header solo en mobile/tablet. */
  variant?: 'full' | 'mobile-only';
};

function FiLogo({
  scrollProgress = 0,
  variant = 'dark',
  compact = false,
}: {
  scrollProgress?: number;
  variant?: 'light' | 'dark';
  compact?: boolean;
}) {
  const logoHeight = compact ? 54 : lerp(NAV_LOGO_HEIGHT.max, NAV_LOGO_HEIGHT.min, scrollProgress);
  const logoMaxWidth = compact ? 320 : lerp(NAV_LOGO_MAX_WIDTH.max, NAV_LOGO_MAX_WIDTH.min, scrollProgress);
  const logoOffsetX = compact ? 10 : lerp(18, 12, scrollProgress);
  const logoOffsetY = compact ? 3 : lerp(5, 3, scrollProgress);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getSiteLogoSrc(variant)}
      alt={siteConfig.name}
      className={`fi-nav-logo w-auto object-contain object-left ${compact ? 'fi-nav-logo--compact' : ''} ${variant === 'light' ? 'brightness-0 invert' : ''}`}
      style={{
        height: logoHeight,
        maxWidth: logoMaxWidth,
        transform: `translate(${logoOffsetX}px, ${logoOffsetY}px)`,
      }}
      decoding="async"
      fetchPriority="high"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = encodeURI(LOCAL_LOGO_MASTER);
      }}
    />
  );
}

export default function Navbar({ adminValues, variant = 'full' }: NavbarProps) {
  const pathname = usePathname();
  const { locale } = useI18n();
  const lenis = useLenis();
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRafRef = useRef<number | null>(null);
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const mainNavItems = useMemo(() => getMainNavItems(locale), [locale]);
  const isEnglish = locale === 'en';
  const isMobileOnly = variant === 'mobile-only';
  const contact = resolveSiteContact(adminValues);
  const { primaryPhone, primaryPhoneHref } = contact;
  const whatsappNumber = adminValues?.whatsappNumber || siteConfig.contact.whatsappNumber;
  const whatsappHref = buildWhatsAppWidgetHref(whatsappNumber, locale);
  const showWhatsApp = digitsOnly(whatsappNumber).length > 0 && !isCliengoEnabled();
  const navMetrics = useMemo(() => getNavExpandMetrics(scrollProgress), [scrollProgress]);

  useEffect(() => {
    function updateScrollState(scrollY: number) {
      if (scrollRafRef.current !== null) return;

      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        setScrollProgress(getScrollProgress(scrollY));
      });
    }

    const readScrollY = () => lenis?.scroll ?? window.scrollY;

    updateScrollState(readScrollY());

    const onWindowScroll = () => updateScrollState(window.scrollY);
    window.addEventListener('scroll', onWindowScroll, { passive: true });

    const onLenisScroll = () => updateScrollState(readScrollY());
    lenis?.on('scroll', onLenisScroll);

    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      lenis?.off('scroll', onLenisScroll);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [lenis]);

  useEffect(() => {
    if (pathname !== '/') return;

    const sections: NavSection[] = HOME_NAV_SECTIONS;
    const syncSectionFromHash = () => {
      const hash = window.location.hash.replace('#', '') as NavSection;
      if (sections.includes(hash)) setActiveSection(hash);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id && sections.includes(visibleEntry.target.id as NavSection)) {
          setActiveSection(visibleEntry.target.id as NavSection);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.08, 0.2, 0.35, 0.5] },
    );

    syncSectionFromHash();
    window.addEventListener('hashchange', syncSectionFromHash);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('hashchange', syncSectionFromHash);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;
    if (!lenis) return;

    const hash = window.location.hash.replace('#', '') as NavSection;
    if (!hash || !HOME_NAV_SECTIONS.includes(hash)) return;

    const target = document.getElementById(hash);
    if (!target) return;

    window.requestAnimationFrame(() => {
      lenis.scrollTo(target, { duration: 1.05, easing: (t) => 1 - (1 - t) ** 3 });
    });
  }, [lenis, pathname]);

  function scrollToSection(section: NavSection, href: string, onDone?: () => void) {
    const target = document.getElementById(section);
    if (!target) return false;

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.05, easing: (t) => 1 - (1 - t) ** 3 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.history.replaceState(null, '', href);
    onDone?.();
    return true;
  }

  function handleSectionNav(event: ReactMouseEvent<HTMLAnchorElement>, item: NavMenuLink) {
    if (pathname !== '/') return;

    const handled = scrollToSection(item.section, item.href, () => {
      setActiveSection(item.section);
    });

    if (handled) event.preventDefault();
  }

  const activeSectionForNav = pathname === '/' ? activeSection : null;
  const localeTriggerClassName =
    'inline-flex items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#07234c]';

  return (
    <>
      {/* Desktop Floating Pill Navbar */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full bg-transparent hidden ${isMobileOnly ? '' : 'lg:block'}`}
        style={{ paddingTop: navMetrics.headerPaddingY, paddingBottom: navMetrics.headerPaddingY }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <div
            className="flex w-full min-w-0 items-center justify-between rounded-full border border-black/10 bg-white/95 backdrop-blur"
            style={{
              gap: navMetrics.shellGap,
              paddingInline: navMetrics.shellPaddingX,
              paddingBlock: navMetrics.shellPaddingY,
              boxShadow: navMetrics.boxShadow,
            }}
          >
            {/* Left: Brand */}
            <div className="min-w-0 flex-shrink">
              <Link
                href="/#home"
                className="inline-flex items-center"
                aria-label={siteConfig.name}
                onClick={(event) => {
                  if (pathname !== '/') return;
                  if (scrollToSection('home', '/#home', () => setActiveSection('home'))) event.preventDefault();
                }}
              >
                <FiLogo scrollProgress={scrollProgress} />
              </Link>
            </div>

            <nav
              className="hidden lg:flex items-center justify-center"
              style={{ gap: navMetrics.navGap }}
              aria-label={isEnglish ? 'Primary navigation' : 'Navegación principal'}
            >
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleSectionNav(event, item)}
                  className={`font-semibold tracking-[0.08em] uppercase transition-colors hover:text-[#07234c] ${isNavPathActive(pathname, item.href, activeSectionForNav) ? 'text-[#07234c]' : 'text-[#555555]'}`}
                  style={{ fontSize: navMetrics.navFontSize }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right: acciones (utilidad → contacto → conversión) */}
            <div className="flex shrink-0 items-center" style={{ gap: navMetrics.actionGap }}>
              <div className="hidden lg:block">
                <LocaleSelector
                  triggerClassName={localeTriggerClassName}
                  triggerStyle={{ width: navMetrics.actionHeight, height: navMetrics.actionHeight }}
                />
              </div>

              <span
                className="hidden w-px bg-black/10 lg:block"
                style={{ height: navMetrics.dividerHeight }}
                aria-hidden
              />

              <a
                href={primaryPhoneHref}
                className="hidden lg:inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#07234c]"
                style={{
                  width: navMetrics.actionHeight,
                  height: navMetrics.actionHeight,
                }}
                aria-label={isEnglish ? `Call ${primaryPhone}` : `Llamar al ${primaryPhone}`}
              >
                <Phone size={navMetrics.phoneIconSize} className="shrink-0" aria-hidden />
              </a>

              {showWhatsApp ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#25D366]"
                  style={{
                    width: navMetrics.actionHeight,
                    height: navMetrics.actionHeight,
                  }}
                  aria-label={isEnglish ? 'Message on WhatsApp' : 'Escribir por WhatsApp'}
                >
                  <WhatsAppIcon size={navMetrics.phoneIconSize} className="shrink-0" />
                </a>
              ) : null}

              <BookCallButton
                className="hidden lg:inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#07234c]"
                style={{
                  width: navMetrics.actionHeight,
                  height: navMetrics.actionHeight,
                }}
                showIcon
                iconSize={navMetrics.phoneIconSize}
                text=""
                ariaLabel={isEnglish ? 'Book a video call' : 'Agendar videollamada'}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Stacked Header */}
      <header className="fixed left-0 right-0 top-0 z-50 w-full flex flex-col shadow-sm bg-white lg:hidden">
        {/* Top Bar */}
        <div className="border-b border-black/5 text-[#555555] flex items-center justify-center py-2 text-xs font-semibold tracking-wider">
          <a href={primaryPhoneHref} className="flex items-center gap-2 transition-colors hover:text-[#07234c]">
            <Phone size={14} />
            <span>{primaryPhone}</span>
          </a>
        </div>
        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/#home"
            className="inline-flex items-center max-w-[65%]"
            aria-label={siteConfig.name}
            onClick={(event) => {
              if (pathname !== '/') return;
              if (scrollToSection('home', '/#home', () => setActiveSection('home'))) event.preventDefault();
            }}
          >
            <FiLogo compact variant="dark" />
          </Link>
          
          <div className="flex shrink-0 items-center">
            <LocaleSelector
              triggerClassName={localeTriggerClassName}
              triggerStyle={{ width: 40, height: 40 }}
            />
          </div>
        </div>
      </header>
    </>
  );
}
