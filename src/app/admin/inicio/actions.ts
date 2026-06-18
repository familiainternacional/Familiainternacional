'use server';

import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import type { HomeHeroSettings } from '@/lib/cms/home-hero';

export type HomeHeroSettingsAdminValues = HomeHeroSettings;

export async function updateHomeHeroAdminValues(values: HomeHeroSettingsAdminValues) {
  await requireAdminSession();

  const prisma = await getPrismaClient();
  await prisma.homeHeroSettings.upsert({
    where: { id: 'main' },
    update: {
      imageUrl: values.imageUrl,
      titleLine1Es: values.titleLine1Es,
      titleLine2Es: values.titleLine2Es,
      subtitleEs: values.subtitleEs,
    },
    create: {
      id: 'main',
      imageUrl: values.imageUrl,
      titleLine1Es: values.titleLine1Es,
      titleLine2Es: values.titleLine2Es,
      subtitleEs: values.subtitleEs,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/inicio');
}
