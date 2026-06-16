import type { Locale } from '@/lib/i18n/config';

export type NavSection =
  | 'home'
  | 'services'
  | 'about'
  | 'metodologia'
  | 'prensa'
  | 'perspectivas'
  | 'contact';

export const HOME_NAV_SECTIONS: NavSection[] = [
  'home',
  'services',
  'about',
  'metodologia',
  'prensa',
  'perspectivas',
  'contact',
];

export type NavMenuLink = {
  type: 'link';
  label: string;
  href: string;
  section: NavSection;
  mobileLabel?: string;
};

export type NavMenuDropdown = {
  type: 'dropdown';
  label: string;
  href: string;
  entries: Array<{ label: string; href: string }>;
};

export type NavMenuItem = NavMenuLink | NavMenuDropdown;

function homeSectionHref(section: NavSection) {
  return `/#${section}`;
}

export function getMainNavItems(locale: Locale): NavMenuLink[] {
  const isSpanish = locale === 'es';

  return [
    {
      type: 'link',
      label: isSpanish ? 'Inicio' : 'Home',
      href: homeSectionHref('home'),
      section: 'home',
    },
    {
      type: 'link',
      label: isSpanish ? 'Servicios' : 'Services',
      href: homeSectionHref('services'),
      section: 'services',
    },
    {
      type: 'link',
      label: isSpanish ? 'Nosotros' : 'About',
      href: homeSectionHref('about'),
      section: 'about',
    },
    {
      type: 'link',
      label: isSpanish ? 'Metodología' : 'Methodology',
      href: homeSectionHref('metodologia'),
      section: 'metodologia',
    },
    {
      type: 'link',
      label: isSpanish ? 'Prensa' : 'Press',
      href: homeSectionHref('prensa'),
      section: 'prensa',
    },
    {
      type: 'link',
      label: isSpanish ? 'Perspectivas' : 'Insights',
      href: homeSectionHref('perspectivas'),
      section: 'perspectivas',
    },
    {
      type: 'link',
      label: isSpanish ? 'Contacto' : 'Contact',
      href: homeSectionHref('contact'),
      section: 'contact',
    },
  ];
}

export function isNavPathActive(pathname: string, href: string, activeSection?: NavSection | null) {
  if (href.startsWith('/#')) {
    const section = href.slice(2) as NavSection;
    return pathname === '/' && activeSection === section;
  }

  if (href === '/' || href === '/#home') {
    return pathname === '/' && (!activeSection || activeSection === 'home');
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavDropdownActive(
  pathname: string,
  href: string,
  entries: Array<{ href: string }>,
  activeSection?: NavSection | null,
) {
  if (isNavPathActive(pathname, href, activeSection)) {
    return true;
  }

  return entries.some((entry) => isNavPathActive(pathname, entry.href, activeSection));
}

export function navigateToHomeSection(
  pathname: string,
  href: string,
  section: NavSection,
  onNavigate?: () => void,
) {
  if (pathname !== '/') return false;

  const target = document.getElementById(section);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window.history.replaceState(null, '', href);
  onNavigate?.();
  return true;
}
