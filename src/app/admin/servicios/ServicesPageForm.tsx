'use client';

import React, { useState } from 'react';
import { updateServicesPageAdminValues, type ServicesPageSettingsAdminValues } from '@/app/admin/servicios/actions';
import { Save, Loader2 } from 'lucide-react';
import RichTextEditor from '@/app/admin/components/RichTextEditor';
import { getFamilyServices, getServiceAdminPayloadKey } from '@/config/family-services';

const adminServices = getFamilyServices('es').map((service) => ({
  key: getServiceAdminPayloadKey(service.slug),
  title: service.title,
  desc: service.desc,
}));

export default function ServicesPageForm({ initialValues }: { initialValues: ServicesPageSettingsAdminValues }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  let parsedPayload: Record<string, string> = Object.fromEntries(
    adminServices.flatMap((service) => [
      [`${service.key}Title`, service.title],
      [`${service.key}Desc`, service.desc],
    ]),
  );

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
    adminServices.forEach(({ key }) => {
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
        {adminServices.map(({ key, title }, i) => (
          <div key={key} className="bg-white p-6 rounded-card border border-[#07234c]/10 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Servicio {i + 1}: {title}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
                <input
                  name={`${key}Title`}
                  defaultValue={parsedPayload[`${key}Title`]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
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
