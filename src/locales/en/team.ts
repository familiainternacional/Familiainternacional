export const team = {
  label: 'About us',
  subtitle: 'Learn a little more about our firm',
  title1: 'True experts in International Family Law',
  title2: '',
  intro:
    'Our law firm was founded to provide our clients with expert advice on International Family Law matters. Because these issues are highly specialized, it is not easy to find professionals with experience in this field. Backed by hundreds of successfully handled cases, we can ensure highly qualified work. We are part of an extensive network of international family law attorneys.',
  tabs: {
    bio: 'Profile',
    education: 'Education',
    experience: 'Experience',
    contact: 'Contact',
  },
  contactBlurb: 'For direct inquiries, you can reach us at the following email:',
  jaime: {
    name: 'Jaime Soto Silva',
    role: 'Attorney – Partner',
    bio1:
      'Attorney, Master’s degree holder and University Professor in Family Law and Professional Practice. Former attorney at the International Office of Chile’s Legal Aid Corporation, Central Authority for the Hague Convention of 1980 and the New York Convention of 1956.',
    bio2:
      'His career combines family court litigation, coordination with central authorities, and advisory work for families facing complex cross-border disputes.',
    tags: ['Hague Convention', 'International Child Abduction', 'Exequatur', 'International Child Support'],
    education: [
      'Attorney, Master’s in Family Law.',
      'University Professor in Family Law and Professional Practice.',
      'Specialized training in the Hague Convention (1980) and the New York Convention (1956).',
    ],
    experience: [
      'Hundreds of cases handled in International Family Law.',
      'Former attorney at the International Office of Chile’s Legal Aid Corporation, Central Authority for the Hague and New York Conventions.',
      'Member of an extensive international network of family law attorneys.',
    ],
    imageAlt: 'Jaime Soto Silva - Familia Internacional',
  },
} as const;

export const diferencial = {
  label: 'Why Familia Internacional',
  title1: 'Specialists when ',
  title2: 'borders matter',
  body: 'These matters are technical and uncommon. Familia Internacional has handled hundreds of cases, deep Hague Convention expertise, and an international network of family law attorneys.',
  features: [
    {
      title: 'International family law only',
      desc: 'Exclusive focus without diluting the practice across other legal areas.',
    },
    {
      title: 'International network',
      desc: 'Coordination with attorneys and authorities in Chile and abroad.',
    },
    {
      title: 'Hague Convention',
      desc: 'Direct experience in international child abduction and cross-border access.',
    },
    {
      title: 'Clear communication',
      desc: 'We translate legal language so you can decide with real information in sensitive moments.',
    },
  ],
  carousel: {
    aria: 'Advantages carousel',
    prev: 'Previous advantage',
    next: 'Next advantage',
    dot: 'Show advantage {n}',
  },
} as const;
