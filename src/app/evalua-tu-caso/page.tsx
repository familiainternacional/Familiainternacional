import type { Metadata } from 'next';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import EvaluaTuCasoForm from '@/components/forms/EvaluaTuCasoForm';
import GoogleCalendarBooking from '@/components/calendar/GoogleCalendarBooking';
import JsonLd from '@/components/seo/JsonLd';
import { buildEvaluaTuCasoStructuredData } from '@/lib/seo/structured-data';
import { Scale, Clock, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Evalúa tu caso',
  description:
    'Cuéntanos tu situación legal y un abogado de Ruiz Leiva Abogados analizará el caso para definir una estrategia clara, técnica y orientada a resultados.',
  alternates: {
    canonical: '/evalua-tu-caso',
  },
  openGraph: {
    title: 'Evalúa tu caso | Ruiz Leiva Abogados',
    description:
      'Solicita una evaluación inicial para definir una estrategia jurídica clara, técnica y orientada a resultados.',
    url: '/evalua-tu-caso',
  },
};

export default function EvaluaTuCasoPage() {
  const googleCalendarBookingUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL;

  return (
    <main className="flex min-h-screen flex-col bg-[#07234c] text-white selection:bg-[var(--color-primary)] selection:text-white">
      <JsonLd data={buildEvaluaTuCasoStructuredData()} />
      <Navbar />

      <section className="relative flex-1 overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-full bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent" />
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[50%] w-[50%] rounded-full bg-[var(--color-primary)]/10 blur-[120px]" />

        <div className="container relative z-10 mx-auto px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-4xl px-1 text-center md:mb-16">
            <h1 className="mb-5 text-h1 tracking-tight md:mb-6">
              Evalúa tu <span className="text-[var(--color-primary)]">Caso</span>
            </h1>
            <p className="mx-auto max-w-[65ch] text-body text-gray-400">
              Nuestro equipo está listo para analizar tu situación legal.
              Completa el formulario y te daremos una evaluación inicial para definir la mejor estrategia.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="min-w-0 space-y-10 lg:col-span-5">
              <div>
                <h2 className="mb-8 text-h3">¿Por qué elegirnos?</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Scale className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-h3">Especialistas</h3>
                      <p className="max-w-[65ch] text-body text-gray-400">
                        Contamos con profesionales capacitados en diversas ramas del derecho.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Clock className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-h3">Respuesta rápida</h3>
                      <p className="max-w-[65ch] text-body text-gray-400">
                        Analizamos tu consulta y te contactamos en el menor tiempo posible para no retrasar tus procesos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <ShieldCheck className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-h3">Confidencialidad total</h3>
                      <p className="max-w-[65ch] text-body text-gray-400">
                        Toda la información que nos proporciones será tratada con absoluta reserva y seguridad.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-2 font-semibold">Contacto directo</h2>
                <p className="mb-4 max-w-[65ch] text-body text-gray-400">
                  Si prefieres, también puedes escribirnos directamente a nuestro correo.
                </p>
                <div className="space-y-3 text-small">
                  <p>
                    <strong className="block text-white">Sebastián Leiva</strong>
                    <a href="mailto:sleiva@rluabogados.cl" className="break-all text-gray-300 transition-colors hover:text-white">
                      sleiva@rluabogados.cl
                    </a>
                  </p>
                  <p>
                    <strong className="block text-white">Christian Ruiz</strong>
                    <a href="mailto:cruiz@rluabogados.cl" className="break-all text-gray-300 transition-colors hover:text-white">
                      cruiz@rluabogados.cl
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <EvaluaTuCasoForm />
            </div>
          </div>

          <GoogleCalendarBooking bookingUrl={googleCalendarBookingUrl} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
