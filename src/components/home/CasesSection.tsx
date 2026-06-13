'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function CasesSection() {
  const { t } = useI18n();

  // Mapping our content to the specific layout structure of the "Useful for business" design.
  const casesData = [
    {
      tag: t('cases.corporate.title') || 'Fusión Corporativa',
      stat: '100%',
      subtitle: t('cases.corporate.result') || 'Aprobación sin multas por la FNE',
      description: t('cases.corporate.description') || 'Asesoría en la fusión de dos importantes empresas del sector retail.',
    },
    {
      tag: t('cases.litigation.title') || 'Litigio Civil',
      stat: '0',
      subtitle: t('cases.litigation.result') || 'Rechazo de la demanda',
      description: t('cases.litigation.description') || 'Defensa en una demanda por incumplimiento de contrato de construcción.',
    },
    {
      tag: t('cases.labor.title') || 'Negociación Sindical',
      stat: '10',
      subtitle: (t('cases.labor.result') || 'Acuerdo en 10 días').replace('10 ', ''), // A little hack to separate the number if present, or just leave it. Let's just use the full string.
      description: t('cases.labor.description') || 'Representación de la empresa en la negociación colectiva anual.',
    }
  ];

  // Fix for the 3rd card subtitle since we pulled out '10' as the huge stat
  casesData[2].subtitle = casesData[2].subtitle === 'Acuerdo en 10 días' ? 'Días para el acuerdo' : 'Days to reach agreement';
  casesData[1].subtitle = casesData[1].subtitle === 'Rechazo de la demanda' ? 'Indemnizaciones a pagar' : 'Damages to pay';

  return (
    <section id="casos" className="py-24 relative bg-[#07234c] overflow-hidden text-white">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
        
        {/* Header aligned like the design */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-h2 tracking-tight">
              {t('cases.label') || 'Casos de Éxito.'}
            </h2>
            <p className="mx-auto max-w-[65ch] text-body text-gray-400">
              {t('cases.description') || 'Nuestra trayectoria nos avala. Estos son algunos de los casos recientes donde hemos entregado resultados favorables a nuestros clientes.'}
            </p>
          </motion.div>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {casesData.map((c, idx) => (
            <motion.div
              key={idx}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-[#051830] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col"
            >
              {/* Tag / Pill */}
              <div className="mb-12">
                <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-small font-medium text-gray-300">
                  {c.tag}
                </span>
              </div>
              
              {/* Massive Stat */}
              <div className="mb-2">
                <span className="text-h1 tracking-tighter text-white">
                  {c.stat}
                </span>
              </div>
              
              {/* Subtitle */}
              <h3 className="mb-8 text-h3 text-white">
                {c.subtitle}
              </h3>
              
              {/* Description (Italic/Light) */}
              <p className="mt-auto max-w-[65ch] text-body italic text-gray-400">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
