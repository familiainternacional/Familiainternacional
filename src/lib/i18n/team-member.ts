import type { TeamMember } from '@/config/team';
import { getDictionary } from './dictionaries';
import type { Locale } from './config';

export function getLocalizedTeamMember(member: TeamMember, locale: Locale) {
  const dict = getDictionary(locale);
  const isEnglish = locale === 'en';

  return {
    role: isEnglish ? member.role.en : member.role.es,
    bio: isEnglish ? member.bio.en : member.bio.es,
    formacion: isEnglish ? member.formacion.en : member.formacion.es,
    experiencia: isEnglish ? member.experiencia.en : member.experiencia.es,
    tags: isEnglish ? dict.team.jaime.tags : member.tags,
    seo: isEnglish
      ? {
          title: member.seoEn?.title ?? dict.pages.jaime.metaTitle,
          description: member.seoEn?.description ?? dict.pages.jaime.metaDescription,
          keywords: member.seoEn?.keywords ?? member.seo.keywords,
        }
      : member.seo,
  };
}
