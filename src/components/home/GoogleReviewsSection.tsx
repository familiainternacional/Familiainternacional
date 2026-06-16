'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { googleBusinessProfile, googleReviews } from '@/config/google-reviews';
import { HOME_SECTION_TITLE_MUTED_CLASS, OFF_PAGE_LINK_DESKTOP_ONLY_CLASS } from '@/lib/layout';

type GoogleReviewsSectionProps = {
  /** Máximo de tarjetas visibles. Por defecto todas. */
  limit?: number;
  /** En home: enlace a página completa de reseñas. */
  showViewAllLink?: boolean;
  compact?: boolean;
};

function GoogleBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-neutral-500 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Google
    </span>
  );
}

function ReviewAuthorAvatar({
  name,
  photoUrl,
  initial,
}: {
  name: string;
  photoUrl?: string;
  initial: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!photoUrl || imageFailed) {
    return (
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-[#1c1c1c]"
        aria-hidden={!photoUrl}
      >
        {initial}
      </div>
    );
  }

  return (
    <Image
      src={photoUrl}
      alt={`Foto de perfil de ${name}`}
      width={40}
      height={40}
      loading="lazy"
      referrerPolicy="no-referrer"
      className="h-10 w-10 shrink-0 rounded-full border border-neutral-200 object-cover"
      onError={() => setImageFailed(true)}
    />
  );
}

export default function GoogleReviewsSection({
  limit,
  showViewAllLink = false,
  compact = false,
}: GoogleReviewsSectionProps) {
  const { locale } = useI18n();
  const isSpanish = locale === 'es';
  const reviews = limit ? googleReviews.slice(0, limit) : googleReviews;
  const { profileUrl, aggregateRating } = googleBusinessProfile;

  return (
    <section
      id="reseñas"
      aria-labelledby="google-reviews-title"
      className={`relative z-10 w-full bg-white ${compact ? 'py-16 sm:py-24' : 'py-20 sm:py-32'} font-sans`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-start">
        <div className="fi-section-header">
          <p className="fi-eyebrow text-[#07234c]">
            {isSpanish ? 'Reseñas verificadas' : 'Verified reviews'}
          </p>
          <h2 id="google-reviews-title" className={`max-w-4xl ${HOME_SECTION_TITLE_MUTED_CLASS}`}>
            {isSpanish
              ? 'Experiencias reales de familias que confiaron en nosotros'
              : 'Real experiences from families who trusted us'}
          </h2>
          <p className="fi-section-intro mt-4 flex flex-wrap items-center justify-start gap-3">
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#fbbc04] text-[#fbbc04]" aria-hidden />
              ))}
              <span className="ml-1 font-bold text-[#1c1c1c]">{aggregateRating.ratingValue.toFixed(1)}</span>
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-sm font-medium text-neutral-500">
              {isSpanish
                ? `${aggregateRating.reviewCount} reseñas en Google`
                : `${aggregateRating.reviewCount} Google reviews`}
            </span>
            <span className="text-neutral-400">·</span>
            <GoogleBadge />
          </p>
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${OFF_PAGE_LINK_DESKTOP_ONLY_CLASS} fi-link-action group mb-10 text-[#1c1c1c] transition-colors hover:text-black/70`}
        >
          {isSpanish ? 'Ver perfil en Google' : 'View Google profile'}
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-colors group-hover:bg-black/5">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </a>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-card border border-neutral-200/80 bg-white p-8 transition-shadow hover:shadow-xl hover:shadow-black/[0.03] lg:p-10"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <ReviewAuthorAvatar
                    name={review.author}
                    photoUrl={review.authorPhotoUrl}
                    initial={review.initial}
                  />
                  <GoogleBadge />
                </div>

                <p className="fi-card-title mb-1 text-[#1c1c1c]" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{review.author}</span>
                </p>

                <p className="fi-card-desc mb-6 text-neutral-600" itemProp="reviewBody">
                  {isSpanish ? review.text.es : review.text.en}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-100 pt-6">
                <div className="flex items-center gap-1" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content={String(review.rating)} />
                  <meta itemProp="bestRating" content="5" />
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#fbbc04] text-[#fbbc04]" aria-hidden />
                  ))}
                  <span className="ml-2 text-xs font-bold text-neutral-400">{review.rating.toFixed(1)}</span>
                </div>

                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${OFF_PAGE_LINK_DESKTOP_ONLY_CLASS} h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors hover:bg-neutral-50 hover:text-[#1c1c1c]`}
                  aria-label={isSpanish ? `Ver reseña de ${review.author} en Google` : `View ${review.author}'s review on Google`}
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>

        {showViewAllLink ? (
          <Link
            href="/reseñas"
            className={`${OFF_PAGE_LINK_DESKTOP_ONLY_CLASS} fi-link-action mt-10 text-[#07234c] hover:text-[#051830]`}
          >
            {isSpanish ? 'Ver página de reseñas' : 'View reviews page'}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
        </div>
      </div>
    </section>
  );
}
