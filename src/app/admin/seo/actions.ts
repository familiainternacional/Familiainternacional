'use server';

import { cache } from 'react';
import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';
import {
  FAMILIA_INTERNACIONAL_SEO_DEFAULTS,
  resolveSiteSeoDescription,
  resolveSiteSeoTitle,
} from '@/lib/seo/resolve-site-seo';

export type SiteSeoSettingsAdminValues = {
  defaultTitleEs: string;
  defaultDescriptionEs: string;
  defaultOgImage: string;
};

export const getSiteSeoSettingsAdminValues = cache(async (): Promise<SiteSeoSettingsAdminValues> => {
  const prisma = getPrismaClient();
  const data = await prisma.siteSeoSettings.findUnique({
    where: { id: 'main' },
  });
  
  if (!data) {
    return {
      defaultTitleEs: FAMILIA_INTERNACIONAL_SEO_DEFAULTS.defaultTitleEs,
      defaultDescriptionEs: FAMILIA_INTERNACIONAL_SEO_DEFAULTS.defaultDescriptionEs,
      defaultOgImage: '',
    };
  }

  return {
    defaultTitleEs: resolveSiteSeoTitle(data.defaultTitleEs),
    defaultDescriptionEs: resolveSiteSeoDescription(data.defaultDescriptionEs),
    defaultOgImage: data.defaultOgImage || '',
  };
});

export async function updateSiteSeoSettingsAdminValues(values: SiteSeoSettingsAdminValues) {
  await requireAdminSession();
  const prisma = getPrismaClient();

  await prisma.siteSeoSettings.upsert({
    where: { id: 'main' },
    update: {
      siteName: FAMILIA_INTERNACIONAL_SEO_DEFAULTS.siteName,
      titleTemplate: FAMILIA_INTERNACIONAL_SEO_DEFAULTS.titleTemplate,
      defaultTitleEs: values.defaultTitleEs,
      defaultDescriptionEs: values.defaultDescriptionEs,
      defaultOgImage: values.defaultOgImage,
      canonicalBaseUrl: FAMILIA_INTERNACIONAL_SEO_DEFAULTS.canonicalBaseUrl,
    },
    create: {
      id: 'main',
      ...FAMILIA_INTERNACIONAL_SEO_DEFAULTS,
      defaultTitleEs: values.defaultTitleEs,
      defaultDescriptionEs: values.defaultDescriptionEs,
      defaultOgImage: values.defaultOgImage,
    },
  });

  revalidatePath('/', 'layout');
}
