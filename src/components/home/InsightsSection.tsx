'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { fallbackBlogPosts } from '@/config/blog-fallback-posts';
import { HOME_SECTION_ANCHOR_CLASS, HOME_SECTION_TITLE_BRAND_CLASS } from '@/lib/layout';

export default function InsightsSection() {
  const formatMonthYear = (date: Date) => {
    const value = date.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const insights = fallbackBlogPosts.slice(0, 3).map((post) => ({
    id: post.slug,
    title: post.titleEs,
    excerpt: post.excerptEs,
    slug: post.slug,
    category: 'Familia internacional',
    date: formatMonthYear(post.publishedAt),
  }));

  return (
    <section id="perspectivas" className={`relative z-10 w-full bg-white px-5 py-16 md:px-12 md:py-24 lg:px-24 ${HOME_SECTION_ANCHOR_CLASS}`}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="fi-section-header flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="max-w-[34ch]">
            <span className="fi-eyebrow block text-[var(--color-primary)]">Perspectivas</span>
            <h2 className={HOME_SECTION_TITLE_BRAND_CLASS}>Conocimiento jurídico</h2>
          </div>

          <Link href="/perspectivas" className="fi-link-action mt-6 hidden text-[#333333] md:mt-0 md:inline-flex">
            Ver todos los artículos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => (
            <Link
              key={insight.id}
              href={`/perspectivas/${insight.slug}`}
              className="flex flex-col justify-between overflow-hidden rounded-card border border-[#07234c]/5 bg-white p-6 lg:p-8"
            >
              <div>
                <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="fi-card-meta inline-flex items-center gap-2 rounded-full border border-[#07234c]/5 bg-brand/[0.03] px-3 py-1.5 text-[#555555]">
                    <BookOpen className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                    {insight.category}
                  </span>
                  <span className="text-small font-semibold text-gray-400">{insight.date}</span>
                </div>
                <h3 className="fi-card-title mb-3 text-[#07234c]">{insight.title}</h3>
                <p className="fi-card-desc">{insight.excerpt}</p>
              </div>

              <div className="mt-8 flex items-center font-bold text-[#07234c]">
                <span className="text-small">Leer artículo</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <Link href="/perspectivas" className="fi-link-action mt-10 text-[#333333] md:hidden">
          Ver todos los artículos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
