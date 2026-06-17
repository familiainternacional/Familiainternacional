import type { MediaMention } from '@/config/media-mentions';
import { enMediaMentions } from '@/locales/en/media-mentions';
import type { Locale } from './config';

export function getLocalizedMediaMention(mention: MediaMention, locale: Locale): MediaMention {
  if (locale === 'es') return mention;

  const overlay = enMediaMentions[mention.id as keyof typeof enMediaMentions];
  if (!overlay) return mention;

  return {
    ...mention,
    title: overlay.title,
    description: overlay.description,
    topics: overlay.topics ?? mention.topics,
    seo: 'seo' in overlay && overlay.seo ? overlay.seo : mention.seo,
    faqs: 'faqs' in overlay && overlay.faqs ? overlay.faqs : mention.faqs,
  };
}
