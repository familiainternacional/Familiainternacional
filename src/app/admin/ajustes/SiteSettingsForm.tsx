'use client';

import React, { useState } from 'react';
import { updateSiteSettingsAdminValues, type SiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { Save, Loader2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { defaultOfficeAddressMultiline } from '@/lib/site-contact';

export default function SiteSettingsForm({ initialValues }: { initialValues: SiteSettingsAdminValues }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  async function action(formData: FormData) {
    setIsPending(true);
    setMessage('');
    
    const values: SiteSettingsAdminValues = {
      whatsappNumber: formData.get('whatsappNumber') as string,
      primaryPhone: formData.get('primaryPhone') as string,
      primaryEmail: formData.get('primaryEmail') as string,
      officeAddress: formData.get('officeAddress') as string,
      instagramUrl: formData.get('instagramUrl') as string,
      facebookUrl: formData.get('facebookUrl') as string,
      linkedinUrl: formData.get('linkedinUrl') as string,
    };

    try {
      await updateSiteSettingsAdminValues(values);
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
        <div className="bg-white p-6 md:p-8 rounded-xl border border-[#07234c]/10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input
                name="whatsappNumber"
                defaultValue={initialValues.whatsappNumber || siteConfig.contact.whatsappNumber}
                placeholder="Ej: 56935406356"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Principal</label>
              <input
                name="primaryPhone"
                defaultValue={initialValues.primaryPhone || siteConfig.contact.primaryPhoneLabel}
                placeholder="Ej: +56 9 9145 2412"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Principal</label>
              <input
                name="primaryEmail"
                type="email"
                defaultValue={initialValues.primaryEmail || siteConfig.contact.primaryEmail}
                placeholder="Ej: contacto@familiainternacional.cl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Oficina</label>
              <textarea
                name="officeAddress"
                defaultValue={initialValues.officeAddress || defaultOfficeAddressMultiline}
                rows={3}
                placeholder="Ej: Av. San Josemaría Escrivá de Balaguer N°13.105, Of. 303"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl border border-[#07234c]/10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Redes Sociales</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input
                name="linkedinUrl"
                defaultValue={initialValues.linkedinUrl}
                placeholder="https://linkedin.com/company/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input
                name="instagramUrl"
                defaultValue={initialValues.instagramUrl}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input
                name="facebookUrl"
                defaultValue={initialValues.facebookUrl}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
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
