import { getPrismaClient } from '@/lib/db/prisma';

export type ServicesPageSettings = {
  payload: string;
};

export async function getServicesPageSettings(): Promise<ServicesPageSettings> {
  const prisma = await getPrismaClient();
  const settings = await prisma.servicesPageSettings.findUnique({
    where: { id: 'main' },
  });

  return {
    payload: settings?.payload ?? '',
  };
}
