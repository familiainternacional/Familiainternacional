'use client';

import Link from 'next/link';
import { ArrowUpRight, Newspaper, PlayCircle } from 'lucide-react';
import { getFeaturedPressMention, getPressHubItems, type MediaMention } from '@/config/media-mentions';
import MediaThumbnail from '@/components/media/MediaThumbnail';
import { useIsLgViewport } from '@/lib/hooks/use-is-lg-viewport';
import { OFF_PAGE_LINK_DESKTOP_ONLY_CLASS } from '@/lib/layout';

function formatMediaDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getItemHref(item: MediaMention) {
  return item.detailPage ? `/prensa/${item.slug}` : item.url;
}

function isExternalItem(item: MediaMention) {
  return !item.detailPage;
}

type PressListingProps = {
  showFeatured?: boolean;
  filterKind?: 'video' | 'press';
  limit?: number;
  offPageLinks?: 'default' | 'desktop-only';
};

function PressListingCard({
  item,
  linkEnabled,
}: {
  item: MediaMention;
  linkEnabled: boolean;
}) {
  const external = isExternalItem(item);
  const href = getItemHref(item);
  const cardClassName =
    'group flex flex-col overflow-hidden rounded-[2.5rem] border border-neutral-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07234c]';

  const cardContent = (
    <>
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-[#07234c]">
        {item.thumbnail ? (
          <MediaThumbnail
            src={item.thumbnail}
            alt={item.title}
            variant={item.kind === 'video' ? 'video' : 'press'}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-[#07234c] to-[#185365] opacity-90 transition-transform duration-500 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
        {item.kind === 'video' ? (
          <PlayCircle className="absolute h-12 w-12 text-white/90 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <Newspaper className="absolute h-12 w-12 text-white/90 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
        )}
      </div>

      <div className="flex flex-grow flex-col justify-between p-8 lg:p-10">
        <div>
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-[#07234c]">
            {item.source}
          </span>
          <h3 className="mb-3 text-xl font-bold leading-tight text-[#1c1c1c] transition-colors group-hover:text-[#07234c]">
            {item.title}
          </h3>
          <p className="mb-8 line-clamp-3 text-[15px] leading-relaxed text-neutral-600">{item.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-5">
          <span className="text-sm font-bold text-neutral-400 transition-colors group-hover:text-[#1c1c1c]">
            {external ? (item.kind === 'video' ? 'Ver video' : 'Ver cobertura') : 'Leer análisis'}
          </span>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-all group-hover:bg-neutral-50 group-hover:text-[#1c1c1c] ${linkEnabled ? '' : 'hidden lg:flex'}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </>
  );

  if (!linkEnabled) {
    return <article className={cardClassName}>{cardContent}</article>;
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClassName}>
      {cardContent}
    </Link>
  );
}

export default function PressListing({
  showFeatured = true,
  filterKind,
  limit,
  offPageLinks = 'default',
}: PressListingProps) {
  const isLg = useIsLgViewport();
  const linkEnabled = offPageLinks === 'default' || isLg;
  const featured = getFeaturedPressMention();
  let items = showFeatured && featured ? getPressHubItems().filter((item) => item.id !== featured.id) : getPressHubItems();

  if (filterKind) {
    items = items.filter((item) => item.kind === filterKind);
  }
  if (limit) {
    items = items.slice(0, limit);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col">
      {showFeatured && featured ? (
        <article className="mb-10 w-full overflow-hidden rounded-[2.5rem] border border-neutral-200/80 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="relative min-h-[260px] overflow-hidden bg-[#07234c] lg:min-h-[420px]">
              {featured.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.thumbnail}
                  alt={`Recorte de prensa: ${featured.title}`}
                  className="h-full w-full object-cover object-top"
                />
              ) : null}
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#07234c]">
                <Newspaper className="h-4 w-4" aria-hidden />
                Prensa destacada
              </div>
            </div>

            <div className="flex flex-col justify-between p-8 lg:p-10">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#07234c]">
                  <span>{featured.source}</span>
                  <span className="text-neutral-300">·</span>
                  <time dateTime={featured.date}>{formatMediaDate(featured.date)}</time>
                </div>
                <h2 className="mb-4 text-2xl font-bold leading-tight text-[#1c1c1c] lg:text-[1.75rem]">
                  {featured.title}
                </h2>
                <p className="mb-6 text-[15px] leading-relaxed text-neutral-600">{featured.description}</p>
                {featured.expertQuote ? (
                  <blockquote className="border-l-4 border-[#07234c]/20 pl-4 text-[15px] italic leading-relaxed text-neutral-700">
                    “{featured.expertQuote.es}”
                    <footer className="mt-2 not-italic text-sm font-semibold text-[#07234c]">
                      — {featured.expertName ?? 'Jaime Soto Silva'}
                    </footer>
                  </blockquote>
                ) : null}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {featured.detailPage ? (
                  <Link
                    href={`/prensa/${featured.slug}`}
                    className={`${offPageLinks === 'desktop-only' ? OFF_PAGE_LINK_DESKTOP_ONLY_CLASS : 'inline-flex'} items-center gap-2 rounded-full bg-[#07234c] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#051830]`}
                  >
                    Leer análisis completo
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${offPageLinks === 'desktop-only' ? OFF_PAGE_LINK_DESKTOP_ONLY_CLASS : 'inline-flex'} items-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm font-bold text-[#07234c] transition-colors hover:bg-[#07234c] hover:text-white`}
                >
                  Ver nota original
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </article>
      ) : null}

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <PressListingCard key={item.id} item={item} linkEnabled={linkEnabled} />
        ))}
      </div>
    </div>
  );
}
