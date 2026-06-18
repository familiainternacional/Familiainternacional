'use server';

import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';
import { FAMILIA_INTERNACIONAL_SEO_DEFAULTS } from '@/lib/seo/resolve-site-seo';
import type { SiteSeoSettings } from '@/lib/cms/site-seo';

export type SiteSeoSettingsAdminValues = SiteSeoSettings;

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
