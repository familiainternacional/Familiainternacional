'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { AboutPageSettingsAdminValues } from '@/app/admin/nosotros/actions';
import ReactMarkdown from 'react-markdown';

type TabKey = 'bio' | 'formacion' | 'experiencia' | 'contacto';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'bio', label: 'Perfil' },
  { key: 'formacion', label: 'Formación' },
  { key: 'experiencia', label: 'Experiencia' },
  { key: 'contacto', label: 'Contacto' },
];

export default function AboutSection({ adminValues }: { adminValues?: AboutPageSettingsAdminValues | null }) {
  const { t } = useI18n();
  const [activeDesktopLawyer, setActiveDesktopLawyer] = useState<0 | 1>(0);
  const [activeDesktopTab, setActiveDesktopTab] = useState<TabKey>('bio');
  
  const [expandedMobileLawyer, setExpandedMobileLawyer] = useState<number | null>(null);
  const [activeMobileTabs, setActiveMobileTabs] = useState<Record<number, TabKey>>({
    0: 'bio',
    1: 'bio',
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
      initials: 'CR',
      name: parsedPayload.lawyer1Name || t('team.christian.name'),
      role: t('team.christian.role'),
      bio1: parsedPayload.lawyer1Bio1 || t('team.christian.bio1'),
      bio2: parsedPayload.lawyer1Bio2 || t('team.christian.bio2'),
      formacion: [
        'Abogado, Licenciado en Ciencias Jurídicas y Sociales.',
        'Diplomado en Reforma Procesal Penal.',
        'Extensa preparación en litigación oral y estratégica.'
      ],
      experiencia: [
        'Amplia experiencia en litigación compleja en las diversas áreas del Derecho Comercial, Civil y Regulatorio, y en materias administrativas ante la Contraloría General de la República y Tribunales de Contratación Pública.',
        'Experiencia en Derecho Estatutario del Trabajo, con especial énfasis en Estatuto Docente, Estatuto de la Salud y Derecho Administrativo Municipal.',
        'Consultor y asesor legal de empresas nacionales e internacionales.',
        'Abogado litigante con sólida trayectoria ante Tribunales de Garantía, Tribunales de Juicio Oral en lo Penal, Cortes de Apelaciones y Corte Suprema.',
        'Asesoría a empresas en prevención de delitos (Compliance).'
      ],
      contacto: 'contacto@rluabogados.cl',
      image: '/tribunales.jpg',
      imageAlt: 'Tribunales de justicia',
      tags: ['Litigación Civil', 'Derecho Comercial', 'Regulatorio', 'Contraloría'],
    },
    {
      id: 1,
      initials: 'SL',
      name: parsedPayload.lawyer2Name || t('team.sebastian.name'),
      role: t('team.sebastian.role'),
      bio1: parsedPayload.lawyer2Bio1 || t('team.sebastian.bio1'),
      bio2: parsedPayload.lawyer2Bio2 || t('team.sebastian.bio2'),
      formacion: [
        'Abogado, Licenciado en Ciencias Jurídicas.',
        'Magíster en Derecho de la Empresa.',
        'Diplomados en Derecho Corporativo y Compliance Empresarial.'
      ],
      experiencia: [
        'Asesoría estratégica a directorios y gerencias de medianas y grandes empresas.',
        'Especialista en estructuración corporativa, fusiones y adquisiciones.',
        'Prevención de conflictos y negociación de contratos de alta complejidad.'
      ],
      contacto: 'contacto@rluabogados.cl',
      image: '/camara-diputados.jpg',
      imageAlt: 'Cámara de Diputadas y Diputados',
      tags: ['Litigación Estratégica', 'Derecho Corporativo', 'Compliance', 'Regulación'],
    },
  ] as const;

  const activeProfile = lawyers[activeDesktopLawyer];
  
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

  const handleDesktopLawyerChange = (id: 0 | 1) => {
    setActiveDesktopLawyer(id);
    setActiveDesktopTab('bio');
  };

  const setMobileTab = (lawyerId: number, tab: TabKey) => {
    setActiveMobileTabs((prev) => ({ ...prev, [lawyerId]: tab }));
  };

  const renderTabContent = (profile: typeof lawyers[number], activeTab: TabKey) => {
    switch (activeTab) {
      case 'bio':
        return (
          <>
            <div className="space-y-5 prose prose-base max-w-none text-body text-[#333333] leading-relaxed">
              <ReactMarkdown>{profile.bio1}</ReactMarkdown>
              <ReactMarkdown>{profile.bio2}</ReactMarkdown>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#07234c]/10 bg-brand/[0.03] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#555555]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        );
      case 'formacion':
        return (
          <ul className="list-disc space-y-4 pl-5 text-[16px] text-[#333333] leading-relaxed">
            {profile.formacion.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      case 'experiencia':
        return (
          <ul className="list-disc space-y-4 pl-5 text-[16px] text-[#333333] leading-relaxed">
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
      className="relative z-10 w-full overflow-hidden border-t border-[#07234c]/5 bg-white px-5 py-24 text-[#07234c] md:px-12 md:py-32 lg:px-24"
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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col">
        <div className="mb-10 max-w-[65ch] md:mb-12">
          <span className="mb-4 block text-small font-bold uppercase tracking-widest text-[var(--color-primary)]">
            Quiénes Somos
          </span>
          <h2 id="about-title" className="max-w-[18ch] font-serif text-h2 font-semibold leading-snug tracking-tight text-[#07234c]">
            Dos abogados.
            <br />
            Una estrategia.
          </h2>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden lg:block relative">
          <article className="relative overflow-visible rounded-[2rem] border border-[#07234c]/5 bg-white/80 p-4 backdrop-blur-md md:p-6 lg:p-8">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
              <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[var(--color-primary)]/8 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-black/[0.03]" />
            </div>

            <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(360px,0.74fr)] lg:items-center">
              <div className="rounded-[2rem] border border-[#07234c]/5 bg-white p-5 text-[#333333] shadow-md md:p-8 lg:translate-x-2 lg:p-10 flex flex-col h-full">
                <h3 className="mb-2 font-serif text-3xl lg:text-4xl tracking-tight text-[#07234c]">
                  {activeProfile.name}
                </h3>
                <p className="mb-6 max-w-[54ch] text-small font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  {formatRole(activeProfile.role)}
                </p>

                {/* Tabs Navigation */}
                <div className="mb-6 flex space-x-6 border-b border-[#07234c]/10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveDesktopTab(tab.key)}
                      className={`pb-3 text-sm font-semibold transition-colors relative ${
                        activeDesktopTab === tab.key ? 'text-[#07234c]' : 'text-gray-400 hover:text-gray-600'
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

              <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-[#f2f2f2] md:min-h-[360px] lg:-ml-14 lg:h-full">
                <Image
                  src={resolveSiteAssetSrc(activeProfile.image)}
                  alt={activeProfile.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover object-center opacity-90 grayscale saturate-0 brightness-[0.86] contrast-110 transition duration-500"
                  style={{ filter: 'grayscale(1) saturate(0) brightness(0.86) contrast(1.1)' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#07234c]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07234c]/48 via-[#07234c]/10 to-transparent" />
              </div>
            </div>
          </article>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-3xl">
            {lawyers.map((lawyer) => {
              const isActive = activeDesktopLawyer === lawyer.id;

              return (
                <button
                  key={lawyer.id}
                  type="button"
                  onClick={() => handleDesktopLawyerChange(lawyer.id as 0 | 1)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-4 rounded-full border px-4 py-3 text-left transition-colors ${
                    isActive
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                      : 'border-[#07234c]/10 bg-white text-[#333333] hover:border-[#07234c]/20 hover:bg-[#f1f1f1]'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-small font-semibold ${
                      isActive ? 'border-white/25 bg-white/10 text-white' : 'border-[#07234c]/10 bg-[#07234c] text-white'
                    }`}
                  >
                    {lawyer.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-small font-semibold">
                      {lawyer.name}
                    </span>
                    <span className={`block truncate text-xs ${isActive ? 'text-white/75' : 'text-[#666666]'}`}>
                      {formatRole(lawyer.role)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="flex flex-col gap-8 lg:hidden">
          {lawyers.map((lawyer) => {
            const isExpanded = expandedMobileLawyer === lawyer.id;
            const currentTab = activeMobileTabs[lawyer.id] || 'bio';
            
            return (
              <div 
                key={lawyer.id} 
                ref={(node) => {
                  mobileCardRefs.current[lawyer.id] = node;
                }}
                className="flex scroll-mt-24 flex-col overflow-hidden rounded-[2rem] border border-[#07234c]/10 bg-white shadow-xl"
              >
                {/* Top Image Part */}
                <div className="relative aspect-[3/2] sm:aspect-[16/9] w-full bg-[#f2f2f2]">
                  <Image
                    src={resolveSiteAssetSrc(lawyer.image)}
                    alt={lawyer.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover object-center opacity-90 grayscale saturate-0 brightness-[0.86] contrast-110"
                    style={{ filter: 'grayscale(1) saturate(0) brightness(0.86) contrast(1.1)' }}
                  />
                  <div className="absolute inset-0 bg-[#07234c]/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07234c]/48 via-[#07234c]/10 to-transparent" />
                  
                  {/* Overlay Text */}
                  <div className="absolute bottom-6 left-5 right-5">
                    <span className="mb-2 block text-sm font-semibold text-white/90">
                      {lawyer.name}
                    </span>
                    <h3 className="text-3xl font-bold leading-tight text-white">
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
                      Ruiz Leiva Abogados
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
