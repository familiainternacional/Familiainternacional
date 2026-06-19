'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Lead } from '@prisma/client';
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
import { deleteLead, updateLeadNotes, updateLeadStatus } from './actions';
import { LEAD_STATUSES, getLeadStatusLabel } from '@/lib/leads/status';
import { getLeadSourceLabel } from '@/lib/leads/source';
import { getCliengoContactPanelUrl } from '@/lib/integrations/cliengo-crm';

export default function LeadDetailClient({ lead: initialLead }: { lead: Lead }) {
  const [lead, setLead] = useState(initialLead);
  const [status, setStatus] = useState(initialLead.status);
  const [notes, setNotes] = useState(initialLead.internalNotes ?? '');
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState('');

  const phoneHref = lead.phone?.replace(/[^\d+]/g, '');

  const handleStatusSave = async () => {
    setSavingStatus(true);
    setMessage('');
    const result = await updateLeadStatus(lead.id, status as (typeof LEAD_STATUSES)[number]);
    setSavingStatus(false);

    if (result.success) {
      setLead((current) => ({ ...current, status }));
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

  const handleDelete = async () => {
    if (!confirm('¿Eliminar este caso permanentemente?')) return;

    setDeleting(true);
    const result = await deleteLead(lead.id);
    setDeleting(false);

    if (result.success) {
      window.location.href = '/admin/leads';
    } else {
      setMessage(result.error ?? 'No se pudo eliminar.');
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
          </div>
          <p className="mt-2 text-gray-600">
            Recibido el{' '}
            {new Intl.DateTimeFormat('es-CL', {
              dateStyle: 'long',
              timeStyle: 'short',
            }).format(new Date(lead.createdAt))}
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
            Eliminar caso
          </button>
        </div>
      </div>
    </div>
  );
}
