'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Home,
  Info,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import LocaleSelector from '@/components/i18n/LocaleSelector';
import { siteConfig } from '@/config/site';
import {
  getMainNavItems,
  isNavDropdownActive,
  isNavPathActive,
  type NavMenuDropdown,
  type NavMenuItem,
  type NavSection,
} from '@/config/nav';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { LOCAL_LOGO_MASTER, LOCAL_LOGO_SRC } from '@/lib/storage/site-assets';
import { resolveSiteContact } from '@/lib/site-contact';
import type { SiteSettingsAdminValues } from '@/app/admin/ajustes/actions';

const SCROLL_OFFSET = 24;

type NavbarProps = {
  adminValues?: SiteSettingsAdminValues | null;
  /** Home con ReplicaHero: header solo en mobile/tablet. */
  variant?: 'full' | 'mobile-only';
};

function FiLogo({ compact = false }: { compact?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOCAL_LOGO_SRC}
      alt={siteConfig.name}
      className={`fi-nav-logo${compact ? ' fi-nav-logo--compact' : ''}`}
      decoding="async"
      fetchPriority="high"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = encodeURI(LOCAL_LOGO_MASTER);
      }}
    />
  );
}

function DesktopNavDropdown({
  item,
  isOpen,
  onOpen,
  onToggle,
  onClose,
  pathname,
  activeSection,
  locale,
}: {
  item: NavMenuDropdown;
  isOpen: boolean;
  onOpen: () => void;
  onToggle: () => void;
  onClose: () => void;
  pathname: string;
  activeSection: NavSection | null;
  locale: 'es' | 'en';
}) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const isActive = isNavDropdownActive(pathname, item.href, item.entries, activeSection);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) onClose();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={rootRef}
      className={`fi-nav-dropdown${isOpen ? ' is-open' : ''}${isActive ? ' is-active' : ''}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className={`fi-nav-link fi-nav-dropdown__trigger${isActive ? ' is-active' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={onToggle}
      >
        {item.label}
        <ChevronDown size={16} className="fi-nav-dropdown__chevron" aria-hidden />
      </button>
      <div id={menuId} className="fi-nav-dropdown__panel" role="menu">
        <ul className="fi-nav-dropdown__menu" role="list">
          {item.entries.map((entry) => (
            <li key={entry.href + entry.label} role="none">
              <Link href={entry.href} className="fi-nav-dropdown__link" role="menuitem" onClick={onClose}>
                {entry.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={item.href} className="fi-nav-dropdown__footer" onClick={onClose}>
          {locale === 'en' ? 'View all' : 'Ver todo'}
        </Link>
      </div>
    </div>
  );
}

function MobileNavDropdown({
  item,
  order,
  icon,
  onNavigate,
  pathname,
  activeSection,
  locale,
}: {
  item: NavMenuDropdown;
  order: number;
  icon: ReactNode;
  onNavigate: () => void;
  pathname: string;
  activeSection: NavSection | null;
  locale: 'es' | 'en';
}) {
  const [open, setOpen] = useState(false);
  const isActive = isNavDropdownActive(pathname, item.href, item.entries, activeSection);

  return (
    <li className="mobile-nav-item" style={{ '--animation-order': order } as CSSProperties}>
      <div className="mobile-nav-row">
        <button
          type="button"
          className="mobile-nav-link-btn"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={`mobile-nav-link-left${isActive ? ' is-active' : ''}`}>
            <span className="mobile-nav-icon">{icon}</span>
            <span>{item.label}</span>
          </span>
          <span className="mobile-nav-link-right">
            <ChevronRight size={21} className={open ? 'is-rotated' : undefined} aria-hidden />
          </span>
        </button>
      </div>
      <div className={`mobile-nav-submenu-wrapper${open ? ' open' : ''}`}>
        <ul className="mobile-nav-submenu">
          {item.entries.map((entry) => (
            <li key={entry.href + entry.label}>
              <Link href={entry.href} className="mobile-nav-sub-link" onClick={onNavigate}>
                {entry.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href={item.href} className="mobile-nav-sub-link mobile-nav-sub-link--emphasis" onClick={onNavigate}>
              {locale === 'en' ? 'View all' : 'Ver todo'}
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}

export default function Navbar({ adminValues, variant = 'full' }: NavbarProps) {
  const pathname = usePathname();
  const { locale, setLocale } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [navPathname, setNavPathname] = useState(pathname);
  const mainNavItems = useMemo(() => getMainNavItems(locale), [locale]);
  const isEnglish = locale === 'en';
  const isMobileOnly = variant === 'mobile-only';
  const contact = resolveSiteContact(adminValues);
  const { primaryPhone, primaryPhoneHref, primaryEmail, officeAddressMultiline } = contact;

  if (pathname !== navPathname) {
    setNavPathname(pathname);
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (openDropdown) setOpenDropdown(null);
  }

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > SCROLL_OFFSET);
    }

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;

    const sections: NavSection[] = ['home', 'services', 'metodologia', 'about', 'process', 'contact'];
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

  function toggleDropdown(label: string) {
    setOpenDropdown((current) => (current === label ? null : label));
  }

  function getMobileIcon(item: NavMenuItem) {
    if (item.type === 'dropdown') return <Briefcase size={21} aria-hidden />;

    switch (item.section) {
      case 'home':
        return <Home size={21} aria-hidden />;
      case 'about':
        return <Info size={21} aria-hidden />;
      case 'metodologia':
        return <Scale size={21} aria-hidden />;
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
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'} ${isMobileOnly ? 'block lg:hidden' : 'block'}`}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            {/* Left: Brand */}
            <div className="flex-shrink-0">
              <Link href="/#home" className="inline-flex items-center" aria-label={siteConfig.name}>
                <FiLogo compact={isScrolled} />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center justify-center gap-8" aria-label={isEnglish ? 'Primary navigation' : 'Navegación principal'}>
              {mainNavItems.map((item) =>
                item.type === 'link' ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[12px] font-bold tracking-[0.15em] uppercase transition-colors ${isScrolled ? 'hover:text-black/60' : 'hover:text-white/60'} ${isNavPathActive(pathname, item.href, activeSectionForNav) ? (isScrolled ? 'text-black' : 'text-white') : (isScrolled ? 'text-black/80' : 'text-white/80')}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <DesktopNavDropdown
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    activeSection={activeSectionForNav}
                    locale={locale}
                    isOpen={openDropdown === item.label}
                    onOpen={() => setOpenDropdown(item.label)}
                    onToggle={() => toggleDropdown(item.label)}
                    onClose={() => setOpenDropdown(null)}
                  />
                ),
              )}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <a
                href={primaryPhoneHref}
                className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${isScrolled ? 'border-black/20 text-black hover:bg-black/5' : 'border-white/20 text-white hover:bg-white/10'}`}
                aria-label={isEnglish ? `Call ${primaryPhone}` : `Llamar al ${primaryPhone}`}
              >
                <Phone size={16} aria-hidden />
              </a>
              <Link
                href="/evalua-tu-caso"
                className={`hidden lg:flex items-center justify-center border font-bold text-[12px] tracking-[0.1em] uppercase rounded-full px-6 py-2.5 transition-all ${isScrolled ? 'border-black/10 bg-white text-black hover:bg-black/5' : 'border-white/10 bg-white text-[#07234c] hover:bg-white/90'}`}
              >
                Evaluar Caso
              </Link>
              <LocaleSelector />
              <button
                type="button"
                className={`lg:hidden flex items-center justify-center w-10 h-10 ${isScrolled ? 'text-black' : 'text-white'}`}
                aria-label={mobileMenuOpen ? (isEnglish ? 'Close menu' : 'Cerrar menú') : isEnglish ? 'Open menu' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
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
            <FiLogo compact />
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

            <ul className="mobile-nav-links">
              {mainNavItems.map((item, index) =>
                item.type === 'link' ? (
                  <li key={item.href} className="mobile-nav-item" style={{ '--animation-order': index } as CSSProperties}>
                    <Link href={item.href} className="mobile-nav-link-btn" onClick={closeMobileMenu}>
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
                ) : (
                  <MobileNavDropdown
                    key={item.label}
                    item={item}
                    order={index}
                    icon={getMobileIcon(item)}
                    onNavigate={closeMobileMenu}
                    pathname={pathname}
                    activeSection={activeSectionForNav}
                    locale={locale}
                  />
                ),
              )}
            </ul>
          </div>

          <div className="mobile-nav-contact">
            <a href={primaryPhoneHref} className="fi-contact-item" onClick={closeMobileMenu}>
              <Phone size={22} aria-hidden />
              <span>
                <strong>{primaryPhone}</strong>
              </span>
            </a>
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
