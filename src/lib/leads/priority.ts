export const LEAD_PRIORITIES = ['normal', 'high', 'urgent'] as const;

export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

const PRIORITY_LABELS: Record<LeadPriority, string> = {
  normal: 'Normal',
  high: 'Alta',
  urgent: 'Urgente',
};

export function getLeadPriorityLabel(priority: string) {
  return PRIORITY_LABELS[priority as LeadPriority] ?? priority;
}

export function isLeadPriority(value: string): value is LeadPriority {
  return (LEAD_PRIORITIES as readonly string[]).includes(value);
}
