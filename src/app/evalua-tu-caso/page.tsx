import type { Metadata } from 'next';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import EvaluaTuCasoForm from '@/components/forms/EvaluaTuCasoForm';
import GoogleCalendarBooking from '@/components/calendar/GoogleCalendarBooking';
import JsonLd from '@/components/seo/JsonLd';
import { buildEvaluaTuCasoStructuredData } from '@/lib/seo/structured-data';
import { resolveSiteContact } from '@/lib/site-contact';
import { Scale, Clock, ShieldCheck } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.evalua;

  return createPageMetadata({
    pathname: '/evalua-tu-caso',
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function EvaluaTuCasoPage() {
  const googleCalendarBookingUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL;
  const contact = resolveSiteContact(null);

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#07234c] selection:bg-[var(--color-primary)] selection:text-white">
      <JsonLd data={buildEvaluaTuCasoStructuredData()} />
      <Navbar />

      <section className="relative flex-1 overflow-hidden bg-white pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-full bg-gradient-to-b from-[var(--color-primary)]/[0.06] to-transparent" />
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[50%] w-[50%] rounded-full bg-[var(--color-primary)]/[0.10] blur-[120px]" />

        <div className="container relative z-10 mx-auto px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-4xl px-1 text-center md:mb-16">
            <h1 className="mb-5 text-h1 tracking-tight md:mb-6">
              Evalúa tu <span className="text-[var(--color-primary)]">Caso</span>
            </h1>
            <p className="mx-auto max-w-[65ch] text-body text-neutral-600">
              Nuestro equipo especializado en derecho de familia internacional está listo para analizar tu situación.
              Completa el formulario y te daremos una evaluación inicial para definir la mejor estrategia.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="min-w-0 space-y-10 lg:col-span-5">
              <div>
                <h2 className="mb-8 text-h3">¿Por qué elegirnos?</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-card border border-[#07234c]/10 bg-[#07234c]/[0.03]">
                      <Scale className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-h3">Especialistas en familia internacional</h3>
                      <p className="max-w-[65ch] text-body text-neutral-600">
                        Primer estudio en Chile dedicado exclusivamente al Derecho Internacional de Familia y al Convenio de La Haya.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-card border border-[#07234c]/10 bg-[#07234c]/[0.03]">
                      <Clock className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-h3">Respuesta rápida</h3>
                      <p className="max-w-[65ch] text-body text-neutral-600">
                        Analizamos tu consulta y te contactamos en el menor tiempo posible para no retrasar tus procesos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-card border border-[#07234c]/10 bg-[#07234c]/[0.03]">
                      <ShieldCheck className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-h3">Confidencialidad total</h3>
                      <p className="max-w-[65ch] text-body text-neutral-600">
                        Toda la información que nos proporciones será tratada con absoluta reserva y seguridad.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-card border border-[#07234c]/10 bg-[#07234c]/[0.03] p-6">
                <h2 className="mb-2 font-semibold">Contacto directo</h2>
                <p className="mb-4 max-w-[65ch] text-body text-neutral-600">
                  Si prefieres, también puedes escribirnos directamente a nuestro correo.
                </p>
                <div className="space-y-3 text-small">
                  <p>
                    <strong className="block text-[#07234c]">Jaime Soto Silva</strong>
                    <span className="block text-neutral-600">Abogado – Socio</span>
                    <a href={`mailto:${contact.primaryEmail}`} className="break-all text-[#0d3566] transition-colors hover:underline">
                      {contact.primaryEmail}
                    </a>
                  </p>
                  <p>
                    <a href={contact.primaryPhoneHref} className="text-[#0d3566] transition-colors hover:underline">
                      {contact.primaryPhone}
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
