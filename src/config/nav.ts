import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

export type NavSection =
  | 'home'
  | 'services'
  | 'about'
  | 'metodologia'
  | 'prensa'
  | 'contact';

export const HOME_NAV_SECTIONS: NavSection[] = [
  'home',
  'services',
  'about',
  'metodologia',
  'prensa',
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
  const nav = getDictionary(locale).nav;

  return [
    {
      type: 'link',
      label: nav.home,
      href: homeSectionHref('home'),
      section: 'home',
    },
    {
      type: 'link',
      label: nav.services,
      href: homeSectionHref('services'),
      section: 'services',
    },
    {
      type: 'link',
      label: nav.about,
      href: homeSectionHref('about'),
      section: 'about',
    },
    {
      type: 'link',
      label: nav.methodology,
      href: homeSectionHref('metodologia'),
      section: 'metodologia',
    },
    {
      type: 'link',
      label: nav.press,
      href: homeSectionHref('prensa'),
      section: 'prensa',
    },
    {
      type: 'link',
      label: nav.contact,
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
