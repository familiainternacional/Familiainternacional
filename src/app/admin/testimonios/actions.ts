'use server';

import { revalidatePath } from 'next/cache';
import { getPrismaClient } from '@/lib/db/prisma';

export async function getTestimonials() {
  const prisma = await getPrismaClient();
  return prisma.testimonial.findMany({
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
  });
}

export async function getTestimonialById(id: string) {
  const prisma = await getPrismaClient();
  return prisma.testimonial.findUnique({
    where: { id },
  });
}

export async function createTestimonial(data: import("@prisma/client").Prisma.TestimonialCreateInput) {
  const prisma = await getPrismaClient();
  const result = await prisma.testimonial.create({
    data,
  });
  revalidatePath('/', 'layout');
  return result;
}

export async function updateTestimonial(id: string, data: import("@prisma/client").Prisma.TestimonialUpdateInput) {
  const prisma = await getPrismaClient();
  const result = await prisma.testimonial.update({
    where: { id },
    data,
  });
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTestimonial(id: string) {
  const prisma = await getPrismaClient();
  await prisma.testimonial.delete({
    where: { id },
  });
  revalidatePath('/', 'layout');
}
