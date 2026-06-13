'use server';

import type { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getPrismaClient } from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/supabase/auth';

function getOptionalString(formData: FormData, field: string) {
  const value = formData.get(field);
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getRequiredString(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function revalidateBlogSeoPaths(slugs: Array<string | null | undefined>) {
  revalidatePath('/perspectivas');
  revalidatePath('/perspectivas/[slug]', 'page');
  revalidatePath('/sitemap.xml');
  revalidatePath('/admin/blog');

  for (const slug of new Set(slugs.filter(Boolean))) {
    revalidatePath(`/perspectivas/${slug}`);
  }
}

export async function savePost(formData: FormData) {
  await requireAdminSession();

  const prisma = getPrismaClient();
  const id = getOptionalString(formData, 'id');
  const isDraft = formData.get('isDraft') === 'true';
  const slug = getRequiredString(formData, 'slug');

  const data: Prisma.BlogPostUncheckedCreateInput = {
    slug,
    titleEs: getRequiredString(formData, 'titleEs'),
    excerptEs: getOptionalString(formData, 'excerptEs'),
    contentEs: getRequiredString(formData, 'contentEs'),
    coverImage: getOptionalString(formData, 'coverImage'),
    authorName: getOptionalString(formData, 'authorName') ?? 'Familia Internacional',
    seoTitleEs: getOptionalString(formData, 'seoTitleEs'),
    seoDescriptionEs: getOptionalString(formData, 'seoDescriptionEs'),
    seoKeywords: getOptionalString(formData, 'seoKeywords'),
    published: !isDraft,
    publishedAt: !isDraft ? new Date() : null,
  };

  let previousSlug: string | null = null;

  if (id) {
    const existing = await prisma.blogPost.findUnique({
      where: { id },
      select: {
        slug: true,
        published: true,
      },
    });
    previousSlug = existing?.slug ?? null;

    const updateData: Prisma.BlogPostUncheckedUpdateInput = {
      ...data,
      publishedAt: existing?.published && !isDraft ? undefined : data.publishedAt,
    };

    await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });
  } else {
    await prisma.blogPost.create({
      data,
    });
  }

  revalidateBlogSeoPaths([previousSlug, slug]);

  redirect('/admin/blog');
}

export async function deletePost(id: string) {
  await requireAdminSession();
  const prisma = getPrismaClient();
  const post = await prisma.blogPost.findUnique({
    where: { id },
    select: {
      slug: true,
    },
  });

  await prisma.blogPost.delete({
    where: { id },
  });

  revalidateBlogSeoPaths([post?.slug]);
}
