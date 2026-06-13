export type FamilyService = {
  num: string;
  slug: string;
  title: { es: string; en: string };
  shortTitle: { es: string; en: string };
  desc: { es: string; en: string };
  image: string;
};

export const familyServices: FamilyService[] = [
  {
    num: '01',
    slug: 'divorcios-internacionales',
    title: { es: 'Divorcios Internacionales', en: 'International Divorces' },
    shortTitle: { es: 'Divorcios', en: 'Divorces' },
    desc: {
      es: 'Patrocinamos divorcios unilaterales, por culpa o mutuo acuerdo con cónyuges en el exterior, sin requerir domicilio conocido. Asesoramos divorcios extranjeros y sus efectos en Chile.',
      en: 'We sponsor unilateral, fault-based, or mutual agreement divorces with spouses abroad. We also advise on foreign divorces and their effects in Chile.',
    },
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '02',
    slug: 'cuidado-sustraccion',
    title: { es: 'Cuidado y Visitas', en: 'Custody & Access' },
    shortTitle: { es: 'Cuidado', en: 'Custody' },
    desc: {
      es: 'Sustracción internacional de niños (Convenio de La Haya), visitas transfronterizas y autorizaciones judiciales para salir del país o relocalización.',
      en: 'International child abduction (Hague Convention), cross-border access cases, and judicial authorizations for relocation or travel.',
    },
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '03',
    slug: 'filiacion-alimentos',
    title: { es: 'Filiación y Alimentos', en: 'Paternity & Support' },
    shortTitle: { es: 'Alimentos', en: 'Support' },
    desc: {
      es: 'Demandas de paternidad internacional y cobro de pensión de alimentos bajo el Convenio de Nueva York.',
      en: 'International paternity claims and child support collection under the New York Convention.',
    },
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '04',
    slug: 'exequatur',
    title: { es: 'Exequátur (Validación)', en: 'Exequatur (Validation)' },
    shortTitle: { es: 'Exequátur', en: 'Exequatur' },
    desc: {
      es: 'Validación ante la Corte Suprema de sentencias extranjeras: divorcios, nulidades, adopciones y cuidado personal.',
      en: 'Supreme Court validation of foreign judgments: divorces, annulments, adoptions, and custody orders.',
    },
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '05',
    slug: 'herencias-internacionales',
    title: { es: 'Herencias y Posesiones', en: 'International Estates' },
    shortTitle: { es: 'Herencias', en: 'Estates' },
    desc: {
      es: 'Posesión efectiva y adjudicación de bienes hereditarios con causantes en Chile o en el extranjero.',
      en: 'Effective possession and adjudication of inherited assets for estates in Chile or abroad.',
    },
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '06',
    slug: 'tramites-consulares',
    title: { es: 'Trámites Consulares', en: 'Consular Procedures' },
    shortTitle: { es: 'Consulares', en: 'Consular' },
    desc: {
      es: 'Escrituras, mandatos y poderes para consulados chilenos. Representación en tribunales para quienes residen fuera del país.',
      en: 'Deeds, mandates, and powers of attorney for Chilean consulates. Court representation for clients abroad.',
    },
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
  },
];
