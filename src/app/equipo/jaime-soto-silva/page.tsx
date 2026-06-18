import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import JsonLd from '@/components/seo/JsonLd';
import PressCredibilityBanner from '@/components/home/PressCredibilityBanner';
import { getTeamMemberBySlug } from '@/config/team';
import { siteConfig } from '@/config/site';
import { resolveSiteAssetSrc } from '@/lib/storage/site-assets';
import { buildTeamMemberStructuredData } from '@/lib/seo/team-structured-data';
import { getSiteSettings } from '@/lib/cms/site-settings';
import { notFound } from 'next/navigation';
import { buildLanguageAlternates, buildTwitterMetadata } from '@/lib/seo/metadata';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getLocalizedTeamMember } from '@/lib/i18n/team-member';

const member = getTeamMemberBySlug('jaime-soto-silva');

export async function generateMetadata(): Promise<Metadata> {
  if (!member) {
    return {};
  }

  const locale = await getServerLocale();
  const localized = getLocalizedTeamMember(member, locale);
  const openGraphTitle = `${localized.seo.title} | ${siteConfig.name}`;

  return {
    title: localized.seo.title,
    description: localized.seo.description,
    keywords: localized.seo.keywords,
    alternates: buildLanguageAlternates(`/equipo/${member.slug}`),
    openGraph: {
      title: openGraphTitle,
      description: localized.seo.description,
      url: `/equipo/${member.slug}`,
      type: 'profile',
      locale: locale === 'en' ? 'en_US' : 'es_CL',
      alternateLocale: locale === 'en' ? ['es_CL'] : ['en_US'],
      siteName: siteConfig.name,
      images: [{ url: member.image, alt: member.imageAlt, width: 1200, height: 630 }],
    },
    twitter: buildTwitterMetadata({
      title: openGraphTitle,
      description: localized.seo.description,
      images: member.image,
    }),
  };
}

export default async function TeamMemberPage() {
  if (!member) notFound();

  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const page = dict.pages.jaime;
  const localized = getLocalizedTeamMember(member, locale);
  const siteSettings = await getSiteSettings().catch(() => null);

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#07234c]">
      <JsonLd data={buildTeamMemberStructuredData(member)} />
      <Navbar adminValues={siteSettings} />

      <article className="px-5 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label={dict.common.breadcrumb} className="mb-6 text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#07234c]">
                  {dict.common.home}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#about" className="hover:text-[#07234c]">
                  {dict.nav.about}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold text-[#07234c]">{member.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-[#07234c]/5 lg:sticky lg:top-32">
              <Image
                src={resolveSiteAssetSrc(member.image)}
                alt={member.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            </div>

            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#07234c]">
                {siteConfig.name}
              </p>
              <h1 className="mb-2 font-serif text-4xl font-semibold tracking-tight md:text-5xl">{member.name}</h1>
              <p className="mb-6 text-sm font-bold uppercase tracking-widest text-[var(--color-primary-mid)]">
                {localized.role}
              </p>

              <div className="mb-8 space-y-4 text-base leading-relaxed text-neutral-700">
                {localized.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>

              <div className="mb-8 flex flex-wrap gap-2">
                {localized.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#07234c]/10 bg-[#07234c]/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#555555]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-8">
                <PressCredibilityBanner variant="light" linkToPress showQuote />
              </div>

              <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold">{page.education}</h2>
                <ul className="list-disc space-y-2 pl-5 text-neutral-700">
                  {localized.formacion.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-xl font-bold">{page.experience}</h2>
                <ul className="list-disc space-y-2 pl-5 text-neutral-700">
                  {localized.experiencia.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/evalua-tu-caso"
                  className="inline-flex items-center gap-2 rounded-full bg-[#07234c] px-5 py-3 text-sm font-bold text-white hover:bg-[#051830]"
                >
                  {page.bookEvaluation}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#07234c]/15 px-5 py-3 text-sm font-bold text-[#07234c] hover:bg-[#07234c]/5"
                >
                  {member.email}
                </a>
                <Link href="/prensa" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-[#07234c]">
                  {page.viewPress}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer adminValues={siteSettings} />
    </main>
  );
}
