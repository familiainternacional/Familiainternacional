export type TeamMember = {
  slug: string;
  name: string;
  role: { es: string; en: string };
  email: string;
  image: string;
  imageAlt: string;
  tags: string[];
  formacion: { es: string[]; en: string[] };
  experiencia: { es: string[]; en: string[] };
  bio: { es: string[]; en: string[] };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  seoEn?: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const teamMembers: TeamMember[] = [
  {
    slug: 'jaime-soto-silva',
    name: 'Jaime Soto Silva',
    role: { es: 'Abogado – Socio', en: 'Attorney – Partner' },
    email: 'contacto@familiainternacional.cl',
    image: '/jaime-soto.png',
    imageAlt: 'Jaime Soto Silva - Familia Internacional',
    tags: [
      'Convenio de La Haya',
      'Sustracción Internacional',
      'Exequátur',
      'Alimentos Internacionales',
    ],
    bio: {
      es: [
        'Abogado – Magíster – Profesor Universitario en Derecho de Familia y Práctica Profesional – Ex Abogado de la Oficina Internacional de la Corporación de Asistencia Judicial, Autoridad Central para la aplicación de los Convenios de La Haya de 1980 y de Nueva York de 1956.',
        'Su trayectoria combina litigación en tribunales de familia, coordinación con autoridades centrales y asesoría a familias en conflictos transfronterizos de alta complejidad.',
      ],
      en: [
        'Attorney, Master’s degree holder and University Professor in Family Law and Professional Practice. Former attorney at the International Office of Chile’s Legal Aid Corporation, Central Authority for the Hague Convention of 1980 and the New York Convention of 1956.',
        'His career combines family court litigation, coordination with central authorities, and advisory work for families facing complex cross-border disputes.',
      ],
    },
    formacion: {
      es: [
        'Abogado, Magíster.',
        'Profesor Universitario en Derecho de Familia y Práctica Profesional.',
        'Formación especializada en Convenio de La Haya (1980) y Convenio de Nueva York (1956).',
      ],
      en: [
        'Attorney, Master’s.',
        'University Professor in Family Law and Professional Practice.',
        'Specialized training in the Hague Convention (1980) and New York Convention (1956).',
      ],
    },
    experiencia: {
      es: [
        'Cientos de juicios tramitados en Derecho Internacional de Familia.',
        'Ex Autoridad Central de la Corporación de Asistencia Judicial para los Convenios de La Haya y Nueva York.',
        'Integrante de una extensa red internacional de abogados dedicados al derecho de familia.',
      ],
      en: [
        'Hundreds of successfully handled cases in International Family Law.',
        'Former Central Authority attorney at Chile’s Legal Aid Corporation for the Hague and New York Conventions.',
        'Member of an extensive international network of family law attorneys.',
      ],
    },
    seo: {
      title: 'Jaime Soto Silva | Abogado de Familia Internacional',
      description:
        'Jaime Soto Silva, abogado socio de Familia Internacional. Especialista en Convenio de La Haya, sustracción internacional de menores, exequátur y custodia transfronteriza. Ex Autoridad Central CAJ.',
      keywords: [
        'Jaime Soto Silva',
        'abogado familia internacional',
        'Convenio de La Haya',
        'sustracción internacional menores Chile',
        'Familia Internacional',
      ],
    },
    seoEn: {
      title: 'Jaime Soto Silva | International Family Law Attorney',
      description:
        'Jaime Soto Silva, partner attorney at Familia Internacional. Expert in the Hague Convention, international child abduction, exequatur, and cross-border custody. Former Central Authority attorney.',
      keywords: [
        'Jaime Soto Silva',
        'international family law attorney',
        'Hague Convention',
        'international child abduction Chile',
        'Familia Internacional',
      ],
    },
  },
];

export function getTeamMemberBySlug(slug: string) {
  return teamMembers.find((member) => member.slug === slug) ?? null;
}
