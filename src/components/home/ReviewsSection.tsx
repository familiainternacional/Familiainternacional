import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Andrea Fuentes',
    initial: 'A',
    text: 'Excelente servicio y muy profesionales. Me acompañaron en todo mi proceso de divorcio internacional desde España. 100% recomendados por su cercanía y claridad.',
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    initial: 'C',
    text: 'Resolvieron un tema de pensión de alimentos que llevaba meses estancado. Su experiencia en el Convenio de Nueva York fue fundamental. Muchas gracias al equipo.',
  },
  {
    id: 3,
    name: 'Javiera Silva',
    initial: 'J',
    text: 'Muy agradecida por la gestión de nuestro cuidado personal internacional. Los abogados siempre estuvieron disponibles y nos explicaron cada paso con mucha empatía.',
  },
];

export default function ReviewsSection() {
  const googleMapsUrl = 'https://maps.app.goo.gl/h6Rr3zYJYEFLYCi28';

  return (
    <section className="relative z-10 w-full bg-white px-5 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="bg-[#e2f5ec] text-[#1c1c1c] text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] py-2.5 px-5 rounded-full mb-8">
          Reseñas de Clientes
        </div>

        {/* Main Title */}
        <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] font-black text-[#1c1c1c] text-center max-w-4xl leading-[1.1] tracking-tight mb-8">
          Experiencias reales de familias que confiaron en nosotros
        </h2>

        {/* Learn More Link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-[#1c1c1c] font-bold text-[12px] tracking-widest uppercase transition-colors hover:text-black/70 mb-20"
        >
          Ver en Google
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-black/10 group-hover:bg-black/5 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </a>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between bg-white border border-neutral-200/80 rounded-[2.5rem] p-8 lg:p-10 transition-shadow hover:shadow-xl hover:shadow-black/[0.03]"
            >
              <div>
                {/* User Initial Avatar */}
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-[#1c1c1c] font-bold mb-6">
                  {review.initial}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-[#1c1c1c] mb-4">
                  {review.name}
                </h3>

                {/* Review Text */}
                <p className="text-[15px] leading-relaxed text-neutral-600 mb-8">
                  {review.text}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#fbbc04] text-[#fbbc04]" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-neutral-400">5.0</span>
                </div>

                {/* Action Arrow */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 text-neutral-400 hover:bg-neutral-50 hover:text-[#1c1c1c] transition-colors"
                  aria-label="Ver reseña en Google"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
