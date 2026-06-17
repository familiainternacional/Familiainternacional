import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import LenisProvider from '@/components/providers/LenisProvider';
import HomeReturnScroll from '@/components/navigation/HomeReturnScroll';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { getServerCurrency, getServerLocale } from '@/lib/i18n/server';
import { siteConfig } from '@/config/site';
import { getDefaultCanonicalBaseUrl } from '@/config/seo-url';
import { GoogleAnalytics } from '@next/third-parties/google';
import CliengoWidget from '@/components/integrations/CliengoWidget';
import MobileTabBar from '@/components/home/MobileTabBar';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { getSiteSeoSettingsAdminValues } from '@/app/admin/seo/actions';
import { resolveSiteSeoDescription, resolveSiteSeoTitle } from '@/lib/seo/resolve-site-seo';
import {
  buildLanguageAlternates,
  buildTwitterMetadata,
  DEFAULT_OG_IMAGE_PATH,
  resolveOgImages,
} from '@/lib/seo/metadata';
import './globals.css';
import './fi-nav.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
});

const siteUrl = getDefaultCanonicalBaseUrl();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07234c',
};

export async function generateMetadata(): Promise<Metadata> {
  const seoSettings = await getSiteSeoSettingsAdminValues().catch(() => null);
  const seoTitle = resolveSiteSeoTitle(seoSettings?.defaultTitleEs);
  const defaultDescription = resolveSiteSeoDescription(seoSettings?.defaultDescriptionEs);
  const defaultOgImage = seoSettings?.defaultOgImage?.trim() || DEFAULT_OG_IMAGE_PATH;
  const ogImages = resolveOgImages(defaultOgImage);

  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteConfig.name,
    title: {
      default: siteConfig.metadata.documentTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: defaultDescription,
    keywords: [...siteConfig.metadata.keywords],
    authors: [{ name: 'Familia Internacional' }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: 'legal services',
    alternates: buildLanguageAlternates('/'),
    openGraph: {
      type: 'website',
      locale: 'es_CL',
      alternateLocale: ['en_US'],
      url: '/',
      siteName: siteConfig.name,
      title: seoTitle,
      description: defaultDescription,
      images: ogImages,
    },
    twitter: buildTwitterMetadata({
      title: seoTitle,
      description: defaultDescription,
      images: ogImages.map((image) => image.url),
    }),
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
      google: 'google6f1e67c1de24dba1',
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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteSettings, initialLocale, initialCurrency] = await Promise.all([
    getSiteSettingsAdminValues().catch(() => null),
    getServerLocale(),
    getServerCurrency(),
  ]);
  const fontVariables = montserrat.variable;

  return (
    <html lang={initialLocale} className={fontVariables} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider initialLocale={initialLocale} initialCurrency={initialCurrency}>
          <LenisProvider>
            <HomeReturnScroll />
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
