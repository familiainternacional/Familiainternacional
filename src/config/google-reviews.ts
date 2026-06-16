/**
 * Reseñas verificadas en Google Business Profile.
 * Sincronizar desde GBP cuando lleguen nuevas reseñas.
 * Perfil: https://maps.app.goo.gl/h6Rr3zYJYEFLYCi28
 */
export const googleBusinessProfile = {
  name: 'Familia Internacional',
  profileUrl: 'https://maps.app.goo.gl/h6Rr3zYJYEFLYCi28',
  aggregateRating: {
    ratingValue: 5,
    reviewCount: 18,
    bestRating: 5,
    worstRating: 1,
  },
} as const;

export type GoogleReview = {
  id: string;
  author: string;
  initial: string;
  /** URL de foto del perfil en Google Business Profile Reviews. */
  authorPhotoUrl?: string;
  text: { es: string; en: string };
  rating: number;
  /** ISO date aproximada de publicación en Google, si se conoce. */
  datePublished?: string;
};

function googlePhoto(url: string) {
  return url.replace(/=w\d+-h\d+/, '=w96-h96');
}

export const googleReviews: GoogleReview[] = [
  {
    id: 'gbp-paulina-silva',
    author: 'Paulina Silva',
    initial: 'P',
    authorPhotoUrl: googlePhoto(
      'https://lh3.googleusercontent.com/a-/ALV-UjX8XVJtzPFsjFlRzf74h-6De7TcJsBe_iw05zZYwCw7GNDZuyUC=w54-h54-p-rp-mo-br100',
    ),
    text: {
      es: 'Quiero recomendar ampliamente al abogado Jaime Soto por su dedicación, profesionalismo y compromiso durante mi proceso de divorcio internacional. Desde el primer día demostró un profundo conocimiento legal, una comunicación clara y una gestión impecable.',
      en: 'I highly recommend attorney Jaime Soto for his dedication, professionalism, and commitment throughout my international divorce process. From day one he demonstrated deep legal knowledge, clear communication, and impeccable case management.',
    },
    rating: 5,
  },
  {
    id: 'gbp-vanessa-celedon',
    author: 'Vanessa Celedón Damele',
    initial: 'V',
    authorPhotoUrl: googlePhoto(
      'https://lh3.googleusercontent.com/a-/ALV-UjUYuuHAsz2Cl-7H8v9NdMX7H0rPIbML6s8NdmewUs8FfIWu10pP=w54-h54-p-rp-mo-br100',
    ),
    text: {
      es: 'Recomiendo a Jaime Soto para cualquier asunto legal que requiera un profesional confiable, comprometido y altamente competente. Su intervención fue clave para lograr una resolución exitosa.',
      en: 'I recommend Jaime Soto for any legal matter that requires a reliable, committed, and highly competent professional. His involvement was key to achieving a successful outcome.',
    },
    rating: 5,
  },
  {
    id: 'gbp-cristian-galindo',
    author: 'Cristian Galindo',
    initial: 'C',
    authorPhotoUrl: googlePhoto(
      'https://lh3.googleusercontent.com/a/ACg8ocKe6xIFJsyAc1nl_xiCZ27PwGNxjWzKotY2j7qEcfCMFKw-cA=w54-h54-p-rp-mo-br100',
    ),
    text: {
      es: 'Muy conforme con la atención que recibí de parte del abogado durante el proceso de mi causa. Don Jaime es un tremendo profesional que me ayudó a conseguir mi divorcio de manera rápida y sin contratiempos. Muy agradecido con su gestión.',
      en: 'Very satisfied with the attention I received from the attorney during my case. Jaime is an outstanding professional who helped me obtain my divorce quickly and without setbacks. Very grateful for his work.',
    },
    rating: 5,
  },
  {
    id: 'gbp-yalile-gomez',
    author: 'Yalile Gómez Alfonso',
    initial: 'Y',
    authorPhotoUrl: googlePhoto(
      'https://lh3.googleusercontent.com/a-/ALV-UjUoeBUY6HWxbkE8rfsQ7kxp52xuOKqOYSqqYXub5I8gtwhiG1hnug=w54-h54-p-rp-mo-ba12-br100',
    ),
    text: {
      es: 'Me es grato expresar mi más sincera gratitud y admiración por el trabajo impecable realizado por el abogado Jaime Soto Silva. Su profesionalismo, competencia y dedicación han sido fundamentales en la resolución exitosa de mi asunto.',
      en: 'I am pleased to express my sincere gratitude and admiration for the impeccable work done by attorney Jaime Soto Silva. His professionalism, competence, and dedication were fundamental to the successful resolution of my matter.',
    },
    rating: 5,
  },
  {
    id: 'gbp-geraldine-jara',
    author: 'Geraldine Jara Bruna',
    initial: 'G',
    authorPhotoUrl: googlePhoto(
      'https://lh3.googleusercontent.com/a/ACg8ocLbiuCp8QaShcfsgYGZtRaEg1Rdd5kP3HB_Kza1uGtnxC9gSw=w54-h54-p-rp-mo-br100',
    ),
    text: {
      es: 'Recomiendo 100% este estudio. Jaime es un excelente abogado; desde el primer día me explicó detalladamente todas mis opciones según mi caso. Es muy confiable y comprometido con su trabajo.',
      en: 'I recommend this firm 100%. Jaime is an excellent attorney; from day one he explained all my options in detail according to my case. He is very trustworthy and committed to his work.',
    },
    rating: 5,
  },
  {
    id: 'gbp-carolina-pozo',
    author: 'Carolina Pozo',
    initial: 'C',
    authorPhotoUrl: googlePhoto(
      'https://lh3.googleusercontent.com/a/ACg8ocKMD8Jt1pjkoQzJLzIZwvM4op46vkVr2aP4bZZ2d2W9L2fiPA=w54-h54-p-rp-mo-br100',
    ),
    text: {
      es: 'El abogado Jaime Soto, profesional y comprometido. Llevó correctamente el trámite de permiso de salida del país, explicó cada etapa con claridad y generó confianza durante el proceso.',
      en: 'Attorney Jaime Soto is professional and committed. He handled the travel authorization process correctly, explained each stage clearly, and built trust throughout the process.',
    },
    rating: 5,
  },
  {
    id: 'gbp-orieta-carvajal',
    author: 'Orieta Carvajal',
    initial: 'O',
    authorPhotoUrl: googlePhoto(
      'https://lh3.googleusercontent.com/a/ACg8ocLsSd3hROWVrw3RP7ZtwbQduTIVb5a5h_uBjJ6LVFM8NORStw=w54-h54-p-rp-mo-br100',
    ),
    text: {
      es: 'Mi experiencia es muy satisfactoria. Los tiempos fueron adecuados y resolvió mi caso que llevaba años estancado con otros abogados. Recomiendo a Jaime Soto; es un excelente profesional.',
      en: 'My experience is very satisfactory. The timelines were appropriate and he resolved my case, which had been stalled for years with other attorneys. I recommend Jaime Soto; he is an excellent professional.',
    },
    rating: 5,
  },
  {
    id: 'gbp-francisca-ulloa',
    author: 'Francisca Ulloa',
    initial: 'F',
    authorPhotoUrl: googlePhoto(
      'https://lh3.googleusercontent.com/a-/ALV-UjV6ip4MNIzKgBejwj5JTxbmxiD9GvxKFpFz-dwgPdfQJ_jAyX8wJA=w54-h54-p-rp-mo-br100',
    ),
    text: {
      es: 'Jaime fue de gran ayuda en mi caso. Mi familia se lo agradece.',
      en: 'Jaime was a great help in my case. My family is grateful to him.',
    },
    rating: 5,
  },
];
