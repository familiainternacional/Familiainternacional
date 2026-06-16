'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { AboutPageSettingsAdminValues } from '@/app/admin/nosotros/actions';
import ReactMarkdown from 'react-markdown';
import { primaryContact } from '@/config/contact';
import { siteConfig } from '@/config/site';
import { HOME_CARD_TITLE_CLASS, HOME_SECTION_ANCHOR_CLASS, HOME_SECTION_TITLE_BRAND_CLASS } from '@/lib/layout';

type TabKey = 'bio' | 'formacion' | 'experiencia' | 'contacto';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'bio', label: 'Perfil' },
  { key: 'formacion', label: 'Formación' },
  { key: 'experiencia', label: 'Experiencia' },
  { key: 'contacto', label: 'Contacto' },
];

export default function AboutSection({ adminValues }: { adminValues?: AboutPageSettingsAdminValues | null }) {
  const { t } = useI18n();
  const [activeDesktopTab, setActiveDesktopTab] = useState<TabKey>('bio');
  
  const [expandedMobileLawyer, setExpandedMobileLawyer] = useState<number | null>(null);
  const [activeMobileTabs, setActiveMobileTabs] = useState<Record<number, TabKey>>({
    0: 'bio',
  });
  
  const mobileCardRefs = useRef<Array<HTMLDivElement | null>>([]);

  let parsedPayload: Record<string, string> = {};
  if (adminValues?.payload) {
    try {
      parsedPayload = JSON.parse(adminValues.payload);
    } catch (e) {
      console.error(e);
    }
  }

  const lawyers = [
    {
      id: 0,
      initials: 'JS',
      name: parsedPayload.lawyer1Name || t('team.jaime.name'),
      role: t('team.jaime.role'),
      bio1: parsedPayload.lawyer1Bio1 || t('team.jaime.bio1'),
      bio2: parsedPayload.lawyer1Bio2 || t('team.jaime.bio2'),
      formacion: [
        'Abogado, Magíster en Derecho de Familia.',
        'Profesor Universitario en Derecho de Familia y Práctica Profesional.',
        'Formación especializada en Convenio de La Haya (1980) y Convenio de Nueva York (1956).',
      ],
      experiencia: [
        'Cientos de juicios tramitados en Derecho Internacional de Familia.',
        'Ex abogado de la Oficina Internacional de la Corporación de Asistencia Judicial, Autoridad Central para los Convenios de La Haya y Nueva York.',
        'Consultado por Las Últimas Noticias y otros medios nacionales en casos de sustracción internacional y custodia transfronteriza.',
        'Integrante de una extensa red internacional de abogados dedicados al derecho de familia.',
      ],
      contacto: primaryContact.email,
      image: '/jaime-soto.png',
      imageAlt: 'Jaime Soto Silva - Familia Internacional',
    },
  ] as const;

  const activeProfile = lawyers[0];
  
  const formatRole = (role: string) =>
    role
      .replace(/^Socio Fundador\s*[—-]\s*/i, '')
      .replace(/^Founding Partner\s*[—-]\s*/i, '');

  const toggleMobileLawyer = (lawyerId: number, isExpanded: boolean) => {
    setExpandedMobileLawyer(isExpanded ? null : lawyerId);

    if (!isExpanded) {
      window.requestAnimationFrame(() => {
        mobileCardRefs.current[lawyerId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  const setMobileTab = (lawyerId: number, tab: TabKey) => {
    setActiveMobileTabs((prev) => ({ ...prev, [lawyerId]: tab }));
  };

  const renderTabContent = (profile: typeof lawyers[number], activeTab: TabKey) => {
    switch (activeTab) {
      case 'bio':
        return (
          <div className="prose prose-base max-w-none space-y-5 text-body leading-relaxed text-[#333333]">
            <ReactMarkdown>{profile.bio1}</ReactMarkdown>
            <ReactMarkdown>{profile.bio2}</ReactMarkdown>
          </div>
        );
      case 'formacion':
        return (
          <ul className="list-disc space-y-4 pl-5 text-body text-[#333333] leading-relaxed">
            {profile.formacion.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      case 'experiencia':
        return (
          <ul className="list-disc space-y-4 pl-5 text-body text-[#333333] leading-relaxed">
            {profile.experiencia.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      case 'contacto':
        return (
          <div className="text-body text-[#555555]">
            <p>Para consultas directas, puede comunicarse a través del siguiente correo:</p>
            <a href={`mailto:${profile.contacto}`} className="mt-3 inline-block font-semibold text-[var(--color-primary)] hover:underline">
              {profile.contacto}
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className={`relative z-10 w-full overflow-hidden border-t border-[#07234c]/5 bg-white py-24 text-[#07234c] md:py-32 ${HOME_SECTION_ANCHOR_CLASS}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={resolveSiteAssetSrc('/santiago_las_condes.png')}
          alt="Santiago Las Condes"
          fill
          className="object-cover object-center opacity-[0.08] mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] via-[#f8f9fa]/70 to-[#f8f9fa]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="fi-section-header max-w-[65ch]">
          <span className="fi-eyebrow block text-[var(--color-primary)]">
            {t('team.label')}
          </span>
          <p className="mb-3 text-base leading-relaxed text-[#555555] sm:mb-4">
            {t('team.subtitle')}
          </p>
          <h2 id="about-title" className={`max-w-[32ch] ${HOME_SECTION_TITLE_BRAND_CLASS}`}>
            {t('team.title1')}
            {t('team.title2') ? (
              <>
                <br />
                {t('team.title2')}
              </>
            ) : null}
          </h2>
          <p className="fi-section-intro">{t('team.intro')}</p>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="relative mt-8 hidden md:block">
          <article className="relative w-full overflow-hidden rounded-card border border-[#07234c]/10 bg-white shadow-lg">
            <div className="grid items-stretch md:grid-cols-[minmax(0,1fr)_260px] lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_380px]">
              {/* Text Side */}
              <div className="relative z-10 flex h-full flex-col p-8 lg:p-10 xl:p-12">
                <h3 className={`mb-2 ${HOME_CARD_TITLE_CLASS} text-[#07234c]`}>
                  {activeProfile.name}
                </h3>
                <p className="fi-card-meta mb-6 max-w-[54ch] text-sm font-medium uppercase tracking-wide text-[var(--color-primary)] lg:text-base">
                  {formatRole(activeProfile.role)}
                </p>

                {/* Tabs Navigation */}
                <div className="no-scrollbar mb-6 flex gap-5 overflow-x-auto border-b border-[#07234c]/10 lg:gap-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveDesktopTab(tab.key)}
                      className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                        activeDesktopTab === tab.key ? 'text-[#07234c]' : 'text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      {tab.label}
                      {activeDesktopTab === tab.key && (
                        <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1">
                  {renderTabContent(activeProfile, activeDesktopTab)}
                </div>
              </div>

              {/* Image Side */}
              <div className="relative min-h-[360px] h-full bg-[#07234c]">
                <Image
                  src={resolveSiteAssetSrc(activeProfile.image)}
                  alt={activeProfile.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 280px, (min-width: 1024px) 260px, 220px"
                  className="object-cover object-top opacity-90 grayscale saturate-0 brightness-[0.86] contrast-110 transition duration-500"
                  style={{ filter: 'grayscale(1) saturate(0) brightness(0.86) contrast(1.1)' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07234c]/60 via-[#07234c]/10 to-transparent" />
              </div>
            </div>
          </article>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="flex flex-col gap-8 md:hidden">
          {lawyers.map((lawyer) => {
            const isExpanded = expandedMobileLawyer === lawyer.id;
            const currentTab = activeMobileTabs[lawyer.id] || 'bio';
            
            return (
              <div 
                key={lawyer.id} 
                ref={(node) => {
                  mobileCardRefs.current[lawyer.id] = node;
                }}
                className="flex scroll-mt-24 flex-col overflow-hidden rounded-card border border-[#07234c]/10 bg-white shadow-xl"
              >
                {/* Top Image Part */}
                <div className="relative h-[240px] sm:h-[300px] w-full bg-[#f2f2f2]">
                  <Image
                    src={resolveSiteAssetSrc(lawyer.image)}
                    alt={lawyer.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover object-top opacity-90 grayscale saturate-0 brightness-[0.86] contrast-110"
                    style={{ filter: 'grayscale(1) saturate(0) brightness(0.86) contrast(1.1)' }}
                  />
                  <div className="absolute inset-0 bg-[#07234c]/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07234c]/50 via-[#07234c]/5 to-transparent" />
                  
                  {/* Overlay Text */}
                  <div className="absolute bottom-6 left-5 right-5">
                    <span className="mb-2 block text-sm font-semibold text-white/90">
                      {lawyer.name}
                    </span>
                    <h3 className="text-h3 font-bold leading-tight text-white">
                      {formatRole(lawyer.role)}
                    </h3>
                  </div>
                </div>

                {/* Author Bar / Toggle */}
                <button
                  type="button"
                  onClick={() => toggleMobileLawyer(lawyer.id, isExpanded)}
                  className="flex w-full items-center justify-between bg-white px-5 py-4 text-left transition-colors active:bg-gray-50"
                  aria-expanded={isExpanded}
                >
                  <span className="block">
                    <span className="block text-base font-semibold text-brand">
                      {siteConfig.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-gray-500">
                      {isExpanded ? 'Ocultar perfil' : 'Ver perfil completo'}
                    </span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#07234c] text-white text-base font-semibold shadow-md">
                      {lawyer.initials}
                    </span>
                  </span>
                </button>

                {/* Expanded Content */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden bg-white">
                    <div className="px-5 pb-8 pt-2">
                      
                      {/* Mobile Tabs */}
                      <div className="mb-6 flex overflow-x-auto hide-scrollbar space-x-5 border-b border-[#07234c]/10">
                        {tabs.map((tab) => (
                          <button
                            key={tab.key}
                            onClick={() => setMobileTab(lawyer.id, tab.key)}
                            className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative ${
                              currentTab === tab.key ? 'text-[#07234c]' : 'text-gray-400 hover:text-gray-600'
                            }`}
                          >
                            {tab.label}
                            {currentTab === tab.key && (
                              <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Tab Content */}
                      <div className="min-h-[220px]">
                        {renderTabContent(lawyer, currentTab)}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
