import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import LenisProvider from '@/components/providers/LenisProvider';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { GoogleAnalytics } from '@next/third-parties/google';
import CliengoWidget from '@/components/integrations/CliengoWidget';
import MobileTabBar from '@/components/home/MobileTabBar';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import './globals.css';
import './fi-nav.css';

const fontSans = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
});

const fontAdmin = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
});

const fontSerif = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
});

const siteUrl = getDefaultCanonicalBaseUrl();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07234c',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.metadata.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.metadata.description,
  keywords: [...siteConfig.metadata.keywords],
  authors: [{ name: 'Familia Internacional' }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'legal services',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    alternateLocale: ['en_US'],
    url: '/',
    siteName: siteConfig.name,
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Familia Internacional - Estudio Jurídico de Derecho Internacional de Familia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'google6f1e67c1de24dba1.html',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'geo.region': 'CL-RM',
    'geo.placename': 'Las Condes, Santiago',
    'geo.position': '-33.41628375;-70.5920947147805',
    ICBM: '-33.41628375, -70.5920947147805',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVariables = `${fontSans.variable} ${fontAdmin.variable} ${fontSerif.variable}`;
  const siteSettings = await getSiteSettingsAdminValues().catch(() => null);

  return (
    <html lang="es" className={fontVariables} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider>
          <LenisProvider>
            {children}
            <MobileTabBar whatsappNumber={siteSettings?.whatsappNumber} />
          </LenisProvider>
        </I18nProvider>
        <GoogleAnalytics gaId="G-GSG9KGPXX3" />
        <CliengoWidget />
      </body>
    </html>
  );
}
