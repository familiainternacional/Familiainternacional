import type { MetadataRoute } from 'next';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { fallbackBlogPosts } from '@/config/blog-fallback-posts';
import { serviceLandings } from '@/config/service-landings';
import { getPressDetailPages } from '@/config/media-mentions';
import { teamMembers } from '@/config/team';
import { getPrismaClient } from '@/lib/db/prisma';

export const revalidate = 86400;

async function getBlogSitemapEntries() {
  try {
    const prisma = getPrismaClient();
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: {
        slug: true,
        publishedAt: true,
        updatedAt: true,
      },
      orderBy: { publishedAt: 'desc' },
    });

    if (posts.length > 0) return posts;
  } catch (error) {
    console.error('Failed to load blog posts for sitemap:', error);
  }

  return fallbackBlogPosts.map((post) => ({
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.publishedAt,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getDefaultCanonicalBaseUrl();
  const lastModified = new Date();
  const blogPosts = await getBlogSitemapEntries();

  return [
    {
      url: `${siteUrl}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/prensa`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    ...getPressDetailPages().map((item) => ({
      url: `${siteUrl}/prensa/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...teamMembers.map((member) => ({
      url: `${siteUrl}/equipo/${member.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    })),
    {
      url: `${siteUrl}/nosotros`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/metodologia`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/preguntas-frecuentes`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${siteUrl}/reseñas`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.76,
    },
    {
      url: `${siteUrl}/contacto`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${siteUrl}/evalua-tu-caso`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${siteUrl}/servicios`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/perspectivas`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...serviceLandings.map((service) => ({
      url: `${siteUrl}/servicios/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/perspectivas/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
