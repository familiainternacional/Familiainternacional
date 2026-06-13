import type { Locale } from './config';

export const dictionaries = {
  es: {
    nav: {
      services: 'Servicios',
      team: 'El Equipo',
      about: 'Nosotros',
      process: 'Proceso',
      blog: 'Blog',
      evaluate: 'Evalúa tu caso',
      contact: 'Formulario de contacto',
      language: 'Idioma'
    },
    hero: {
      eyebrow: 'Ruiz Leiva Abogados — Santiago, Chile',
      title1: 'Derecho.',
      title2: 'Estrategia.',
      title3: 'Resultados.',
      subtitle: 'Asesoría jurídica de alto estándar en Santiago de Chile para empresas y empresarios que necesitan más que un abogado: un socio estratégico que entiende el negocio.',
      cta: 'Formulario de contacto',
      services: 'Ver servicios',
      stats: [
        { value: '95%', label: 'casos favorables' },
        { value: '11', label: 'años de exp.' },
        { value: '100%', label: 'confidencialidad' },
        { value: '86', label: 'casos resueltos' }
      ]
    },
    services: {
      label: 'Áreas de práctica',
      title1: 'Soluciones jurídicas ',
      title2: 'adaptadas a su realidad',
      items: [
        {
          num: '01',
          title: 'Litigación Civil',
          desc: 'Defensa estratégica en conflictos civiles y comerciales. Analizamos el timing procesal, la presión negociadora y los escenarios tácticos antes de actuar.',
          tags: ['Medidas precautorias', 'Cobranza', 'Nulidades', 'Conflictos societarios']
        },
        {
          num: '02',
          title: 'Derecho Corporativo',
          desc: 'Estructuración, reorganización y saneamiento societario. Acompañamos a empresarios en cada etapa: constitución, crecimiento y resolución de conflictos.',
          tags: ['Restructuración', 'Compraventa', 'Contratos', 'Due diligence']
        },
        {
          num: '03',
          title: 'Derecho Administrativo',
          desc: 'Navegamos la complejidad regulatoria con experiencia real en administración pública. Procedimientos sancionatorios, fiscalización y coordinación institucional.',
          tags: ['Regulación', 'Fiscalización', 'Ley 19.880', 'Sanciones']
        },
        {
          num: '04',
          title: 'Compliance',
          desc: 'Implementamos estructuras de cumplimiento adaptadas al tamaño y modelo de negocio de cada empresa. Prevención antes que sanción.',
          tags: ['Protección de datos', 'Ley 20.393', 'Auditoría interna']
        },
        {
          num: '05',
          title: 'Resolución de Conflictos',
          desc: 'Negociamos soluciones antes de judicializar cuando conviene. Cuando no, litigamos con estrategia y convicción.',
          tags: ['Mediación', 'Negociación', 'Arbitraje']
        },
        {
          num: '06',
          title: 'Asesoría Empresarial',
          desc: 'Advisory jurídico continuo para empresas en crecimiento. Detectamos contingencias antes que se transformen en problemas.',
          tags: ['Advisory', 'Contratos', 'Riesgos', 'Crecimiento']
        }
      ]
    },
    team: {
      label: 'Quiénes Somos',
      title1: 'Dos abogados.',
      title2: 'Una sola estrategia.',
      intro: 'Ruiz Leiva Abogados combina formación académica de primer nivel con experiencia práctica real — en tribunales, en la administración pública y en el mundo de los negocios. No somos un estudio genérico. Somos dos profesionales con trayectorias complementarias trabajando como un solo equipo orientado a resultados.',
      christian: {
        name: 'Christian Ruiz Varas',
        role: 'Socio Fundador — Derecho Civil, Comercial, Regulatorio y Laboral',
        bio1: 'Abogado licenciado en Ciencias Jurídicas y Sociales por la Universidad Central de Chile, con Máster en Derecho de la Energía por la Universidad Complutense de Madrid y estudios de especialización en Salamanca y la Universidad de Chile.',
        bio2: 'Desarrolla su práctica en litigación compleja en Derecho Comercial, Civil y Regulatorio, además de materias administrativas ante la Contraloría General de la República y Tribunales de Contratación Pública. Cuenta con experiencia en Derecho Estatutario del Trabajo, Estatuto Docente, Estatuto de la Salud y Derecho Administrativo Municipal.',
        tags: ['Litigación Civil', 'Derecho Comercial', 'Regulatorio', 'Contraloría']
      },
      sebastian: {
        name: 'Sebastián Leiva Gutiérrez',
        role: 'Socio Fundador — Estrategia Jurídica, Corporativo y Regulación',
        bio1: 'Abogado de la Universidad Adolfo Ibáñez, con formación especializada en Derecho e Inteligencia Artificial y actualmente cursando el LL.M. en Derecho Regulatorio de la Pontificia Universidad Católica de Chile.',
        bio2: 'Ha desarrollado su trayectoria en el sector público y privado, con experiencia como asesor en el Ministerio de Salud, Ministerio Segpres, Cámara de Diputadas y Diputados y Ministerio del Interior — entornos de alta negociación política, coordinación institucional y análisis regulatorio.',
        tags: ['Litigación Estratégica', 'Derecho Corporativo', 'Derecho Administrativo', 'Compliance']
      }
    },
    diferencial: {
      label: 'Por qué Ruiz Leiva Abogados',
      title1: 'Un abogado que ',
      title2: 'piensa como empresario',
      body: 'La mayoría de los abogados dominan la ley pero no entienden el negocio. En Ruiz Leiva Abogados combinamos experiencia jurídica técnica con una lógica comercial y estratégica que le da a cada cliente una ventaja real.',
      features: [
        { icon: '⚡', title: 'Velocidad y precisión', desc: 'Diagnóstico jurídico rápido. Sin demoras innecesarias. Sabemos que el tiempo tiene valor en los negocios.' },
        { icon: '🎯', title: 'Estrategia, no solo ley', desc: 'Analizamos incentivos, riesgos y escenarios. Le decimos qué conviene, cuándo conviene y cómo ejecutarlo.' },
        { icon: '🔗', title: 'Público + Privado', desc: 'Experiencia real en ambos mundos. Entendemos la lógica del Estado y la del mercado simultáneamente.' },
        { icon: '📋', title: 'Comunicación clara', desc: 'Traducimos el lenguaje jurídico a términos entendibles. Usted toma decisiones con información real.' }
      ]
    },
    footer: {
      copyright: 'Todos los derechos reservados.',
      address: 'Av. Apoquindo 3669, Las Condes, Santiago',
      socialMedia: 'REDES SOCIALES',
      company: 'EMPRESA',
      servicesTitle: 'SERVICIOS',
      links: {
        twitter: 'Twitter',
        linkedin: 'Linkedin',
        instagram: 'Instagram',
        facebook: 'Facebook',
        telegram: 'Telegram',
        aboutUs: 'Nosotros',
        ourTeam: 'El Equipo',
        prices: 'Honorarios',
        contact: 'Contacto',
        news: 'Casos de Éxito',
        service1: 'Litigación Civil',
        service2: 'Derecho Corporativo',
        service3: 'Derecho Administrativo',
        service4: 'Compliance',
        service5: 'Asesoría Empresarial'
      }
    },
    cases: {
      label: 'Casos de Éxito',
      title1: 'Casos de ',
      title2: 'Éxito',
      description: 'Nuestra trayectoria nos avala. Estos son algunos de los casos recientes donde hemos entregado resultados favorables a nuestros clientes.',
      corporate: {
        title: 'Fusión Corporativa',
        description: 'Asesoría en la fusión de dos importantes empresas del sector retail.',
        result: 'Aprobación sin multas por la FNE'
      },
      litigation: {
        title: 'Litigio Civil',
        description: 'Defensa en una demanda por incumplimiento de contrato de construcción.',
        result: 'Rechazo de la demanda'
      },
      labor: {
        title: 'Negociación Sindical',
        description: 'Representación de la empresa en la negociación colectiva anual.',
        result: 'Acuerdo en 10 días'
      }
    },
    evalua: {
      title1: 'Evalúa tu ',
      title2: 'Caso',
      description: 'Nuestro equipo de expertos está listo para analizar tu situación legal. Completa el formulario y te daremos una evaluación inicial para definir la mejor estrategia.',
      whyChooseUs: '¿Por qué elegirnos?',
      specialists: 'Especialistas',
      specialistsDesc: 'Contamos con profesionales altamente capacitados en diversas ramas del derecho.',
      fastResponse: 'Respuesta Rápida',
      fastResponseDesc: 'Analizamos tu consulta y te contactamos en el menor tiempo posible para no retrasar tus procesos.',
      confidentiality: 'Confidencialidad Total',
      confidentialityDesc: 'Toda la información que nos proporciones será tratada con absoluta reserva y seguridad.',
      contactDirect: 'Contacto Directo',
      contactDirectDesc: 'Si prefieres, también puedes llamarnos o escribirnos directamente a nuestro correo.',
      form: {
        name: 'Nombre Completo',
        email: 'Correo Electrónico',
        phone: 'Teléfono de Contacto',
        message: 'Descripción de su Caso',
        submit: 'Solicitar Evaluación',
        submitting: 'Enviando...',
        success: '¡Hemos recibido su solicitud!',
        successDesc: 'Un abogado de nuestro equipo revisará su caso y se pondrá en contacto con usted a la brevedad posible.',
        sendAnother: 'Enviar otra consulta',
        error: 'Ocurrió un error al enviar su solicitud. Por favor, intente nuevamente o contáctenos por teléfono.'
      }
    }
  },
  en: {
    nav: {
      services: 'Services',
      team: 'The Team',
      about: 'About Us',
      process: 'Process',
      blog: 'Blog',
      evaluate: 'Evaluate your case',
      contact: 'Book a Consultation',
      language: 'Language'
    },
    hero: {
      eyebrow: 'Ruiz Leiva Abogados — Santiago, Chile',
      title1: 'Law.',
      title2: 'Strategy.',
      title3: 'Results.',
      subtitle: 'High-standard legal counsel for businesses and entrepreneurs who need more than a lawyer: a strategic partner who understands business.',
      cta: 'Receive consultation',
      services: 'View services',
      stats: [
        { value: '95%', label: 'favorable cases' },
        { value: '11', label: 'years of exp.' },
        { value: '100%', label: 'confidentiality' },
        { value: '86', label: 'cases solved' }
      ]
    },
    services: {
      label: 'Practice Areas',
      title1: 'Legal solutions ',
      title2: 'adapted to your reality',
      items: [
        {
          num: '01',
          title: 'Civil Litigation',
          desc: 'Strategic defense in civil and commercial conflicts. We analyze procedural timing, negotiating pressure, and tactical scenarios before acting.',
          tags: ['Precautionary measures', 'Collections', 'Nullities', 'Corporate conflicts']
        },
        {
          num: '02',
          title: 'Corporate Law',
          desc: 'Structuring, reorganization, and corporate restructuring. We support entrepreneurs in every stage: incorporation, growth, and dispute resolution.',
          tags: ['Restructuring', 'M&A', 'Contracts', 'Due diligence']
        },
        {
          num: '03',
          title: 'Administrative Law',
          desc: 'We navigate regulatory complexity with real experience in public administration. Sanctioning procedures, audits, and institutional coordination.',
          tags: ['Regulation', 'Audits', 'Law 19.880', 'Sanctions']
        },
        {
          num: '04',
          title: 'Compliance',
          desc: 'We implement compliance structures tailored to the size and business model of each company. Prevention rather than sanction.',
          tags: ['Data protection', 'Law 20.393', 'Internal audit']
        },
        {
          num: '05',
          title: 'Dispute Resolution',
          desc: 'We negotiate solutions before litigating when appropriate. When not, we litigate with strategy and conviction.',
          tags: ['Mediation', 'Negotiation', 'Arbitration']
        },
        {
          num: '06',
          title: 'Business Advisory',
          desc: 'Continuous legal advisory for growing companies. We detect contingencies before they become problems.',
          tags: ['Advisory', 'Contracts', 'Risks', 'Growth']
        }
      ]
    },
    team: {
      label: 'About Us',
      title1: 'Two lawyers.',
      title2: 'One single strategy.',
      intro: 'Ruiz Leiva Abogados combines top-tier academic training with real practical experience — in courts, in public administration, and in the business world. We are not a generic firm. We are two professionals with complementary backgrounds working as a single results-oriented team.',
      christian: {
        name: 'Christian Ruiz Varas',
        role: 'Founding Partner — Civil, Commercial, Regulatory and Labor Law',
        bio1: 'Lawyer with a degree in Legal and Social Sciences from the Central University of Chile, with a Master in Energy Law from the Complutense University of Madrid and specialized studies in Salamanca and the University of Chile.',
        bio2: 'Develops his practice in Civil, Commercial, Regulatory and Statutory Labor Law. He has intervened before the Comptroller General of the Republic and Public Procurement Courts, with special experience in Teacher\'s Statute, Health Statute and Municipal Administrative Law.',
        tags: ['Civil Litigation', 'Commercial Law', 'Regulatory', 'Comptroller']
      },
      sebastian: {
        name: 'Sebastián Leiva Gutiérrez',
        role: 'Founding Partner — Legal Strategy, Corporate and Regulation',
        bio1: 'Lawyer from Adolfo Ibáñez University, with specialized training in Law and Artificial Intelligence and currently pursuing an LL.M. in Regulatory Law at the Pontifical Catholic University of Chile.',
        bio2: 'He has developed his career in the public and private sectors, with experience as an advisor in the Ministry of Health, Ministry Segpres, Chamber of Deputies and Ministry of the Interior — environments of high political negotiation, institutional coordination and regulatory analysis.',
        tags: ['Strategic Litigation', 'Corporate Law', 'Administrative Law', 'Compliance']
      }
    },
    diferencial: {
      label: 'Why Ruiz Leiva Abogados',
      title1: 'A lawyer who ',
      title2: 'thinks like an entrepreneur',
      body: 'Most lawyers master the law but do not understand business. At Ruiz Leiva Abogados we combine technical legal expertise with a commercial and strategic logic that gives each client a real advantage.',
      features: [
        { icon: '⚡', title: 'Speed and precision', desc: 'Rapid legal diagnosis. No unnecessary delays. We know time has value in business.' },
        { icon: '🎯', title: 'Strategy, not just law', desc: 'We analyze incentives, risks, and scenarios. We tell you what to do, when to do it, and how to execute.' },
        { icon: '🔗', title: 'Public + Private', desc: 'Real experience in both worlds. We understand the logic of the State and the market simultaneously.' },
        { icon: '📋', title: 'Clear communication', desc: 'We translate legal language into understandable terms. You make decisions with real information.' }
      ]
    },
    footer: {
      copyright: 'All rights reserved.',
      address: 'Apoquindo Ave 3669, Las Condes, Santiago',
      socialMedia: 'SOCIAL MEDIA',
      company: 'COMPANY',
      servicesTitle: 'SERVICES',
      links: {
        twitter: 'Twitter',
        linkedin: 'Linkedin',
        instagram: 'Instagram',
        facebook: 'Facebook',
        telegram: 'Telegram',
        aboutUs: 'About Us',
        ourTeam: 'Our team',
        prices: 'Prices',
        contact: 'Contact',
        news: 'Success Stories',
        service1: 'Civil Litigation',
        service2: 'Corporate Law',
        service3: 'Administrative Law',
        service4: 'Compliance',
        service5: 'Business Advisory'
      }
    },
    cases: {
      label: 'Success Stories',
      title1: 'Success ',
      title2: 'Stories',
      description: 'Our track record speaks for us. These are some of the recent cases where we have delivered favorable results to our clients.',
      corporate: {
        title: 'Corporate Merger',
        description: 'Advisory on the merger of two major retail companies.',
        result: 'Approval without fines by the FNE'
      },
      litigation: {
        title: 'Civil Litigation',
        description: 'Defense in a lawsuit for breach of a construction contract.',
        result: 'Dismissal of the lawsuit'
      },
      labor: {
        title: 'Union Negotiation',
        description: 'Representation of the company in the annual collective bargaining.',
        result: 'Agreement reached in 10 days'
      }
    },
    evalua: {
      title1: 'Evaluate your ',
      title2: 'Case',
      description: 'Our team of experts is ready to analyze your legal situation. Fill out the form and we will provide an initial evaluation to define the best strategy.',
      whyChooseUs: 'Why choose us?',
      specialists: 'Specialists',
      specialistsDesc: 'We have highly trained professionals in various branches of law.',
      fastResponse: 'Fast Response',
      fastResponseDesc: 'We analyze your inquiry and contact you in the shortest possible time so as not to delay your processes.',
      confidentiality: 'Total Confidentiality',
      confidentialityDesc: 'All the information you provide will be treated with absolute reserve and security.',
      contactDirect: 'Direct Contact',
      contactDirectDesc: 'If you prefer, you can also call us or write to us directly at our email.',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Contact Phone',
        message: 'Description of your Case',
        submit: 'Request Evaluation',
        submitting: 'Submitting...',
        success: 'We have received your request!',
        successDesc: 'A lawyer from our team will review your case and contact you as soon as possible.',
        sendAnother: 'Send another inquiry',
        error: 'An error occurred while submitting your request. Please try again or contact us by phone.'
      }
    }
  }
};

export type TranslationKey =
  | 'nav.services'
  | 'nav.team'
  | 'nav.about'
  | 'nav.process'
  | 'nav.blog'
  | 'nav.evaluate'
  | 'nav.contact'
  | 'nav.language'
  | 'hero.eyebrow'
  | 'hero.title1'
  | 'hero.title2'
  | 'hero.title3'
  | 'hero.subtitle'
  | 'hero.cta'
  | 'hero.services'
  | 'hero.stats.0.value'
  | 'hero.stats.0.label'
  | 'hero.stats.1.value'
  | 'hero.stats.1.label'
  | 'hero.stats.2.value'
  | 'hero.stats.2.label'
  | 'hero.stats.3.value'
  | 'hero.stats.3.label'
  | 'services.label'
  | 'services.title1'
  | 'services.title2'
  | 'team.label'
  | 'team.title1'
  | 'team.title2'
  | 'team.intro'
  | 'team.christian.name'
  | 'team.christian.role'
  | 'team.christian.bio1'
  | 'team.christian.bio2'
  | 'team.sebastian.name'
  | 'team.sebastian.role'
  | 'team.sebastian.bio1'
  | 'team.sebastian.bio2'
  | 'diferencial.label'
  | 'diferencial.title1'
  | 'diferencial.title2'
  | 'diferencial.body'
  | 'footer.copyright'
  | 'footer.address'
  | 'footer.socialMedia'
  | 'footer.company'
  | 'footer.servicesTitle'
  | 'footer.links.twitter'
  | 'footer.links.linkedin'
  | 'footer.links.instagram'
  | 'footer.links.facebook'
  | 'footer.links.telegram'
  | 'footer.links.aboutUs'
  | 'footer.links.ourTeam'
  | 'footer.links.prices'
  | 'footer.links.contact'
  | 'footer.links.news'
  | 'footer.links.service1'
  | 'footer.links.service2'
  | 'footer.links.service3'
  | 'footer.links.service4'
  | 'footer.links.service5'
  | 'cases.label'
  | 'cases.title1'
  | 'cases.title2'
  | 'cases.description'
  | 'cases.corporate.title'
  | 'cases.corporate.description'
  | 'cases.corporate.result'
  | 'cases.litigation.title'
  | 'cases.litigation.description'
  | 'cases.litigation.result'
  | 'cases.labor.title'
  | 'cases.labor.description'
  | 'cases.labor.result'
  | 'evalua.title1'
  | 'evalua.title2'
  | 'evalua.description'
  | 'evalua.whyChooseUs'
  | 'evalua.specialists'
  | 'evalua.specialistsDesc'
  | 'evalua.fastResponse'
  | 'evalua.fastResponseDesc'
  | 'evalua.confidentiality'
  | 'evalua.confidentialityDesc'
  | 'evalua.contactDirect'
  | 'evalua.contactDirectDesc'
  | 'evalua.form.name'
  | 'evalua.form.email'
  | 'evalua.form.phone'
  | 'evalua.form.message'
  | 'evalua.form.submit'
  | 'evalua.form.submitting'
  | 'evalua.form.success'
  | 'evalua.form.successDesc'
  | 'evalua.form.sendAnother'
  | 'evalua.form.error';

function getNestedValue(obj: unknown, path: string): string | undefined {
  const value = path.split('.').reduce<unknown>((prev, curr) => {
    if (prev && typeof prev === 'object' && curr in prev) {
      return (prev as Record<string, unknown>)[curr];
    }

    return undefined;
  }, obj);

  return typeof value === 'string' ? value : undefined;
}

export function translate(locale: Locale, key: TranslationKey): string {
  const dictionary = dictionaries[locale] || dictionaries.es;
  const value = getNestedValue(dictionary, key);
  
  if (value === undefined) {
    console.warn(`Translation missing for key: ${key} in locale: ${locale}`);
    const fallbackValue = getNestedValue(dictionaries.es, key);
    return fallbackValue || key;
  }
  
  return value;
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.es;
}

export function formatTranslation(
  locale: Locale,
  key: TranslationKey,
  variables: Record<string, string>,
): string {
  let text = translate(locale, key);
  for (const [name, value] of Object.entries(variables)) {
    text = text.replaceAll(`{${name}}`, value);
  }
  return text;
}
