import type { Locale } from './config';
import { enBlogPosts } from '@/locales/en/blog-posts';

type BlogPostSource = {
  slug: string;
  titleEs: string;
  titleEn?: string | null;
  excerptEs?: string | null;
  excerptEn?: string | null;
  contentEs: string;
  contentEn?: string | null;
  seoTitleEs?: string | null;
  seoTitleEn?: string | null;
  seoDescriptionEs?: string | null;
  seoDescriptionEn?: string | null;
};

export type LocalizedBlogPost = {
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
};

export function getLocalizedBlogPost(post: BlogPostSource, locale: Locale): LocalizedBlogPost {
  const overlay = enBlogPosts[post.slug as keyof typeof enBlogPosts];

  if (locale === 'en') {
    const fallbackTitle = overlay && 'title' in overlay ? overlay.title : post.titleEs;
    const fallbackExcerpt = overlay && 'excerpt' in overlay ? overlay.excerpt : post.excerptEs ?? '';
    const fallbackContent = overlay && 'content' in overlay ? overlay.content : post.contentEs;
    const fallbackSeoTitle =
      overlay && 'seoTitle' in overlay ? overlay.seoTitle : fallbackTitle;

    return {
      title: post.titleEn ?? fallbackTitle,
      excerpt: post.excerptEn ?? fallbackExcerpt,
      content: post.contentEn ?? fallbackContent,
      seoTitle: post.seoTitleEn ?? fallbackSeoTitle,
      seoDescription:
        post.seoDescriptionEn ??
        (overlay && 'seoDescription' in overlay ? overlay.seoDescription : undefined) ??
        post.excerptEn ??
        fallbackExcerpt,
    };
  }

  return {
    title: post.titleEs,
    excerpt: post.excerptEs ?? '',
    content: post.contentEs,
    seoTitle: post.seoTitleEs ?? post.titleEs,
    seoDescription: post.seoDescriptionEs ?? post.excerptEs ?? '',
  };
}
