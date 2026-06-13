import Navbar from '@/components/home/Navbar';
import ReplicaHero from '@/components/ReplicaHero';

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
