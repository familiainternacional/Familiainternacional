import { getPrismaClient } from '@/lib/db/prisma';

export type AboutPageSettings = {
  payload: string;
};

export async function getAboutPageSettings(): Promise<AboutPageSettings> {
  const prisma = await getPrismaClient();
  const settings = await prisma.aboutPageSettings.findUnique({
    where: { id: 'main' },
  });

  return {
    payload: settings?.payload ?? '',
  };
}
