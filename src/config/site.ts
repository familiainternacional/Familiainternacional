import { primaryContact } from '@/config/contact';

export type SiteOffice = {
  id: string;
  country: {
    es: string;
    en: string;
  };
  brandName: string;
  contactName: string;
  role: {
    es: string;
    en: string;
  };
  email: string;
  phoneLabel: string;
  phoneHref: string;
  whatsappNumber: string;
  addressLines: string[];
  scope?: {
    es: string;
    en: string;
  };
};

export const siteConfig = {
  name: 'Familia Internacional',
  logo: {
    primary: 'Familia',
    secondary: 'Internacional',
  },
  adminName: 'Familia Internacional Admin',
  storageKeyPrefix: 'familia',
  metadata: {
    title: 'Familia Internacional | Estudio Jurídico de Derecho Internacional de Familia',
    description:
      'Primer estudio jurídico en Chile dedicado exclusivamente al Derecho Internacional de Familia: divorcios, sustracción de menores, exequátur, alimentos y más.',
    keywords: [
      'Familia Internacional',
      'derecho de familia internacional',
      'abogados familia internacional Chile',
      'divorcio extranjero',
      'sustracción internacional de niños',
      'Convenio de La Haya',
      'exequátur sentencias extranjeras',
      'abogados Lo Barnechea',
    ],
  },
  /** Regiones para JSON-LD `areaServed`. */
  serviceAreas: ['Santiago', 'Chile'],
  contact: {
    primaryPhoneLabel: primaryContact.displayPhone,
    primaryPhoneHref: primaryContact.phoneHref,
    primaryEmail: primaryContact.email,
    salesEmail: primaryContact.email,
    whatsappNumber: primaryContact.whatsappNumber,
    whatsappDisplay: primaryContact.displayPhone,
    sellSubject: 'Consulta sobre mi caso internacional',
    advisorySubject: 'Quiero evaluar mi caso',
    social: {
      instagram: 'https://instagram.com/estudiofamiliainternacional',
      linkedin: 'https://www.linkedin.com/in/jaime-soto-silva-28b7314a',
      facebook: 'https://twitter.com/Familiainter_cl',
    },
  },
  offices: [
    {
      id: 'principal',
      country: {
        es: 'Oficina principal',
        en: 'Main office',
      },
      brandName: 'Familia Internacional',
      contactName: 'Jaime Soto Silva',
      role: {
        es: 'Abogado - Socio',
        en: 'Attorney - Partner',
      },
      email: primaryContact.email,
      phoneLabel: primaryContact.displayPhone,
      phoneHref: primaryContact.phoneHref,
      whatsappNumber: primaryContact.whatsappNumber,
      addressLines: [
        'Av. San Josemaría Escrivá de Balaguer N°13.105, Of. 303',
        'Lo Barnechea',
        'Santiago, Chile',
      ],
      scope: {
        es: 'Derecho Internacional de Familia',
        en: 'International Family Law',
      },
    },
  ] satisfies SiteOffice[],
  copy: {
    aboutEyebrow: {
      es: 'Asesoría jurídica estratégica',
      en: 'Strategic legal advisory',
    },
    aboutIntro: {
      es: 'Estudio jurídico enfocado en empresas, empresarios y personas que requieren criterio técnico, estrategia y una ejecución clara.',
      en: 'Law firm focused on companies, entrepreneurs and individuals who require technical judgment, strategy and clear execution.',
    },
    aboutModelTitle: {
      es: 'Acompañamiento directo para decidir con criterio jurídico y comercial.',
      en: 'Direct guidance to decide with legal and commercial judgment.',
    },
    aboutModelParagraphs: {
      es: [
        'Familia Internacional acompaña a familias en conflictos transfronterizos con foco en divorcios, sustracción de menores, exequátur, alimentos y trámites consulares.',
        'Ordenamos riesgos, alternativas y próximos pasos para que cada cliente tome decisiones informadas con abogados especializados en derecho de familia internacional.',
      ],
      en: [
        'Familia Internacional supports families in cross-border disputes with a focus on divorce, child abduction, exequatur, child support, and consular procedures.',
        'We organize risks, alternatives, and next steps so each client can make informed decisions with attorneys specialized in international family law.',
      ],
    },
    discover: {
      imageUrl: '/hero-santiago.png',
      eyebrow: 'Derecho de familia internacional',
      title: 'Claridad jurídica cuando las fronteras importan',
      paragraphs: [
        'Familia Internacional traduce escenarios jurídicos complejos en alternativas claras: qué conviene, en qué país actuar y cuál es el siguiente paso procesal.',
        'Acompañamos desde la primera evaluación hasta la ejecución de la estrategia, con información ordenada, atención directa y seguimiento profesional.',
      ],
    },
    mobileMenuIntro: {
      subtitle: {
        es: 'Derecho Internacional de Familia',
        en: 'International Family Law',
      },
      description: {
        es: 'Somos el primer y único Estudio Jurídico en Chile dedicado exclusivamente a la protección de familias y menores a nivel global.',
        en: 'We are the first and only law firm in Chile dedicated exclusively to protecting families and minors worldwide.',
      },
    },
    mission: {
      title: {
        es: 'Nuestra misión',
        en: 'Our mission',
      },
      lead: {
        es: 'Protegemos a las familias cuando sus derechos cruzan fronteras. Somos el primer y único estudio jurídico en Chile dedicado exclusivamente al Derecho Internacional de Familia, ',
        en: 'We protect families when their rights cross borders. We are the first and only law firm in Chile dedicated exclusively to International Family Law, ',
      },
      supporting: {
        es: 'con el respaldo de cientos de juicios tramitados, dominio de los Convenios de La Haya y Nueva York, y una red internacional de abogados que acompaña cada caso con experiencia, confidencialidad y cercanía.',
        en: 'backed by hundreds of successfully handled cases, deep expertise in the Hague and New York Conventions, and an international network of attorneys who guide every matter with experience, confidentiality and personal care.',
      },
    },
  },
} as const;

export function buildMailto(email: string, subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
