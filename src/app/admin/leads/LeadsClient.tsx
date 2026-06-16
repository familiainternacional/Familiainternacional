'use client';

import { useState } from 'react';
import { Lead } from '@prisma/client';
import { Check, Trash2, Loader2 } from 'lucide-react';
import { deleteLead, markLeadAsRead } from './actions';

export default function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleMarkAsRead = async (id: string) => {
    if (confirm('¿Estás seguro de marcar este caso como atendido?')) {
      setLoadingId(id);
      await markLeadAsRead(id);
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este caso? Esta acción no se puede deshacer.')) {
      setLoadingId(id);
      await deleteLead(id);
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white border border-[#07234c]/10 rounded-2xl overflow-hidden">
      {initialLeads.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No se han recibido solicitudes todavía.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8fafc] text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Fecha</th>
                <th className="px-6 py-4 font-medium">Nombre</th>
                <th className="px-6 py-4 font-medium">Contacto</th>
                <th className="px-6 py-4 font-medium">Mensaje / Descripción del Caso</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Intl.DateTimeFormat('es-CL', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(lead.createdAt))}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div>{lead.email}</div>
                    {lead.phone && <div className="text-gray-500 mt-1">{lead.phone}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-md line-clamp-3 text-gray-600" title={lead.message || ''}>
                      {lead.message || <span className="italic text-gray-500">Sin descripción</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      lead.status === 'pendiente' 
                        ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                        : 'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                      {lead.status === 'pendiente' ? 'Pendiente' : 'Atendido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    {lead.status === 'pendiente' && (
                      <button
                        onClick={() => handleMarkAsRead(lead.id)}
                        disabled={loadingId === lead.id}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Marcar como atendido"
                      >
                        {loadingId === lead.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(lead.id)}
                      disabled={loadingId === lead.id}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Eliminar caso"
                    >
                      {loadingId === lead.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
