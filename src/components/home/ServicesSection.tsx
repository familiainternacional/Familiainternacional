'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { ServicesPageSettingsAdminValues } from '@/app/admin/servicios/actions';
import { familyServices } from '@/config/family-services';
import type { Locale } from '@/lib/i18n/config';

const adminPayloadKeys = ['divorcios', 'cuidado', 'filiacion', 'exequatur', 'herencias', 'consulares'] as const;

function mapServiceValues(
  locale: Locale,
  parsedPayload: Record<string, string>,
) {
  return familyServices.map((service, index) => {
    const key = adminPayloadKeys[index];
    return {
      num: service.num,
      slug: service.slug,
      title: parsedPayload[`${key}Title`] || (locale === 'es' ? service.title.es : service.title.en),
      desc: parsedPayload[`${key}Desc`] || (locale === 'es' ? service.desc.es : service.desc.en),
      image: service.image,
    };
  });
}

export default function ServicesSection({ adminValues }: { adminValues?: ServicesPageSettingsAdminValues | null }) {
  const { locale } = useI18n();
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
                {locale === 'es' ? 'Nuestros servicios' : 'Our services'}
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
                          <div className="block lg:hidden relative w-full h-56 mb-6 rounded-2xl overflow-hidden bg-slate-100">
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
                            href={`/servicios/${service.slug}`} 
                            className="mt-8 inline-block text-[11px] font-bold tracking-widest uppercase text-[#0f172a] hover:text-slate-500 transition-colors underline decoration-slate-300 underline-offset-4 hover:decoration-slate-400"
                          >
                            {locale === 'es' ? 'LEER MÁS' : 'READ MORE'}
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
            <div className="sticky top-32 h-[550px] xl:h-[650px] w-full rounded-[2rem] overflow-hidden bg-slate-50">
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
