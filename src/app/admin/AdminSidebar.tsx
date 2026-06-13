'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X, Inbox, FileText, Globe, Rocket, LayoutDashboard, MessageSquare } from 'lucide-react';
import { logoutAdmin } from './actions';

export default function AdminSidebar({ adminEmail }: { adminEmail: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/leads', label: 'Bandeja de Casos', icon: Inbox },
    { href: '/admin/blog', label: 'Perspectivas (Blog)', icon: FileText },
    { href: '/admin/testimonios', label: 'Testimonios', icon: MessageSquare },
    { href: '/admin/vision', label: 'Visión Tecnológica', icon: Rocket },
    { href: '/admin/editor', label: 'Editor del Sitio', icon: Globe },
  ];

  return (
    <>
      {/* Mobile Header (Hamburger) */}
      <header className="md:hidden h-16 border-b border-white/10 bg-[#051830] flex items-center justify-between px-6 shrink-0 relative z-50">
        <h2 className="text-xl font-bold tracking-tight">
          Familia <span className="text-brand-bright">Internacional</span> <span className="text-brand-accent">Admin</span>
        </h2>
        <button onClick={toggleSidebar} className="text-white hover:text-brand-bright">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#07234c]/60 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#051830] border-r border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-white/10 hidden md:block">
          <h2 className="text-xl font-bold tracking-tight">
            Familia <span className="text-brand-bright">Internacional</span> <span className="text-brand-accent">Admin</span>
          </h2>
        </div>
        
        <nav className="p-4 flex-1 overflow-y-auto mt-16 md:mt-0">
          <ul className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = link.href === '/admin' 
                ? pathname === '/admin' 
                : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors border ${
                      isActive 
                        ? 'bg-brand-soft text-brand-bright border-[color-mix(in_srgb,var(--color-primary-accent)_35%,transparent)]' 
                        : 'text-gray-300 border-transparent hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="space-y-4 border-t border-white/10 p-4 text-sm text-gray-500">
          <div>
            <span className="block text-xs uppercase tracking-widest text-gray-600">Sesión</span>
            <span className="mt-1 block truncate text-gray-300 font-medium" title={adminEmail}>{adminEmail}</span>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-left text-gray-300 transition-colors hover:border-brand hover:bg-brand-soft hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </form>
          <Link href="/" className="flex items-center gap-2 hover:text-white transition-colors mt-2">
            <Globe className="h-4 w-4" />
            Volver al sitio web
          </Link>
        </div>
      </aside>
    </>
  );
}
