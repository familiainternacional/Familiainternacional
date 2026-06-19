'use client';

import { getLeadStatusLabel, getLeadStatusStyle } from '@/lib/leads/status';

export default function LeadStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getLeadStatusStyle(status)}`}
    >
      {getLeadStatusLabel(status)}
    </span>
  );
}
