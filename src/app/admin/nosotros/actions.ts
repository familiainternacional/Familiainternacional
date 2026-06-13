'use server';

import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/db/prisma';

export type AboutPageSettingsAdminValues = {
  payload: string;
};

export async function getAboutPageAdminValues(): Promise<AboutPageSettingsAdminValues> {
  const prisma = await getPrismaClient();
  const settings = await prisma.aboutPageSettings.findUnique({
    where: { id: 'main' },
  });

  return {
    payload: settings?.payload ?? '',
  };
}

export async function updateAboutPageAdminValues(values: AboutPageSettingsAdminValues) {
  const prisma = await getPrismaClient();
  await prisma.aboutPageSettings.upsert({
    where: { id: 'main' },
    update: {
      payload: values.payload,
    },
    create: {
      id: 'main',
      payload: values.payload,
    },
  });

  revalidatePath('/', 'layout');
}
