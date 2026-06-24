'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Lead } from '@prisma/client';
import { Check, Trash2, Loader2, ExternalLink, Download, Eye, AlertTriangle } from 'lucide-react';
import { deleteLead, exportLeadsCsv, updateLeadStatus } from './actions';
import LeadStatusBadge from './LeadStatusBadge';
import LeadPriorityBadge from './LeadPriorityBadge';
import { LEAD_STATUSES, getLeadStatusLabel } from '@/lib/leads/status';
import { getLeadSourceLabel } from '@/lib/leads/source';
import { getCliengoContactPanelUrl } from '@/lib/integrations/cliengo-crm';
import { getAssigneeLabel, type LeadAssignee } from '@/config/lead-assignees';
import { getPracticeAreaLabel, PRACTICE_AREAS } from '@/lib/leads/practice-area';
import { isLeadSlaBreached } from '@/lib/leads/sla';

type StatusFilter = 'all' | (typeof LEAD_STATUSES)[number];
type SourceFilter = 'all' | string;
type AssigneeFilter = 'all' | 'unassigned' | string;
type PracticeFilter = 'all' | string;
type SlaFilter = 'all' | 'breached' | 'ok';

export default function LeadsClient({
  initialLeads,
  assignees,
}: {
  initialLeads: Lead[];
  assignees: LeadAssignee[];
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<AssigneeFilter>('all');
  const [practiceFilter, setPracticeFilter] = useState<PracticeFilter>('all');
  const [slaFilter, setSlaFilter] = useState<SlaFilter>('all');
  const [search, setSearch] = useState('');
  const [exporting, setExporting] = useState(false);

  const sourceOptions = useMemo(() => {
    const values = new Set(leads.map((lead) => lead.leadSource));
    return Array.from(values).sort();
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
      if (sourceFilter !== 'all' && lead.leadSource !== sourceFilter) return false;
      if (assigneeFilter === 'unassigned' && lead.assignedToEmail) return false;
      if (assigneeFilter !== 'all' && assigneeFilter !== 'unassigned' && lead.assignedToEmail !== assigneeFilter) {
        return false;
      }
      if (practiceFilter !== 'all' && (lead.practiceArea ?? '') !== practiceFilter) return false;
      if (slaFilter === 'breached' && !isLeadSlaBreached(lead)) return false;
      if (slaFilter === 'ok' && isLeadSlaBreached(lead)) return false;

      if (!query) return true;

      return (
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (lead.phone ?? '').toLowerCase().includes(query) ||
        (lead.message ?? '').toLowerCase().includes(query)
      );
    });
  }, [leads, search, sourceFilter, statusFilter, assigneeFilter, practiceFilter, slaFilter]);

  const handleQuickContact = async (id: string) => {
    setLoadingId(id);
    const result = await updateLeadStatus(id, 'contactado');
    if (result.success) {
      setLeads((current) =>
        current.map((lead) => (lead.id === id ? { ...lead, status: 'contactado' } : lead)),
      );
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Archivar este caso?')) {
      return;
    }

    setLoadingId(id);
    const result = await deleteLead(id);
    if (result.success) {
      setLeads((current) => current.filter((lead) => lead.id !== id));
    }
    setLoadingId(null);
  };

  const handleExport = async () => {
    setExporting(true);
    const result = await exportLeadsCsv();
    setExporting(false);

    if (!result.success) {
      alert(result.error);
      return;
    }

    const blob = new Blob([result.csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `casos-familia-internacional-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-3 flex-1">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Buscar</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nombre, email, teléfono..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Estado</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="all">Todos</option>
              {LEAD_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {getLeadStatusLabel(status)}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Origen</span>
            <select
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value as SourceFilter)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="all">Todos</option>
              {sourceOptions.map((source) => (
                <option key={source} value={source}>
                  {getLeadSourceLabel(source)}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Responsable</span>
            <select
              value={assigneeFilter}
              onChange={(event) => setAssigneeFilter(event.target.value as AssigneeFilter)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="all">Todos</option>
              <option value="unassigned">Sin asignar</option>
              {assignees.map((assignee) => (
                <option key={assignee.email} value={assignee.email}>
                  {assignee.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Área</span>
            <select
              value={practiceFilter}
              onChange={(event) => setPracticeFilter(event.target.value as PracticeFilter)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="all">Todas</option>
              {PRACTICE_AREAS.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">SLA</span>
            <select
              value={slaFilter}
              onChange={(event) => setSlaFilter(event.target.value as SlaFilter)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="all">Todos</option>
              <option value="breached">Vencido (+24h)</option>
              <option value="ok">En plazo</option>
            </select>
          </label>

          <div className="flex items-end sm:col-span-2 xl:col-span-1">
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#07234c]/15 bg-white px-4 py-2 text-sm font-medium text-[#07234c] transition-colors hover:bg-gray-50 disabled:opacity-60"
            >
              {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Exportar CSV
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#07234c]/10 rounded-card overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {leads.length === 0
              ? 'No se han recibido solicitudes todavía.'
              : 'No hay casos que coincidan con los filtros.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8fafc] text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium">Nombre</th>
                  <th className="px-6 py-4 font-medium">Contacto</th>
                  <th className="px-6 py-4 font-medium">Origen</th>
                  <th className="px-6 py-4 font-medium">Área</th>
                  <th className="px-6 py-4 font-medium">Responsable</th>
                  <th className="px-6 py-4 font-medium">Mensaje</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Intl.DateTimeFormat('es-CL', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(lead.createdAt))}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <Link href={`/admin/leads/${lead.id}`} className="hover:text-brand hover:underline">
                        {lead.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <div>{lead.email}</div>
                      {lead.phone && <div className="text-gray-500 mt-1">{lead.phone}</div>}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {getLeadSourceLabel(lead.leadSource)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {getPracticeAreaLabel(lead.practiceArea)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {getAssigneeLabel(lead.assignedToEmail)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs line-clamp-2 text-gray-600" title={lead.message || ''}>
                        {lead.message || <span className="italic text-gray-500">Sin descripción</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <LeadStatusBadge status={lead.status} />
                        <LeadPriorityBadge priority={lead.priority} />
                        {isLeadSlaBreached(lead) && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700">
                            <AlertTriangle className="h-3 w-3" />
                            SLA
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="p-2 text-gray-500 hover:text-brand hover:bg-brand/10 rounded-lg transition-colors"
                          title="Ver ficha"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        {lead.cliengoContactId && (
                          <a
                            href={getCliengoContactPanelUrl(lead.cliengoContactId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 hover:text-[#0a66c2] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Abrir en Cliengo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {(lead.status === 'nuevo' || lead.status === 'pendiente') && (
                          <button
                            onClick={() => handleQuickContact(lead.id)}
                            disabled={loadingId === lead.id}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-500/10 rounded-lg transition-colors disabled:opacity-50"
                            title="Marcar como contactado"
                          >
                            {loadingId === lead.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(lead.id)}
                          disabled={loadingId === lead.id}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Archivar caso"
                        >
                          {loadingId === lead.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
