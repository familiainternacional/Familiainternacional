'use server';

import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/db/prisma';

export type HomeHeroSettingsAdminValues = {
  imageUrl: string;
  titleLine1Es: string;
  titleLine2Es: string;
  subtitleEs: string;
};

export async function getHomeHeroAdminValues(): Promise<HomeHeroSettingsAdminValues> {
  const prisma = await getPrismaClient();
  const settings = await prisma.homeHeroSettings.findUnique({
    where: { id: 'main' },
  });

  return {
    imageUrl: settings?.imageUrl ?? '',
    titleLine1Es: settings?.titleLine1Es ?? '',
    titleLine2Es: settings?.titleLine2Es ?? '',
    subtitleEs: settings?.subtitleEs ?? '',
  };
}

export async function updateHomeHeroAdminValues(values: HomeHeroSettingsAdminValues) {
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
