'use client';

import React, { useState } from 'react';
import { updateServicesPageAdminValues, type ServicesPageSettingsAdminValues } from '@/app/admin/servicios/actions';
import { Save, Loader2 } from 'lucide-react';
import RichTextEditor from '@/app/admin/components/RichTextEditor';

const serviceKeys = [
  'litigacion',
  'corporativo',
  'administrativo',
  'compliance',
  'conflictos',
  'asesoria',
] as const;

export default function ServicesPageForm({ initialValues }: { initialValues: ServicesPageSettingsAdminValues }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  let parsedPayload: Record<string, string> = {
    litigacionTitle: 'Litigación Civil',
    litigacionDesc: 'Defensa estratégica en conflictos civiles y comerciales. Analizamos timing procesal, presión negociadora y escenarios tácticos antes de actuar.',
    corporativoTitle: 'Derecho Corporativo',
    corporativoDesc: 'Asesoramiento experto para empresas. Constituciones, modificaciones, fusiones y adquisiciones, estructuración societaria y contratos complejos.',
    administrativoTitle: 'Derecho Administrativo',
    administrativoDesc: 'Asesoría en derecho administrativo sancionador, litigios con el Estado, municipalidades y Contraloría General de la República.',
    complianceTitle: 'Compliance',
    complianceDesc: 'Prevención de delitos corporativos (Ley 20.393), libre competencia, medio ambiente y políticas de privacidad y datos personales.',
    conflictosTitle: 'Resolución de Conflictos',
    conflictosDesc: 'Estrategias extrajudiciales, arbitrajes comerciales, y representación ante tribunales y cortes superiores para la resolución óptima.',
    asesoriaTitle: 'Asesoría Empresarial',
    asesoriaDesc: 'Un departamento legal externo que acompaña el crecimiento de tu empresa. Asesoría integral para la toma de decisiones seguras.',
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
    
    const payloadData: Record<string, string> = {};
    serviceKeys.forEach(key => {
      payloadData[`${key}Title`] = formData.get(`${key}Title`) as string;
      payloadData[`${key}Desc`] = formData.get(`${key}Desc`) as string;
    });

    try {
      await updateServicesPageAdminValues({ payload: JSON.stringify(payloadData) });
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {serviceKeys.map((key, i) => (
          <div key={key} className="bg-white p-6 rounded-xl border border-[#07234c]/10 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Servicio {i + 1}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  name={`${key}Title`}
                  defaultValue={parsedPayload[`${key}Title`]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <RichTextEditor
                  name={`${key}Desc`}
                  defaultValue={parsedPayload[`${key}Desc`]}
                  minHeight={150}
                />
              </div>
            </div>
          </div>
        ))}

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
