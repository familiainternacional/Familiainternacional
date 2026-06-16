import { getPrismaClient } from '@/lib/db/prisma';
import LeadsClient from './LeadsClient';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const prisma = getPrismaClient();
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bandeja de Casos</h1>
          <p className="text-gray-600 mt-1">
            Gestione las solicitudes de evaluación de casos recibidas desde el sitio web.
          </p>
        </div>
        <div className="bg-white border border-[#07234c]/10 px-4 py-2 rounded-lg">
          <span className="text-gray-600 text-sm mr-2">Total recibidos:</span>
          <span className="font-bold text-[var(--color-primary)]">{leads.length}</span>
        </div>
      </div>

      <LeadsClient initialLeads={leads} />
    </div>
  );
}
