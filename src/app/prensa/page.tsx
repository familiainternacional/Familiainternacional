import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import PressListing from '@/components/press/PressListing';
import JsonLd from '@/components/seo/JsonLd';
import { pressHubSeo } from '@/config/media-mentions';
import { buildPressHubStructuredData } from '@/lib/seo/press-structured-data';
import { getSiteSettings } from '@/lib/cms/site-settings';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.prensa;

  return createPageMetadata({
    pathname: '/prensa',
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: pressHubSeo.keywords,
  });
}

export default async function PrensaPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.prensa;
  const siteSettings = await getSiteSettings().catch(() => null);

  return (
    <main className="flex min-h-screen flex-col bg-[#f8fafc] text-[#07234c]">
      <JsonLd data={buildPressHubStructuredData()} />
      <Navbar adminValues={siteSettings} />

      <section className="px-5 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-[#07234c]">
                  {dict.common.home}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold text-[#07234c]">{page.metaTitle}</li>
            </ol>
          </nav>

          <header className="mb-12 max-w-3xl md:mb-16">
            <h1 className="mb-5 font-serif text-3xl font-semibold tracking-tight text-[#07234c] md:text-5xl">
              {page.title}
            </h1>
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">{page.intro}</p>
          </header>

          <PressListing />
        </div>
      </section>

      <Footer adminValues={siteSettings} />
    </main>
  );
}
