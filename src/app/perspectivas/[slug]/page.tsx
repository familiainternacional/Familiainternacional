import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPrismaClient } from '@/lib/db/prisma';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { getRelatedServicesForBlogPost } from '@/config/blog-service-links';
import { fallbackBlogPosts, getFallbackBlogPost } from '@/config/blog-fallback-posts';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { siteConfig } from '@/config/site';
import {
  buildLanguageAlternates,
  buildTwitterMetadata,
  DEFAULT_OG_IMAGE_PATH,
  NOINDEX_ROBOTS,
} from '@/lib/seo/metadata';
import { SLUG_PAGE_SECTION_DIVIDE_CLASS } from '@/lib/layout';
import { buildPerspectivasArticleStructuredData } from '@/lib/seo/perspectivas-structured-data';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type BlogPostView = {
  slug: string;
  titleEs: string;
  excerptEs: string | null;
  contentEs: string;
  coverImage: string | null;
  publishedAt: Date | null;
  updatedAt?: Date | null;
  seoTitleEs?: string | null;
  seoDescriptionEs?: string | null;
  seoKeywords?: string | null;
  ogImage?: string | null;
  authorName?: string | null;
};

const siteUrl = getDefaultCanonicalBaseUrl();

function toAbsoluteUrl(src: string | null | undefined) {
  if (!src) return `${siteUrl}${DEFAULT_OG_IMAGE_PATH}`;
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteUrl}${src.startsWith('/') ? src : `/${src}`}`;
}

async function getPublishedPost(slug: string): Promise<BlogPostView | null> {
  try {
    const prisma = getPrismaClient();
    const post = await prisma.blogPost.findFirst({
      where: {
        slug,
        published: true,
      },
    });

    if (post) return post;
  } catch (error) {
    console.error(`Failed to load blog post "${slug}":`, error);
  }

  return getFallbackBlogPost(slug);
}

export async function generateStaticParams() {
  try {
    const prisma = getPrismaClient();
    const dbPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });

    const slugs = new Set([
      ...fallbackBlogPosts.map((post) => post.slug),
      ...dbPosts.map((post) => post.slug),
    ]);

    return [...slugs].map((slug) => ({ slug }));
  } catch (error) {
    console.error('Failed to load blog static params:', error);
    return fallbackBlogPosts.map((post) => ({ slug: post.slug }));
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return {
      title: 'Articulo no encontrado',
      robots: NOINDEX_ROBOTS,
    };
  }

  const title = post.seoTitleEs ?? post.titleEs;
  const description = post.seoDescriptionEs ?? post.excerptEs ?? '';
  const image = post.ogImage ?? post.coverImage ?? DEFAULT_OG_IMAGE_PATH;
  const openGraphTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords: post.seoKeywords?.split(',').map((keyword) => keyword.trim()).filter(Boolean),
    alternates: buildLanguageAlternates(`/perspectivas/${post.slug}`),
    openGraph: {
      title: openGraphTitle,
      description,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.authorName ?? 'Familia Internacional'],
      url: `/perspectivas/${post.slug}`,
      locale: 'es_CL',
      alternateLocale: ['en_US'],
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: buildTwitterMetadata({
      title: openGraphTitle,
      description,
      images: image,
    }),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const title = post.seoTitleEs ?? post.titleEs;
  const description = post.seoDescriptionEs ?? post.excerptEs ?? '';
  const image = toAbsoluteUrl(post.ogImage ?? post.coverImage);
  const publishedAt = post.publishedAt ?? new Date();
  const updatedAt = post.updatedAt ?? publishedAt;
  const authorName = post.authorName ?? 'Familia Internacional';
  const relatedServices = getRelatedServicesForBlogPost(slug);

  return (
    <>
      <JsonLd
        data={buildPerspectivasArticleStructuredData({
          slug: post.slug,
          title,
          description,
          image,
          publishedAt,
          updatedAt,
          authorName,
        })}
      />
      <Navbar />
      <main className="min-h-screen bg-white pb-24 pt-[120px]">
        <article className={`container mx-auto max-w-4xl ${SLUG_PAGE_SECTION_DIVIDE_CLASS} px-6`}>
          <div className="pb-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#07234c]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/perspectivas" className="hover:text-[#07234c]">
                  Perspectivas
                </Link>
              </li>
            </ol>
          </nav>

          <Link
            href="/perspectivas"
            className="mb-8 inline-flex items-center text-sm font-semibold text-[var(--color-primary-dark)] transition-colors hover:text-brand"
          >
            Volver a perspectivas
          </Link>

          <h1 className="mb-6 font-serif text-h1 font-extrabold leading-tight tracking-tight text-[#051830]">
            {post.titleEs}
          </h1>

          <div className="flex flex-wrap items-center gap-4 pb-2 text-sm font-medium text-[#767576]">
            <span>{authorName}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={publishedAt.toISOString()}>
              {new Intl.DateTimeFormat('es-CL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).format(publishedAt)}
            </time>
          </div>
          </div>

          {post.coverImage && (
            <div className="py-10">
            <div className="relative h-[360px] w-full overflow-hidden rounded-card shadow-sm md:h-[500px]">
              <Image
                src={post.coverImage}
                alt={post.titleEs}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            </div>
          )}

          <div className="py-10">
          <div className="prose prose-lg max-w-none text-[#333333] prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#051830] prose-a:text-brand prose-a:no-underline hover:prose-a:underline md:prose-xl">
            <ReactMarkdown>{post.contentEs}</ReactMarkdown>
          </div>
          </div>

          {relatedServices.length > 0 ? (
            <section aria-labelledby="related-services-title" className="py-10">
              <h2 id="related-services-title" className="mb-5 text-2xl font-bold tracking-tight text-[#07234c]">
                Servicios relacionados
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="rounded-card border border-[#07234c]/10 bg-[#f8fafc] p-5 transition-colors hover:border-[#07234c]/25 hover:bg-white"
                  >
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#07234c]/70">
                      {service.eyebrow}
                    </p>
                    <h3 className="text-lg font-bold leading-tight text-[#07234c]">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{service.shortTitle}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}
