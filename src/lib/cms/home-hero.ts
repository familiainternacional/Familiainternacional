import { getPrismaClient } from '@/lib/db/prisma';

export type HomeHeroSettings = {
  imageUrl: string;
  titleLine1Es: string;
  titleLine2Es: string;
  subtitleEs: string;
};

export async function getHomeHeroSettings(): Promise<HomeHeroSettings> {
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
