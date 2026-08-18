import { getServiceLanding, serviceLandings, type ServiceSlug } from './service-landings';

export type CampaignLanding = {
  slug: string;
  serviceSlug?: ServiceSlug;
  leadSource: string;
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  ctaLabel: string;
  secondaryCtaLabel: string;
  urgencyLine: string;
  painPoints: readonly string[];
  advisoryIncludes: readonly string[];
  processSteps: ReadonlyArray<{
    title: string;
    description: string;
  }>;
  proofPoints: ReadonlyArray<{
    value: string;
    label: string;
  }>;
  faqs: ReadonlyArray<{
    question: string;
    answer: string;
  }>;
};

const sharedProcessSteps = [
  {
    title: 'Cuente su situacion',
    description:
      'Recibimos los antecedentes basicos, paises involucrados y nivel de urgencia.',
  },
  {
    title: 'Revisamos el camino legal',
    description:
      'Ordenamos competencia, documentos, riesgos y alternativas antes de recomendar una accion.',
  },
  {
    title: 'Definimos el siguiente paso',
    description:
      'Le indicamos que conviene hacer, que preparar y como avanzar con patrocinio si corresponde.',
  },
] satisfies CampaignLanding['processSteps'];

const sharedProofPoints = [
  { value: '100%', label: 'foco en derecho internacional de familia' },
  { value: 'Chile', label: 'representacion para clientes dentro y fuera del pais' },
  { value: '1:1', label: 'analisis juridico segun su caso concreto' },
] satisfies CampaignLanding['proofPoints'];

const serviceCampaigns = serviceLandings.map((service) => {
  const label = service.shortTitle.toLowerCase();

  return {
    slug: service.slug,
    serviceSlug: service.slug,
    leadSource: `ads_asesoria_${service.slug}`,
    eyebrow: `Asesoria en ${service.shortTitle}`,
    title: service.ctaTitle,
    description: service.ctaDescription,
    metaTitle: `${service.shortTitle}: agendar asesoria | Familia Internacional`,
    metaDescription: service.seoDescription,
    image: service.image,
    ctaLabel: service.ctaLabel,
    secondaryCtaLabel: 'Hablar por WhatsApp',
    urgencyLine:
      service.slug === 'cuidado-sustraccion'
        ? 'Si hay riesgo de traslado, retencion o incumplimiento de visitas, el tiempo importa.'
        : 'Mientras antes ordenemos los antecedentes, mas claro sera el camino legal.',
    painPoints: service.problems,
    advisoryIncludes: [
      `Diagnostico inicial de ${label}.`,
      'Revision de paises involucrados y autoridad competente.',
      'Documentos que conviene reunir antes de iniciar acciones.',
      'Riesgos, plazos y alternativas de estrategia.',
    ],
    processSteps: sharedProcessSteps,
    proofPoints: sharedProofPoints,
    faqs: service.faqs,
  };
}) satisfies CampaignLanding[];

export const campaignLandings = [
  {
    slug: 'familia-internacional',
    leadSource: 'ads_asesoria_familia_internacional',
    eyebrow: 'Asesoria legal para campanas',
    title: 'Asesoria para casos de familia internacional',
    description:
      'Si su caso involucra Chile y otro pais, evaluamos antecedentes, urgencia y proximos pasos para definir una estrategia legal clara.',
    metaTitle: 'Agendar asesoria en familia internacional | Familia Internacional',
    metaDescription:
      'Agende una asesoria legal para divorcios internacionales, sustraccion de menores, exequatur, alimentos, herencias y tramites consulares.',
    image: '/hero-familia.png',
    ctaLabel: 'Agendar asesoria',
    secondaryCtaLabel: 'Consultar por WhatsApp',
    urgencyLine:
      'Cada caso internacional tiene plazos, documentos y autoridades distintas. Partir con claridad evita errores caros.',
    painPoints: [
      'Necesita actuar en Chile viviendo en el extranjero.',
      'Su caso involucra hijos, conyuge, bienes o documentos en otro pais.',
      'Debe reconocer una sentencia extranjera o coordinar abogados fuera de Chile.',
      'Quiere saber si corresponde demandar, negociar o preparar documentacion primero.',
    ],
    advisoryIncludes: [
      'Identificacion del problema legal y paises involucrados.',
      'Revision de documentos disponibles y antecedentes faltantes.',
      'Orientacion sobre competencia, plazos y riesgos.',
      'Propuesta de siguientes pasos para avanzar con estrategia.',
    ],
    processSteps: sharedProcessSteps,
    proofPoints: sharedProofPoints,
    faqs: [
      {
        question: 'Puedo pedir asesoria si vivo fuera de Chile?',
        answer:
          'Si. Atendemos personas en Chile y en el extranjero, y podemos orientar los pasos para actuar ante tribunales, consulados o autoridades chilenas segun el caso.',
      },
      {
        question: 'Que documentos necesito para la primera evaluacion?',
        answer:
          'Depende del tema. En general sirven sentencias, certificados, acuerdos, datos del pais involucrado y cualquier comunicacion relevante. Si falta informacion, le indicamos que reunir.',
      },
      {
        question: 'La asesoria garantiza que se iniciara un juicio?',
        answer:
          'No necesariamente. La primera evaluacion busca definir si conviene demandar, negociar, validar documentos o preparar una estrategia previa.',
      },
    ],
  },
  ...serviceCampaigns,
] satisfies CampaignLanding[];

export type CampaignSlug = (typeof campaignLandings)[number]['slug'];

export function getCampaignLanding(slug: string) {
  return campaignLandings.find((landing) => landing.slug === slug) ?? null;
}

export function getCampaignService(landing: CampaignLanding) {
  return landing.serviceSlug ? getServiceLanding(landing.serviceSlug) : null;
}

