export const LEAD_STATUSES = [
  'nuevo',
  'pendiente',
  'contactado',
  'atendido',
  'consulta_agendada',
  'cliente',
  'descartado',
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  nuevo: 'Nuevo',
  pendiente: 'Pendiente',
  contactado: 'Contactado',
  atendido: 'Atendido',
  consulta_agendada: 'Consulta agendada',
  cliente: 'Cliente',
  descartado: 'Descartado',
};

export const LEAD_STATUS_STYLES: Record<LeadStatus, string> = {
  nuevo: 'bg-amber-100 text-amber-800 border-amber-200',
  pendiente: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  contactado: 'bg-blue-100 text-blue-800 border-blue-200',
  atendido: 'bg-green-500/10 text-green-600 border-green-500/20',
  consulta_agendada: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  cliente: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  descartado: 'bg-gray-100 text-gray-600 border-gray-200',
};

export const OPEN_LEAD_STATUSES: LeadStatus[] = ['nuevo', 'pendiente', 'contactado'];

export function normalizeLeadStatus(status: string): LeadStatus {
  if ((LEAD_STATUSES as readonly string[]).includes(status)) {
    return status as LeadStatus;
  }

  return 'nuevo';
}

export function getLeadStatusLabel(status: string) {
  return LEAD_STATUS_LABELS[normalizeLeadStatus(status)];
}

export function getLeadStatusStyle(status: string) {
  return LEAD_STATUS_STYLES[normalizeLeadStatus(status)];
}

export function isOpenLeadStatus(status: string) {
  return OPEN_LEAD_STATUSES.includes(normalizeLeadStatus(status));
}
