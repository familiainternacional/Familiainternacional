import Link from 'next/link';
import { pressOutletNames } from '@/config/media-mentions';

type PressOutletStripProps = {
  locale?: 'es' | 'en';
  className?: string;
};

export default function PressOutletStrip({ locale = 'es', className = '' }: PressOutletStripProps) {
  const isEnglish = locale === 'en';

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] ${className}`}>
      <span className="opacity-70">{isEnglish ? 'As seen in' : 'Aparece en'}</span>
      {pressOutletNames.map((outlet) => (
        <Link
          key={outlet}
          href="/prensa"
          className="opacity-90 transition-opacity hover:opacity-100"
        >
          {outlet}
        </Link>
      ))}
    </div>
  );
}
