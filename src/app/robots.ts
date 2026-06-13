import type { MetadataRoute } from 'next';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';

export const revalidate = 86400;

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getDefaultCanonicalBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
