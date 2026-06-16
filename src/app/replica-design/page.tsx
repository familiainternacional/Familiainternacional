import type { Metadata } from 'next';
import Navbar from '@/components/home/Navbar';
import ReplicaHero from '@/components/ReplicaHero';
import { createPageMetadata, NOINDEX_ROBOTS } from '@/lib/seo/metadata';

export const metadata: Metadata = createPageMetadata({
  pathname: '/replica-design',
  title: 'Replica design',
  description: 'Vista interna de diseño.',
  robots: NOINDEX_ROBOTS,
});

export default function ReplicaDesignPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <ReplicaHero />
      </main>
    </>
  );
}
