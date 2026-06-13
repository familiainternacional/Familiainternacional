import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import ScrollReveal from '@/components/home/ScrollReveal';
import WhatsAppWidget from '@/components/home/WhatsAppWidget';
import JsonLd from '@/components/seo/JsonLd';
import { serviceLandings } from '@/config/service-landings';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';

const siteUrl = getDefaultCanonicalBaseUrl();

export const metadata: Metadata = {
  title: 'Servicios juridicos para empresas',
  description:
    'Areas de practica de Ruiz Leiva Abogados: litigacion civil, derecho corporativo, derecho administrativo, compliance, resolucion de conflictos y asesoria empresarial.',
  alternates: {
    canonical: '/servicios',
  },
  openGraph: {
    title: 'Servicios juridicos para empresas | Ruiz Leiva Abogados',
    description:
      'Explore las areas de practica de Ruiz Leiva Abogados para empresas y empresarios que necesitan asesoria juridica estrategica.',
    url: '/servicios',
    type: 'website',
  },
};

const servicesStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/servicios#webpage`,
      url: `${siteUrl}/servicios`,
      name: 'Servicios juridicos Ruiz Leiva Abogados',
      description:
        'Areas de practica de Ruiz Leiva Abogados para empresas, empresarios y conflictos juridicos complejos.',
      inLanguage: 'es-CL',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: serviceLandings.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: service.title,
          url: `${siteUrl}/servicios/${service.slug}`,
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Servicios',
          item: `${siteUrl}/servicios`,
        },
      ],
    },
  ],
};

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen bg-white text-[#07234c]">
      <JsonLd data={servicesStructuredData} />
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#07234c] px-5 pb-16 pt-28 text-white md:px-12 md:pb-24 md:pt-36 lg:px-24">
          <div className="absolute inset-0">
            <Image
              src={resolveSiteAssetSrc('/Las-Condes.jpg')}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-32 grayscale"
              priority
            />
            <div className="absolute inset-0 bg-[#07234c]/74" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07234c] via-[#07234c]/86 to-[#07234c]/50" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <span className="mb-5 block text-small font-bold uppercase tracking-widest text-[var(--color-primary)]">
              Areas de practica
            </span>
            <h1 className="max-w-[12ch] font-serif text-h1 tracking-tight text-white">
              Servicios juridicos estrategicos
            </h1>
            <p className="mt-7 max-w-[65ch] text-body text-gray-200">
              Seleccione el area que mejor representa su necesidad. Cada pantalla esta
              estructurada para explicar problemas frecuentes, enfoque de trabajo,
              servicios incluidos y el siguiente paso recomendado.
            </p>
          </div>
        </section>

        <ScrollReveal>
          <section className="px-5 py-16 md:px-12 md:py-24 lg:px-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 max-w-[65ch]">
                <span className="mb-4 block text-small font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  Soluciones Ruiz Leiva
                </span>
                <h2 className="font-serif text-h2 tracking-tight">
                  Pantallas por servicio, con contenido orientado a decision
                </h2>
                <p className="mt-5 max-w-[65ch] text-body text-[#555555]">
                  Cada area mantiene la misma linea visual del sitio: tarjetas limpias,
                  imagenes con capa oscura, botones circulares y jerarquia tipografica
                  consistente para escritorio y movil.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {serviceLandings.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="rlu-card-base rlu-card-light group flex min-h-[420px] flex-col p-2 transition-transform hover:-translate-y-1 md:min-h-[500px]"
                  >
                    <div className="relative aspect-[1.55] overflow-hidden rounded-[14px] bg-[#f2f2f2]">
                      <Image
                        src={resolveSiteAssetSrc(service.image)}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 92vw"
                        className="object-cover grayscale-[15%] transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#07234c]/28" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07234c]/60 via-[#07234c]/12 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col px-4 pb-5 pt-7 md:px-5">
                      <span className="text-small font-bold uppercase tracking-widest text-[var(--color-primary)]">
                        {service.eyebrow}
                      </span>
                      <h3 className="mt-3 text-h3 tracking-tight text-brand">
                        {service.title}
                      </h3>
                      <p className="mt-4 max-w-[65ch] text-body text-[#333333]">
                        {service.seoDescription}
                      </p>
                      <span className="rlu-button rlu-button-primary mt-auto min-h-10 w-fit px-5">
                        Ver servicio
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="border-t border-[#07234c]/5 bg-white px-5 py-16 md:px-12 md:py-24 lg:px-24">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.52fr_0.48fr] lg:items-start">
              <div>
                <span className="mb-4 block text-small font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  Criterio de trabajo
                </span>
                <h2 className="max-w-[16ch] font-serif text-h2 tracking-tight">
                  Una lectura juridica conectada con el negocio
                </h2>
                <p className="mt-6 max-w-[65ch] text-body text-[#555555]">
                  La pagina de cada servicio no funciona como un catalogo generico.
                  Explica cuando conviene actuar, que revisar antes de decidir y como
                  se ordena una estrategia legal con impacto comercial real.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  'Contenido preparado para busquedas organicas por servicio.',
                  'Estructura clara para usuarios que llegan desde Google.',
                  'CTA directo hacia Evalua tu caso en cada pantalla.',
                ].map((item) => (
                  <div key={item} className="rlu-card-base rlu-card-dark flex gap-3 p-5 text-white">
                    <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                    <p className="max-w-[65ch] text-body text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <WhatsAppWidget />
      <Footer />
    </div>
  );
}
