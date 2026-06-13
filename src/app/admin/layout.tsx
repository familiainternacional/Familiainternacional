import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { requireAdminSession } from '@/lib/supabase/auth';
import AdminSidebar from './AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard | Ruiz Leiva Abogados',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get('x-pathname') ?? '';
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  const admin = await requireAdminSession();

  return (
    <div className="h-screen bg-[#07234c] text-white flex flex-col md:flex-row overflow-hidden">
      <AdminSidebar adminEmail={admin.email ?? 'Admin'} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#07234c]">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
