'use server';

import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import type { AboutPageSettings } from '@/lib/cms/about-page';

export type AboutPageSettingsAdminValues = AboutPageSettings;

export async function updateAboutPageAdminValues(values: AboutPageSettingsAdminValues) {
  await requireAdminSession();

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
