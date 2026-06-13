'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { ServicesPageSettingsAdminValues } from '@/app/admin/servicios/actions';

const servicesEsBase = [
  {
    num: '01',
    slug: 'divorcios-internacionales',
    title: 'Divorcios Internacionales',
    desc: 'Patrocinamos divorcios unilaterales, por culpa o mutuo acuerdo con cónyuges en el exterior, sin requerir domicilio conocido. Además, asesoramos respecto a divorcios realizados en el extranjero y sus efectos en Chile.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '02',
    slug: 'cuidado-sustraccion',
    title: 'Cuidado y Visitas',
    desc: 'Asesoría experta en Sustracción Internacional de Niños (Convenio de La Haya), defensas y demandas de visitas internacionales, además de autorizaciones judiciales para salir del país o relocalización.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '03',
    slug: 'filiacion-alimentos',
    title: 'Filiación y Alimentos',
    desc: 'Representación en demandas de paternidad internacional para reconocimiento en Chile. Asesoramos en la obtención y cobro de pensión de alimentos bajo el Convenio de Nueva York.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '04',
    slug: 'exequatur',
    title: 'Exequátur (Validación)',
    desc: 'Tramitamos directamente ante la Corte Suprema la validación legal en Chile de sentencias extranjeras de toda índole: divorcios, nulidades, adopciones y cuidado personal.',
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '05',
    slug: 'herencias-internacionales',
    title: 'Herencias y Posesiones',
    desc: 'Gestión experta para tramitar de manera eficiente la posesión efectiva y la adjudicación de bienes hereditarios, tanto para causantes en Chile como ubicados en el extranjero.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '06',
    slug: 'tramites-consulares',
    title: 'Trámites Consulares',
    desc: 'Confección de escrituras, mandatos y poderes para firmar ante consulados chilenos. Representación integral en tribunales de familia para personas que residen fuera del país.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
  },
] as const;

// Fallback for EN just in case, translating the same concepts
const servicesEnBase = [
  {
    num: '01',
    slug: 'divorcios-internacionales',
    title: 'International Divorces',
    desc: 'We sponsor unilateral, fault-based, or mutual agreement divorces with spouses abroad. We also advise on foreign divorces and their property effects in Chile.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '02',
    slug: 'cuidado-sustraccion',
    title: 'Custody & Access',
    desc: 'Expert advice on International Child Abduction (Hague Convention), international access lawsuits, and judicial authorizations for children leaving the country.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '03',
    slug: 'filiacion-alimentos',
    title: 'Paternity & Support',
    desc: 'Representation in international paternity lawsuits in Chile. We advise on obtaining and collecting child support under the New York Convention.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '04',
    slug: 'exequatur',
    title: 'Exequatur (Validation)',
    desc: 'We process directly before the Supreme Court the legal validation in Chile of foreign judgments: divorces, annulments, adoptions, and personal care.',
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '05',
    slug: 'herencias-internacionales',
    title: 'International Estates',
    desc: 'Expert management to efficiently process the effective possession and adjudication of inherited assets, both in Chile and abroad.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '06',
    slug: 'tramites-consulares',
    title: 'Consular Procedures',
    desc: 'Drafting of deeds, mandates, and powers of attorney to be signed before Chilean consulates. Full representation for residents abroad.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
  },
] as const;

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

  const mapServiceValues = (servicesBase: ReadonlyArray<{ num: string; slug: string; title: string; desc: string; image: string }>) => {
    return servicesBase.map((s, index) => {
      const keys = ['divorcios', 'cuidado', 'filiacion', 'exequatur', 'herencias', 'consulares'];
      const key = keys[index];
      return {
        ...s,
        title: parsedPayload[`${key}Title`] || s.title,
        desc: parsedPayload[`${key}Desc`] || s.desc,
      };
    });
  };

  const services = locale === 'es' ? mapServiceValues(servicesEsBase) : mapServiceValues(servicesEnBase);

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
