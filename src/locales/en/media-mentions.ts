import type { MediaMentionFaq, MediaMentionSeo } from '@/config/media-mentions';

export type MediaMentionLocaleOverlay = {
  title: string;
  description: string;
  topics?: string[];
  seo?: MediaMentionSeo;
  faqs?: MediaMentionFaq[];
};

export const enMediaMentions = {
  'lun-mane-swett-2024': {
    title: 'New York court denied Mane Swett’s petition to recover her child',
    description:
      'Las Últimas Noticias consulted Jaime Soto, an international family law attorney, on appeal options and the weight of the Hague Convention in international child abduction cases.',
    topics: ['Hague Convention', 'International child abduction', 'Cross-border custody', 'Appeal'],
    seo: {
      title: 'Jaime Soto in LUN: appeal, custody, and the Hague Convention',
      description:
        'Jaime Soto Silva’s analysis in Las Últimas Noticias on appeals in international child abduction cases, the child’s wishes, and habitual residence under the 1980 Hague Convention.',
      keywords: [
        'Hague Convention 1980',
        'international child abduction Chile',
        'Jaime Soto Silva',
        'Familia Internacional',
        'international custody appeal',
        'Las Últimas Noticias',
      ],
    },
    faqs: [
      {
        question: 'Can a Hague Convention ruling in New York be appealed?',
        answer:
          'In general, the losing party may appeal to the Court of Appeals. However, the analysis must account for the child’s wishes and habitual residence—factors the Hague Convention may weigh heavily.',
      },
      {
        question: 'How much weight does the child’s wishes carry under the Hague Convention?',
        answer:
          'When the child is of sufficient age and maturity, their views can be decisive. That is why, as Jaime Soto told LUN, this factor is crucial to case strategy.',
      },
      {
        question: 'Did Familia Internacional represent Mane Swett?',
        answer:
          'No. In this coverage Jaime Soto Silva was consulted by the outlet as an international family law expert, not as counsel for either party.',
      },
    ],
  },
  't13-mane-swett-video': {
    title: 'Legal drama in the United States',
    description:
      'Teletrece coverage of the complex international custody case involving Chilean actress Mane Swett.',
    topics: ['International custody', 'Media'],
  },
  'youtube-analisis-1': {
    title: 'Analysis of the court case',
    description:
      'Detailed commentary and analysis on international proceedings and child protection.',
    topics: ['Child protection', 'Legal analysis'],
  },
  'youtube-entrevista-2': {
    title: 'Interview and legal coverage',
    description:
      'Special feature explaining the scope of the law in cross-border family conflicts.',
    topics: ['Cross-border conflicts', 'Interview'],
  },
} satisfies Record<string, MediaMentionLocaleOverlay>;
