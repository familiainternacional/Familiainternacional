import { getLeadAnalyticsSnapshot, type LeadAnalyticsSnapshot } from '@/lib/admin/lead-analytics';
import { getLeadStatusLabel } from '@/lib/leads/status';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, BarChart3 } from 'lucide-react';

export const metadata = {
  title: 'Analytics CRM | Panel de Control',
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Error desconocido al cargar los datos.';
}

function AdminAnalyticsErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-card border border-red-200 bg-red-50 p-6 text-red-950">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden />
        <div>
          <h1 className="text-xl font-bold">No se pudo cargar Analytics CRM</h1>
          <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-red-900">
            La sesion admin esta activa, pero el panel no logro consultar la base de datos.
            Revisa DATABASE_URL, la configuracion SSL y el pooler de Supabase en produccion.
          </p>
          <p className="mt-4 rounded-lg bg-white/70 p-3 text-xs font-medium text-red-900">
            Detalle tecnico: {message}
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="bg-white rounded-card border border-[#07234c]/10 p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function DistributionTable({
  title,
  rows,
  labelKey,
  valueKey,
}: {
  title: string;
  rows: Array<Record<string, string | number>>;
  labelKey: string;
  valueKey: string;
}) {
  const max = Math.max(...rows.map((row) => Number(row[valueKey])), 1);

  return (
    <section className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">Sin datos todavía.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => {
            const count = Number(row[valueKey]);
            const width = Math.max(8, Math.round((count / max) * 100));

            return (
              <div key={String(row[labelKey])}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700">{String(row[labelKey])}</span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${width}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

async function getAdminAnalytics(): Promise<LeadAnalyticsSnapshot> {
  return getLeadAnalyticsSnapshot();
}

export default async function AdminAnalyticsPage() {
  let analytics: LeadAnalyticsSnapshot;

  try {
    analytics = await getAdminAnalytics();
  } catch (error) {
    console.error('[admin-analytics] No se pudo cargar Analytics CRM.', error);
    return <AdminAnalyticsErrorState message={getErrorMessage(error)} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-brand" />
            Analytics CRM
          </h1>
          <p className="mt-2 text-gray-600">
            Embudo de intake, atribución de campañas y desempeño operativo del estudio.
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center justify-center rounded-lg bg-[#07234c] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d3566]"
        >
          Ir a bandeja de casos
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Casos activos" value={analytics.totals.active} />
        <MetricCard label="Nuevos / pendientes" value={analytics.totals.nuevo} />
        <MetricCard
          label="SLA vencido (+24h)"
          value={analytics.totals.slaBreaches}
          hint="Sin primer contacto registrado"
        />
        <MetricCard label="Últimos 30 días" value={analytics.totals.last30Days} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Contactados" value={analytics.totals.contactado} />
        <MetricCard label="Consulta agendada" value={analytics.totals.consultaAgendada} />
        <MetricCard label="Clientes" value={analytics.totals.cliente} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DistributionTable
          title="Embudo por estado"
          rows={analytics.byStatus.map((row) => ({
            label: getLeadStatusLabel(row.status),
            count: row.count,
          }))}
          labelKey="label"
          valueKey="count"
        />
        <DistributionTable
          title="Origen del lead"
          rows={analytics.bySource.map((row) => ({
            label: row.label,
            count: row.count,
          }))}
          labelKey="label"
          valueKey="count"
        />
        <DistributionTable
          title="Área de práctica"
          rows={analytics.byPracticeArea.map((row) => ({
            label: row.label,
            count: row.count,
          }))}
          labelKey="label"
          valueKey="count"
        />
        <DistributionTable
          title="Top campañas UTM (30 días histórico)"
          rows={analytics.byCampaign.map((row) => ({
            label: row.campaign,
            count: row.count,
          }))}
          labelKey="label"
          valueKey="count"
        />
      </div>
    </div>
  );
}