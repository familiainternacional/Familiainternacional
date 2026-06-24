export type LeadAssignee = {
  email: string;
  label: string;
};

const DEFAULT_ASSIGNEES: LeadAssignee[] = [
  { email: 'contacto@familiainternacional.cl', label: 'Intake — Equipo general' },
];

export function getLeadAssignees(): LeadAssignee[] {
  const raw = process.env.ADMIN_LEAD_ASSIGNEES?.trim();
  if (!raw) return DEFAULT_ASSIGNEES;

  const parsed = raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [email, ...labelParts] = entry.split(':');
      const label = labelParts.join(':').trim();
      return {
        email: email.trim().toLowerCase(),
        label: label || email.trim(),
      };
    })
    .filter((entry) => entry.email.includes('@'));

  return parsed.length > 0 ? parsed : DEFAULT_ASSIGNEES;
}

export function getAssigneeLabel(email: string | null | undefined) {
  if (!email) return 'Sin asignar';
  return getLeadAssignees().find((assignee) => assignee.email === email)?.label ?? email;
}
