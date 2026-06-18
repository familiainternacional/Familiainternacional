'use server';

import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import type { ServicesPageSettings } from '@/lib/cms/services-page';

export type ServicesPageSettingsAdminValues = ServicesPageSettings;

export async function updateServicesPageAdminValues(values: ServicesPageSettingsAdminValues) {
  await requireAdminSession();

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
