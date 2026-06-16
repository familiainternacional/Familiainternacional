import Link from 'next/link';
import { ArrowUpRight, Newspaper } from 'lucide-react';
import { getFeaturedPressMention } from '@/config/media-mentions';

type PressCredibilityBannerProps = {
  locale?: 'es' | 'en';
  variant?: 'light' | 'dark' | 'card';
  showQuote?: boolean;
  /** Enlaza a /prensa o al artículo destacado con página propia. */
  linkToPress?: boolean;
};

export default function PressCredibilityBanner({
  locale = 'es',
  variant = 'light',
  showQuote = false,
  linkToPress = false,
}: PressCredibilityBannerProps) {
  const mention = getFeaturedPressMention();
  if (!mention) return null;

  const isEnglish = locale === 'en';
  const href = linkToPress
    ? mention.detailPage
      ? `/prensa/${mention.slug}`
      : '/prensa'
    : mention.url;
  const quote = mention.expertQuote?.[locale];

  const shellClass =
    variant === 'dark'
      ? 'border-white/15 bg-white/5 text-white'
      : variant === 'card'
        ? 'border-[#07234c]/10 bg-white text-[#07234c] shadow-sm'
        : 'border-[#07234c]/10 bg-[#07234c]/[0.04] text-[#07234c]';

  const metaClass = variant === 'dark' ? 'text-white/70' : 'text-neutral-600';
  const quoteClass = variant === 'dark' ? 'text-white/85' : 'text-neutral-700';

  return (
    <aside className={`rounded-card border px-4 py-4 md:px-5 md:py-5 ${shellClass}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]">
            <Newspaper className="h-4 w-4 shrink-0" aria-hidden />
            {isEnglish ? 'Featured in the press' : 'Consultado en medios'}
          </div>
          <p className="text-sm font-semibold leading-snug md:text-[15px]">
            {isEnglish
              ? `${mention.source} consulted our team on international child abduction and the Hague Convention.`
              : `${mention.source} consultó a nuestro equipo sobre sustracción internacional de menores y el Convenio de La Haya.`}
          </p>
          {showQuote && quote ? (
            <blockquote className={`mt-3 border-l-2 border-current/20 pl-3 text-sm italic leading-relaxed ${quoteClass}`}>
              “{quote}”
            </blockquote>
          ) : null}
          <p className={`mt-2 text-xs ${metaClass}`}>
            {isEnglish ? 'Jaime Soto Silva · International family law' : 'Jaime Soto Silva · Derecho de familia internacional'}
          </p>
        </div>

        <Link
          href={href}
          target={linkToPress ? undefined : '_blank'}
          rel={linkToPress ? undefined : 'noopener noreferrer'}
          className={`inline-flex shrink-0 items-center gap-2 self-start rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
            variant === 'dark'
              ? 'border-white/20 text-white hover:bg-white/10'
              : 'border-[#07234c]/15 text-[#07234c] hover:bg-[#07234c] hover:text-white'
          }`}
        >
          {linkToPress
            ? isEnglish
              ? 'See press coverage'
              : 'Ver cobertura'
            : isEnglish
              ? 'Read in LUN'
              : 'Leer en LUN'}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
