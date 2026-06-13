import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import AdminLoginForm from './AdminLoginForm';
import { getAdminClaims } from '@/lib/supabase/auth';
import { getSiteLogoSrc } from '@/lib/storage/site-assets';
import { siteConfig } from '@/config/site';
import { logoImageSizes } from '@/config/logo';

export const metadata = {
  title: 'Acceso admin | Familia Internacional',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  await connection();

  const admin = await getAdminClaims();

  if (admin) {
    redirect('/admin/leads');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07234c] px-5 py-12 text-white">
      <section className="w-full max-w-md rounded-[24px] border border-white/10 bg-[#051830] p-6 md:p-8">
        <Link href="/" className="mb-8 inline-flex">
          <Image
            src={getSiteLogoSrc()}
            alt={siteConfig.name}
            width={logoImageSizes.admin.width}
            height={logoImageSizes.admin.height}
            priority
            className="h-8 w-auto rounded-md object-contain"
          />
        </Link>

        <span className="mb-4 block text-small font-bold uppercase tracking-widest text-[var(--color-primary)]">
          Panel privado
        </span>
        <h1 className="font-serif text-h2 tracking-tight text-white">
          Acceso administrador
        </h1>
        <p className="mt-4 max-w-[65ch] text-body text-gray-400">
          Ingrese con una cuenta autorizada de Supabase para gestionar las consultas
          y activos del sitio.
        </p>

        <AdminLoginForm />
      </section>
    </main>
  );
}
