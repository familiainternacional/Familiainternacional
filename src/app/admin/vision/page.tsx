import { Server, Database, Lock, Calendar, CreditCard, FolderKey, ShieldAlert, Rocket, TrendingUp, BarChart3, Users, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Visión Tecnológica | Admin Ruiz Leiva',
};

export default function VisionDashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visión Tecnológica</h1>
          <p className="text-gray-400 mt-1">
            Infraestructura técnica, roadmap de integraciones y ciclo de escalabilidad del modelo de negocio.
          </p>
        </div>
      </div>

      {/* Arquitectura Actual */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">1. Arquitectura Base (Versión Actual)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#051830] p-5 rounded-2xl border border-white/10">
            <Server className="w-8 h-8 text-[var(--color-primary)] mb-4" />
            <h3 className="font-bold text-lg mb-2">Next.js 15 App Router</h3>
            <p className="text-sm text-gray-400">Framework React de vanguardia. Renderizado en servidor (SSR) para SEO extremo y velocidades de carga ultrarrápidas.</p>
          </div>
          <div className="bg-[#051830] p-5 rounded-2xl border border-white/10">
            <Database className="w-8 h-8 text-[var(--color-primary)] mb-4" />
            <h3 className="font-bold text-lg mb-2">Supabase PostgreSQL</h3>
            <p className="text-sm text-gray-400">Base de datos relacional altamente escalable. Almacena de forma segura los leads y los artículos del blog.</p>
          </div>
          <div className="bg-[#051830] p-5 rounded-2xl border border-white/10">
            <Lock className="w-8 h-8 text-[var(--color-primary)] mb-4" />
            <h3 className="font-bold text-lg mb-2">Autenticación (JWT)</h3>
            <p className="text-sm text-gray-400">Sistema de acceso protegido mediante Supabase Auth y validación JWT a nivel de servidor (RLS).</p>
          </div>
          <div className="bg-[#051830] p-5 rounded-2xl border border-white/10">
            <BarChart3 className="w-8 h-8 text-[var(--color-primary)] mb-4" />
            <h3 className="font-bold text-lg mb-2">Prisma ORM</h3>
            <p className="text-sm text-gray-400">Capa de abstracción segura. Protege automáticamente contra inyecciones SQL y garantiza el tipado fuerte.</p>
          </div>
        </div>
      </section>

      {/* Roadmap Tecnológico v1.1 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">2. Roadmap de Integraciones (Versión 1.1)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#051830] p-6 rounded-2xl border border-white/10 flex gap-4 items-start">
            <div className="bg-[var(--color-primary)]/10 p-3 rounded-xl shrink-0">
              <Calendar className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Módulo de Agendamiento (Cal.com)</h3>
              <p className="text-sm text-gray-400 mb-3">
                Sincronización bidireccional con Google Calendar/Outlook. Los clientes podrán reservar la &quot;Primera Consulta&quot; escogiendo bloques horarios disponibles sin interacción humana.
              </p>
              <span className="inline-block px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-md border border-green-500/20">En Progreso</span>
            </div>
          </div>
          
          <div className="bg-[#051830] p-6 rounded-2xl border border-white/10 flex gap-4 items-start">
            <div className="bg-[var(--color-primary)]/10 p-3 rounded-xl shrink-0">
              <ShieldAlert className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Defensa Anti-Bot & Rate Limiting</h3>
              <p className="text-sm text-gray-400 mb-3">
                Implementación de reCAPTCHA v3 invisible y límites de peticiones (Rate Limit) vía Upstash Redis para evitar ataques masivos (Denial of Wallet).
              </p>
              <span className="inline-block px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded-md border border-yellow-500/20">Prioridad Alta</span>
            </div>
          </div>

          <div className="bg-[#051830] p-6 rounded-2xl border border-white/10 flex gap-4 items-start">
            <div className="bg-[var(--color-primary)]/10 p-3 rounded-xl shrink-0">
              <CreditCard className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Pasarela de Pagos (Stripe)</h3>
              <p className="text-sm text-gray-400 mb-3">
                Cobro por adelantado de asesorías express. Al momento de agendar en Cal.com, el cliente deberá pagar mediante tarjeta de crédito para confirmar.
              </p>
              <span className="inline-block px-2 py-1 bg-gray-500/10 text-gray-400 text-xs rounded-md border border-gray-500/20">Planificado</span>
            </div>
          </div>

          <div className="bg-[#051830] p-6 rounded-2xl border border-white/10 flex gap-4 items-start">
            <div className="bg-[var(--color-primary)]/10 p-3 rounded-xl shrink-0">
              <FolderKey className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Bóveda Documental Segura</h3>
              <p className="text-sm text-gray-400 mb-3">
                Uso de Supabase Storage RLS para permitir que clientes suban demandas, contratos o pruebas en un entorno altamente encriptado (Dropzone).
              </p>
              <span className="inline-block px-2 py-1 bg-gray-500/10 text-gray-400 text-xs rounded-md border border-gray-500/20">Planificado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ciclo de Escalabilidad */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">3. Ciclo de Escalabilidad Comercial (Firma Legal Tech)</h2>
        <div className="relative">
          {/* Línea conectora */}
          <div className="absolute top-8 left-6 bottom-8 w-0.5 bg-gradient-to-b from-[var(--color-primary)] via-red-900 to-transparent md:left-1/2 md:-ml-[1px]" />
          
          <div className="space-y-8">
            {/* Fase 1 */}
            <div className="relative flex items-center md:justify-center md:odd:justify-start md:even:justify-end group">
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[var(--color-primary)] rounded-full border-4 border-[#07234c] -ml-2 z-10 group-hover:scale-125 transition-transform" />
              <div className="pl-12 md:pl-0 md:w-1/2 md:pr-12 md:text-right">
                <div className="bg-[#051830] p-6 rounded-2xl border border-[var(--color-primary)]/30 shadow-[0_0_15px_rgba(230,57,70,0.1)]">
                  <span className="text-[var(--color-primary)] font-bold text-sm tracking-wider uppercase mb-2 block">Fase 1: Autoridad y Captura (Actual)</span>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2 md:justify-end">
                    <Rocket className="w-5 h-5 text-gray-400" /> Presencia Digital
                  </h4>
                  <p className="text-sm text-gray-400">
                    Posicionamiento SEO a través del blog (Perspectivas) y captura inicial de prospectos mediante el formulario de evaluación de casos.
                  </p>
                </div>
              </div>
            </div>

            {/* Fase 2 */}
            <div className="relative flex items-center md:justify-center md:even:justify-end md:odd:justify-start group">
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gray-600 rounded-full border-4 border-[#07234c] -ml-2 z-10 group-hover:bg-[var(--color-primary)] transition-colors" />
              <div className="pl-12 md:pl-8 md:w-1/2">
                <div className="bg-[#051830] p-6 rounded-2xl border border-white/10 hover:border-gray-500 transition-colors">
                  <span className="text-gray-500 font-bold text-sm tracking-wider uppercase mb-2 block">Fase 2: Triage y Conversión (v1.1)</span>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" /> Agendamiento Directo
                  </h4>
                  <p className="text-sm text-gray-400">
                    El cliente califica su propio caso y agenda directamente pagando por adelantado. Reducción drástica del tiempo operativo de secretaría/recepción.
                  </p>
                </div>
              </div>
            </div>

            {/* Fase 3 */}
            <div className="relative flex items-center md:justify-center md:odd:justify-start md:even:justify-end group">
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gray-600 rounded-full border-4 border-[#07234c] -ml-2 z-10 group-hover:bg-[var(--color-primary)] transition-colors" />
              <div className="pl-12 md:pl-0 md:w-1/2 md:pr-12 md:text-right">
                <div className="bg-[#051830] p-6 rounded-2xl border border-white/10 hover:border-gray-500 transition-colors">
                  <span className="text-gray-500 font-bold text-sm tracking-wider uppercase mb-2 block">Fase 3: Operación Transparente</span>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2 md:justify-end">
                    <TrendingUp className="w-5 h-5 text-gray-400" /> Portal del Cliente
                  </h4>
                  <p className="text-sm text-gray-400">
                    Los clientes inician sesión con su RUT/Email para ver el estado de su juicio en la corte (sincronizado con PJUD) y descargar documentos firmados, disminuyendo correos y llamadas repetitivas.
                  </p>
                </div>
              </div>
            </div>

            {/* Fase 4 */}
            <div className="relative flex items-center md:justify-center md:even:justify-end md:odd:justify-start group">
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gray-600 rounded-full border-4 border-[#07234c] -ml-2 z-10 group-hover:bg-[var(--color-primary)] transition-colors" />
              <div className="pl-12 md:pl-8 md:w-1/2">
                <div className="bg-[#051830] p-6 rounded-2xl border border-white/10 hover:border-gray-500 transition-colors">
                  <span className="text-gray-500 font-bold text-sm tracking-wider uppercase mb-2 block">Fase 4: Modelo B2B Suscripción</span>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-400" /> Servicios Productizados
                  </h4>
                  <p className="text-sm text-gray-400">
                    Venta de &quot;Suscripciones Legales&quot; para PYMES y Emprendedores (ej. Consultas ilimitadas + revisión de 3 contratos al mes por un Fee mensual recurrente procesado por Stripe).
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
