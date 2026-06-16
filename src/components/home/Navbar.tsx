'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Globe,
  Home,
  Info,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Phone,
  Scale,
  BookOpen,
} from 'lucide-react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import LocaleSelector from '@/components/i18n/LocaleSelector';
import BookCallButton from '@/components/home/BookCallButton';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { PRIMARY_BUTTON_CLASS, SITE_CONTAINER_CLASS } from '@/lib/layout';
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
    headerPaddingY: lerp(6, 28, t),
    shellPaddingX: lerp(12, 38, t),
    shellPaddingY: lerp(8, 22, t),
    shellGap: lerp(7, 18, t),
    logoHeight: lerp(NAV_LOGO_HEIGHT.min, NAV_LOGO_HEIGHT.max, t),
    logoMaxWidth: lerp(NAV_LOGO_MAX_WIDTH.min, NAV_LOGO_MAX_WIDTH.max, t),
    actionHeight: lerp(36, 56, t),
    actionGap: lerp(6, 13, t),
    navFontSize: lerp(11, 14, t),
    navGap: lerp(20, 34, t),
    dividerHeight: lerp(20, 34, t),
    phoneIconSize: lerp(15, 21, t),
    ctaFontSize: lerp(11, 14.5, t),
    ctaPaddingX: lerp(12, 30, t),
    boxShadow: `0 ${lerp(6, 22, t).toFixed(1)}px ${lerp(18, 52, t).toFixed(1)}px rgba(15,23,42,${lerp(0.05, 0.18, t).toFixed(3)})`,
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
  const logoHeight = compact ? 54 : lerp(NAV_LOGO_HEIGHT.min, NAV_LOGO_HEIGHT.max, scrollProgress);
  const logoMaxWidth = compact ? 320 : lerp(NAV_LOGO_MAX_WIDTH.min, NAV_LOGO_MAX_WIDTH.max, scrollProgress);
  const logoOffsetX = compact ? 10 : lerp(12, 18, scrollProgress);
  const logoOffsetY = compact ? 3 : lerp(3, 5, scrollProgress);

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
  const { locale, setLocale } = useI18n();
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRafRef = useRef<number | null>(null);
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [navPathname, setNavPathname] = useState(pathname);
  const mainNavItems = useMemo(() => getMainNavItems(locale), [locale]);
  const isEnglish = locale === 'en';
  const isMobileOnly = variant === 'mobile-only';
  const contact = resolveSiteContact(adminValues);
  const { primaryPhone, primaryPhoneHref, primaryEmail, officeAddressMultiline } = contact;
  const whatsappNumber = adminValues?.whatsappNumber || siteConfig.contact.whatsappNumber;
  const whatsappHref = buildWhatsAppWidgetHref(whatsappNumber, locale);
  const showWhatsApp = digitsOnly(whatsappNumber).length > 0 && !isCliengoEnabled();

  if (pathname !== navPathname) {
    setNavPathname(pathname);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  }

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

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.classList.add('mobile-nav-lock');
    documentElement.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    return () => {
      documentElement.style.overflow = '';
      body.style.overflow = previousBodyStyles.overflow;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      body.classList.remove('mobile-nav-lock');
      window.scrollTo(0, scrollY);
    };
  }, [mobileMenuOpen]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

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
      closeMobileMenu();
    });

    if (handled) event.preventDefault();
  }

  function getMobileIcon(item: NavMenuLink) {
    switch (item.section) {
      case 'home':
        return <Home size={21} aria-hidden />;
      case 'services':
        return <Briefcase size={21} aria-hidden />;
      case 'about':
        return <Info size={21} aria-hidden />;
      case 'metodologia':
        return <Scale size={21} aria-hidden />;
      case 'prensa':
        return <Newspaper size={21} aria-hidden />;
      case 'perspectivas':
        return <BookOpen size={21} aria-hidden />;
      case 'contact':
        return <Phone size={21} aria-hidden />;
      default:
        return <ChevronRight size={21} aria-hidden />;
    }
  }

  const activeSectionForNav = pathname === '/' ? activeSection : null;

  return (
    <>
      {!mobileMenuOpen ? (
        <header
          className={`fixed left-0 right-0 top-0 z-50 w-full bg-transparent ${isMobileOnly ? 'block lg:hidden' : 'block'}`}
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
                  triggerClassName="inline-flex items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#07234c]"
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
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#07234c]"
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
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#25D366]"
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
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 text-[#555555] transition-colors hover:bg-black/5 hover:text-[#07234c]"
                style={{
                  width: navMetrics.actionHeight,
                  height: navMetrics.actionHeight,
                }}
                showIcon
                iconSize={navMetrics.phoneIconSize}
                text=""
                ariaLabel={isEnglish ? 'Book a video call' : 'Agendar videollamada'}
              />

              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-transparent text-[#555555] transition-colors hover:border-black/10 hover:bg-black/5 lg:hidden"
                style={{ width: navMetrics.actionHeight, height: navMetrics.actionHeight }}
                aria-label={mobileMenuOpen ? (isEnglish ? 'Close menu' : 'Cerrar menú') : isEnglish ? 'Open menu' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={22} aria-hidden />
              </button>
            </div>
            </div>
          </div>
        </header>
      ) : null}

      <div
        className={`mobile-nav-overlay${mobileMenuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={isEnglish ? 'Main menu' : 'Menú principal'}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-nav-header">
          <Link href="/#home" className="fi-logo-link mobile-nav-logo-link" aria-label={siteConfig.name} onClick={closeMobileMenu}>
            <FiLogo compact variant="light" />
          </Link>
          <div className="mobile-nav-header-actions">
            <button
              type="button"
              className="mobile-menu-close-btn"
              onClick={closeMobileMenu}
              aria-label={isEnglish ? 'Close menu' : 'Cerrar menú'}
            >
              <ChevronLeft size={34} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <div className="mobile-nav-body">
          <div className="mobile-nav-scroll">
            <div className="mobile-nav-welcome">
              <div className="mobile-nav-welcome-copy">
                <h2>{siteConfig.name}</h2>
                <p className="mobile-nav-welcome-subtitle">{siteConfig.copy.mobileMenuIntro.subtitle[locale]}</p>
                <p className="mobile-nav-welcome-description">{siteConfig.copy.mobileMenuIntro.description[locale]}</p>
              </div>
              <div className="mobile-language-switch" aria-label={isEnglish ? 'Language' : 'Idioma'}>
                <Globe size={20} aria-hidden />
                <button
                  type="button"
                  className={locale === 'es' ? 'is-active' : ''}
                  onClick={() => setLocale('es')}
                  aria-pressed={locale === 'es'}
                >
                  ES
                </button>
                <button
                  type="button"
                  className={locale === 'en' ? 'is-active' : ''}
                  onClick={() => setLocale('en')}
                  aria-pressed={locale === 'en'}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <BookCallButton className={`${PRIMARY_BUTTON_CLASS} w-full px-5 py-3.5 text-sm`}>
                {isEnglish ? 'Book video call' : 'Agendar Videollamada'}
              </BookCallButton>
              <Link
                href="/evalua-tu-caso"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#07234c]/15 bg-white px-5 py-3.5 text-sm font-semibold text-[#07234c] transition-colors hover:bg-[#07234c]/5"
                onClick={closeMobileMenu}
              >
                {isEnglish ? 'Evaluate my case' : 'Evaluar mi caso'}
              </Link>
            </div>

            <ul className="mobile-nav-links">
              {mainNavItems.map((item, index) => (
                <li key={item.href} className="mobile-nav-item" style={{ '--animation-order': index } as CSSProperties}>
                  <Link
                    href={item.href}
                    className="mobile-nav-link-btn"
                    onClick={(event) => handleSectionNav(event, item)}
                  >
                    <span
                      className={`mobile-nav-link-left${
                        isNavPathActive(pathname, item.href, activeSectionForNav) ? ' is-active' : ''
                      }`}
                    >
                      <span className="mobile-nav-icon">{getMobileIcon(item)}</span>
                      <span>{item.mobileLabel ?? item.label}</span>
                    </span>
                    <span className="mobile-nav-link-right">
                      <ChevronRight size={21} aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mobile-nav-contact">
            <a href={primaryPhoneHref} className="fi-contact-item" onClick={closeMobileMenu}>
              <Phone size={22} aria-hidden />
              <span>
                <strong>{primaryPhone}</strong>
              </span>
            </a>
            {showWhatsApp ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="fi-contact-item"
                onClick={closeMobileMenu}
              >
                <WhatsAppIcon size={22} />
                <span>
                  <strong>WhatsApp</strong>
                </span>
              </a>
            ) : null}
            <a href={`mailto:${primaryEmail}`} className="fi-contact-item" onClick={closeMobileMenu}>
              <Mail size={22} aria-hidden />
              <span>
                <strong>{primaryEmail}</strong>
              </span>
            </a>
            <span className="fi-contact-item">
              <MapPin size={22} aria-hidden />
              <span>
                <strong>{isEnglish ? 'Main office' : 'Oficina principal'}</strong>
                <small className="mobile-nav-contact-address">{officeAddressMultiline}</small>
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
