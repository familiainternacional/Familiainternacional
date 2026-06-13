import Link from 'next/link';

type Breadcrumb = {
  label: string;
  href?: string;
};

type InnerPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: Breadcrumb[];
  dark?: boolean;
};

export default function InnerPageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  dark = false,
}: InnerPageHeroProps) {
  return (
    <header
      className={`px-5 pb-12 pt-32 md:px-12 md:pb-16 md:pt-40 lg:px-24 ${
        dark ? 'bg-[#07234c] text-white' : 'border-b border-[#07234c]/5 bg-white text-[#07234c]'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>/</span> : null}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={`transition-colors ${dark ? 'hover:text-white' : 'hover:text-[#07234c]'}`}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={`font-semibold ${dark ? 'text-white' : 'text-[#07234c]'}`}>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className={`fi-eyebrow ${dark ? 'text-white/70' : 'text-[var(--color-primary)]'}`}>{eyebrow}</p>
        <h1 className="fi-section-heading mt-0 max-w-3xl">{title}</h1>
        <p className={`fi-section-intro mt-5 max-w-2xl ${dark ? 'text-white/75' : ''}`}>{description}</p>
      </div>
    </header>
  );
}
