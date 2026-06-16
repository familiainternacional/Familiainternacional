'use client';

import type { BlogPost } from '@prisma/client';
import { useState } from 'react';
import Link from 'next/link';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { savePost } from './actions';
import RichTextEditor from '@/app/admin/components/RichTextEditor';

type BlogEditorPost = Pick<
  BlogPost,
  | 'id'
  | 'slug'
  | 'titleEs'
  | 'excerptEs'
  | 'contentEs'
  | 'published'
  | 'authorName'
  | 'coverImage'
  | 'seoTitleEs'
  | 'seoDescriptionEs'
  | 'seoKeywords'
>;

export default function BlogEditor({ post }: { post?: BlogEditorPost }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate slug from title if it's a new post
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!post) {
      const title = e.target.value;
      const slugInput = document.getElementById('slug') as HTMLInputElement;
      if (slugInput && !slugInput.dataset.manual) {
        slugInput.value = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/admin/blog" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#07234c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>
        <h1 className="text-2xl font-bold">
          {post ? 'Editar Artículo' : 'Nuevo Artículo'}
        </h1>
      </div>

      <form 
        action={async (formData) => {
          setIsSubmitting(true);
          await savePost(formData);
        }}
        className="space-y-8"
      >
        {post && <input type="hidden" name="id" value={post.id} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-card border border-[#07234c]/10 space-y-6">
              <div>
                <label htmlFor="titleEs" className="block text-sm font-medium text-gray-700 mb-2">
                  Título del Artículo *
                </label>
                <input
                  type="text"
                  id="titleEs"
                  name="titleEs"
                  required
                  defaultValue={post?.titleEs}
                  onChange={handleTitleChange}
                  className="w-full bg-white border border-[#07234c]/15 rounded-lg px-4 py-3 text-[#111827] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="Ej: Nueva Ley de Delitos Económicos..."
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <div className="flex items-center bg-white border border-[#07234c]/15 rounded-lg px-4 py-3 focus-within:border-[var(--color-primary)] transition-colors">
                  <span className="text-gray-500 mr-1">/perspectivas/</span>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    required
                    defaultValue={post?.slug}
                    onInput={(e) => { (e.target as HTMLInputElement).dataset.manual = 'true' }}
                    className="w-full bg-transparent text-[#111827] focus:outline-none"
                    placeholder="nueva-ley-delitos"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="excerptEs" className="block text-sm font-medium text-gray-700 mb-2">
                  Resumen (Excerpt)
                </label>
                <textarea
                  id="excerptEs"
                  name="excerptEs"
                  rows={3}
                  defaultValue={post?.excerptEs ?? ''}
                  className="w-full bg-white border border-[#07234c]/15 rounded-lg px-4 py-3 text-[#111827] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="Un breve resumen que aparecerá en las tarjetas..."
                />
              </div>

              <div>
                <label htmlFor="contentEs" className="block text-sm font-medium text-gray-700 mb-2">
                  Contenido del Artículo
                </label>
                <RichTextEditor
                  id="contentEs"
                  name="contentEs"
                  defaultValue={post?.contentEs ?? ''}
                  minHeight={500}
                  placeholder="Escribe el contenido aquí..."
                />
              </div>
            </div>
          </div>

          {/* Sidebar / Settings Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-card border border-[#07234c]/10 space-y-6">
              <h3 className="font-bold text-lg border-b border-[#07234c]/10 pb-4">Publicación</h3>
              
              <div>
                <label htmlFor="isDraft" className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="isDraft"
                    name="isDraft"
                    value="true"
                    defaultChecked={post ? !post.published : true}
                    className="w-5 h-5 rounded border-[#07234c]/20 bg-white text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm font-medium text-gray-700">Guardar como borrador</span>
                </label>
                <p className="text-xs text-gray-500 mt-2 ml-8">
                  Si no está marcado, el artículo se publicará y será visible inmediatamente.
                </p>
              </div>

              <div>
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  defaultValue={post?.authorName ?? 'Familia Internacional'}
                  className="w-full bg-white border border-[#07234c]/15 rounded-lg px-4 py-2 text-[#111827] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                  URL Imagen de Portada
                </label>
                <div className="flex items-center bg-white border border-[#07234c]/15 rounded-lg px-4 py-2 focus-within:border-[var(--color-primary)] transition-colors">
                  <ImageIcon className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    id="coverImage"
                    name="coverImage"
                    defaultValue={post?.coverImage ?? ''}
                    className="w-full bg-transparent text-[#111827] focus:outline-none text-sm"
                    placeholder="/images/post-1.jpg o https://..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Guardando...' : 'Guardar Artículo'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-card border border-[#07234c]/10 space-y-6">
              <h3 className="font-bold text-lg border-b border-[#07234c]/10 pb-4">SEO (Google)</h3>
              
              <div>
                <label htmlFor="seoTitleEs" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Título
                </label>
                <input
                  type="text"
                  id="seoTitleEs"
                  name="seoTitleEs"
                  defaultValue={post?.seoTitleEs ?? ''}
                  className="w-full bg-white border border-[#07234c]/15 rounded-lg px-4 py-2 text-[#111827] focus:outline-none focus:border-[var(--color-primary)] text-sm"
                  placeholder="Si se deja vacío, usa el título principal."
                />
              </div>

              <div>
                <label htmlFor="seoDescriptionEs" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Descripción
                </label>
                <textarea
                  id="seoDescriptionEs"
                  name="seoDescriptionEs"
                  rows={3}
                  defaultValue={post?.seoDescriptionEs ?? ''}
                  className="w-full bg-white border border-[#07234c]/15 rounded-lg px-4 py-2 text-[#111827] focus:outline-none focus:border-[var(--color-primary)] text-sm"
                  placeholder="Resumen para Google (160 caracteres). Si se deja vacío, usa el Resumen general."
                />
              </div>

              <div>
                <label htmlFor="seoKeywords" className="block text-sm font-medium text-gray-700 mb-2">
                  Palabras Clave (Keywords)
                </label>
                <textarea
                  id="seoKeywords"
                  name="seoKeywords"
                  rows={2}
                  defaultValue={post?.seoKeywords ?? ''}
                  className="w-full bg-white border border-[#07234c]/15 rounded-lg px-4 py-2 text-[#111827] focus:outline-none focus:border-[var(--color-primary)] text-sm"
                  placeholder="ley de quiebras, insolvencia, chile (separadas por comas)"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
