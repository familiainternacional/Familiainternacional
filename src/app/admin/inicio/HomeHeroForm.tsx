'use client';

import React, { useState } from 'react';
import { updateHomeHeroAdminValues, type HomeHeroSettingsAdminValues } from '@/app/admin/inicio/actions';
import { Save, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function HomeHeroForm({ initialValues }: { initialValues: HomeHeroSettingsAdminValues }) {
  const { t } = useI18n();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  async function action(formData: FormData) {
    setIsPending(true);
    setMessage('');
    
    const values: HomeHeroSettingsAdminValues = {
      imageUrl: formData.get('imageUrl') as string,
      titleLine1Es: formData.get('titleLine1Es') as string,
      titleLine2Es: formData.get('titleLine2Es') as string,
      subtitleEs: formData.get('subtitleEs') as string,
    };

    try {
      await updateHomeHeroAdminValues(values);
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
        <h2 className="text-xl font-bold text-gray-900 mb-6">Textos Principales</h2>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título Línea 1</label>
            <input
              name="titleLine1Es"
              defaultValue={initialValues.titleLine1Es || t('hero.title1')}
              placeholder="Ej: Precisión estratégica."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título Línea 2</label>
            <input
              name="titleLine2Es"
              defaultValue={initialValues.titleLine2Es || t('hero.title2')}
              placeholder="Ej: Ejecución implacable."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
            <textarea
              name="subtitleEs"
              defaultValue={initialValues.subtitleEs || t('hero.subtitle')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
            />
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
          Guardar Cambios
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
