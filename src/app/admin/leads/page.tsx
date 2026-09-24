import { AlertTriangle } from 'lucide-react';
import type { Lead } from '@prisma/client';
import { getPrismaClient } from '@/lib/db/prisma';
import { ACTIVE_LEADS_WHERE } from '@/lib/leads/query';
import { getLeadAssignees } from '@/config/lead-assignees';
import LeadsClient from './LeadsClient';

export const dynamic = 'force-dynamic';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Error desconocido al cargar los datos.';
}

function AdminLeadsErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-card border border-red-200 bg-red-50 p-6 text-red-950">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden />
        <div>
          <h1 className="text-xl font-bold">No se pudo cargar la bandeja de casos</h1>
          <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-red-900">
            El acceso administrador esta activo, pero el panel no logro consultar la base de datos.
            Revisa las variables de entorno de produccion, especialmente DATABASE_URL y la conexion SSL
            del pooler de Supabase.
          </p>
          <p className="mt-4 rounded-lg bg-white/70 p-3 text-xs font-medium text-red-900">
            Detalle tecnico: {message}
          </p>
        </div>
      </div>
    </div>
  );
}

async function getAdminLeads(): Promise<Lead[]> {
  const prisma = getPrismaClient();
  return prisma.lead.findMany({
    where: ACTIVE_LEADS_WHERE,
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminLeadsPage() {
  let leads: Lead[];

  try {
    leads = await getAdminLeads();
  } catch (error) {
    console.error('[admin-leads] No se pudo cargar la bandeja de casos.', error);
    return <AdminLeadsErrorState message={getErrorMessage(error)} />;
  }

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

      <LeadsClient initialLeads={leads} assignees={getLeadAssignees()} />
    </div>
  );
}