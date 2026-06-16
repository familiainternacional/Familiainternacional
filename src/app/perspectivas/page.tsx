import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPrismaClient } from '@/lib/db/prisma';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { fallbackBlogPosts } from '@/config/blog-fallback-posts';
import { perspectivasHubSeo } from '@/config/perspectivas-seo';
import { createPageMetadata } from '@/lib/seo/metadata';
import { buildPerspectivasHubStructuredData } from '@/lib/seo/perspectivas-structured-data';

export const metadata: Metadata = createPageMetadata({
  pathname: '/perspectivas',
  title: perspectivasHubSeo.title,
  description: perspectivasHubSeo.description,
  keywords: perspectivasHubSeo.keywords,
});

async function getPublishedPosts() {
  try {
    const prisma = getPrismaClient();

    return await prisma.blogPost.findMany({
      where: { published: true },
      select: {
        slug: true,
        titleEs: true,
        excerptEs: true,
        coverImage: true,
        publishedAt: true,
      },
      orderBy: { publishedAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return [];
  }
}

export default async function PerspectivasPage() {
  const dbPosts = await getPublishedPosts();
  const posts = dbPosts.length > 0 ? dbPosts : fallbackBlogPosts;
  const latestPost = posts[0];
  const olderPosts = posts.slice(1, 4);

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#07234c] selection:bg-[var(--color-primary)] selection:text-white">
      <JsonLd data={buildPerspectivasHubStructuredData(posts)} />
      <Navbar />

      <section id="articulos" className="flex-1 px-5 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex items-end justify-between md:mb-12">
            <h1 className="font-serif text-3xl tracking-tight text-[#07234c] md:text-4xl lg:text-h2">
              Perspectivas
            </h1>
            <span className="text-sm font-medium text-neutral-500">
              analisis legal
            </span>
          </div>

          <div className="grid grid-cols-1 gap-10 md:gap-14 lg:grid-cols-12">
            <div className="group flex cursor-pointer flex-col lg:col-span-7 xl:col-span-7">
              <Link href={`/perspectivas/${latestPost.slug}`} className="flex h-full flex-col">
                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-card bg-[#f8fafc] md:aspect-[16/10]">
                  {latestPost.coverImage && (
                    <Image
                      src={latestPost.coverImage}
                      alt={latestPost.titleEs}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-white/30 transition-colors duration-500 group-hover:bg-transparent" />
                </div>

                <div className="mt-auto grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                  <h2 className="text-xl font-bold leading-tight text-[#07234c] transition-colors group-hover:text-[#0d3566] md:text-2xl">
                    {latestPost.titleEs}
                  </h2>
                  <p className="line-clamp-4 text-sm leading-relaxed text-neutral-600 md:text-base">
                    {latestPost.excerptEs}
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-6 md:gap-8 lg:col-span-5 xl:col-span-5">
              {olderPosts.map((post) => (
                <Link
                  href={`/perspectivas/${post.slug}`}
                  key={post.slug}
                  className="group grid grid-cols-1 items-start gap-4 sm:grid-cols-[2fr_3fr] md:gap-6 lg:grid-cols-[1.5fr_2fr]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card bg-[#f8fafc] sm:aspect-[4/3]">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.titleEs}
                        fill
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-white/30 transition-colors duration-500 group-hover:bg-transparent" />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="mb-2 text-lg font-semibold leading-tight text-[#07234c] transition-colors group-hover:text-[#0d3566] md:mb-3 md:text-xl">
                      {post.titleEs}
                    </h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-neutral-600 md:text-sm">
                      {post.excerptEs}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
