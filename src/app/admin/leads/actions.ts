'use server';

import type { Lead } from '@prisma/client';
import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';
import { LEAD_STATUSES, type LeadStatus, getLeadStatusLabel } from '@/lib/leads/status';
import { getLeadSourceLabel } from '@/lib/leads/source';
import { writeAdminAuditLog, getEntityAuditLogs } from '@/lib/admin/audit-log';
import { isPracticeAreaId, getPracticeAreaLabel } from '@/lib/leads/practice-area';
import { isLeadPriority, getLeadPriorityLabel } from '@/lib/leads/priority';
import { getAssigneeLabel } from '@/config/lead-assignees';
import { ACTIVE_LEADS_WHERE } from '@/lib/leads/query';

async function getActor() {
  return requireAdminSession();
}

export async function getLeadById(id: string): Promise<Lead | null> {
  await requireAdminSession();

  const prisma = getPrismaClient();
  return prisma.lead.findFirst({
    where: { id, ...ACTIVE_LEADS_WHERE },
  });
}

export async function getLeadAuditTrail(leadId: string) {
  await requireAdminSession();
  return getEntityAuditLogs('lead', leadId);
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const actor = await getActor();

  if (!(LEAD_STATUSES as readonly string[]).includes(status)) {
    return { success: false, error: 'Estado inválido.' };
  }

  try {
    const prisma = getPrismaClient();
    const existing = await prisma.lead.findFirst({ where: { id, ...ACTIVE_LEADS_WHERE } });
    if (!existing) {
      return { success: false, error: 'Caso no encontrado.' };
    }

    const contactedAt =
      ['contactado', 'consulta_agendada', 'cliente', 'atendido'].includes(status) && !existing.contactedAt
        ? new Date()
        : existing.contactedAt;

    await prisma.lead.update({
      where: { id },
      data: { status, contactedAt },
    });

    await writeAdminAuditLog(actor, {
      action: 'lead.status_updated',
      entityType: 'lead',
      entityId: id,
      metadata: {
        from: existing.status,
        to: status,
      },
    });

    revalidatePath('/admin/leads');
    revalidatePath(`/admin/leads/${id}`);
    revalidatePath('/admin');
    revalidatePath('/admin/analytics');
    return { success: true };
  } catch (error) {
    console.error('Error updating lead status:', error);
    return { success: false, error: 'No se pudo actualizar el estado.' };
  }
}

export async function updateLeadNotes(id: string, internalNotes: string) {
  const actor = await getActor();

  try {
    const prisma = getPrismaClient();
    const existing = await prisma.lead.findFirst({ where: { id, ...ACTIVE_LEADS_WHERE } });
    if (!existing) {
      return { success: false, error: 'Caso no encontrado.' };
    }

    await prisma.lead.update({
      where: { id },
      data: { internalNotes: internalNotes.trim() || null },
    });

    await writeAdminAuditLog(actor, {
      action: 'lead.notes_updated',
      entityType: 'lead',
      entityId: id,
    });

    revalidatePath('/admin/leads');
    revalidatePath(`/admin/leads/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating lead notes:', error);
    return { success: false, error: 'No se pudieron guardar las notas.' };
  }
}

export async function updateLeadAssignment(id: string, assignedToEmail: string | null) {
  const actor = await getActor();

  try {
    const prisma = getPrismaClient();
    const existing = await prisma.lead.findFirst({ where: { id, ...ACTIVE_LEADS_WHERE } });
    if (!existing) {
      return { success: false, error: 'Caso no encontrado.' };
    }

    const normalized = assignedToEmail?.trim().toLowerCase() || null;

    await prisma.lead.update({
      where: { id },
      data: { assignedToEmail: normalized },
    });

    await writeAdminAuditLog(actor, {
      action: 'lead.assigned',
      entityType: 'lead',
      entityId: id,
      metadata: {
        from: existing.assignedToEmail,
        to: normalized,
        fromLabel: getAssigneeLabel(existing.assignedToEmail),
        toLabel: getAssigneeLabel(normalized),
      },
    });

    revalidatePath('/admin/leads');
    revalidatePath(`/admin/leads/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating lead assignment:', error);
    return { success: false, error: 'No se pudo asignar el caso.' };
  }
}

export async function updateLeadPracticeArea(id: string, practiceArea: string | null) {
  const actor = await getActor();

  if (practiceArea && !isPracticeAreaId(practiceArea)) {
    return { success: false, error: 'Área de práctica inválida.' };
  }

  try {
    const prisma = getPrismaClient();
    const existing = await prisma.lead.findFirst({ where: { id, ...ACTIVE_LEADS_WHERE } });
    if (!existing) {
      return { success: false, error: 'Caso no encontrado.' };
    }

    await prisma.lead.update({
      where: { id },
      data: { practiceArea },
    });

    await writeAdminAuditLog(actor, {
      action: 'lead.practice_area_updated',
      entityType: 'lead',
      entityId: id,
      metadata: {
        from: existing.practiceArea,
        to: practiceArea,
        fromLabel: getPracticeAreaLabel(existing.practiceArea),
        toLabel: getPracticeAreaLabel(practiceArea),
      },
    });

    revalidatePath('/admin/leads');
    revalidatePath(`/admin/leads/${id}`);
    revalidatePath('/admin/analytics');
    return { success: true };
  } catch (error) {
    console.error('Error updating practice area:', error);
    return { success: false, error: 'No se pudo actualizar el área.' };
  }
}

export async function updateLeadPriority(id: string, priority: string) {
  const actor = await getActor();

  if (!isLeadPriority(priority)) {
    return { success: false, error: 'Prioridad inválida.' };
  }

  try {
    const prisma = getPrismaClient();
    const existing = await prisma.lead.findFirst({ where: { id, ...ACTIVE_LEADS_WHERE } });
    if (!existing) {
      return { success: false, error: 'Caso no encontrado.' };
    }

    await prisma.lead.update({
      where: { id },
      data: { priority },
    });

    await writeAdminAuditLog(actor, {
      action: 'lead.priority_updated',
      entityType: 'lead',
      entityId: id,
      metadata: {
        from: existing.priority,
        to: priority,
        fromLabel: getLeadPriorityLabel(existing.priority),
        toLabel: getLeadPriorityLabel(priority),
      },
    });

    revalidatePath('/admin/leads');
    revalidatePath(`/admin/leads/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating lead priority:', error);
    return { success: false, error: 'No se pudo actualizar la prioridad.' };
  }
}

/** @deprecated Use updateLeadStatus(id, 'contactado') */
export async function markLeadAsRead(id: string) {
  return updateLeadStatus(id, 'contactado');
}

export async function deleteLead(id: string) {
  const actor = await getActor();

  try {
    const prisma = getPrismaClient();
    const existing = await prisma.lead.findFirst({ where: { id, ...ACTIVE_LEADS_WHERE } });
    if (!existing) {
      return { success: false, error: 'Caso no encontrado.' };
    }

    await prisma.lead.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await writeAdminAuditLog(actor, {
      action: 'lead.soft_deleted',
      entityType: 'lead',
      entityId: id,
      metadata: { name: existing.name, email: existing.email },
    });

    revalidatePath('/admin/leads');
    revalidatePath('/admin');
    revalidatePath('/admin/analytics');
    return { success: true };
  } catch (error) {
    console.error('Error archiving lead:', error);
    return { success: false, error: 'No se pudo archivar el caso.' };
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
      where: ACTIVE_LEADS_WHERE,
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'id',
      'fecha',
      'nombre',
      'email',
      'telefono',
      'estado',
      'prioridad',
      'origen',
      'area_practica',
      'responsable',
      'mensaje',
      'notas_internas',
      'cliengo_contact_id',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'landing_path',
      'referrer',
    ];

    const rows = leads.map((lead) => [
      lead.id,
      lead.createdAt.toISOString(),
      lead.name,
      lead.email,
      lead.phone ?? '',
      getLeadStatusLabel(lead.status),
      getLeadPriorityLabel(lead.priority),
      getLeadSourceLabel(lead.leadSource),
      getPracticeAreaLabel(lead.practiceArea),
      getAssigneeLabel(lead.assignedToEmail),
      lead.message ?? '',
      lead.internalNotes ?? '',
      lead.cliengoContactId ?? '',
      lead.utmSource ?? '',
      lead.utmMedium ?? '',
      lead.utmCampaign ?? '',
      lead.landingPath ?? '',
      lead.referrer ?? '',
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
