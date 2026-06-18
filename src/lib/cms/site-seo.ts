import { cache } from 'react';
import { getPrismaClient } from '@/lib/db/prisma';
import {
  FAMILIA_INTERNACIONAL_SEO_DEFAULTS,
  resolveSiteSeoDescription,
  resolveSiteSeoTitle,
} from '@/lib/seo/resolve-site-seo';

export type SiteSeoSettings = {
  defaultTitleEs: string;
  defaultDescriptionEs: string;
  defaultOgImage: string;
};

export const getSiteSeoSettings = cache(async (): Promise<SiteSeoSettings> => {
  const prisma = getPrismaClient();
  const data = await prisma.siteSeoSettings.findUnique({
    where: { id: 'main' },
  });

  if (!data) {
    return {
      defaultTitleEs: FAMILIA_INTERNACIONAL_SEO_DEFAULTS.defaultTitleEs,
      defaultDescriptionEs: FAMILIA_INTERNACIONAL_SEO_DEFAULTS.defaultDescriptionEs,
      defaultOgImage: '',
    };
  }

  return {
    defaultTitleEs: resolveSiteSeoTitle(data.defaultTitleEs),
    defaultDescriptionEs: resolveSiteSeoDescription(data.defaultDescriptionEs),
    defaultOgImage: data.defaultOgImage || '',
  };
});
