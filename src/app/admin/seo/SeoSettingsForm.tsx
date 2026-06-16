'use client';

import React, { useState } from 'react';
import { updateSiteSeoSettingsAdminValues, type SiteSeoSettingsAdminValues } from '@/app/admin/seo/actions';
import { Save, Loader2, Info } from 'lucide-react';

export default function SeoSettingsForm({ initialValues }: { initialValues: SiteSeoSettingsAdminValues }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  async function action(formData: FormData) {
    setIsPending(true);
    setMessage('');
    
    const values: SiteSeoSettingsAdminValues = {
      defaultTitleEs: formData.get('defaultTitleEs') as string,
      defaultDescriptionEs: formData.get('defaultDescriptionEs') as string,
      defaultOgImage: formData.get('defaultOgImage') as string,
    };

    try {
      await updateSiteSeoSettingsAdminValues(values);
      setMessage('Guardado exitosamente');
    } catch {
      setMessage('Error al guardar');
    } finally {
      setIsPending(false);
      setTimeout(() => setMessage(''), 3000);
    }
  }

  return (
    <form action={action} className="space-y-8 max-w-4xl">
      <div className="bg-white p-6 md:p-8 rounded-xl border border-[#07234c]/10 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">SEO Global</h2>
            <p className="text-sm text-gray-500 mt-1">
              Configura cómo se ve tu sitio en los resultados de Google y cuando compartes el enlace en redes sociales (WhatsApp, LinkedIn, etc.).
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Página (Meta Title)</label>
            <input
              name="defaultTitleEs"
              defaultValue={initialValues.defaultTitleEs || 'Familia Internacional | Derecho Internacional de Familia'}
              placeholder="Ej: Familia Internacional"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Recomendado: 50-60 caracteres.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción de la Página (Meta Description)</label>
            <textarea
              name="defaultDescriptionEs"
              defaultValue={initialValues.defaultDescriptionEs || 'Asesoría jurídica de alto estándar para empresas y empresarios en litigación civil, derecho corporativo, derecho administrativo, compliance y resolución de conflictos.'}
              rows={3}
              placeholder="Ej: Estudio jurídico enfocado en empresas..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Aparece debajo del título en Google. Recomendado: 150-160 caracteres.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen para Redes Sociales (OpenGraph Image URL)</label>
            <input
              name="defaultOgImage"
              defaultValue={initialValues.defaultOgImage || '/opengraph-image'}
              placeholder="Ej: https://... o /opengraph-image"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Sube una imagen en la Galería y pega el enlace aquí. Tamaño ideal: 1200x630px.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-dark disabled:opacity-70 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Guardar SEO
        </button>
        {message && (
          <span className={`text-sm font-medium ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </span>
        )}
      </div>
    </form>
  );
}
