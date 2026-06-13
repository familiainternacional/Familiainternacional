export const fallbackBlogPosts = [
  {
    slug: 'convenio-la-haya-guia-familias',
    titleEs: 'Convenio de La Haya: guía para familias en conflictos transfronterizos',
    excerptEs:
      'Qué es el Convenio de 1980, cuándo aplica la sustracción internacional de menores y qué pasos puede dar una familia en Chile.',
    contentEs: `El Convenio de La Haya sobre los aspectos civiles de la sustracción internacional de menores es uno de los instrumentos más importantes cuando un hijo es trasladado o retenido en otro país sin autorización, o cuando los padres viven en distintos Estados.

Chile es parte de este convenio. Eso significa que existen mecanismos para solicitar el retorno del menor o regular visitas transfronterizas, siempre que se cumplan los requisitos del tratado y de la legislación local.

## Cuándo aplica

El convenio entra en juego principalmente cuando:

- Un menor es llevado o retenido en otro país sin consentimiento del titular del cuidado.
- Los padres residen en países distintos y disputan visitas o cuidado personal.
- Se necesita hacer cumplir un régimen de visitas acordado en un Estado parte.

## Qué no resuelve automáticamente

La Haya no garantiza el retorno inmediato en todos los casos. Tribunales pueden considerar la voluntad del niño, el arraigo en el nuevo entorno y otras excepciones previstas en el convenio.

## Por qué actuar rápido

En sustracción internacional, los plazos y las medidas cautelares son decisivos. Documentar viajes, comunicaciones y fechas relevantes desde el inicio fortalece cualquier estrategia posterior.

Familia Internacional acompaña familias en estas situaciones con experiencia directa en tribunales chilenos y coordinación con autoridades centrales y abogados en el exterior.`,
    coverImage: '/hero-defensa.png',
    publishedAt: new Date('2026-05-15T10:00:00-04:00'),
    authorName: 'Jaime Soto Silva',
  },
  {
    slug: 'divorcio-internacional-chile',
    titleEs: 'Divorcio internacional: preguntas frecuentes desde Chile',
    excerptEs:
      'Competencia judicial, cónyuge en el extranjero y efectos de un divorcio obtenido fuera de Chile.',
    contentEs: `Cada vez más familias enfrentan divorcios donde uno de los cónyuges vive fuera de Chile, existen bienes en varios países o hay hijos con doble nacionalidad. En esos escenarios, no basta con iniciar un procedimiento local sin analizar la situación completa.

## ¿Puedo divorciarme en Chile si mi cónyuge está en el extranjero?

Depende del domicilio, la nacionalidad y los hechos concretos. En algunos casos Chile es competente aunque el otro cónyuge no tenga domicilio conocido en el país. En otros, puede ser más eficiente reconocer una sentencia extranjera mediante exequátur.

## Divorcio extranjero con efectos en Chile

Un divorcio obtenido en otro país no siempre produce efectos automáticos en Chile. Puede requerirse exequátur ante la Corte Suprema u otros trámites según el país de origen.

## Hijos y patrimonio

El divorcio internacional suele intersectar con cuidado personal, visitas, pensión de alimentos y reparto de bienes en más de una jurisdicción. Conviene definir una estrategia integral desde el inicio.

Familia Internacional es el primer estudio en Chile dedicado exclusivamente a derecho de familia internacional y puede evaluar su caso antes de cualquier demanda.`,
    coverImage: '/hero-familia.png',
    publishedAt: new Date('2026-04-20T10:00:00-04:00'),
    authorName: 'Familia Internacional',
  },
  {
    slug: 'exequatur-sentencias-extranjeras',
    titleEs: 'Exequátur en Chile: cómo validar una sentencia extranjera de familia',
    excerptEs:
      'Requisitos, plazos y errores frecuentes al tramitar exequátur de divorcio, nulidad o cuidado personal ante la Corte Suprema.',
    contentEs: `El exequátur es el procedimiento mediante el cual la Corte Suprema de Chile reconoce y permite ejecutar una sentencia extranjera. En materia de familia, es especialmente relevante para divorcios, nulidades, adopciones y resoluciones de cuidado personal dictadas en el extranjero.

## Requisitos habituales

Entre los aspectos que suelen revisarse están:

- Autenticación o apostilla de la sentencia extranjera.
- Traducción oficial si el documento no está en español.
- Competencia del tribunal extranjero.
- Compatibilidad con el orden público chileno.

## Errores que retrasan el trámite

Presentar documentos incompletos, sin apostillar o con traducciones no válidas es una de las causas más frecuentes de rechazo o devolución. Una revisión previa evita meses de demora.

## Alternativas

En algunos casos puede ser preferible iniciar un nuevo procedimiento en Chile en lugar de exequaturizar. La elección depende del país de origen, el tipo de sentencia y los efectos que usted necesita.

Familia Internacional tramita exequátur directamente y evalúa la vía más eficiente para su situación.`,
    coverImage: '/hero-santiago.png',
    publishedAt: new Date('2026-03-10T10:00:00-04:00'),
    authorName: 'Familia Internacional',
  },
  {
    slug: 'pension-alimentos-internacional',
    titleEs: 'Pensión de alimentos cuando el progenitor vive en el extranjero',
    excerptEs:
      'Cobro transfronterizo, Convenio de Nueva York y estrategias para familias en Chile.',
    contentEs: `Obtener o hacer cumplir una pensión de alimentos es complejo cuando el progenitor obligado reside fuera de Chile. No basta con una sentencia local si no existen bienes embargables o mecanismos de cooperación internacional.

## Convenio de Nueva York

Chile forma parte del Convenio de las Naciones Unidas sobre la Recuperación Internacional de Alimentos para la Niñez. Este instrumento facilita el reconocimiento y cobro de obligaciones alimentarias entre Estados parte.

## Estrategia según el país

La vía concreta depende de dónde viva el deudor, si existe resolución previa, si hay bienes en Chile y qué convenios bilaterales o multilaterales aplican.

## Filiación internacional

En muchos casos el cobro de alimentos está ligado a un reconocimiento de filiación previo. Conviene analizar ambos aspectos en conjunto.

Familia Internacional asiste en demandas de filiación y alimentos con enfoque transfronterizo desde Santiago, con coordinación internacional cuando el caso lo requiere.`,
    coverImage: '/hero-familia.png',
    publishedAt: new Date('2026-02-05T10:00:00-04:00'),
    authorName: 'Familia Internacional',
  },
];

export function getFallbackBlogPost(slug: string) {
  const post = fallbackBlogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    ...post,
    excerptEs: post.excerptEs ?? null,
    coverImage: post.coverImage ?? null,
    publishedAt: post.publishedAt ?? null,
    updatedAt: post.publishedAt ?? null,
    seoTitleEs: null,
    seoDescriptionEs: null,
    seoKeywords: null,
    ogImage: null,
    authorName: post.authorName ?? 'Familia Internacional',
  };
}
