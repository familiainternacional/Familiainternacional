'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTestimonial, updateTestimonial, deleteTestimonial } from './actions';
import { Save, Loader2, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Testimonial = {
  id?: string;
  author: string;
  roleEs: string;
  roleEn?: string | null;
  quoteEs: string;
  quoteEn?: string | null;
  published: boolean;
  sortOrder: number;
};

export default function TestimonialEditor({ testimonial }: { testimonial?: Testimonial }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      author: formData.get('author') as string,
      roleEs: formData.get('roleEs') as string,
      roleEn: formData.get('roleEn') as string || null,
      quoteEs: formData.get('quoteEs') as string,
      quoteEn: formData.get('quoteEn') as string || null,
      published: formData.get('published') === 'on',
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
    };

    try {
      if (testimonial?.id) {
        await updateTestimonial(testimonial.id, data);
      } else {
        await createTestimonial(data);
      }
      router.push('/admin/testimonios');
      router.refresh();
    } catch {
      setError('Error al guardar el testimonio. Inténtalo de nuevo.');
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    if (!testimonial?.id) return;
    if (!confirm('¿Estás seguro de eliminar este testimonio? Esta acción no se puede deshacer.')) return;
    
    setIsDeleting(true);
    try {
      await deleteTestimonial(testimonial.id);
      router.push('/admin/testimonios');
      router.refresh();
    } catch {
      setError('Error al eliminar el testimonio.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/testimonios" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {testimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-xl border border-[#07234c]/10 shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nombre del Cliente <span className="text-red-500">*</span></label>
            <input
              required
              name="author"
              defaultValue={testimonial?.author}
              placeholder="Ej: Carolina M."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Orden de Visualización</label>
            <input
              type="number"
              name="sortOrder"
              defaultValue={testimonial?.sortOrder ?? 0}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cargo / Empresa (Español) <span className="text-red-500">*</span></label>
            <input
              required
              name="roleEs"
              defaultValue={testimonial?.roleEs}
              placeholder="Ej: Directora de Operaciones, Retail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cargo / Empresa (Inglés)</label>
            <input
              name="roleEn"
              defaultValue={testimonial?.roleEn || ''}
              placeholder="Ej: COO, Retail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Testimonio (Español) <span className="text-red-500">*</span></label>
            <textarea
              required
              name="quoteEs"
              defaultValue={testimonial?.quoteEs}
              rows={3}
              placeholder="Ej: Entendieron el negocio al tiro. La asesoría fue precisa y muy práctica."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Testimonio (Inglés)</label>
            <textarea
              name="quoteEn"
              defaultValue={testimonial?.quoteEn || ''}
              rows={3}
              placeholder="Ej: They understood the business right away. Precise, practical advice."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <input
            type="checkbox"
            name="published"
            id="published"
            defaultChecked={testimonial ? testimonial.published : true}
            className="w-5 h-5 rounded border-gray-300 text-brand focus:ring-black"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-900 cursor-pointer">
            Publicar inmediatamente en el sitio web
          </label>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isPending || isDeleting}
            className="flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-70 transition-all"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {testimonial ? 'Guardar Cambios' : 'Crear Testimonio'}
          </button>

          {testimonial && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending || isDeleting}
              className="flex items-center gap-2 text-red-600 px-4 py-2.5 rounded-lg font-medium hover:bg-red-50 disabled:opacity-70 transition-all"
            >
              {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
