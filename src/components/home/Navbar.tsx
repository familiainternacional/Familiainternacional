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
const MOBILE_NAV_LOGO_HEIGHT = { min: 34, max: 54 } as const;
const MOBILE_NAV_LOGO_MAX_WIDTH = { min: 180, max: 280 } as const;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

function getNavCollapseProgress(scrollY: number) {
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

type MobileNavMetrics = {
  topBarPaddingY: number;
  topBarMaxHeight: number;
  topBarOpacity: number;
  topBarFontSize: number;
  topBarIconSize: number;
  bottomBarPaddingY: number;
  bottomBarPaddingX: number;
  localeSize: number;
  boxShadow: string;
};

function getMobileNavMetrics(t: number): MobileNavMetrics {
  return {
    topBarPaddingY: lerp(8, 0, t),
    topBarMaxHeight: lerp(40, 0, t),
    topBarOpacity: lerp(1, 0, t),
    topBarFontSize: lerp(12, 10, t),
    topBarIconSize: lerp(14, 12, t),
    bottomBarPaddingY: lerp(12, 6, t),
    bottomBarPaddingX: lerp(16, 12, t),
    localeSize: lerp(40, 34, t),
    boxShadow:
      t > 0.35
        ? `0 ${lerp(8, 4, t).toFixed(1)}px ${lerp(24, 12, t).toFixed(1)}px rgba(15,23,42,${lerp(0.08, 0.04, t).toFixed(3)})`
        : 'none',
  };
}

type NavbarProps = {
  adminValues?: SiteSettingsAdminValues | null;
  /** Home con ReplicaHero: header solo en mobile/tablet. */
  variant?: 'full' | 'mobile-only';
};

function FiLogo({
  collapseProgress = 0,
  variant = 'dark',
  compact = false,
}: {
  collapseProgress?: number;
  variant?: 'light' | 'dark';
  compact?: boolean;
}) {
  const logoHeight = compact
    ? lerp(MOBILE_NAV_LOGO_HEIGHT.max, MOBILE_NAV_LOGO_HEIGHT.min, collapseProgress)
    : lerp(NAV_LOGO_HEIGHT.max, NAV_LOGO_HEIGHT.min, collapseProgress);
  const logoMaxWidth = compact
    ? lerp(MOBILE_NAV_LOGO_MAX_WIDTH.max, MOBILE_NAV_LOGO_MAX_WIDTH.min, collapseProgress)
    : lerp(NAV_LOGO_MAX_WIDTH.max, NAV_LOGO_MAX_WIDTH.min, collapseProgress);
  const logoOffsetX = compact ? lerp(10, 6, collapseProgress) : lerp(18, 12, collapseProgress);
  const logoOffsetY = compact ? lerp(3, 1, collapseProgress) : lerp(5, 3, collapseProgress);

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
  const [collapseProgress, setCollapseProgress] = useState(0);
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
  const desktopNavMetrics = useMemo(() => getNavExpandMetrics(0), []);
  const mobileNavMetrics = useMemo(() => getMobileNavMetrics(collapseProgress), [collapseProgress]);
  const isMobileHeaderCollapsed = collapseProgress > 0.85;

  useEffect(() => {
    const mobileMedia = window.matchMedia('(max-width: 1023px)');
    const readScrollY = () => (lenis ? lenis.scroll : window.scrollY);

    const updateCollapseProgress = () => {
      if (!mobileMedia.matches) {
        setCollapseProgress(0);
        return;
      }

      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }

      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        setCollapseProgress(getNavCollapseProgress(readScrollY()));
      });
    };

    updateCollapseProgress();
    mobileMedia.addEventListener('change', updateCollapseProgress);

    if (lenis) {
      lenis.on('scroll', updateCollapseProgress);
      return () => {
        mobileMedia.removeEventListener('change', updateCollapseProgress);
        lenis.off('scroll', updateCollapseProgress);
        if (scrollRafRef.current !== null) {
          window.cancelAnimationFrame(scrollRafRef.current);
        }
      };
    }

    window.addEventListener('scroll', updateCollapseProgress, { passive: true });
    return () => {
      mobileMedia.removeEventListener('change', updateCollapseProgress);
      window.removeEventListener('scroll', updateCollapseProgress);
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
        style={{ paddingTop: desktopNavMetrics.headerPaddingY, paddingBottom: desktopNavMetrics.headerPaddingY }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <div
            className="flex w-full min-w-0 items-center justify-between rounded-full border border-black/10 bg-white/95 backdrop-blur"
            style={{
              gap: desktopNavMetrics.shellGap,
              paddingInline: desktopNavMetrics.shellPaddingX,
              paddingBlock: desktopNavMetrics.shellPaddingY,
              boxShadow: desktopNavMetrics.boxShadow,
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
                <FiLogo collapseProgress={collapseProgress} />
              </Link>
            </div>

            <nav
              className="hidden lg:flex items-center justify-center"
              style={{ gap: desktopNavMetrics.navGap }}
              aria-label={isEnglish ? 'Primary navigation' : 'Navegación principal'}
            >
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleSectionNav(event, item)}
                  className={`font-semibold tracking-[0.08em] uppercase transition-colors hover:text-[#07234c] ${isNavPathActive(pathname, item.href, activeSectionForNav) ? 'text-[#07234c]' : 'text-[#555555]'}`}
                  style={{ fontSize: desktopNavMetrics.navFontSize }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right: acciones (utilidad → contacto → conversión) */}
            <div className="flex shrink-0 items-center" style={{ gap: desktopNavMetrics.actionGap }}>
              <div className="hidden lg:block">
                <LocaleSelector
                  triggerClassName={localeTriggerClassName}
                  triggerStyle={{ width: desktopNavMetrics.actionHeight, height: desktopNavMetrics.actionHeight }}
                />
              </div>

              <span
                className="hidden w-px bg-black/10 lg:block"
                style={{ height: desktopNavMetrics.dividerHeight }}
                aria-hidden
              />

              <a
                href={primaryPhoneHref}
                className="hidden lg:inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#07234c]"
                style={{
                  width: desktopNavMetrics.actionHeight,
                  height: desktopNavMetrics.actionHeight,
                }}
                aria-label={isEnglish ? `Call ${primaryPhone}` : `Llamar al ${primaryPhone}`}
              >
                <Phone size={desktopNavMetrics.phoneIconSize} className="shrink-0" aria-hidden />
              </a>

              {showWhatsApp ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#25D366]"
                  style={{
                    width: desktopNavMetrics.actionHeight,
                    height: desktopNavMetrics.actionHeight,
                  }}
                  aria-label={isEnglish ? 'Message on WhatsApp' : 'Escribir por WhatsApp'}
                >
                  <WhatsAppIcon size={desktopNavMetrics.phoneIconSize} className="shrink-0" />
                </a>
              ) : null}

              <BookCallButton
                className="hidden lg:inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#07234c]"
                style={{
                  width: desktopNavMetrics.actionHeight,
                  height: desktopNavMetrics.actionHeight,
                }}
                showIcon
                iconSize={desktopNavMetrics.phoneIconSize}
                text=""
                ariaLabel={isEnglish ? 'Book a video call' : 'Agendar videollamada'}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Stacked Header */}
      <header
        className="fixed left-0 right-0 top-0 z-50 flex w-full flex-col bg-white lg:hidden"
        style={{ boxShadow: mobileNavMetrics.boxShadow }}
      >
        {/* Top Bar */}
        <div
          className="flex items-center justify-center overflow-hidden border-b border-black/5 text-[#555555] font-semibold tracking-wider"
          style={{
            paddingTop: mobileNavMetrics.topBarPaddingY,
            paddingBottom: mobileNavMetrics.topBarPaddingY,
            maxHeight: mobileNavMetrics.topBarMaxHeight,
            opacity: mobileNavMetrics.topBarOpacity,
            pointerEvents: isMobileHeaderCollapsed ? 'none' : 'auto',
          }}
          aria-hidden={isMobileHeaderCollapsed}
        >
          <a
            href={primaryPhoneHref}
            className="flex items-center gap-2 transition-colors hover:text-[#07234c]"
            style={{ fontSize: mobileNavMetrics.topBarFontSize }}
            tabIndex={isMobileHeaderCollapsed ? -1 : undefined}
          >
            <Phone size={mobileNavMetrics.topBarIconSize} />
            <span>{primaryPhone}</span>
          </a>
        </div>
        {/* Bottom Bar */}
        <div
          className="flex items-center justify-between"
          style={{
            paddingInline: mobileNavMetrics.bottomBarPaddingX,
            paddingBlock: mobileNavMetrics.bottomBarPaddingY,
          }}
        >
          <Link
            href="/#home"
            className="inline-flex max-w-[65%] items-center"
            aria-label={siteConfig.name}
            onClick={(event) => {
              if (pathname !== '/') return;
              if (scrollToSection('home', '/#home', () => setActiveSection('home'))) event.preventDefault();
            }}
          >
            <FiLogo compact variant="dark" collapseProgress={collapseProgress} />
          </Link>

          <div className="flex shrink-0 items-center">
            <LocaleSelector
              triggerClassName={localeTriggerClassName}
              triggerStyle={{
                width: mobileNavMetrics.localeSize,
                height: mobileNavMetrics.localeSize,
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
}
