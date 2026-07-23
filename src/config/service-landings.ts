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
  includeImages?: string[];
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
    slug: 'divorcios-internacionales',
    title: 'Divorcios Internacionales',
    shortTitle: 'Divorcios',
    seoTitle: 'Abogados de divorcio internacional en Chile',
    seoDescription:
      'Divorcios con cónyuge en el extranjero, efectos en Chile y estrategia transfronteriza. Familia Internacional, especialistas en derecho de familia internacional.',
    eyebrow: 'Área 01',
    heroTitle: 'Divorcio internacional con estrategia clara',
    heroSubtitle:
      'Patrocinamos divorcios unilaterales, por culpa o de mutuo acuerdo cuando uno de los cónyuges está en el exterior, y asesoramos divorcios extranjeros con efectos en Chile.',
    image: '/hero-familia.png',
    includeImages: ['/services/include-doc.png', '/services/include-handshake.png', '/services/include-scales.png', '/services/include-gavel.png'],
    ctaTitle: 'Evalúe su situación matrimonial',
    ctaDescription:
      'Analizamos país involucrado, domicilio, bienes y vía procesal aplicable antes de iniciar cualquier acción.',
    ctaLabel: 'Evaluar divorcio internacional',
    intro:
      'Un divorcio internacional no se resuelve solo con la ley chilena. Hay que considerar domicilios, competencia judicial, efectos patrimoniales en más de un país y, cuando hay hijos, convenios internacionales. Familia Internacional acompaña cada etapa con experiencia en tribunales chilenos y coordinación con abogados en el extranjero.',
    problems: [
      'Cónyuge residente fuera de Chile sin domicilio conocido.',
      'Divorcio obtenido en el extranjero que debe surtir efectos en Chile.',
      'Bienes en Chile y en el exterior sin claridad sobre reparto.',
      'Conflictos sobre cuidado personal o visitas vinculados al divorcio.',
    ],
    approach: [
      'Diagnóstico de competencia y ley aplicable en cada país relevante.',
      'Definición de estrategia: mutuo acuerdo, unilateral o reconocimiento de sentencia extranjera.',
      'Coordinación con red internacional de abogados de familia cuando corresponde.',
    ],
    includes: [
      'Demandas de divorcio en Chile con cónyuge en el exterior.',
      'Asesoría sobre divorcios extranjeros y sus efectos en Chile.',
      'Negociación de acuerdos transfronterizos.',
      'Coordinación con abogados en otros países.',
    ],
    faqs: [
      {
        question: '¿Puedo divorciarme en Chile si mi cónyuge vive en otro país?',
        answer:
          'En muchos casos sí, pero depende del domicilio, la nacionalidad y los hechos del caso. Evaluamos competencia y la vía más eficiente antes de demandar.',
      },
      {
        question: '¿Un divorcio extranjero vale en Chile?',
        answer:
          'No siempre automáticamente. Puede requerir exequátur u otros trámites según el país de origen y el tipo de sentencia.',
      },
    ],
  },
  {
    slug: 'exequatur',
    title: 'Exequátur (Validación de Sentencias)',
    shortTitle: 'Exequátur',
    seoTitle: 'Exequátur de sentencias extranjeras en Chile',
    seoDescription:
      'Validación ante la Corte Suprema de sentencias de divorcio, nulidad, adopción y cuidado personal dictadas en el extranjero.',
    eyebrow: 'Área 02',
    heroTitle: 'Reconozca en Chile una sentencia extranjera',
    heroSubtitle:
      'Tramitamos exequátur ante la Corte Suprema para que resoluciones de familia dictadas en el exterior produzcan efectos en Chile.',
    image: '/services/hero-exequatur.png',
    includeImages: ['/services/include-gavel.png', '/services/include-doc.png', '/services/include-handshake.png', '/services/include-scales.png'],
    ctaTitle: 'Evalúe si su sentencia puede validarse',
    ctaDescription:
      'Revisamos país de origen, tipo de resolución, requisitos formales y probabilidad de éxito del exequátur.',
    ctaLabel: 'Evaluar exequátur',
    intro:
      'Una sentencia extranjera de divorcio, nulidad, adopción o cuidado personal no surte efectos automáticos en Chile. El exequátur ante la Corte Suprema es el mecanismo para reconocerla. Familia Internacional tiene experiencia directa en estos procedimientos.',
    problems: [
      'Divorcio obtenido en el extranjero sin efectos en Chile.',
      'Sentencia de custodia o adopción extranjera por reconocer.',
      'Incertidumbre sobre requisitos y plazos del exequátur.',
      'Oposición o trámites incompletos que retrasan la validación.',
    ],
    approach: [
      'Revisión de sentencia, apostilla, traducción y requisitos formales.',
      'Preparación y presentación ante la Corte Suprema.',
      'Seguimiento hasta sentencia de exequátur o definición de alternativas.',
    ],
    includes: [
      'Exequátur de sentencias de divorcio y nulidad.',
      'Validación de resoluciones de cuidado personal.',
      'Reconocimiento de adopciones extranjeras.',
      'Asesoría sobre documentación y apostillas.',
    ],
    faqs: [
      {
        question: '¿Cuánto demora un exequátur en Chile?',
        answer:
          'Depende de la complejidad, documentación y carga de la Corte Suprema. Tras evaluar su caso le indicamos plazos estimados realistas.',
      },
      {
        question: '¿Toda sentencia extranjera puede exequaturse?',
        answer:
          'No. Debe cumplir requisitos de forma, competencia del tribunal extranjero y no contradicción con orden público chileno.',
      },
    ],
  },
  {
    slug: 'cuidado-sustraccion',
    title: 'Sustracción Internacional de niños, cuidado y visitas transfronterizas',
    shortTitle: 'Cuidado',
    seoTitle: 'Abogados sustracción internacional de menores Chile',
    seoDescription:
      'Convenio de La Haya, visitas transfronterizas, relocalización y autorizaciones para salir del país. Familia Internacional, cientos de casos tramitados.',
    eyebrow: 'Área 03',
    heroTitle: 'Protección de menores cuando cruzan fronteras',
    heroSubtitle:
      'Defensa y demandas bajo el Convenio de La Haya de 1980, visitas internacionales y autorizaciones judiciales para viajar o relocalizar.',
    image: '/hero-defensa.png',
    includeImages: ['/services/include-scales.png', '/services/include-doc.png', '/services/include-gavel.png', '/services/include-handshake.png'],
    ctaTitle: 'Actúe con urgencia si hay riesgo de sustracción',
    ctaDescription:
      'En estos casos el tiempo es crítico. Evaluamos medidas cautelares, Autoridad Central y vías en Chile y en el extranjero.',
    ctaLabel: 'Evaluar caso de cuidado',
    intro:
      'La sustracción internacional de menores y los conflictos de custodia transfronteriza son materias técnicas y urgentes. Familia Internacional cuenta con experiencia directa en el Convenio de La Haya, coordinación con autoridades centrales y litigación en tribunales chilenos y extranjeros.',
    problems: [
      'Traslado o retención de un menor en otro país sin autorización.',
      'Negativa a cumplir régimen de visitas acordado o judicial.',
      'Solicitud de autorización para salir del país con el hijo.',
      'Relocalización internacional con oposición del otro progenitor.',
    ],
    approach: [
      'Evaluación inmediata de urgencia, país receptor y convenios aplicables.',
      'Activación de vías bajo La Haya o acciones locales según el escenario.',
      'Seguimiento procesal y comunicación clara con la familia en cada etapa.',
    ],
    includes: [
      'Demandas y defensas por sustracción internacional (La Haya).',
      'Visitas transfronterizas y cumplimiento de resoluciones.',
      'Coordinación con abogados y autoridades en el exterior.',
    ],
    faqs: [
      {
        question: '¿Qué es el Convenio de La Haya y cuándo aplica?',
        answer:
          'Es un tratado internacional que regula la sustracción de menores y visitas transfronterizas. Aplica cuando los padres viven en distintos Estados o el menor fue trasladado sin autorización.',
      },
      {
        question: '¿Qué debo hacer si creo que me quitarán a mi hijo del país?',
        answer:
          'Contacte de inmediato a un abogado especializado. Existen medidas cautelares y alertas que pueden activarse con rapidez según el caso.',
      },
    ],
  },
  {
    slug: 'autorizaciones-salida-pais',
    title: 'Autorizaciones para Salir del País',
    shortTitle: 'Salida del país',
    seoTitle: 'Autorización judicial para salir del país con menores Chile',
    seoDescription:
      'Tramitamos autorizaciones judiciales para que menores salgan del país, por viajes temporales o relocalización definitiva. Familia Internacional.',
    eyebrow: 'Área 04',
    heroTitle: 'Autorización judicial para viajar o relocalizar con su hijo',
    heroSubtitle:
      'Patrocinamos solicitudes ante tribunales de familia para salidas temporales del país o cambios de residencia internacional de menores.',
    image: '/hero-santiago.png',
    ctaTitle: 'Evalúe su solicitud de autorización',
    ctaDescription:
      'Revisamos plazos, destino, oposición del otro progenitor y documentación necesaria antes de presentar la demanda.',
    ctaLabel: 'Evaluar autorización de salida',
    intro:
      'Cuando un progenitor necesita viajar al extranjero con su hijo o relocalizarse de forma definitiva, suele requerirse autorización judicial si no existe acuerdo. Familia Internacional tramita estas solicitudes con foco en la protección del menor y en los plazos del viaje o mudanza.',
    problems: [
      'Negativa del otro padre o madre a firmar el permiso de salida.',
      'Viaje escolar, familiar o de urgencia con fecha cercana.',
      'Relocalización internacional con oposición del otro progenitor.',
      'Renovación o ampliación de una autorización previa.',
    ],
    approach: [
      'Análisis de acuerdos vigentes, sentencias y régimen de cuidado personal.',
      'Preparación de demanda o solicitud con fundamentos y documentación.',
      'Negociación judicial o extrajudicial cuando es viable.',
      'Seguimiento hasta la resolución y orientación para el viaje.',
    ],
    includes: [
      'Autorizaciones para salidas temporales del país.',
      'Relocalización o residencia permanente en el extranjero.',
      'Defensa ante oposición del otro progenitor.',
      'Coordinación con casos de visitas o Convenio de La Haya vinculados.',
    ],
    faqs: [
      {
        question: '¿Siempre se necesita autorización judicial para salir del país con un menor?',
        answer:
          'No en todos los casos, pero cuando no hay acuerdo o existe oposición, el tribunal de familia debe autorizar la salida. Evaluamos su situación concreta antes de viajar.',
      },
      {
        question: '¿Cuánto demora una autorización de salida?',
        answer:
          'Depende del tribunal, la urgencia y si hay oposición. En viajes con plazo corto conviene actuar con la mayor anticipación posible.',
      },
    ],
  },
  {
    slug: 'filiacion-alimentos',
    title: 'Filiación y Alimentos Internacionales',
    shortTitle: 'Alimentos',
    seoTitle: 'Pensión de alimentos internacional y filiación Chile',
    seoDescription:
      'Demandas de paternidad internacional, cobro de alimentos bajo el Convenio de Nueva York y reconocimiento transfronterizo. Familia Internacional.',
    eyebrow: 'Área 05',
    heroTitle: 'Filiación y alimentos más allá de las fronteras',
    heroSubtitle:
      'Representación en paternidad internacional y cobro de pensión de alimentos cuando las partes o activos están en distintos países.',
    image: '/services/hero-filiacion.png',
    includeImages: ['/services/include-handshake.png', '/services/include-scales.png', '/services/include-doc.png', '/services/include-gavel.png'],
    ctaTitle: 'Evalúe su caso de alimentos o filiación',
    ctaDescription:
      'Revisamos país de residencia del deudor, convenios aplicables y vías de cobro o reconocimiento en Chile.',
    ctaLabel: 'Evaluar filiación o alimentos',
    intro:
      'Obtener o hacer cumplir una pensión de alimentos cuando el obligado vive en otro país exige conocer convenios internacionales, competencia y mecanismos de cooperación. Familia Internacional tramita demandas de filiación y alimentos con enfoque transfronterizo.',
    problems: [
      'Progenitor residente en el extranjero que no paga alimentos.',
      'Reconocimiento de paternidad con partes en distintos países.',
      'Fijación o modificación de pensión con ingresos en el exterior.',
      'Cobro de deuda alimentaria internacional.',
    ],
    approach: [
      'Identificación de convenios aplicables (Nueva York u otros).',
      'Estrategia de demanda, ejecución o cooperación internacional.',
      'Seguimiento hasta obtención de resolución y cumplimiento.',
    ],
    includes: [
      'Demandas de filiación internacional.',
      'Fijación y modificación de alimentos.',
      'Cobro bajo Convenio de Nueva York.',
      'Coordinación con autoridades y abogados extranjeros.',
    ],
    faqs: [
      {
        question: '¿Puedo cobrar alimentos si el padre o madre vive fuera de Chile?',
        answer:
          'Sí, en muchos casos mediante convenios internacionales y acciones judiciales coordinadas. Evaluamos el país de residencia y la vía más eficiente.',
      },
      {
        question: '¿Qué es el Convenio de Nueva York en alimentos?',
        answer:
          'Es un tratado multilateral para el reconocimiento y ejecución de decisiones sobre obligaciones alimentarias entre Estados parte.',
      },
    ],
  },
  {
    slug: 'herencias-internacionales',
    title: 'Herencias y Posesiones Efectivas Internacionales',
    shortTitle: 'Herencias',
    seoTitle: 'Herencias internacionales y posesión efectiva Chile',
    seoDescription:
      'Posesión efectiva y adjudicación de bienes hereditarios con causantes o herederos en Chile y en el extranjero.',
    eyebrow: 'Área 06',
    heroTitle: 'Herencias con bienes en Chile y en el exterior',
    heroSubtitle:
      'Gestión de posesión efectiva, adjudicación y trámites sucesorios cuando el causante o los bienes están en más de un país.',
    image: '/services/hero-herencias.png',
    includeImages: ['/services/include-doc.png', '/services/include-scales.png', '/services/include-gavel.png', '/services/include-handshake.png'],
    ctaTitle: 'Ordene la sucesión internacional',
    ctaDescription:
      'Analizamos bienes en Chile y en el extranjero, ley aplicable y pasos para posesión efectiva o adjudicación.',
    ctaLabel: 'Evaluar herencia internacional',
    intro:
      'Las herencias internacionales combinan derecho sucesorio chileno, leyes extranjeras y bienes en distintas jurisdicciones. Familia Internacional asiste a familias en posesión efectiva, adjudicación y coordinación con abogados en el exterior.',
    problems: [
      'Causante fallecido en el extranjero con bienes en Chile.',
      'Herederos residentes fuera de Chile.',
      'Bienes inmuebles o cuentas en más de un país.',
      'Incertidumbre sobre ley aplicable y tribunales competentes.',
    ],
    approach: [
      'Inventario de bienes y determinación de vías en cada país.',
      'Tramitación de posesión efectiva o sucesión en Chile.',
      'Coordinación con especialistas en el exterior cuando corresponde.',
    ],
    includes: [
      'Posesión efectiva con causante chileno o extranjero.',
      'Adjudicación de bienes hereditarios.',
      'Asesoría sobre impuestos y documentación sucesoria.',
      'Coordinación internacional con otros estudios.',
    ],
    faqs: [
      {
        question: '¿Puedo tramitar una herencia en Chile si vivo en el extranjero?',
        answer:
          'Sí. Podemos representarlo mediante mandato y gestionar la posesión efectiva sin que usted deba viajar, según el caso.',
      },
      {
        question: '¿Qué pasa si hay bienes en Chile y en otro país?',
        answer:
          'Suele requerirse tramitación en cada jurisdicción. Diseñamos una estrategia coordinada para evitar duplicidades y errores.',
      },
    ],
  },
  {
    slug: 'tramites-consulares',
    title: 'Trámites Consulares y Representación en el Extranjero',
    shortTitle: 'Consulares',
    seoTitle: 'Mandatos consulares y representación en tribunales de familia',
    seoDescription:
      'Poderes para consulados chilenos, escrituras en el extranjero y representación judicial para quienes residen fuera de Chile.',
    eyebrow: 'Área 07',
    heroTitle: 'Actúe en Chile desde cualquier país',
    heroSubtitle:
      'Confección de mandatos, escrituras y poderes para consulados chilenos, con representación integral en tribunales de familia.',
    image: '/services/hero-consulares.png',
    includeImages: ['/services/include-handshake.png', '/services/include-gavel.png', '/services/include-scales.png', '/services/include-doc.png'],
    ctaTitle: 'Resuelva trámites sin viajar a Chile',
    ctaDescription:
      'Preparamos documentación consular y lo representamos en familia si reside en el extranjero.',
    ctaLabel: 'Evaluar trámite consular',
    intro:
      'Muchas familias chilenas en el exterior necesitan actuar en tribunales de familia o firmar documentos ante consulados. Familia Internacional prepara mandatos, coordina trámites consulares y litiga en Chile en representación de clientes que viven fuera del país.',
    problems: [
      'Necesidad de demandar o defender un caso estando en el extranjero.',
      'Mandato judicial o consular mal redactado que genera rechazos.',
      'Escrituras y poderes para bienes o acuerdos en Chile.',
      'Plazos judiciales que no pueden esperar su regreso al país.',
    ],
    approach: [
      'Definición del trámite: mandato, demanda, acuerdo o escritura.',
      'Preparación de documentación conforme a requisitos consulares y judiciales.',
      'Representación y seguimiento procesal en Chile.',
    ],
    includes: [
      'Mandatos judiciales y poderes consulares.',
      'Representación en tribunales de familia.',
      'Escrituras y acuerdos para firmar en consulado.',
      'Coordinación de apostillas y traducciones.',
    ],
    faqs: [
      {
        question: '¿Puedo firmar un mandato en un consulado chileno?',
        answer:
          'Sí, para muchos actos jurídicos. Preparamos el borrador y le indicamos el consulado y requisitos según su país de residencia.',
      },
      {
        question: '¿Me representan en juicio si vivo fuera de Chile?',
        answer:
          'Sí. Con mandato válido podemos patrocinar su caso y mantenerlo informado en cada etapa del proceso.',
      },
    ],
  }
] as const satisfies ServiceLanding[];

export type ServiceSlug = (typeof serviceLandings)[number]['slug'];

export function getServiceLanding(slug: string) {
  return serviceLandings.find((service) => service.slug === slug) ?? null;
}
