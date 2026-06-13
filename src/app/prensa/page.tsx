import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import PressListing from '@/components/press/PressListing';
import JsonLd from '@/components/seo/JsonLd';
import { pressHubSeo } from '@/config/media-mentions';
import { siteConfig } from '@/config/site';
import { buildPressHubStructuredData } from '@/lib/seo/press-structured-data';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';

export const metadata: Metadata = {
  title: pressHubSeo.title,
  description: pressHubSeo.description,
  keywords: pressHubSeo.keywords,
  alternates: {
    canonical: '/prensa',
  },
  openGraph: {
    title: pressHubSeo.title,
    description: pressHubSeo.description,
    url: '/prensa',
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: pressHubSeo.title,
    description: pressHubSeo.description,
  },
};

export default async function PrensaPage() {
  const siteSettings = await getSiteSettingsAdminValues().catch(() => null);

  return (
    <main className="flex min-h-screen flex-col bg-[#f8fafc] text-[#07234c]">
      <JsonLd data={buildPressHubStructuredData()} />
      <Navbar adminValues={siteSettings} />

      <section className="px-5 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-[#07234c]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold text-[#07234c]">Prensa</li>
            </ol>
          </nav>

          <header className="mb-12 max-w-3xl md:mb-16">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#07234c]">
              Prensa y medios
            </p>
            <h1 className="mb-5 font-serif text-3xl font-semibold tracking-tight text-[#07234c] md:text-5xl">
              Autoridad consultada en derecho de familia internacional
            </h1>
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              Medios nacionales recurren a {siteConfig.name} para explicar conflictos transfronterizos, el Convenio de
              La Haya, apelaciones en el extranjero y las opciones reales que tienen las familias.
            </p>
          </header>

          <PressListing />
        </div>
      </section>

      <Footer adminValues={siteSettings} />
    </main>
  );
}
