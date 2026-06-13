'use server';

import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/db/prisma';

export type ServicesPageSettingsAdminValues = {
  payload: string;
};

export async function getServicesPageAdminValues(): Promise<ServicesPageSettingsAdminValues> {
  const prisma = await getPrismaClient();
  const settings = await prisma.servicesPageSettings.findUnique({
    where: { id: 'main' },
  });

  return {
    payload: settings?.payload ?? '',
  };
}

export async function updateServicesPageAdminValues(values: ServicesPageSettingsAdminValues) {
  const prisma = await getPrismaClient();
  await prisma.servicesPageSettings.upsert({
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
