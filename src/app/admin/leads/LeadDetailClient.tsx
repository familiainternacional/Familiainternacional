'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AdminAuditLog, Lead } from '@prisma/client';
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Save,
  Trash2,
} from 'lucide-react';
import LeadStatusBadge from './LeadStatusBadge';
import LeadPriorityBadge from './LeadPriorityBadge';
import LeadActivityLog from './LeadActivityLog';
import {
  deleteLead,
  updateLeadAssignment,
  updateLeadNotes,
  updateLeadPracticeArea,
  updateLeadPriority,
  updateLeadStatus,
} from './actions';
import { LEAD_STATUSES, getLeadStatusLabel } from '@/lib/leads/status';
import { getLeadSourceLabel } from '@/lib/leads/source';
import { getCliengoContactPanelUrl } from '@/lib/integrations/cliengo-crm';
import { PRACTICE_AREAS, getPracticeAreaLabel } from '@/lib/leads/practice-area';
import { LEAD_PRIORITIES, getLeadPriorityLabel } from '@/lib/leads/priority';
import { getAssigneeLabel, type LeadAssignee } from '@/config/lead-assignees';
import { hasAttributionData } from '@/lib/leads/attribution';
import { getLeadSlaLabel, isLeadSlaBreached } from '@/lib/leads/sla';

export default function LeadDetailClient({
  lead: initialLead,
  assignees,
  auditEntries,
}: {
  lead: Lead;
  assignees: LeadAssignee[];
  auditEntries: AdminAuditLog[];
}) {
  const [lead, setLead] = useState(initialLead);
  const [status, setStatus] = useState(initialLead.status);
  const [notes, setNotes] = useState(initialLead.internalNotes ?? '');
  const [assignedToEmail, setAssignedToEmail] = useState(initialLead.assignedToEmail ?? '');
  const [practiceArea, setPracticeArea] = useState(initialLead.practiceArea ?? '');
  const [priority, setPriority] = useState(initialLead.priority);
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [savingAssignment, setSavingAssignment] = useState(false);
  const [savingPracticeArea, setSavingPracticeArea] = useState(false);
  const [savingPriority, setSavingPriority] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState('');

  const phoneHref = lead.phone?.replace(/[^\d+]/g, '');
  const attribution = {
    landingPath: lead.landingPath,
    referrer: lead.referrer,
    utmSource: lead.utmSource,
    utmMedium: lead.utmMedium,
    utmCampaign: lead.utmCampaign,
    utmContent: lead.utmContent,
    utmTerm: lead.utmTerm,
  };

  const handleStatusSave = async () => {
    setSavingStatus(true);
    setMessage('');
    const result = await updateLeadStatus(lead.id, status as (typeof LEAD_STATUSES)[number]);
    setSavingStatus(false);

    if (result.success) {
      setLead((current) => ({
        ...current,
        status,
        contactedAt:
          ['contactado', 'consulta_agendada', 'cliente', 'atendido'].includes(status) && !current.contactedAt
            ? new Date()
            : current.contactedAt,
      }));
      setMessage('Estado actualizado.');
    } else {
      setMessage(result.error ?? 'Error al guardar.');
    }
  };

  const handleNotesSave = async () => {
    setSavingNotes(true);
    setMessage('');
    const result = await updateLeadNotes(lead.id, notes);
    setSavingNotes(false);

    if (result.success) {
      setLead((current) => ({ ...current, internalNotes: notes.trim() || null }));
      setMessage('Notas guardadas.');
    } else {
      setMessage(result.error ?? 'Error al guardar.');
    }
  };

  const handleAssignmentSave = async () => {
    setSavingAssignment(true);
    setMessage('');
    const result = await updateLeadAssignment(lead.id, assignedToEmail || null);
    setSavingAssignment(false);

    if (result.success) {
      setLead((current) => ({
        ...current,
        assignedToEmail: assignedToEmail || null,
      }));
      setMessage('Responsable actualizado.');
    } else {
      setMessage(result.error ?? 'Error al guardar.');
    }
  };

  const handlePracticeAreaSave = async () => {
    setSavingPracticeArea(true);
    setMessage('');
    const result = await updateLeadPracticeArea(lead.id, practiceArea || null);
    setSavingPracticeArea(false);

    if (result.success) {
      setLead((current) => ({ ...current, practiceArea: practiceArea || null }));
      setMessage('Área de práctica actualizada.');
    } else {
      setMessage(result.error ?? 'Error al guardar.');
    }
  };

  const handlePrioritySave = async () => {
    setSavingPriority(true);
    setMessage('');
    const result = await updateLeadPriority(lead.id, priority);
    setSavingPriority(false);

    if (result.success) {
      setLead((current) => ({ ...current, priority }));
      setMessage('Prioridad actualizada.');
    } else {
      setMessage(result.error ?? 'Error al guardar.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Archivar este caso? Podrá restaurarse desde soporte si es necesario.')) return;

    setDeleting(true);
    const result = await deleteLead(lead.id);
    setDeleting(false);

    if (result.success) {
      window.location.href = '/admin/leads';
    } else {
      setMessage(result.error ?? 'No se pudo archivar.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la bandeja
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{lead.name}</h1>
            <LeadStatusBadge status={lead.status} />
            <LeadPriorityBadge priority={lead.priority} />
            {isLeadSlaBreached(lead) && (
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                {getLeadSlaLabel(lead)}
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-600">
            Recibido el{' '}
            {new Intl.DateTimeFormat('es-CL', {
              dateStyle: 'long',
              timeStyle: 'short',
            }).format(new Date(lead.createdAt))}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Responsable: {getAssigneeLabel(lead.assignedToEmail)} · Área:{' '}
            {getPracticeAreaLabel(lead.practiceArea)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          {phoneHref && (
            <a
              href={`tel:${phoneHref}`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              <Phone className="h-4 w-4" />
              Llamar
            </a>
          )}
          {phoneHref && (
            <a
              href={`https://wa.me/${phoneHref.replace(/^\+/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-100"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </a>
          )}
          {lead.cliengoContactId && (
            <a
              href={getCliengoContactPanelUrl(lead.cliengoContactId)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-100"
            >
              <ExternalLink className="h-4 w-4" />
              Cliengo
            </a>
          )}
        </div>
      </div>

      {message && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Detalle del caso</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="font-medium text-gray-900 break-all">{lead.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Teléfono</dt>
                <dd className="font-medium text-gray-900">{lead.phone || 'No informado'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Origen</dt>
                <dd className="font-medium text-gray-900">{getLeadSourceLabel(lead.leadSource)}</dd>
              </div>
              <div>
                <dt className="text-gray-500">ID interno</dt>
                <dd className="font-mono text-xs text-gray-700 break-all">{lead.id}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Mensaje del solicitante
              </h3>
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 text-gray-800 whitespace-pre-wrap">
                {lead.message || 'Sin mensaje.'}
              </div>
            </div>
          </section>

          {hasAttributionData(attribution) && (
            <section className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Atribución marketing</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {lead.landingPath && (
                  <div>
                    <dt className="text-gray-500">Página de entrada</dt>
                    <dd className="font-medium text-gray-900 break-all">{lead.landingPath}</dd>
                  </div>
                )}
                {lead.referrer && (
                  <div>
                    <dt className="text-gray-500">Referrer</dt>
                    <dd className="font-medium text-gray-900 break-all">{lead.referrer}</dd>
                  </div>
                )}
                {lead.utmSource && (
                  <div>
                    <dt className="text-gray-500">UTM Source</dt>
                    <dd className="font-medium text-gray-900">{lead.utmSource}</dd>
                  </div>
                )}
                {lead.utmMedium && (
                  <div>
                    <dt className="text-gray-500">UTM Medium</dt>
                    <dd className="font-medium text-gray-900">{lead.utmMedium}</dd>
                  </div>
                )}
                {lead.utmCampaign && (
                  <div>
                    <dt className="text-gray-500">UTM Campaign</dt>
                    <dd className="font-medium text-gray-900">{lead.utmCampaign}</dd>
                  </div>
                )}
                {lead.utmTerm && (
                  <div>
                    <dt className="text-gray-500">UTM Term</dt>
                    <dd className="font-medium text-gray-900">{lead.utmTerm}</dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          <section className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Notas internas</h2>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={6}
              placeholder="Seguimiento del equipo: llamadas, próximos pasos, observaciones..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            />
            <button
              type="button"
              onClick={handleNotesSave}
              disabled={savingNotes}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {savingNotes ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Guardar notas
            </button>
          </section>

          <LeadActivityLog entries={auditEntries} />
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Pipeline</h2>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado del caso</label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
            >
              {LEAD_STATUSES.map((option) => (
                <option key={option} value={option}>
                  {getLeadStatusLabel(option)}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleStatusSave}
              disabled={savingStatus}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#07234c] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d3566] disabled:opacity-60"
            >
              {savingStatus ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Actualizar estado
            </button>
          </section>

          <section className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Operaciones</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsable</label>
              <select
                value={assignedToEmail}
                onChange={(event) => setAssignedToEmail(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
              >
                <option value="">Sin asignar</option>
                {assignees.map((assignee) => (
                  <option key={assignee.email} value={assignee.email}>
                    {assignee.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAssignmentSave}
                disabled={savingAssignment}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
              >
                {savingAssignment ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Guardar responsable
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Área de práctica</label>
              <select
                value={practiceArea}
                onChange={(event) => setPracticeArea(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
              >
                <option value="">Sin clasificar</option>
                {PRACTICE_AREAS.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handlePracticeAreaSave}
                disabled={savingPracticeArea}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
              >
                {savingPracticeArea ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Guardar área
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
              >
                {LEAD_PRIORITIES.map((option) => (
                  <option key={option} value={option}>
                    {getLeadPriorityLabel(option)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handlePrioritySave}
                disabled={savingPriority}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
              >
                {savingPriority ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Guardar prioridad
              </button>
            </div>
          </section>

          <section className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Integraciones</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Cliengo</dt>
                <dd className="font-medium text-gray-900">
                  {lead.cliengoContactId ? (
                    <a
                      href={getCliengoContactPanelUrl(lead.cliengoContactId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline break-all"
                    >
                      {lead.cliengoContactId}
                    </a>
                  ) : (
                    'Sin sync (lead anterior o error de API)'
                  )}
                </dd>
              </div>
            </dl>
          </section>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Archivar caso
          </button>
        </div>
      </div>
    </div>
  );
}
