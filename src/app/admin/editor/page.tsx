import React from 'react';
import { getHomeHeroAdminValues } from '@/app/admin/inicio/actions';
import { getAboutPageAdminValues } from '@/app/admin/nosotros/actions';
import { getServicesPageAdminValues } from '@/app/admin/servicios/actions';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { getSiteSeoSettingsAdminValues } from '@/app/admin/seo/actions';
import SiteEditorTabs from './SiteEditorTabs';
import { Edit3 } from 'lucide-react';

export const metadata = {
  title: 'Editor de Sitio | Panel de Control',
};

export default async function SiteEditorPage() {
  const [homeHeroValues, aboutPageValues, servicesPageValues, siteSettingsValues, seoSettingsValues] = await Promise.all([
    getHomeHeroAdminValues(),
    getAboutPageAdminValues(),
    getServicesPageAdminValues(),
    getSiteSettingsAdminValues(),
    getSiteSeoSettingsAdminValues(),
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
