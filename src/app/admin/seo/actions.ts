'use server';

import { cache } from 'react';
import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';

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
      defaultTitleEs: '',
      defaultDescriptionEs: '',
      defaultOgImage: '',
    };
  }

  return {
    defaultTitleEs: data.defaultTitleEs || '',
    defaultDescriptionEs: data.defaultDescriptionEs || '',
    defaultOgImage: data.defaultOgImage || '',
  };
});

export async function updateSiteSeoSettingsAdminValues(values: SiteSeoSettingsAdminValues) {
  await requireAdminSession();
  const prisma = getPrismaClient();

  await prisma.siteSeoSettings.upsert({
    where: { id: 'main' },
    update: {
      defaultTitleEs: values.defaultTitleEs,
      defaultDescriptionEs: values.defaultDescriptionEs,
      defaultOgImage: values.defaultOgImage,
    },
    create: {
      id: 'main',
      defaultTitleEs: values.defaultTitleEs,
      defaultDescriptionEs: values.defaultDescriptionEs,
      defaultOgImage: values.defaultOgImage,
    },
  });

  revalidatePath('/', 'layout');
}
