import React from 'react';
import { getHomeHeroSettings } from '@/lib/cms/home-hero';
import { getAboutPageSettings } from '@/lib/cms/about-page';
import { getServicesPageSettings } from '@/lib/cms/services-page';
import { getSiteSettings } from '@/lib/cms/site-settings';
import { getSiteSeoSettings } from '@/lib/cms/site-seo';
import SiteEditorTabs from './SiteEditorTabs';
import { Edit3 } from 'lucide-react';

export const metadata = {
  title: 'Editor de Sitio | Panel de Control',
};

export default async function SiteEditorPage() {
  const [homeHeroValues, aboutPageValues, servicesPageValues, siteSettingsValues, seoSettingsValues] = await Promise.all([
    getHomeHeroSettings(),
    getAboutPageSettings(),
    getServicesPageSettings(),
    getSiteSettings(),
    getSiteSeoSettings(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
          <Edit3 className="w-8 h-8 text-brand" />
          Editor de Sitio
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Personaliza los textos, imágenes e información de contacto de las diferentes secciones del sitio.
        </p>
      </div>

      <SiteEditorTabs
        homeHeroValues={homeHeroValues}
        aboutPageValues={aboutPageValues}
        servicesPageValues={servicesPageValues}
        siteSettingsValues={siteSettingsValues}
        seoSettingsValues={seoSettingsValues}
      />
    </div>
  );
}
