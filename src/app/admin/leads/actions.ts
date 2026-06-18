'use server';

import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';

export async function markLeadAsRead(id: string) {
  await requireAdminSession();

  try {
    const prisma = getPrismaClient();
    await prisma.lead.update({
      where: { id },
      data: { status: 'atendido' },
    });
    revalidatePath('/admin/leads');
    revalidatePath('/admin'); // Update dashboard counter
    return { success: true };
  } catch (error) {
    console.error('Error marking lead as read:', error);
    return { success: false, error: 'No se pudo actualizar el estado del caso.' };
  }
}

export async function deleteLead(id: string) {
  await requireAdminSession();

  try {
    const prisma = getPrismaClient();
    await prisma.lead.delete({
      where: { id },
    });
    revalidatePath('/admin/leads');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error deleting lead:', error);
    return { success: false, error: 'No se pudo eliminar el caso.' };
  }
}
