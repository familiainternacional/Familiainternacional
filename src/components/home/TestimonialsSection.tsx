'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';
import FloatingCard from '@/components/motion/FloatingCard';
import { premiumEase } from '@/lib/motion/easings';
import Image from 'next/image';

type Testimonial = {
  id: string;
  quoteEs: string;
  quoteEn?: string | null;
  author: string;
  roleEs: string;
  roleEn?: string | null;
};

export default function TestimonialsSection({ testimonials = [] }: { testimonials?: Testimonial[] }) {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-white px-5 py-20 text-[#0f172a] md:px-12 md:py-32 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="fi-section-header fi-section-header--center"
        >
          <p className="fi-eyebrow text-[var(--color-primary)]">
            {isSpanish ? 'Testimonios' : 'Testimonials'}
          </p>
          <h2 id="testimonials-title" className="fi-section-heading text-[#0f172a]">
            {isSpanish ? 'Testimonios de clientes verificados' : 'Verified Client Testimonials'}
          </h2>
          <p className="fi-section-intro fi-section-intro--center text-[#64748b]">
            Google My Business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Featured Visual/Video Card (Replicating the left side of the design) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="relative w-full h-[400px] md:h-auto min-h-[350px] md:min-h-[450px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
          >
            {/* Hardcoded featured image for aesthetic replica */}
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
              alt="Client Testimonial"
              fill
              className="object-cover"
            />
            {/* Gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 z-10">
              <h3 className="fi-card-title text-white">{isSpanish ? 'Tom R.' : 'Tom R.'}</h3>
              <p className="mt-1 text-sm font-medium text-white/80">{isSpanish ? 'Fundador de StartGlobal Inc.' : 'Founder of StartGlobal Inc.'}</p>
            </div>
          </motion.div>

          {/* Text Testimonials */}
          <div className="flex flex-col gap-6 md:gap-8">
            {testimonials.length > 0 ? (
              // Show only the first 2 text testimonials to match the 2-column aesthetic if possible, 
              // but we'll map all of them and they will stack on the right side.
              testimonials.slice(0, 2).map((testimonial, index) => (
                <FloatingCard
                  key={testimonial.id}
                  index={index}
                  className="flex flex-col justify-between rounded-[1.5rem] md:rounded-[2rem] bg-[#f8fafc] p-8 md:p-10 transition-shadow hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] min-h-[350px] md:min-h-[450px]"
                >
                  <div>
                    {/* Header: Name/Role (Left) + Avatar (Right) */}
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <h3 className="fi-card-title text-[#0f172a]">{testimonial.author}</h3>
                        <p className="mt-1 text-sm font-medium text-[#64748b]">
                          {isSpanish ? testimonial.roleEs : testimonial.roleEn}
                        </p>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e2e8f0] text-sm font-bold text-[#334155]">
                        {testimonial.author.charAt(0)}
                      </div>
                    </div>

                    {/* Body: Quote */}
                    <p className="fi-section-lead mb-8 font-medium leading-snug text-[#334155]">
                      {isSpanish ? testimonial.quoteEs : testimonial.quoteEn}
                    </p>
                  </div>

                  {/* Footer: Read More */}
                  <div className="mt-auto">
                    <button className="text-[11px] font-bold uppercase tracking-widest text-[#64748b] hover:text-[#0f172a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f172a] focus-visible:ring-offset-2 rounded-sm px-1 -mx-1">
                      {isSpanish ? 'Leer más' : 'Read more'}
                    </button>
                  </div>
                </FloatingCard>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center rounded-[2rem] bg-[#f8fafc] p-10 h-full">
                <p className="text-slate-500 italic font-medium">No hay testimonios disponibles por el momento.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
