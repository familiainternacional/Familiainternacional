import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { getSiteSettings } from '@/lib/cms/site-settings';

export default async function MarketingPageLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettings().catch(() => null);

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#07234c]">
      <Navbar adminValues={siteSettings} />
      <main className="flex-1">{children}</main>
      <Footer adminValues={siteSettings} />
    </div>
  );
}
