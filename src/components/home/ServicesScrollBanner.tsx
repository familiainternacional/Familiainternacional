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
      <div className="w-full lg:overflow-hidden lg:rounded-card lg:border lg:border-[#dbe4e2] lg:shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-2 hide-scrollbar sm:-mx-6 sm:gap-5 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-0 lg:overflow-visible lg:p-0 lg:snap-none">
          {familyServices.map((service) => {
            const Icon = serviceIcons[service.slug] ?? Scale;
            const title = service.title;

            return (
              <Link
                key={service.slug}
                href={localizedHref(`/servicios/${service.slug}`, locale)}
                className="group relative block h-[200px] w-[260px] shrink-0 snap-center overflow-hidden rounded-[1.5rem] border border-white/20 shadow-xl sm:h-[210px] sm:w-[280px] lg:h-[212px] lg:w-auto lg:rounded-none lg:border-0 lg:shadow-none"
              >
                  <Image
                    src={resolveSiteAssetSrc(service.image)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 14vw, 240px"
                    className="object-cover grayscale-[35%] transition-transform duration-500 group-hover:scale-[1.03]"
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-white/80 transition-colors group-hover:bg-white/90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/60 to-white/30" />

                  <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-4 text-center sm:gap-3.5 sm:px-5">
                    <Icon
                      className="h-9 w-9 text-[#07234c] sm:h-10 sm:w-10"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <h3 className="max-w-[16ch] text-sm font-bold leading-snug tracking-tight text-[#07234c] sm:text-[0.95rem]">
                      {title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#07234c]/20 bg-[#07234c]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#07234c] transition-colors group-hover:bg-[#07234c]/10 lg:hidden">
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
