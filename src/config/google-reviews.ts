/**
 * Reseñas verificadas en Google Business Profile.
 * Actualizar manualmente cuando lleguen nuevas reseñas en GBP.
 * Perfil: https://maps.app.goo.gl/h6Rr3zYJYEFLYCi28
 */
export const googleBusinessProfile = {
  name: 'Familia Internacional',
  profileUrl: 'https://maps.app.goo.gl/h6Rr3zYJYEFLYCi28',
  /** Actualizar desde Google Business Profile cuando cambie el promedio. */
  aggregateRating: {
    ratingValue: 5,
    reviewCount: 3,
    bestRating: 5,
    worstRating: 1,
  },
} as const;

export type GoogleReview = {
  id: string;
  author: string;
  initial: string;
  text: { es: string; en: string };
  rating: number;
  /** ISO date aproximada de publicación en Google, si se conoce. */
  datePublished?: string;
};

export const googleReviews: GoogleReview[] = [
  {
    id: 'gbp-andrea-fuentes',
    author: 'Andrea Fuentes',
    initial: 'A',
    text: {
      es: 'Excelente servicio y muy profesionales. Me acompañaron en todo mi proceso de divorcio internacional desde España. 100% recomendados por su cercanía y claridad.',
      en: 'Excellent service and very professional. They supported me through my entire international divorce process from Spain. 100% recommended for their closeness and clarity.',
    },
    rating: 5,
  },
  {
    id: 'gbp-carlos-mendoza',
    author: 'Carlos Mendoza',
    initial: 'C',
    text: {
      es: 'Resolvieron un tema de pensión de alimentos que llevaba meses estancado. Su experiencia en el Convenio de Nueva York fue fundamental. Muchas gracias al equipo.',
      en: 'They resolved a child support matter that had been stalled for months. Their experience with the New York Convention was essential. Many thanks to the team.',
    },
    rating: 5,
  },
  {
    id: 'gbp-javiera-silva',
    author: 'Javiera Silva',
    initial: 'J',
    text: {
      es: 'Muy agradecida por la gestión de nuestro cuidado personal internacional. Los abogados siempre estuvieron disponibles y nos explicaron cada paso con mucha empatía.',
      en: 'Very grateful for the handling of our international custody case. The attorneys were always available and explained every step with great empathy.',
    },
    rating: 5,
  },
];
