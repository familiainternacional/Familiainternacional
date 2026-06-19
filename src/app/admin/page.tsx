import React from 'react';
import Link from 'next/link';
import { getPrismaClient } from '@/lib/db/prisma';
import { Inbox, FileText, MessageSquare, Edit3, ArrowRight, TrendingUp } from 'lucide-react';
import LeadStatusBadge from './leads/LeadStatusBadge';

export const metadata = {
  title: 'Dashboard | Panel de Control',
};

export default async function AdminIndexPage() {
  const prisma = await getPrismaClient();

  const [
    pendingLeadsCount,
    totalLeadsCount,
    publishedPostsCount,
    publishedTestimonialsCount
  ] = await Promise.all([
    prisma.lead.count({ where: { status: { in: ['pendiente', 'nuevo'] } } }),
    prisma.lead.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.testimonial.count({ where: { published: true } }),
  ]);

  const recentLeads = await prisma.lead.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-brand" />
          Centro de Mando
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Bienvenido a tu panel de administración. Aquí tienes un resumen de la actividad reciente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Nuevos Leads</p>
              <h3 className="text-2xl font-bold text-gray-900">{pendingLeadsCount}</h3>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">{totalLeadsCount} históricos</span>
            <Link href="/admin/leads" className="text-sm font-medium text-brand hover:text-gray-600 flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Blog</p>
              <h3 className="text-2xl font-bold text-gray-900">{publishedPostsCount}</h3>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Publicados</span>
            <Link href="/admin/blog" className="text-sm font-medium text-brand hover:text-gray-600 flex items-center gap-1">
              Gestionar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-card border border-[#07234c]/10 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Casos de Éxito</p>
              <h3 className="text-2xl font-bold text-gray-900">{publishedTestimonialsCount}</h3>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Testimonios activos</span>
            <Link href="/admin/testimonios" className="text-sm font-medium text-brand hover:text-gray-600 flex items-center gap-1">
              Gestionar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-brand text-white rounded-card border border-black p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Editor del Sitio</h3>
            <p className="text-sm text-gray-400">Modifica la portada, textos e imágenes al instante.</p>
          </div>
          <Link
            href="/admin/editor"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-gray-100"
          >
            <Edit3 className="w-4 h-4" />
            Entrar al Editor
          </Link>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-card border border-[#07234c]/10 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Leads Recientes</h2>
          <Link href="/admin/leads" className="text-sm font-medium text-brand hover:underline">
            Ver todos los leads
          </Link>
        </div>
        
        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aún no hay leads recibidos.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Fecha</th>
                  <th className="px-6 py-3 font-semibold">Nombre</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lead.createdAt.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <Link href={`/admin/leads/${lead.id}`} className="hover:text-brand hover:underline">
                        {lead.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{lead.email}</td>
                    <td className="px-6 py-4">
                      <LeadStatusBadge status={lead.status} />
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
