export type ServiceLanding = {
  slug: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  image: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  intro: string;
  problems: string[];
  approach: string[];
  includes: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const serviceLandings = [
  {
    slug: 'litigacion-civil',
    title: 'Litigación Civil',
    shortTitle: 'Litigación Civil',
    seoTitle: 'Litigación civil para empresas en Santiago',
    seoDescription:
      'Defensa estratégica en conflictos civiles y comerciales. Ruiz Leiva Abogados analiza riesgos, timing procesal y escenarios de negociación antes de litigar.',
    eyebrow: 'Área 01',
    heroTitle: 'Litigación civil con estrategia comercial',
    heroSubtitle:
      'Defendemos intereses civiles y comerciales con una lectura integral del conflicto: riesgo jurídico, presión negociadora, oportunidad y costo real.',
    image: '/services/civil_litigation.png',
    ctaTitle: 'Evalúe la estrategia de su conflicto',
    ctaDescription:
      'Revisamos antecedentes, riesgos procesales y alternativas de negociación antes de decidir el siguiente movimiento.',
    ctaLabel: 'Evaluar litigio civil',
    intro:
      'Un litigio no se gana solo con argumentos legales. También exige entender incentivos, tiempos procesales, exposición reputacional y alternativas de acuerdo. En Ruiz Leiva Abogados diseñamos defensas y acciones civiles orientadas a proteger patrimonio, continuidad operacional y capacidad de negociación.',
    problems: [
      'Incumplimientos contractuales y cobros complejos.',
      'Conflictos comerciales entre socios, proveedores o clientes.',
      'Demandas civiles con impacto patrimonial o reputacional.',
      'Necesidad de negociar antes de judicializar el conflicto.',
    ],
    approach: [
      'Diagnóstico inicial del riesgo procesal y comercial.',
      'Definición de escenarios: negociación, medidas prejudiciales, juicio o salida transaccional.',
      'Ejecución procesal con foco en oportunidad, prueba y presión estratégica.',
    ],
    includes: [
      'Demandas y contestaciones civiles.',
      'Negociación prejudicial y acuerdos.',
      'Medidas prejudiciales y precautorias.',
      'Defensa en conflictos contractuales y comerciales.',
    ],
    faqs: [
      {
        question: '¿Siempre conviene demandar?',
        answer:
          'No. Primero evaluamos si la vía judicial mejora la posición del cliente o si una negociación técnica puede lograr un resultado más rápido y eficiente.',
      },
      {
        question: '¿Atienden litigios comerciales?',
        answer:
          'Sí. Trabajamos conflictos civiles y comerciales vinculados a contratos, obligaciones, sociedades, proveedores, clientes y ejecución de acuerdos.',
      },
    ],
  },
  {
    slug: 'derecho-corporativo',
    title: 'Derecho Corporativo',
    shortTitle: 'Corporativo',
    seoTitle: 'Abogados de derecho corporativo en Santiago',
    seoDescription:
      'Asesoría en constitución, reorganización, saneamiento societario y conflictos corporativos para empresarios y empresas en crecimiento.',
    eyebrow: 'Área 02',
    heroTitle: 'Estructuras corporativas claras y defendibles',
    heroSubtitle:
      'Acompañamos decisiones societarias relevantes con criterio jurídico, mirada comercial y foco en prevenir conflictos futuros.',
    image: '/services/corporate_law.png',
    ctaTitle: 'Ordene la estructura legal de su empresa',
    ctaDescription:
      'Analizamos sociedades, poderes, pactos y riesgos corporativos para definir una hoja de ruta clara.',
    ctaLabel: 'Evaluar estructura corporativa',
    intro:
      'Las empresas necesitan estructuras legales que resistan crecimiento, entrada de socios, financiamiento, reorganizaciones y conflictos. Ruiz Leiva Abogados asesora a empresarios en decisiones corporativas que requieren orden documental, claridad de gobierno y prevención de contingencias.',
    problems: [
      'Constitución de sociedades y pactos entre socios.',
      'Reorganizaciones societarias y saneamiento documental.',
      'Conflictos entre accionistas, socios o administradores.',
      'Contratos comerciales relevantes para la operación.',
    ],
    approach: [
      'Revisión de estructura actual y riesgos societarios.',
      'Diseño de alternativas según etapa, tamaño y proyección del negocio.',
      'Documentación clara para reducir ambigüedades y disputas futuras.',
    ],
    includes: [
      'Constitución y modificación de sociedades.',
      'Pactos de socios y acuerdos comerciales.',
      'Revisión de poderes, actas y gobierno corporativo.',
      'Saneamiento y reorganización societaria.',
    ],
    faqs: [
      {
        question: '¿Pueden revisar la estructura actual de mi empresa?',
        answer:
          'Sí. Revisamos documentación societaria, poderes, acuerdos y riesgos operativos para proponer correcciones concretas.',
      },
      {
        question: '¿Trabajan con empresas en crecimiento?',
        answer:
          'Sí. Nuestro enfoque es especialmente útil para empresas que están incorporando socios, levantando capital o formalizando procesos internos.',
      },
    ],
  },
  {
    slug: 'derecho-administrativo',
    title: 'Derecho Administrativo',
    shortTitle: 'Administrativo',
    seoTitle: 'Abogados de derecho administrativo en Santiago',
    seoDescription:
      'Asesoría en procedimientos administrativos, fiscalizaciones, sanciones y coordinación ante organismos públicos en Chile.',
    eyebrow: 'Área 03',
    heroTitle: 'Defensa y gestión ante la administración pública',
    heroSubtitle:
      'Acompañamos procedimientos administrativos con experiencia institucional, análisis regulatorio y estrategia de respuesta.',
    image: '/services/administrative_law.png',
    ctaTitle: 'Prepare su respuesta ante la autoridad',
    ctaDescription:
      'Revise plazos, antecedentes y estrategia institucional antes de responder una fiscalización o procedimiento.',
    ctaLabel: 'Evaluar procedimiento administrativo',
    intro:
      'Los procedimientos ante organismos públicos exigen más que conocer la norma. Requieren entender cómo decide la administración, qué antecedentes son relevantes y cuándo actuar. Ruiz Leiva Abogados asesora en fiscalizaciones, sanciones, descargos y coordinación institucional.',
    problems: [
      'Fiscalizaciones y procedimientos sancionatorios.',
      'Requerimientos de organismos públicos.',
      'Conflictos con municipalidades o entidades administrativas.',
      'Necesidad de ordenar antecedentes técnicos y jurídicos.',
    ],
    approach: [
      'Análisis del expediente y del marco regulatorio aplicable.',
      'Estrategia de respuesta con énfasis en prueba, plazos y autoridad competente.',
      'Seguimiento institucional hasta cierre o judicialización si corresponde.',
    ],
    includes: [
      'Descargos administrativos.',
      'Recursos administrativos.',
      'Representación ante organismos públicos.',
      'Informes jurídicos y análisis regulatorio.',
    ],
    faqs: [
      {
        question: '¿Qué hago si recibí una fiscalización?',
        answer:
          'Lo primero es revisar plazos, acto administrativo y antecedentes requeridos. Una respuesta tardía o incompleta puede afectar la estrategia.',
      },
      {
        question: '¿Pueden intervenir antes de una sanción?',
        answer:
          'Sí. Muchas veces la etapa preventiva o de descargos es clave para evitar o reducir contingencias mayores.',
      },
    ],
  },
  {
    slug: 'compliance',
    title: 'Compliance',
    shortTitle: 'Compliance',
    seoTitle: 'Compliance legal para empresas en Chile',
    seoDescription:
      'Diseño de modelos de cumplimiento, prevención de riesgos y estructuras internas adaptadas al tamaño y modelo de negocio de cada empresa.',
    eyebrow: 'Área 04',
    heroTitle: 'Cumplimiento diseñado para operar, no para decorar',
    heroSubtitle:
      'Creamos estructuras de compliance realistas, proporcionales y aplicables al negocio, con foco en prevención antes que sanción.',
    image: '/compliance.webp',
    ctaTitle: 'Evalúe sus riesgos de cumplimiento',
    ctaDescription:
      'Detectamos brechas legales y controles prioritarios para construir un sistema de compliance aplicable.',
    ctaLabel: 'Evaluar compliance',
    intro:
      'El cumplimiento efectivo no consiste en acumular documentos. Debe integrarse a la operación, detectar riesgos y permitir decisiones oportunas. Ruiz Leiva Abogados diseña modelos de compliance ajustados al tamaño, industria y exposición regulatoria de cada empresa.',
    problems: [
      'Falta de políticas internas claras.',
      'Riesgos regulatorios o contractuales no mapeados.',
      'Necesidad de preparar auditorías, licitaciones o relaciones con terceros.',
      'Exposición por ausencia de controles o canales internos.',
    ],
    approach: [
      'Levantamiento de riesgos legales y operacionales.',
      'Diseño de políticas, protocolos y controles proporcionales.',
      'Implementación con lenguaje claro y criterios de seguimiento.',
    ],
    includes: [
      'Modelos de prevención y cumplimiento.',
      'Políticas internas y protocolos.',
      'Matrices de riesgo legal.',
      'Capacitación y revisión de controles.',
    ],
    faqs: [
      {
        question: '¿El compliance sirve para empresas pequeñas?',
        answer:
          'Sí, siempre que sea proporcional. No todas las empresas necesitan la misma estructura, pero toda empresa expuesta a riesgos necesita controles claros.',
      },
      {
        question: '¿Revisan políticas ya existentes?',
        answer:
          'Sí. Podemos auditar documentos, detectar brechas y proponer ajustes prácticos para que el sistema sea aplicable.',
      },
    ],
  },
  {
    slug: 'resolucion-de-conflictos',
    title: 'Resolución de Conflictos',
    shortTitle: 'Conflictos',
    seoTitle: 'Resolución de conflictos comerciales y civiles',
    seoDescription:
      'Negociación estratégica, análisis de escenarios y litigación cuando corresponde para resolver conflictos civiles, comerciales y corporativos.',
    eyebrow: 'Área 05',
    heroTitle: 'Resolver bien antes de escalar mal',
    heroSubtitle:
      'Negociamos cuando conviene y litigamos cuando es necesario, siempre con una estrategia clara y orientada a resultados.',
    image: '/services/dispute_resolution.png',
    ctaTitle: 'Defina la mejor salida del conflicto',
    ctaDescription:
      'Analizamos incentivos, costos y escenarios para negociar con ventaja o litigar cuando sea necesario.',
    ctaLabel: 'Evaluar conflicto',
    intro:
      'No todo conflicto debe terminar en juicio, pero todo conflicto necesita estrategia. Ruiz Leiva Abogados evalúa intereses, costos, tiempos y riesgos para diseñar salidas negociadas o litigios bien preparados cuando la vía judicial es inevitable.',
    problems: [
      'Conflictos entre socios o contrapartes comerciales.',
      'Disputas contractuales con impacto operacional.',
      'Negociaciones bloqueadas o de alta tensión.',
      'Necesidad de preparar una posición antes de litigar.',
    ],
    approach: [
      'Mapa de intereses, riesgos y puntos de presión.',
      'Diseño de estrategia de negociación o judicialización.',
      'Ejecución con control de tiempos, evidencia y comunicación.',
    ],
    includes: [
      'Negociación asistida por abogados.',
      'Estrategia prejudicial.',
      'Acuerdos y transacciones.',
      'Preparación para litigios civiles y comerciales.',
    ],
    faqs: [
      {
        question: '¿Pueden ayudar si la negociación ya está trabada?',
        answer:
          'Sí. Revisamos antecedentes, intereses reales y puntos de presión para redefinir la estrategia o preparar una vía judicial.',
      },
      {
        question: '¿La resolución de conflictos evita tribunales?',
        answer:
          'A veces sí. Nuestro objetivo es elegir la vía que produzca mejor resultado para el cliente, no judicializar por defecto.',
      },
    ],
  },
  {
    slug: 'asesoria-empresarial',
    title: 'Asesoría Empresarial',
    shortTitle: 'Empresarial',
    seoTitle: 'Asesoría legal empresarial en Santiago',
    seoDescription:
      'Advisory jurídico continuo para empresas en crecimiento. Detectamos contingencias antes de que se transformen en problemas.',
    eyebrow: 'Área 06',
    heroTitle: 'Asesoría legal continua para decisiones empresariales',
    heroSubtitle:
      'Acompañamos a empresas y empresarios con orientación jurídica permanente, práctica y alineada al negocio.',
    image: '/asesores.jpg',
    ctaTitle: 'Acompañe sus decisiones con criterio legal',
    ctaDescription:
      'Revisamos documentos, contratos y riesgos recurrentes para anticipar contingencias en la operación.',
    ctaLabel: 'Solicitar asesoría empresarial',
    intro:
      'La asesoría empresarial efectiva debe anticipar problemas, no solo reaccionar a ellos. Ruiz Leiva Abogados acompaña decisiones comerciales, contractuales, societarias y regulatorias para que el cliente actúe con claridad y reduzca contingencias.',
    problems: [
      'Contratos relevantes sin revisión estratégica.',
      'Crecimiento empresarial con riesgos legales no detectados.',
      'Dudas recurrentes en decisiones comerciales o regulatorias.',
      'Falta de acompañamiento jurídico continuo.',
    ],
    approach: [
      'Entendimiento del modelo de negocio y prioridades del cliente.',
      'Revisión preventiva de decisiones, documentos y riesgos.',
      'Recomendaciones claras, accionables y oportunas.',
    ],
    includes: [
      'Revisión contractual.',
      'Consultoría jurídica recurrente.',
      'Prevención de contingencias.',
      'Apoyo en decisiones societarias, comerciales y regulatorias.',
    ],
    faqs: [
      {
        question: '¿La asesoría puede ser recurrente?',
        answer:
          'Sí. Podemos acompañar consultas periódicas, revisión documental y decisiones estratégicas según las necesidades de la empresa.',
      },
      {
        question: '¿Trabajan con empresarios individuales?',
        answer:
          'Sí. Atendemos tanto empresas constituidas como empresarios que necesitan ordenar riesgos, contratos o decisiones relevantes.',
      },
    ],
  },
] as const satisfies ServiceLanding[];

export type ServiceSlug = typeof serviceLandings[number]['slug'];

export function getServiceLanding(slug: string) {
  return serviceLandings.find((service) => service.slug === slug) ?? null;
}
