'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { ServicesPageSettingsAdminValues } from '@/app/admin/servicios/actions';
import { getFamilyServices } from '@/config/family-services';
import type { Locale } from '@/lib/i18n/config';
import { localizedHref } from '@/lib/i18n/localized-href';

const adminPayloadKeys = ['divorcios', 'cuidado', 'filiacion', 'exequatur', 'herencias', 'consulares', 'autorizaciones'] as const;

function mapServiceValues(
  locale: Locale,
  parsedPayload: Record<string, string>,
) {
  return getFamilyServices(locale).map((service, index) => {
    const key = adminPayloadKeys[index];
    return {
      num: service.num,
      slug: service.slug,
      title: parsedPayload[`${key}Title`] || service.title,
      desc: parsedPayload[`${key}Desc`] || service.desc,
      image: service.image,
    };
  });
}

export default function ServicesSection({ adminValues }: { adminValues?: ServicesPageSettingsAdminValues | null }) {
  const { locale, dictionary, t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);

  let parsedPayload: Record<string, string> = {};
  if (adminValues?.payload) {
    try {
      parsedPayload = JSON.parse(adminValues.payload);
    } catch (e) {
      console.error(e);
    }
  }

  const services = mapServiceValues(locale, parsedPayload);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative z-10 w-full bg-white px-5 py-20 text-[#0f172a] md:px-12 md:py-32 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24">
          
          {/* Left Column: Accordion List */}
          <div className="flex flex-col">
            <div className="mb-12">
              <span className="mb-6 block text-sm font-semibold uppercase tracking-widest text-slate-400">
                {dictionary.home.servicesSection.eyebrow}
              </span>
            </div>
            
            <div className="flex flex-col w-full border-b border-slate-200">
              {services.map((service, idx) => {
                const isActive = activeIndex === idx;
                
                return (
                  <div 
                    key={service.slug} 
                    className="border-t border-slate-200 overflow-hidden"
                  >
                    {/* Accordion Header (Clickable) */}
                    <button
                      onClick={() => setActiveIndex(idx)}
                      className={`w-full text-left py-6 md:py-8 transition-colors duration-300 ${
                        isActive ? 'cursor-default' : 'cursor-pointer hover:bg-slate-50/50'
                      }`}
                    >
                      <h3 className={`text-[1.75rem] md:text-[2.2rem] lg:text-[2.5rem] font-light tracking-tight transition-colors duration-500 ${
                        isActive ? 'text-[#0f172a]' : 'text-slate-400'
                      }`}>
                        {service.title}
                      </h3>
                    </button>
                    
                    {/* Accordion Content (Expandable) */}
                    <div 
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-8">
                          
                          {/* Mobile Image (Only visible on small screens inside accordion) */}
                          <div className="block lg:hidden relative w-full h-56 mb-6 rounded-card overflow-hidden bg-slate-100">
                            <Image 
                              src={service.image} 
                              fill 
                              className="object-cover" 
                              alt={service.title} 
                            />
                            <div className="absolute inset-0 bg-black/5" />
                          </div>
                          
                          <p className="text-[15px] leading-[1.7] text-slate-500 max-w-xl">
                            {service.desc}
                          </p>

                          <Link
                            href={localizedHref(`/servicios/${service.slug}`, locale)}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#07234c] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#051830] sm:w-auto lg:mt-8 lg:inline-flex lg:bg-transparent lg:px-0 lg:py-0 lg:text-[11px] lg:font-bold lg:uppercase lg:tracking-widest lg:text-[#0f172a] lg:hover:text-slate-500 lg:underline lg:decoration-slate-300 lg:underline-offset-4 lg:hover:decoration-slate-400"
                          >
                            {t('common.viewDetails')}
                            <ArrowUpRight className="h-4 w-4 lg:hidden" aria-hidden />
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Image Display (Desktop only) */}
          <div className="hidden lg:block relative lg:pl-10 xl:pl-20">
            <div className="sticky top-32 h-[550px] xl:h-[650px] w-full rounded-card overflow-hidden bg-slate-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={services[activeIndex].image} 
                    fill 
                    className="object-cover" 
                    alt={services[activeIndex].title}
                    priority
                  />
                  {/* Much lighter gradient for a natural, clean look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
