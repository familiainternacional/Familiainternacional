import Link from 'next/link';
import { ArrowUpRight, Newspaper } from 'lucide-react';
import { getFeaturedPressMention } from '@/config/media-mentions';

export default function MediaHighlightHome() {
  const featured = getFeaturedPressMention();
  if (!featured) return null;

  return (
    <section aria-labelledby="press-highlight-title" className="relative z-10 w-full bg-[#f8fafc] px-5 py-16 md:px-12 md:py-20 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="fi-section-header mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:mb-10">
          <div>
            <p className="fi-eyebrow text-[#07234c]">En los medios</p>
            <h2 id="press-highlight-title" className="fi-section-heading max-w-xl text-[#1c1c1c]">
              Consultados por medios nacionales en casos de familia internacional
            </h2>
          </div>
          <Link
            href="/prensa"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#07234c]/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#07234c] transition-colors hover:bg-[#07234c] hover:text-white"
          >
            Ver toda la cobertura
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <article className="grid overflow-hidden rounded-card border border-neutral-200/80 bg-white md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {featured.thumbnail ? (
            <div className="relative min-h-[220px] bg-[#07234c] md:min-h-[280px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.thumbnail}
                alt={`Recorte de prensa: ${featured.title}`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          ) : null}

          <div className="flex flex-col justify-between p-6 md:p-8">
            <div>
              <div className="fi-card-meta mb-3 inline-flex items-center gap-2 text-[#07234c]">
                <Newspaper className="h-4 w-4" aria-hidden />
                {featured.source}
              </div>
              <h3 className="fi-card-title mb-3 text-[#1c1c1c]">{featured.title}</h3>
              <p className="fi-card-desc text-neutral-600">{featured.description}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {featured.detailPage ? (
                <Link
                  href={`/prensa/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#07234c] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#051830]"
                >
                  Leer análisis
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
              <Link
                href="/prensa"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-bold text-[#07234c] transition-colors hover:bg-neutral-50"
              >
                Más apariciones
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
