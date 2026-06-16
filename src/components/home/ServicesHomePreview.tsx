'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';
import { familyServices } from '@/config/family-services';
import { HOME_SECTION_ANCHOR_CLASS } from '@/lib/layout';

export default function ServicesHomePreview() {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';

  return (
    <section 
      id="services" 
      aria-labelledby="services-preview-title" 
      className={`relative w-full py-16 font-sans sm:py-24 bg-cover bg-center bg-no-repeat bg-fixed ${HOME_SECTION_ANCHOR_CLASS}`}
      style={{ backgroundImage: 'url(/internacionales-bg.png)' }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fi-section-header">
            <div className="max-w-xl">
              <p className="fi-eyebrow text-[var(--color-primary)]">
                {isSpanish ? 'Áreas de práctica' : 'Practice areas'}
              </p>
              <h2 id="services-preview-title" className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.15] text-[#1a1a1a] tracking-tight mb-4">
                {isSpanish ? '¿En qué podemos ayudarte?' : 'How can we help you?'}
              </h2>
              <p className="fi-section-intro">
                {isSpanish
                  ? 'Especialización exclusiva en derecho de familia internacional. Selecciona el área más cercana a tu situación.'
                  : 'Exclusive focus on international family law. Choose the area closest to your situation.'}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
            {familyServices.map((service) => (
              <div
                key={service.slug}
                className="group flex flex-col rounded-[1.25rem] border border-white/40 bg-white/50 backdrop-blur-md p-8 sm:p-10 transition-all hover:shadow-xl hover:-translate-y-1 hover:bg-white/70"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#07234c] text-white font-bold text-lg">
                    {service.num}
                  </span>
                  <h3 className="text-2xl font-bold text-[#1a1a1a] leading-tight">
                    {isSpanish ? service.title.es : service.title.en}
                  </h3>
                </div>
                
                <p className="text-[#555555] mb-6 leading-relaxed flex-1 text-sm sm:text-base">
                  {isSpanish ? service.intro.es : service.intro.en}
                </p>

                <div className="mb-8 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#07234c] mb-3">
                    {isSpanish ? 'Incluye:' : 'Includes:'}
                  </h4>
                  <ul className="space-y-2">
                    {(isSpanish ? service.includes.es : service.includes.en).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#1a1a1a]">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#07234c]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
