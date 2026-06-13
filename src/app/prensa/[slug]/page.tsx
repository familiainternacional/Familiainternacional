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
import { ArrowUpRight } from 'lucide-react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPressDetailPages().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mention = getMediaMentionBySlug(slug);

  if (!mention?.detailPage) {
    return { title: 'Cobertura no encontrada' };
  }

  const title = mention.seo?.title ?? mention.title;
  const description = mention.seo?.description ?? mention.description;

  return {
    title,
    description,
    keywords: mention.seo?.keywords,
    alternates: {
      canonical: `/prensa/${mention.slug}`,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `/prensa/${mention.slug}`,
      type: 'article',
      publishedTime: mention.date,
      siteName: siteConfig.name,
      images: mention.thumbnail ? [{ url: mention.thumbnail, alt: mention.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: mention.thumbnail ? [mention.thumbnail] : undefined,
    },
  };
}

function formatMediaDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function PrensaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mention = getMediaMentionBySlug(slug);

  if (!mention?.detailPage) {
    notFound();
  }

  const siteSettings = await getSiteSettingsAdminValues().catch(() => null);

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#07234c]">
      <JsonLd data={buildPressArticleStructuredData(mention)} />
      <Navbar adminValues={siteSettings} />

      <article className="px-5 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-[#07234c]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/prensa" className="transition-colors hover:text-[#07234c]">
                  Prensa
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold text-[#07234c] line-clamp-1">{mention.source}</li>
            </ol>
          </nav>

          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#07234c]">
              <span>{mention.source}</span>
              <span className="text-neutral-300">·</span>
              <time dateTime={mention.date}>{formatMediaDate(mention.date)}</time>
            </div>
            <h1 className="mb-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#07234c] md:text-5xl">
              {mention.title}
            </h1>
            <p className="text-lg leading-relaxed text-neutral-600">{mention.description}</p>
            {mention.topics?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {mention.topics.map((topic) => (
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

          {mention.thumbnail ? (
            <figure className="mb-10 overflow-hidden rounded-[2rem] border border-neutral-200/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mention.thumbnail}
                alt={`Recorte de prensa publicado en ${mention.source}`}
                className="w-full object-cover object-top"
              />
              <figcaption className="border-t border-neutral-100 px-5 py-3 text-sm text-neutral-500">
                Recorte de {mention.source}.{' '}
                <a href={mention.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#07234c] hover:underline">
                  Ver nota original
                </a>
              </figcaption>
            </figure>
          ) : null}

          <div className="prose prose-lg max-w-none text-neutral-700">
            {mention.body?.es.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {mention.expertQuote ? (
            <blockquote className="my-10 rounded-[1.5rem] border border-[#07234c]/10 bg-[#07234c]/[0.03] px-6 py-6 md:px-8">
              <p className="text-xl italic leading-relaxed text-[#07234c]">“{mention.expertQuote.es}”</p>
              <footer className="mt-4 text-sm font-semibold text-neutral-600">
                — {mention.expertName ?? 'Jaime Soto Silva'}, consultado por {mention.source}
              </footer>
            </blockquote>
          ) : null}

          {mention.faqs?.length ? (
            <section aria-labelledby="press-faq-title" className="mt-14 border-t border-neutral-100 pt-10">
              <h2 id="press-faq-title" className="mb-6 text-2xl font-bold text-[#07234c]">
                Preguntas frecuentes
              </h2>
              <div className="space-y-4">
                {mention.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-2xl border border-neutral-200/80 bg-[#f8fafc] px-5 py-4 open:bg-white"
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

          <aside className="mt-14 flex flex-col gap-4 rounded-[2rem] border border-[#07234c]/10 bg-[#07234c] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/70">¿Tu familia enfrenta un caso similar?</p>
              <p className="max-w-xl text-base leading-relaxed text-white/90">
                Agenda una evaluación con abogados especializados en derecho de familia internacional.
              </p>
            </div>
            <Link
              href="/evalua-tu-caso"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#07234c] transition-colors hover:bg-white/90"
            >
              Evaluar mi caso
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </aside>

          <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
            <a
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#07234c] hover:underline"
            >
              Nota original en {mention.source}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href="/prensa" className="text-neutral-500 transition-colors hover:text-[#07234c]">
              ← Volver a prensa
            </Link>
          </div>
        </div>
      </article>

      <Footer adminValues={siteSettings} />
    </main>
  );
}
