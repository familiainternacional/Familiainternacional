'use client';

import React, { useState } from 'react';
import HomeHeroForm from '@/app/admin/inicio/HomeHeroForm';
import AboutPageForm from '@/app/admin/nosotros/AboutPageForm';
import ServicesPageForm from '@/app/admin/servicios/ServicesPageForm';
import SiteSettingsForm from '@/app/admin/ajustes/SiteSettingsForm';
import SeoSettingsForm from '@/app/admin/seo/SeoSettingsForm';
import MediaLibrary from '@/app/admin/media/MediaLibrary';
import { HomeHeroSettingsAdminValues } from '@/app/admin/inicio/actions';
import { AboutPageSettingsAdminValues } from '@/app/admin/nosotros/actions';
import { ServicesPageSettingsAdminValues } from '@/app/admin/servicios/actions';
import { SiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { SiteSeoSettingsAdminValues } from '@/app/admin/seo/actions';

type Tab = 'inicio' | 'nosotros' | 'servicios' | 'ajustes' | 'seo' | 'medios';

export default function SiteEditorTabs({
  homeHeroValues,
  aboutPageValues,
  servicesPageValues,
  siteSettingsValues,
  seoSettingsValues,
}: {
  homeHeroValues: HomeHeroSettingsAdminValues;
  aboutPageValues: AboutPageSettingsAdminValues;
  servicesPageValues: ServicesPageSettingsAdminValues;
  siteSettingsValues: SiteSettingsAdminValues;
  seoSettingsValues: SiteSeoSettingsAdminValues;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('inicio');

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('inicio')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              activeTab === 'inicio'
                ? 'border-black text-brand'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Inicio (Hero)
          </button>
          <button
            onClick={() => setActiveTab('nosotros')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              activeTab === 'nosotros'
                ? 'border-black text-brand'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Nosotros
          </button>
          <button
            onClick={() => setActiveTab('servicios')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              activeTab === 'servicios'
                ? 'border-black text-brand'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Servicios
          </button>
          <button
            onClick={() => setActiveTab('ajustes')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              activeTab === 'ajustes'
                ? 'border-black text-brand'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Ajustes y Contacto
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              activeTab === 'seo'
                ? 'border-black text-brand'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            SEO Global
          </button>
          <button
            onClick={() => setActiveTab('medios')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              activeTab === 'medios'
                ? 'border-black text-brand'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Galería de Medios
          </button>
        </nav>
      </div>

      {/* Active Tab Content */}
      <div className="pt-4">
        {activeTab === 'inicio' && <HomeHeroForm initialValues={homeHeroValues} />}
        {activeTab === 'nosotros' && <AboutPageForm initialValues={aboutPageValues} />}
        {activeTab === 'servicios' && <ServicesPageForm initialValues={servicesPageValues} />}
        {activeTab === 'ajustes' && <SiteSettingsForm initialValues={siteSettingsValues} />}
        {activeTab === 'seo' && <SeoSettingsForm initialValues={seoSettingsValues} />}
        {activeTab === 'medios' && <MediaLibrary />}
      </div>
    </div>
  );
}
