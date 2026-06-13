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
    sellSubject: 'Quiero vender una propiedad',
    advisorySubject: 'Quiero asesoría jurídica',
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
        'Ruiz Leiva Abogados trabaja asuntos civiles, comerciales, regulatorios y corporativos con foco en prevención, negociación y litigación estratégica.',
        'Ordenamos riesgos, alternativas y próximos pasos para que cada cliente tome decisiones informadas y oportunas.',
      ],
      en: [
        'Ruiz Leiva Abogados handles civil, commercial, regulatory and corporate matters with a focus on prevention, negotiation and strategic litigation.',
        'We organize risks, alternatives and next steps so each client can make informed and timely decisions.',
      ],
    },
    discover: {
      imageUrl: '/images/sur_chile_proyectos.png',
      eyebrow: 'Criterio jurídico',
      title: 'Estrategia clara para decisiones importantes',
      paragraphs: [
        'Ruiz Leiva Abogados traduce escenarios jurídicos complejos en alternativas claras, ponderando riesgo, costo, oportunidad y resultado esperado.',
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
  },
} as const;

export function buildMailto(email: string, subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
