export type MediaMentionKind = 'press' | 'video';

export type MediaMentionFaq = {
  question: string;
  answer: string;
};

export type MediaMentionSeo = {
  title: string;
  description: string;
  keywords: string[];
};

export type MediaMention = {
  id: string;
  slug: string;
  kind: MediaMentionKind;
  source: string;
  date: string;
  title: string;
  description: string;
  /** URL original del medio (externa). */
  url: string;
  thumbnail?: string | null;
  featured?: boolean;
  /** Genera página propia en /prensa/[slug] para SEO. */
  detailPage?: boolean;
  expertName?: string;
  expertQuote?: {
    es: string;
    en: string;
  };
  seo?: MediaMentionSeo;
  body?: {
    es: string[];
    en: string[];
  };
  faqs?: MediaMentionFaq[];
  topics?: string[];
  /** En móvil: imagen del recorte de prensa antes del resumen del artículo. */
  mobilePressIntro?: {
    image: string;
    durationMs?: number;
  };
};

/** Cobertura en prensa y medios — casos donde se consulta al estudio como experto. */
export const mediaMentions: MediaMention[] = [
  {
    id: 'lun-mane-swett-2024',
    slug: 'lun-mane-swett-convenio-la-haya',
    kind: 'press',
    source: 'Las Últimas Noticias',
    date: '2024-05-10',
    title: 'Corte de Nueva York rechazó la petición de Mane Swett para recuperar a su hijo',
    description:
      'LUN consultó a Jaime Soto, abogado especialista en derecho de familia internacional, sobre las opciones de apelación y el peso del Convenio de La Haya en casos de sustracción internacional.',
    url: 'https://www.lun.com/Pages/NewsDetail.aspx?BodyID=0&NewsID=529828&PaginaId=26&dt=2024-05-10',
    thumbnail: '/media/lun-mane-swett-2024-05-10.png',
    mobilePressIntro: {
      image:
        'https://familiainternacional.cl/wp-content/uploads/2024/08/Las-Ultimas-Noticias_page-0001-1187x1536.jpg',
      durationMs: 6000,
    },
    featured: true,
    detailPage: true,
    expertName: 'Jaime Soto Silva',
    expertQuote: {
      es: 'El Convenio de La Haya considera que debe tomarse en cuenta la voluntad del hijo. Ese hecho es crucial.',
      en: 'The Hague Convention provides that the child’s wishes must be taken into account. That factor is crucial.',
    },
    seo: {
      title: 'Jaime Soto en LUN: apelación, custodia y Convenio de La Haya',
      description:
        'Análisis de Jaime Soto Silva en Las Últimas Noticias sobre la apelación en casos de sustracción internacional, la voluntad del menor y el arraigo bajo el Convenio de La Haya de 1980.',
      keywords: [
        'Convenio de La Haya 1980',
        'sustracción internacional de menores Chile',
        'Jaime Soto Silva',
        'Familia Internacional',
        'apelación custodia internacional',
        'Las Últimas Noticias',
      ],
    },
    body: {
      es: [
        'En mayo de 2024, Las Últimas Noticias publicó una nota sobre el fallo de la Corte del Distrito Sur de Nueva York que rechazó la petición de retorno del menor a Chile en un conflicto de custodia transfronteriza.',
        'El medio consultó a Jaime Soto Silva — abogado especialista en derecho de familia internacional y académico — para explicar si existía la posibilidad de apelar y cuáles eran los factores jurídicos determinantes en este tipo de causas.',
        'Entre esos factores destacan la voluntad del niño cuando tiene edad y madurez suficientes, y la demostración de que el menor se encuentra arraigado en su nuevo entorno. Ambos son criterios relevantes bajo el Convenio de La Haya sobre los aspectos civiles de la sustracción internacional de menores.',
        'Familia Internacional no representó a las partes en este caso público. Jaime Soto fue consultado como experto para traducir el fallo y las opciones procesales reales que existen en escenarios de alta complejidad internacional.',
        'Este tipo de cobertura refleja la experiencia del estudio en materias que combinan litigación en el extranjero, coordinación con abogados internacionales y aplicación de tratados multilaterales de protección de niños, niñas y adolescentes.',
      ],
      en: [
        'In May 2024, Las Últimas Noticias reported on a ruling by the U.S. District Court for the Southern District of New York rejecting a return petition in a cross-border custody dispute.',
        'The outlet consulted Jaime Soto Silva — an international family law attorney and academic — to explain whether an appeal was available and which legal factors typically decide these cases.',
        'Key factors include the child’s wishes when the child is of sufficient age and maturity, and evidence that the child is settled in the new environment. Both are relevant under the Hague Convention on the Civil Aspects of International Child Abduction.',
        'Familia Internacional did not represent the parties in this public matter. Jaime Soto was interviewed as an expert to clarify the ruling and the practical procedural options available in complex international scenarios.',
      ],
    },
    faqs: [
      {
        question: '¿Se puede apelar un fallo de sustracción internacional en Nueva York?',
        answer:
          'En general, quien pierde en primera instancia puede apelar ante la Corte de Apelaciones. Sin embargo, el análisis debe considerar la voluntad del menor y su arraigo, factores que el Convenio de La Haya puede ponderar con especial fuerza.',
      },
      {
        question: '¿Qué peso tiene la voluntad del hijo en el Convenio de La Haya?',
        answer:
          'Cuando el niño tiene edad y madurez suficientes, su opinión puede ser determinante. Por eso, como señaló Jaime Soto en LUN, ese hecho resulta crucial en la estrategia del caso.',
      },
      {
        question: '¿Familia Internacional representó a Mane Swett?',
        answer:
          'No. En esta cobertura Jaime Soto Silva fue consultado por el medio como experto en derecho de familia internacional, no como abogado patrocinante de alguna de las partes.',
      },
    ],
    topics: ['Convenio de La Haya', 'Sustracción internacional', 'Custodia transfronteriza', 'Apelación'],
  },
  {
    id: 't13-mane-swett-video',
    slug: 't13-drama-judicial-mane-swett',
    kind: 'video',
    source: 'T13',
    date: '2024-05-10',
    title: 'Drama judicial en Estados Unidos',
    description:
      'Cobertura de Teletrece sobre el complejo caso de custodia internacional de la actriz chilena Mane Swett.',
    url: 'https://www.t13.cl/videos/espectaculos/el-drama-judicial-mane-swett-estados-unidos-10-5-2024',
    thumbnail: '/media/t13-drama-judicial-mane-swett.jpg',
    topics: ['Custodia internacional', 'Medios'],
  },
  {
    id: 'youtube-analisis-1',
    slug: 'youtube-analisis-caso-judicial',
    kind: 'video',
    source: 'YouTube',
    date: '2024-01-01',
    title: 'Análisis del caso judicial',
    description:
      'Comentarios y análisis detallado sobre procesos internacionales y protección de menores.',
    url: 'https://www.youtube.com/watch?v=mLSScUYiRQ8',
    thumbnail: 'https://img.youtube.com/vi/mLSScUYiRQ8/hqdefault.jpg',
    topics: ['Protección de menores', 'Análisis jurídico'],
  },
  {
    id: 'youtube-entrevista-2',
    slug: 'youtube-entrevista-conflictos-familiares',
    kind: 'video',
    source: 'YouTube',
    date: '2024-01-01',
    title: 'Entrevista y cobertura legal',
    description:
      'Participación especial explicando los alcances de la ley en conflictos familiares transfronterizos.',
    url: 'https://www.youtube.com/watch?v=NAUoyTDqyI0',
    thumbnail: 'https://img.youtube.com/vi/NAUoyTDqyI0/hqdefault.jpg',
    topics: ['Conflictos transfronterizos', 'Entrevista'],
  },
];

export function getFeaturedPressMention() {
  return mediaMentions.find((item) => item.featured) ?? mediaMentions.find((item) => item.kind === 'press') ?? null;
}

export function getMediaMentionBySlug(slug: string) {
  return mediaMentions.find((item) => item.slug === slug) ?? null;
}

export function getPressDetailPages() {
  return mediaMentions.filter((item) => item.detailPage);
}

export function getPressHubItems() {
  return [...mediaMentions].sort((a, b) => b.date.localeCompare(a.date));
}

export const pressOutletNames = [...new Set(mediaMentions.map((item) => item.source))];

export const pressHubSeo = {
  title: 'Prensa y medios | Familia Internacional',
  description:
    'Cobertura en Las Últimas Noticias, T13 y otros medios donde Jaime Soto Silva y Familia Internacional explican casos de derecho de familia internacional, sustracción de menores y Convenio de La Haya.',
  keywords: [
    'Familia Internacional prensa',
    'Jaime Soto Silva medios',
    'abogado sustracción internacional Chile',
    'Convenio de La Haya prensa',
    'derecho familia internacional medios',
  ],
};
