'use server';

import type { Lead } from '@prisma/client';
import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';
import { LEAD_STATUSES, type LeadStatus, getLeadStatusLabel } from '@/lib/leads/status';
import { getLeadSourceLabel } from '@/lib/leads/source';

export async function getLeadById(id: string): Promise<Lead | null> {
  await requireAdminSession();

  const prisma = getPrismaClient();
  return prisma.lead.findUnique({ where: { id } });
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAdminSession();

  if (!(LEAD_STATUSES as readonly string[]).includes(status)) {
    return { success: false, error: 'Estado inválido.' };
  }

  try {
    const prisma = getPrismaClient();
    await prisma.lead.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/leads');
    revalidatePath(`/admin/leads/${id}`);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error updating lead status:', error);
    return { success: false, error: 'No se pudo actualizar el estado.' };
  }
}

export async function updateLeadNotes(id: string, internalNotes: string) {
  await requireAdminSession();

  try {
    const prisma = getPrismaClient();
    await prisma.lead.update({
      where: { id },
      data: { internalNotes: internalNotes.trim() || null },
    });
    revalidatePath('/admin/leads');
    revalidatePath(`/admin/leads/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating lead notes:', error);
    return { success: false, error: 'No se pudieron guardar las notas.' };
  }
}

/** @deprecated Use updateLeadStatus(id, 'contactado') */
export async function markLeadAsRead(id: string) {
  return updateLeadStatus(id, 'contactado');
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

function escapeCsvValue(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

export async function exportLeadsCsv(): Promise<{ success: true; csv: string } | { success: false; error: string }> {
  await requireAdminSession();

  try {
    const prisma = getPrismaClient();
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'id',
      'fecha',
      'nombre',
      'email',
      'telefono',
      'estado',
      'origen',
      'mensaje',
      'notas_internas',
      'cliengo_contact_id',
    ];

    const rows = leads.map((lead) => [
      lead.id,
      lead.createdAt.toISOString(),
      lead.name,
      lead.email,
      lead.phone ?? '',
      getLeadStatusLabel(lead.status),
      getLeadSourceLabel(lead.leadSource),
      lead.message ?? '',
      lead.internalNotes ?? '',
      lead.cliengoContactId ?? '',
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => escapeCsvValue(String(cell))).join(','))
      .join('\n');

    return { success: true, csv };
  } catch (error) {
    console.error('Error exporting leads:', error);
    return { success: false, error: 'No se pudo exportar la bandeja.' };
  }
}
