import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { getMediaMentionBySlug, getPressDetailPages } from '@/config/media-mentions';
import { siteConfig } from '@/config/site';
import { buildPressArticleStructuredData } from '@/lib/seo/press-structured-data';
import { getSiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { buildLanguageAlternates, buildTwitterMetadata, NOINDEX_ROBOTS } from '@/lib/seo/metadata';
import { SLUG_PAGE_SECTION_DIVIDE_CLASS } from '@/lib/layout';
import { ArrowUpRight } from 'lucide-react';
import { getServerLocale } from '@/lib/i18n/server';
import { formatTranslation, getDictionary } from '@/lib/i18n/dictionaries';
import { getLocalizedMediaMention } from '@/lib/i18n/media-mention';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPressDetailPages().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const mention = getMediaMentionBySlug(slug);

  if (!mention?.detailPage) {
    return {
      title: dict.press.coverageNotFound,
      robots: NOINDEX_ROBOTS,
    };
  }

  const localized = getLocalizedMediaMention(mention, locale);
  const title = localized.seo?.title ?? localized.title;
  const description = localized.seo?.description ?? localized.description;
  const openGraphTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords: localized.seo?.keywords,
    alternates: buildLanguageAlternates(`/prensa/${mention.slug}`),
    openGraph: {
      title: openGraphTitle,
      description,
      url: `/prensa/${mention.slug}`,
      type: 'article',
      publishedTime: mention.date,
      locale: locale === 'en' ? 'en_US' : 'es_CL',
      alternateLocale: locale === 'en' ? ['es_CL'] : ['en_US'],
      siteName: siteConfig.name,
      images: mention.thumbnail ? [{ url: mention.thumbnail, alt: localized.title }] : undefined,
    },
    twitter: buildTwitterMetadata({
      title: openGraphTitle,
      description,
      images: mention.thumbnail ?? undefined,
    }),
  };
}

function formatMediaDate(date: string, locale: string) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function PrensaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const mention = getMediaMentionBySlug(slug);

  if (!mention?.detailPage) {
    notFound();
  }

  const localized = getLocalizedMediaMention(mention, locale);
  const bodyParagraphs = locale === 'en' ? localized.body?.en : localized.body?.es;
  const siteSettings = await getSiteSettingsAdminValues().catch(() => null);

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#07234c]">
      <JsonLd data={buildPressArticleStructuredData(localized)} />
      <Navbar adminValues={siteSettings} />

      <article className={`${SLUG_PAGE_SECTION_DIVIDE_CLASS} px-5 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40 lg:px-24`}>
        <div className="mx-auto max-w-4xl pb-10">
          <nav aria-label={dict.common.breadcrumb} className="mb-6 text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-[#07234c]">
                  {dict.common.home}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/prensa" className="transition-colors hover:text-[#07234c]">
                  {dict.common.press}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="line-clamp-1 font-semibold text-[#07234c]">{localized.source}</li>
            </ol>
          </nav>

          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#07234c]">
              <span>{localized.source}</span>
              <span className="text-neutral-300">·</span>
              <time dateTime={mention.date}>{formatMediaDate(mention.date, locale)}</time>
            </div>
            <h1 className="mb-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#07234c] md:text-5xl">
              {localized.title}
            </h1>
            <p className="text-lg leading-relaxed text-neutral-600">{localized.description}</p>
            {localized.topics?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {localized.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-[#07234c]/10 bg-[#07234c]/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#555555]"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            ) : null}
          </header>
        </div>

        {mention.thumbnail ? (
          <div className="mx-auto max-w-4xl py-10">
            <figure className="overflow-hidden rounded-card border border-neutral-200/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mention.thumbnail}
                alt={formatTranslation(locale, 'press.clippingAlt', { title: localized.title })}
                className="w-full object-cover object-top"
              />
              <figcaption className="border-t border-neutral-100 px-5 py-3 text-sm text-neutral-500">
                {formatTranslation(locale, 'press.clippingPublishedIn', { source: localized.source })}{' '}
                <a
                  href={mention.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#07234c] hover:underline"
                >
                  {dict.press.viewOriginal}
                </a>
              </figcaption>
            </figure>
          </div>
        ) : null}

        <div className="mx-auto max-w-4xl py-10">
          <div className="prose prose-lg max-w-none text-neutral-700">
            {bodyParagraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {mention.expertQuote ? (
          <div className="mx-auto max-w-4xl py-10">
            <blockquote className="rounded-card border border-[#07234c]/10 bg-[#07234c]/[0.03] px-6 py-6 md:px-8">
              <p className="text-xl italic leading-relaxed text-[#07234c]">
                “{locale === 'en' ? mention.expertQuote.en : mention.expertQuote.es}”
              </p>
              <footer className="mt-4 text-sm font-semibold text-neutral-600">
                {formatTranslation(locale, 'press.quotedBy', {
                  name: mention.expertName ?? 'Jaime Soto Silva',
                  source: localized.source,
                })}
              </footer>
            </blockquote>
          </div>
        ) : null}

        {localized.faqs?.length ? (
          <section aria-labelledby="press-faq-title" className="mx-auto max-w-4xl py-10">
            <h2 id="press-faq-title" className="mb-6 text-2xl font-bold text-[#07234c]">
              {dict.press.relatedFaq}
            </h2>
            <div className="space-y-4">
              {localized.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-card border border-neutral-200/80 bg-[#f8fafc] px-5 py-4 open:bg-white"
                >
                  <summary className="cursor-pointer list-none font-semibold text-[#07234c] marker:content-none">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mx-auto max-w-4xl py-10">
          <aside className="flex flex-col gap-4 rounded-card border border-[#07234c]/10 bg-white p-6 text-[#07234c] shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#07234c]/60">
                {dict.press.similarCaseEyebrow}
              </p>
              <p className="max-w-xl text-base leading-relaxed text-neutral-700">
                {dict.press.similarCaseBody}
              </p>
            </div>
            <Link
              href="/evalua-tu-caso"
              className="fi-btn-primary inline-flex shrink-0 items-center justify-center gap-2 px-5 py-3 text-sm font-bold"
            >
              {dict.common.evaluateCase}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </aside>

          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <a
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#07234c] hover:underline"
            >
              {formatTranslation(locale, 'press.originalNoteIn', { source: localized.source })}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href="/prensa" className="text-neutral-500 transition-colors hover:text-[#07234c]">
              {dict.press.backToPress}
            </Link>
          </div>
        </div>
      </article>

      <Footer adminValues={siteSettings} />
    </main>
  );
}
