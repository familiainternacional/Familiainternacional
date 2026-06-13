import { fallbackBlogPosts } from '../src/config/blog-fallback-posts';
import { getPrismaClient } from '../src/lib/db/prisma';

type PrismaClientInstance = ReturnType<typeof getPrismaClient>;

function buildSeoTitle(title: string) {
  return `${title} | Familia Internacional`;
}

function buildSeoDescription(excerpt: string) {
  return excerpt.length > 155 ? `${excerpt.slice(0, 152).trim()}...` : excerpt;
}

async function main() {
  prisma = getPrismaClient();

  for (const post of fallbackBlogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        titleEs: post.titleEs,
        excerptEs: post.excerptEs,
        contentEs: post.contentEs,
        coverImage: post.coverImage,
        published: true,
        publishedAt: post.publishedAt,
        authorName: post.authorName,
        seoTitleEs: buildSeoTitle(post.titleEs),
        seoDescriptionEs: buildSeoDescription(post.excerptEs),
      },
      create: {
        slug: post.slug,
        titleEs: post.titleEs,
        excerptEs: post.excerptEs,
        contentEs: post.contentEs,
        coverImage: post.coverImage,
        published: true,
        publishedAt: post.publishedAt,
        authorName: post.authorName,
        seoTitleEs: buildSeoTitle(post.titleEs),
        seoDescriptionEs: buildSeoDescription(post.excerptEs),
      },
    });
  }

  console.log(`Seeded ${fallbackBlogPosts.length} informative blog posts.`);
}

let prisma: PrismaClientInstance | null = null;

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
  });
