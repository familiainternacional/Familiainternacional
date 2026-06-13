import { getPrismaClient } from './src/lib/db/prisma';

async function main() {
  const prisma = getPrismaClient();

  const posts = [
    {
      slug: 'nueva-ley-de-quiebras-21563-chile',
      titleEs: 'Nueva Ley de Quiebras (Ley 21.563): Guía Estratégica para Empresas en Chile',
      excerptEs: 'Análisis profundo de la Ley 21.563 sobre Reorganización y Liquidación. Descubra cómo las nuevas herramientas de Protección Financiera Concursal pueden salvar el patrimonio de su empresa.',
      contentEs: `La entrada en vigencia de la **Ley N° 21.563** ha modernizado profundamente el ecosistema de insolvencia y reemprendimiento en Chile. En un escenario económico desafiante, entender esta normativa ya no es exclusivo de empresas en quiebra, sino una herramienta de planificación estratégica fundamental.

## ¿Qué cambia con la Ley 21.563?

La reforma a la antigua Ley 20.720 introduce procedimientos simplificados y más económicos, diseñados específicamente para que las empresas puedan reestructurar sus pasivos sin llegar a la liquidación forzosa.

### 1. Protección Financiera Concursal (PFC) Ampliada
Uno de los beneficios más potentes para el deudor corporativo es la extensión de la PFC. Durante este periodo (que puede llegar hasta los 120 días), **se suspenden todos los juicios ejecutivos y embargos** contra la empresa. Esto otorga un respiro vital para negociar con bancos y proveedores sin la presión del remate de activos.

### 2. Reorganización Simplificada
A diferencia de los procesos anteriores que resultaban costosos y burocráticos, las empresas de menor tamaño ahora acceden a un procedimiento de Reorganización Simplificada. Este mecanismo reduce drásticamente los honorarios de los veedores y los plazos de tramitación.

### 3. Financiamiento Post-Concursal
La ley flexibiliza la capacidad de la empresa para adquirir nueva deuda o enajenar hasta el 20% de su activo fijo durante la reorganización. Esto es crucial para inyectar liquidez y mantener la operatividad mientras se aprueba el acuerdo con los acreedores.

## Estrategia Preventiva: Actuar Antes de la Cesación de Pagos

El error más común de los directorios es acudir a la ley cuando las demandas ya están notificadas. Un **análisis de insolvencia temprano** permite estructurar un Acuerdo de Reorganización Judicial sólido, protegiendo a los avales (usualmente los socios) y maximizando el valor de la compañía.

En **Ruiz Leiva Abogados**, nuestro equipo de litigios y derecho corporativo diseña estrategias pre-concursales que alinean la protección legal con la viabilidad financiera de su negocio. Si su empresa enfrenta tensión de caja, contáctenos para una evaluación confidencial de sus alternativas bajo la nueva Ley de Quiebras.`,
      coverImage: '/images/santiago-skyline.jpg',
      published: true,
      publishedAt: new Date(),
      authorName: 'Sebastián Leiva',
      seoTitleEs: 'Nueva Ley de Quiebras Chile (Ley 21.563) | Ruiz Leiva Abogados',
      seoDescriptionEs: 'Guía legal sobre la Ley 21.563 de Reorganización y Liquidación en Chile. Estrategias de protección financiera para empresas y PYMEs.'
    },
    {
      slug: 'compliance-ley-21595-delitos-economicos-chile',
      titleEs: 'Ley 21.595 de Delitos Económicos: Por qué el Compliance ya no es opcional',
      excerptEs: 'La nueva Ley de Delitos Económicos en Chile redefine la responsabilidad penal empresarial. Conozca las implicancias para gerentes y directorios, y cómo un Modelo de Prevención de Delitos efectivo es su única defensa legal.',
      contentEs: `La promulgación de la **Ley N° 21.595 de Delitos Económicos** representa el cambio más radical en el derecho penal empresarial chileno en las últimas décadas. La impunidad de los delitos de "cuello y corbata" ha terminado, y con ello, las empresas deben adoptar una postura defensiva estructural.

## La Nueva Realidad Penal Corporativa

La normativa amplía exponencialmente el catálogo de delitos por los cuales una empresa (Persona Jurídica) puede ser condenada. Ya no hablamos solo de lavado de activos o cohecho; ahora se incluyen:
- **Delitos tributarios** y aduaneros.
- **Atentados contra el medio ambiente** (incluso sin un daño material inmediato).
- **Delitos laborales** (ej. abusos severos contra trabajadores).
- **Delitos informáticos** y societarios.

### El Fin de las Multas Bajas y la Cárcel Efectiva

El sistema de "días-multa" vincula la sanción económica directamente a los ingresos diarios de la empresa infractora, lo que puede resultar en multas milmillonarias que amenazan la continuidad del negocio. Además, la ley endurece las penas para altos ejecutivos, limitando la posibilidad de cumplir condenas en libertad si participan activamente en la toma de decisiones ilícitas.

## El Modelo de Prevención de Delitos (MPD) como Escudo Legal

Bajo la modificación a la Ley 20.393, la **única vía de exención de responsabilidad penal** para una empresa es demostrar que, previo a la comisión del delito, contaba con un Modelo de Prevención de Delitos (Compliance) **efectivamente implementado**.

Un "Compliance de papel" (documentos sin aplicación real) será considerado ineficaz por los tribunales. Un MPD robusto exige:
1. **Matriz de Riesgos:** Identificación exhaustiva de los riesgos propios del giro comercial.
2. **Canal de Denuncias:** Seguro, anónimo y con protocolos estrictos de no represalia.
3. **Oficial de Cumplimiento Independiente:** Con línea directa al Directorio y presupuesto autónomo.
4. **Certificación y Auditorías:** Revisiones periódicas por terceros independientes.

En **Ruiz Leiva Abogados**, estructuramos Modelos de Prevención adaptados a la realidad operativa de su empresa, blindando al directorio y a la organización frente a la rigurosidad de la nueva Ley de Delitos Económicos.`,
      coverImage: '/services/corporate_law.png',
      published: true,
      publishedAt: new Date(Date.now() - 86400000 * 2),
      authorName: 'Christian Ruiz',
      seoTitleEs: 'Compliance y Ley 21.595 de Delitos Económicos Chile | Asesoría',
      seoDescriptionEs: 'Impacto de la Ley 21.595 en empresas chilenas. Implementación de Modelos de Prevención de Delitos (Compliance) para eximir responsabilidad penal corporativa.'
    },
    {
      slug: 'estrategias-negociacion-litigios-civiles-complejos-chile',
      titleEs: 'El Arte de Evitar el Juicio: Negociación en Litigios Civiles Complejos',
      excerptEs: 'Frente a la lentitud de los tribunales chilenos, la litigación estratégica hoy exige dominar los Mecanismos Alternativos de Resolución de Conflictos (MASC) como el Arbitraje y la Mediación Comercial.',
      contentEs: `Un litigio civil de alta complejidad no solo drena recursos financieros, sino que paraliza decisiones comerciales, destruye valor y expone a las empresas a riesgos reputacionales prolongados. En la actualidad jurídica chilena, entrar a tribunales debe ser la última *ratio*.

## El Enfoque Multidisciplinario del Conflicto

Las disputas societarias, incumplimientos de contratos de gran envergadura o juicios de responsabilidad civil extracontractual requieren una **visión 360°**. La estrategia moderna dictamina que un abogado litigante no debe pensar solo en la sentencia, sino en el **costo de oportunidad del cliente**.

### 1. Diagnóstico de Riesgo Temprano (Early Case Assessment)
Antes de redactar una demanda, es imperativo realizar una auditoría del conflicto. Esto incluye mapear la evidencia real, proyectar los años de litigio (que en la justicia civil chilena pueden superar los 5 años) y calcular los costos indirectos. 

### 2. Arbitraje Institucional (CAM Santiago)
Para controversias comerciales, el arbitraje se ha consolidado como la vía preferente. Los árbitros, al ser especialistas en la materia debatida, ofrecen fallos más técnicos y predecibles que la justicia ordinaria. Además, la confidencialidad del proceso protege el *know-how* y la imagen pública de las corporaciones involucradas.

### 3. Negociación Estructurada y Mediación
La mediación comercial es altamente efectiva cuando existe interés en preservar la relación a largo plazo entre las partes (ej. socios de un holding o proveedores estratégicos). Una negociación exitosa se basa en mover el foco desde las "posiciones jurídicas" hacia los "intereses comerciales" subyacentes.

## Litigar para Negociar

A menudo, la interposición de una medida precautoria contundente o una demanda sólidamente fundamentada es la herramienta táctica necesaria para forzar a la contraparte a sentarse en la mesa de negociación bajo sus términos. 

En **Ruiz Leiva Abogados**, entendemos el litigio como una herramienta de negocios. Representamos a nuestros clientes en tribunales ordinarios y cortes arbitrales con la agresividad técnica necesaria, manteniendo siempre abierta la vía para un acuerdo extrajudicial altamente favorable.`,
      coverImage: '/services/civil_litigation.png',
      published: true,
      publishedAt: new Date(Date.now() - 86400000 * 5),
      authorName: 'Equipo Ruiz Leiva',
      seoTitleEs: 'Negociación y Litigios Civiles Complejos en Chile | Arbitraje',
      seoDescriptionEs: 'Estrategias de litigación civil, arbitraje comercial (CAM Santiago) y negociación extrajudicial para empresas. Prevención y resolución de conflictos de alta complejidad.'
    },
    {
      slug: 'defensa-multas-sumarios-superintendencia-chile',
      titleEs: 'Fiscalización y Sumarios: Estrategia de Defensa ante Superintendencias',
      excerptEs: 'Las Superintendencias en Chile (SMA, CMF, Salud, etc.) poseen facultades sancionatorias draconianas. Una defensa técnica en la fase inicial del sumario es la clave para evitar multas paralizantes.',
      contentEs: `El Estado chileno, a través de sus diversas Superintendencias (Medio Ambiente, Mercado Financiero, Salud, Electricidad y Combustibles), ha endurecido exponencialmente su labor fiscalizadora. Enfrentar un Procedimiento Administrativo Sancionatorio sin una estrategia legal definida desde el día cero es el error más costoso que puede cometer una empresa.

## Anatomía de la Defensa Regulatoria

Los procedimientos sancionatorios se rigen por los principios del **debido proceso** y la **estricta legalidad**. La autoridad no es infalible; comete errores formales y de apreciación probatoria que pueden ser la llave para anular una sanción.

### 1. La Fase de Instrucción y los Descargos
Cuando se formula el pliego de cargos, la empresa cuenta con un plazo legal fatal (y usualmente muy breve, ej. 10 a 15 días) para presentar sus **Descargos**. Responder con un formato genérico es garantizar una condena. 
En esta fase, la defensa técnica debe:
- Cuestionar la tipicidad de la infracción (si la conducta realmente calza con la norma).
- Desvirtuar los hechos mediante peritajes técnicos y prueba documental.
- Argumentar atenuantes (como la autodenuncia o la corrección temprana de la infracción).

### 2. Impugnación de Resoluciones (Vía Administrativa y Judicial)
Si la Superintendencia dicta una resolución aplicando una multa, censura o clausura, el sistema jurídico chileno permite impugnar dicha decisión.
- **Recursos Administrativos:** Reposición ante la misma autoridad que sancionó.
- **Acciones Judiciales (Reclamo de Ilegalidad):** Si la administración no cede, se debe elevar el caso a las Cortes de Apelaciones o Tribunales Especiales (como los Tribunales Ambientales). Los jueces suelen ser muy rigurosos al revisar si la Superintendencia fundamentó correctamente la proporcionalidad de la multa impuesta.

### 3. La Doctrina del "Decaimiento"
Una herramienta de defensa avanzada ocurre cuando el organismo estatal mantiene un sumario abierto sin resolución por un tiempo excesivo e injustificado (ej. más de 2 años). La Corte Suprema ha establecido que en estos casos opera el "decaimiento" del procedimiento, extinguiendo la facultad de la autoridad para sancionar.

La intervención temprana de **Ruiz Leiva Abogados** en los requerimientos de información de cualquier Superintendencia permite encapsular el riesgo y diseñar una defensa técnico-jurídica que proteja el patrimonio y la continuidad operativa de su empresa.`,
      coverImage: '/services/administrative_law.png',
      published: true,
      publishedAt: new Date(Date.now() - 86400000 * 10),
      authorName: 'Equipo Ruiz Leiva',
      seoTitleEs: 'Defensa Sumarios Administrativos y Superintendencias en Chile',
      seoDescriptionEs: 'Abogados especialistas en defensa regulatoria, multas y sumarios ante Superintendencias (SMA, CMF, SUSESO). Estrategias de impugnación y reclamación de ilegalidad.'
    }
  ];

  console.log('Inserting posts...');
  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    });
  }
  console.log('Successfully inserted SEO optimized posts!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    const prisma = getPrismaClient();
    await prisma.$disconnect();
  });
