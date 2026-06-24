export type AuditAction =
  | 'lead.status_updated'
  | 'lead.notes_updated'
  | 'lead.assigned'
  | 'lead.practice_area_updated'
  | 'lead.priority_updated'
  | 'lead.soft_deleted'
  | 'lead.restored';

export const AUDIT_ACTION_LABELS: Record<AuditAction, string> = {
  'lead.status_updated': 'Estado actualizado',
  'lead.notes_updated': 'Notas internas actualizadas',
  'lead.assigned': 'Responsable asignado',
  'lead.practice_area_updated': 'Área de práctica actualizada',
  'lead.priority_updated': 'Prioridad actualizada',
  'lead.soft_deleted': 'Caso archivado',
  'lead.restored': 'Caso restaurado',
};
