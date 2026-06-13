import Link from 'next/link';
import { getPrismaClient } from '@/lib/db/prisma';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deletePost } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const prisma = getPrismaClient();
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perspectivas (Blog)</h1>
          <p className="text-gray-400 mt-1">
            Gestione los artículos, noticias y perspectivas publicadas en el sitio web.
          </p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Nuevo Artículo
        </Link>
      </div>

      <div className="bg-[#051830] border border-white/10 rounded-2xl overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay artículos publicados todavía.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-gray-300 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Título</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium">Autor</th>
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white max-w-[250px] truncate" title={post.titleEs}>
                      {post.titleEs}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        post.published 
                          ? 'bg-green-500/10 text-green-500 border-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                      }`}>
                        {post.published ? 'Publicado' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {post.authorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {new Intl.DateTimeFormat('es-CL', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      }).format(new Date(post.createdAt))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-3">
                        <Link 
                          href={`/admin/blog/${post.id}`}
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deletePost(post.id);
                        }}>
                          <button 
                            type="submit"
                            className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </form>
                      </div>
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
