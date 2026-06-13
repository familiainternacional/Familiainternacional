import React from 'react';
import Link from 'next/link';
import { Plus, MessageSquare, Edit3, Globe, EyeOff } from 'lucide-react';
import { getTestimonials } from './actions';

export const metadata = {
  title: 'Testimonios | Panel de Control',
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-brand" />
            Casos de Éxito y Testimonios
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Gestiona los testimonios de clientes que aparecen en la portada de tu sitio.
          </p>
        </div>
        <Link
          href="/admin/testimonios/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="w-5 h-5" />
          Nuevo Testimonio
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#07234c]/10 overflow-hidden">
        {testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No hay testimonios</h3>
            <p className="mt-1 text-gray-500">Comienza añadiendo el primer caso de éxito de tus clientes.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4">Cliente / Autor</th>
                  <th scope="col" className="px-6 py-4">Cargo / Empresa</th>
                  <th scope="col" className="px-6 py-4">Cita (Español)</th>
                  <th scope="col" className="px-6 py-4">Estado</th>
                  <th scope="col" className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {t.author}
                    </td>
                    <td className="px-6 py-4">
                      {t.roleEs}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={t.quoteEs}>
                      &ldquo;{t.quoteEs}&rdquo;
                    </td>
                    <td className="px-6 py-4">
                      {t.published ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          <Globe className="w-3.5 h-3.5" />
                          Público
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          <EyeOff className="w-3.5 h-3.5" />
                          Oculto
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/testimonios/${t.id}`}
                        className="inline-flex items-center gap-1.5 text-brand hover:text-gray-600 font-medium"
                      >
                        <Edit3 className="w-4 h-4" />
                        Editar
                      </Link>
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
