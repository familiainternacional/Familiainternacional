'use server';

import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import type { SiteSettings } from '@/lib/cms/site-settings';

export type SiteSettingsAdminValues = SiteSettings;

export async function updateSiteSettingsAdminValues(values: SiteSettingsAdminValues) {
  await requireAdminSession();

  const prisma = await getPrismaClient();
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {
      whatsappNumber: values.whatsappNumber,
      primaryPhone: values.primaryPhone,
      primaryEmail: values.primaryEmail,
      officeAddress: values.officeAddress,
      instagramUrl: values.instagramUrl,
      facebookUrl: values.facebookUrl,
      linkedinUrl: values.linkedinUrl,
    },
    create: {
      id: 'main',
      whatsappNumber: values.whatsappNumber,
      primaryPhone: values.primaryPhone,
      primaryEmail: values.primaryEmail,
      officeAddress: values.officeAddress,
      instagramUrl: values.instagramUrl,
      facebookUrl: values.facebookUrl,
      linkedinUrl: values.linkedinUrl,
    },
  });

  revalidatePath('/', 'layout');
}
