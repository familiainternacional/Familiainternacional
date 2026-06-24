import type { Lead } from '@prisma/client';

export const SLA_CONTACT_HOURS = 24;

export function isLeadActive(lead: Pick<Lead, 'deletedAt'>) {
  return lead.deletedAt == null;
}

export function isLeadSlaBreached(lead: Pick<Lead, 'status' | 'createdAt' | 'contactedAt' | 'deletedAt'>) {
  if (lead.deletedAt) return false;
  if (lead.contactedAt) return false;
  if (!['nuevo', 'pendiente'].includes(lead.status)) return false;

  const ageMs = Date.now() - new Date(lead.createdAt).getTime();
  return ageMs > SLA_CONTACT_HOURS * 60 * 60 * 1000;
}

export function getLeadSlaLabel(lead: Pick<Lead, 'status' | 'createdAt' | 'contactedAt' | 'deletedAt'>) {
  if (isLeadSlaBreached(lead)) {
    return `Sin contacto (+${SLA_CONTACT_HOURS}h)`;
  }

  if (lead.contactedAt) {
    return 'Contactado';
  }

  return 'En plazo';
}
