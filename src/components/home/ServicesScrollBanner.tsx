'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Baby,
  FileCheck,
  Globe2,
  Landmark,
  Plane,
  Scale,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { getFamilyServices } from '@/config/family-services';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { localizedHref } from '@/lib/i18n/localized-href';

const serviceIcons: Record<string, LucideIcon> = {
  'divorcios-internacionales': Users,
  'cuidado-sustraccion': Baby,
  'filiacion-alimentos': Scale,
  exequatur: FileCheck,
  'herencias-internacionales': Landmark,
  'tramites-consulares': Globe2,
  'autorizaciones-salida-pais': Plane,
};

export default function ServicesScrollBanner() {
  const { locale, t } = useI18n();
  const familyServices = getFamilyServices(locale);

  return (
    <section
      aria-label={t('home.services.bannerAria')}
      className="w-full pt-4"
    >
      <div className="w-full overflow-hidden rounded-card border border-[#dbe4e2] shadow-[0_12px_40px_rgba(15,23,42,0.06)] rounded-card">
        <div className="flex snap-x snap-mandatory gap-0 overflow-x-auto pb-0 hide-scrollbar sm:gap-0 lg:grid lg:grid-cols-7 lg:gap-0 lg:overflow-visible lg:snap-none">
          {familyServices.map((service) => {
            const Icon = serviceIcons[service.slug] ?? Scale;
            const title = service.title;

            return (
              <Link
                key={service.slug}
                href={localizedHref(`/servicios/${service.slug}`, locale)}
                className="group relative block h-[188px] w-[min(78vw,240px)] shrink-0 snap-start overflow-hidden sm:h-[204px] sm:w-[min(42vw,260px)] lg:h-[212px] lg:w-auto"
              >
                  <Image
                    src={resolveSiteAssetSrc(service.image)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 14vw, 240px"
                    className="object-cover grayscale-[35%] transition-transform duration-500 group-hover:scale-[1.03]"
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-[#07234c]/72 transition-colors group-hover:bg-[#07234c]/78" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07234c]/85 via-[#07234c]/45 to-[#07234c]/25" />

                  <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-4 text-center sm:gap-3.5 sm:px-5">
                    <Icon
                      className="h-9 w-9 text-[#d4af37] sm:h-10 sm:w-10"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <h3 className="max-w-[16ch] text-sm font-bold leading-snug tracking-tight text-white sm:text-[0.95rem]">
                      {title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white lg:hidden">
                      {t('common.viewDetails')}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
