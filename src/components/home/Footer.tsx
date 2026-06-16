'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { familyServices } from '@/config/family-services';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { getSiteLogoSrc } from '@/lib/storage/site-assets';
import { resolveSiteContact } from '@/lib/site-contact';
import { logoImageSizes } from '@/config/logo';
import { SITE_CONTAINER_CLASS } from '@/lib/layout';
import type { SiteSettingsAdminValues } from '@/app/admin/ajustes/actions';

export default function Footer({ adminValues }: { adminValues?: SiteSettingsAdminValues | null }) {
  const { t, locale } = useI18n();
  const logoSrc = getSiteLogoSrc('light');
  const contact = resolveSiteContact(adminValues);
  const serviceLinks = familyServices.map((service) => ({
    label: locale === 'es' ? service.title.es : service.title.en,
    href: `/servicios/${service.slug}`,
  }));

  const instagramUrl = siteConfig.contact.social.instagram;
  const linkedinUrl = adminValues?.linkedinUrl || siteConfig.contact.social.linkedin;
  const xUrl = siteConfig.contact.social.x;

  return (
    <footer
      id="footer"
      className="w-full max-w-full overflow-hidden bg-brand py-12 text-white md:py-20 lg:py-24 lg:text-gray-400"
    >
      <div className={SITE_CONTAINER_CLASS}>
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
        <div className="flex max-w-xs flex-col">
          <Link href="/" className="mb-7 block lg:mb-10">
            <Image
              src={logoSrc}
              alt={siteConfig.name}
              width={logoImageSizes.footer.width}
              height={logoImageSizes.footer.height}
              className="h-11 w-auto object-contain brightness-0 invert lg:h-14"
            />
          </Link>

          <div className="mb-10 space-y-5 text-small">
            <p className="whitespace-pre-wrap">{contact.officeAddressMultiline}</p>

            <p>
              <strong className="block text-small font-medium text-white">Contacto General</strong>
              <a href={`mailto:${contact.primaryEmail}`} className="break-all transition-colors hover:text-white">
                {contact.primaryEmail}
              </a>
            </p>
            <p>
              <a href={contact.primaryPhoneHref} className="transition-colors hover:text-white">
                {contact.primaryPhone}
              </a>
            </p>
          </div>

          <div className="flex gap-4">
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-white lg:text-gray-400" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-white lg:text-gray-400" aria-label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {xUrl && (
              <a href={xUrl} target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-white lg:text-gray-400" aria-label="X (Twitter)">
                <svg className="h-5 w-5 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-small font-bold uppercase tracking-widest text-white lg:mb-10">
            {t('footer.company')}
          </h4>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-small md:block md:space-y-6">
            <li>
              <Link href="/nosotros" className="transition-colors hover:text-white">
                {t('footer.links.aboutUs')}
              </Link>
            </li>
            <li>
              <Link href="/servicios" className="transition-colors hover:text-white">
                {t('nav.services')}
              </Link>
            </li>
            <li>
              <Link href="/metodologia" className="transition-colors hover:text-white">
                {t('nav.process')}
              </Link>
            </li>
            <li>
              <Link href="/equipo/jaime-soto-silva" className="transition-colors hover:text-white">
                {t('footer.links.ourTeam')}
              </Link>
            </li>
            <li>
              <Link href="/prensa" className="transition-colors hover:text-white">
                Prensa
              </Link>
            </li>
            <li>
              <Link href="/perspectivas" className="transition-colors hover:text-white">
                {t('nav.blog')}
              </Link>
            </li>
            <li>
              <Link href="/reseñas" className="transition-colors hover:text-white">
                Reseñas Google
              </Link>
            </li>
            <li>
              <Link href="/preguntas-frecuentes" className="transition-colors hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="transition-colors hover:text-white">
                {t('footer.links.contact')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-small font-bold uppercase tracking-widest text-white lg:mb-10">
            {t('footer.servicesTitle')}
          </h4>
          <ul className="grid grid-cols-1 gap-y-4 text-small min-[420px]:grid-cols-2 min-[420px]:gap-x-6 md:block md:space-y-6">
            {serviceLinks.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className="transition-colors hover:text-white">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>

      <div className={`${SITE_CONTAINER_CLASS} mt-12 flex w-full flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:gap-0 lg:mt-16 lg:pt-10`}>
        <p className="text-small">
          © 2026 Familia Internacional. Todos los derechos reservados.
        </p>
        <p className="text-small">
          Desarrollado por{' '}
          <a
            href="https://airconsulting-ten.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white transition-colors hover:text-brand-bright lg:hover:text-white"
          >
            IrigoyenDev
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
