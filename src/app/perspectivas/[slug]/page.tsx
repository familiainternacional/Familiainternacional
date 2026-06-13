import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPrismaClient } from '@/lib/db/prisma';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { fallbackBlogPosts, getFallbackBlogPost } from '@/config/blog-fallback-posts';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';

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
  if (!src) return `${siteUrl}/opengraph-image`;
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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.seoTitleEs ?? post.titleEs;
  const description = post.seoDescriptionEs ?? post.excerptEs ?? '';
  const image = post.ogImage ?? post.coverImage ?? '/opengraph-image';

  return {
    title,
    description,
    keywords: post.seoKeywords?.split(',').map((keyword) => keyword.trim()).filter(Boolean),
    alternates: {
      canonical: `/perspectivas/${post.slug}`,
    },
    openGraph: {
      title: `${title} | Ruiz Leiva Abogados`,
      description,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.authorName ?? 'Ruiz Leiva Abogados'],
      url: `/perspectivas/${post.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Ruiz Leiva Abogados`,
      description,
      images: [image],
    },
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
  const authorName = post.authorName ?? 'Ruiz Leiva Abogados';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/perspectivas/${post.slug}`,
    },
    headline: title,
    description,
    image,
    author: {
      '@type': 'Organization',
      name: authorName,
    },
    publisher: {
      '@type': 'LegalService',
      name: 'Ruiz Leiva Abogados',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo/logo-rlu.png`,
      },
    },
    datePublished: publishedAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    inLanguage: 'es-CL',
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white pb-24 pt-[120px]">
        <article className="container mx-auto max-w-4xl px-6">
          <Link
            href="/perspectivas"
            className="mb-8 inline-flex items-center text-sm font-semibold text-[var(--color-primary-dark)] transition-colors hover:text-brand"
          >
            Volver a perspectivas
          </Link>

          <h1 className="mb-6 font-serif text-h1 font-extrabold leading-tight tracking-tight text-[#051830]">
            {post.titleEs}
          </h1>

          <div className="mb-10 flex flex-wrap items-center gap-4 border-b border-gray-100 pb-8 text-sm font-medium text-[#767576]">
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

          {post.coverImage && (
            <div className="relative mb-12 h-[360px] w-full overflow-hidden rounded-2xl shadow-sm md:h-[500px]">
              <Image
                src={post.coverImage}
                alt={post.titleEs}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-[#333333] prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#051830] prose-a:text-brand prose-a:no-underline hover:prose-a:underline md:prose-xl">
            <ReactMarkdown>{post.contentEs}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
