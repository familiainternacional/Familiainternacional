'use client';

import React, { useState } from 'react';
import { updateAboutPageAdminValues, type AboutPageSettingsAdminValues } from '@/app/admin/nosotros/actions';
import { Save, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import RichTextEditor from '@/app/admin/components/RichTextEditor';

export default function AboutPageForm({ initialValues }: { initialValues: AboutPageSettingsAdminValues }) {
  const { t } = useI18n();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  let parsedPayload: Record<string, string> = {
    aboutIntro: 'Estudio jurídico especializado en Derecho Internacional de Familia.',
    lawyer1Name: t('team.jaime.name'),
    lawyer1Bio1: t('team.jaime.bio1'),
    lawyer1Bio2: t('team.jaime.bio2'),
    lawyer2Name: t('team.sebastian.name'),
    lawyer2Bio1: t('team.sebastian.bio1'),
    lawyer2Bio2: t('team.sebastian.bio2'),
  };

  try {
    if (initialValues.payload) {
      parsedPayload = { ...parsedPayload, ...JSON.parse(initialValues.payload) };
    }
  } catch (e) {
    console.error('Error parsing payload', e);
  }

  async function action(formData: FormData) {
    setIsPending(true);
    setMessage('');
    
    const payloadData = {
      lawyer1Name: formData.get('lawyer1Name'),
      lawyer1Bio1: formData.get('lawyer1Bio1'),
      lawyer1Bio2: formData.get('lawyer1Bio2'),
      lawyer2Name: formData.get('lawyer2Name'),
      lawyer2Bio1: formData.get('lawyer2Bio1'),
      aboutIntro: formData.get('aboutIntro') as string,
    };

    try {
      await updateAboutPageAdminValues({ 
        payload: JSON.stringify(payloadData)
      });
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
      <div className="bg-white p-6 md:p-8 rounded-xl border border-[#07234c]/10 shadow-sm mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Introducción Principal</label>
        <RichTextEditor
          name="aboutIntro"
          defaultValue={parsedPayload.aboutIntro}
          minHeight={150}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lawyer 1 */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-[#07234c]/10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Abogado 1</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                name="lawyer1Name"
                defaultValue={parsedPayload.lawyer1Name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biografía (Párrafo 1)</label>
              <RichTextEditor
                name="lawyer1Bio1"
                defaultValue={parsedPayload.lawyer1Bio1}
                minHeight={150}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biografía (Párrafo 2)</label>
              <RichTextEditor
                name="lawyer1Bio2"
                defaultValue={parsedPayload.lawyer1Bio2}
                minHeight={150}
              />
            </div>
          </div>
        </div>

        {/* Lawyer 2 */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-[#07234c]/10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Abogado 2</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                name="lawyer2Name"
                defaultValue={parsedPayload.lawyer2Name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biografía (Párrafo 1)</label>
              <RichTextEditor
                name="lawyer2Bio1"
                defaultValue={parsedPayload.lawyer2Bio1}
                minHeight={150}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biografía (Párrafo 2)</label>
              <RichTextEditor
                name="lawyer2Bio2"
                defaultValue={parsedPayload.lawyer2Bio2}
                minHeight={150}
              />
            </div>
          </div>
        </div>

      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
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
