const PRIORITY_STYLES = {
  normal: 'bg-gray-100 text-gray-700',
  high: 'bg-amber-100 text-amber-800',
  urgent: 'bg-red-100 text-red-800',
} as const;

const PRIORITY_LABELS = {
  normal: 'Normal',
  high: 'Alta',
  urgent: 'Urgente',
} as const;

export default function LeadPriorityBadge({ priority }: { priority: string }) {
  const key = (priority in PRIORITY_STYLES ? priority : 'normal') as keyof typeof PRIORITY_STYLES;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_STYLES[key]}`}
    >
      {PRIORITY_LABELS[key]}
    </span>
  );
}
