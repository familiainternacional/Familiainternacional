import type { Locale } from '@/lib/i18n/config';
import { familyServices } from '@/config/family-services';

export type NavSection = 'home' | 'about' | 'services' | 'metodologia' | 'process' | 'contact';

export type NavMenuLink = {
  type: 'link';
  label: string;
  href: string;
  section?: NavSection;
  mobileLabel?: string;
};

export type NavMenuDropdown = {
  type: 'dropdown';
  label: string;
  href: string;
  entries: Array<{ label: string; href: string }>;
};

export type NavMenuItem = NavMenuLink | NavMenuDropdown;

export function getMainNavItems(locale: Locale): NavMenuItem[] {
  const isSpanish = locale === 'es';

  const serviceEntries = familyServices.map((service) => ({
    label: isSpanish ? service.shortTitle.es : service.shortTitle.en,
    href: '/servicios',
  }));

  return [
    {
      type: 'link',
      label: isSpanish ? 'Inicio' : 'Home',
      href: '/',
      section: 'home',
    },
    {
      type: 'dropdown',
      label: isSpanish ? 'Servicios' : 'Services',
      href: '/servicios',
      entries: [
        { label: isSpanish ? 'Todos los servicios' : 'All services', href: '/servicios' },
        ...serviceEntries,
      ],
    },
    {
      type: 'link',
      label: isSpanish ? 'Metodología' : 'Methodology',
      href: '/metodologia',
      section: 'metodologia',
    },
    {
      type: 'link',
      label: isSpanish ? 'Nosotros' : 'About',
      href: '/nosotros',
      section: 'about',
    },
    {
      type: 'link',
      label: isSpanish ? 'Prensa' : 'Press',
      href: '/prensa',
    },
    {
      type: 'link',
      label: isSpanish ? 'Perspectivas' : 'Insights',
      href: '/perspectivas',
    },
    {
      type: 'link',
      label: isSpanish ? 'Contacto' : 'Contact',
      href: '/contacto',
      section: 'contact',
    },
  ];
}

export function isNavPathActive(pathname: string, href: string, activeSection?: NavSection | null) {
  if (href.startsWith('/#')) {
    const section = href.slice(2) as NavSection;
    return pathname === '/' && activeSection === section;
  }

  if (href === '/') {
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
