import type { AdminAuditLog } from '@prisma/client';
import { AUDIT_ACTION_LABELS } from '@/lib/admin/audit-log-labels';

function formatMetadata(metadata: AdminAuditLog['metadata']) {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return null;
  }

  const record = metadata as Record<string, unknown>;
  const from = record.fromLabel ?? record.from;
  const to = record.toLabel ?? record.to;

  if (from != null && to != null) {
    return `${String(from)} → ${String(to)}`;
  }

  return null;
}

export default function LeadActivityLog({ entries }: { entries: AdminAuditLog[] }) {
  if (entries.length === 0) {
    return (
      <section className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Historial de actividad</h2>
        <p className="text-sm text-gray-500">Aún no hay cambios registrados en este caso.</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Historial de actividad</h2>
      <ol className="space-y-4">
        {entries.map((entry) => {
          const detail = formatMetadata(entry.metadata);
          const label =
            AUDIT_ACTION_LABELS[entry.action as keyof typeof AUDIT_ACTION_LABELS] ?? entry.action;

          return (
            <li key={entry.id} className="border-l-2 border-brand/30 pl-4">
              <p className="text-sm font-medium text-gray-900">{label}</p>
              <p className="text-xs text-gray-500 mt-1">
                {entry.actorEmail} ·{' '}
                {new Intl.DateTimeFormat('es-CL', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(entry.createdAt))}
              </p>
              {detail && <p className="text-sm text-gray-600 mt-1">{detail}</p>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
