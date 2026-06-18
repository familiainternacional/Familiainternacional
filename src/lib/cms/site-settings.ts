import { cache } from 'react';
import { getPrismaClient } from '@/lib/db/prisma';

export type SiteSettings = {
  whatsappNumber: string;
  primaryPhone: string;
  primaryEmail: string;
  officeAddress: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
};

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
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
});
