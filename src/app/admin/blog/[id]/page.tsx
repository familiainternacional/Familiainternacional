import { notFound } from 'next/navigation';
import { getPrismaClient } from '@/lib/db/prisma';
import BlogEditor from '../BlogEditor';

export const dynamic = 'force-dynamic';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const prisma = getPrismaClient();
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id }
  });

  if (!post) {
    notFound();
  }

  return <BlogEditor post={post} />;
}
