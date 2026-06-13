'use server';

import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/db/prisma';

export type SiteSettingsAdminValues = {
  whatsappNumber: string;
  primaryPhone: string;
  primaryEmail: string;
  officeAddress: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
};

export async function getSiteSettingsAdminValues(): Promise<SiteSettingsAdminValues> {
  const prisma = await getPrismaClient();
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'main' },
  });

  return {
    whatsappNumber: settings?.whatsappNumber ?? '',
    primaryPhone: settings?.primaryPhone ?? '',
    primaryEmail: settings?.primaryEmail ?? '',
    officeAddress: settings?.officeAddress ?? '',
    instagramUrl: settings?.instagramUrl ?? '',
    facebookUrl: settings?.facebookUrl ?? '',
    linkedinUrl: settings?.linkedinUrl ?? '',
  };
}

export async function updateSiteSettingsAdminValues(values: SiteSettingsAdminValues) {
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
