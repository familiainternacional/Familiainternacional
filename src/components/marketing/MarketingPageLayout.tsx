import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import WhatsAppWidget from '@/components/home/WhatsAppWidget';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';

export default async function MarketingPageLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettingsAdminValues().catch(() => null);

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#07234c]">
      <Navbar adminValues={siteSettings} />
      <main className="flex-1">{children}</main>
      <WhatsAppWidget adminValues={siteSettings} />
      <Footer adminValues={siteSettings} />
    </div>
  );
}
