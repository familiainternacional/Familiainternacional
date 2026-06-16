/** Contenedor principal alineado con el hero y secciones de la home. */
export const SITE_CONTAINER_CLASS = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

/** Offset para anclas con header fijo. */
export const HOME_SECTION_ANCHOR_CLASS = 'scroll-mt-[8rem] sm:scroll-mt-[9rem]';

/** H2 unificado de secciones en la home. */
export const HOME_SECTION_TITLE_CLASS =
  'text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]';

export const HOME_SECTION_TITLE_MUTED_CLASS = `${HOME_SECTION_TITLE_CLASS} text-[#1a1a1a]`;

export const HOME_SECTION_TITLE_BRAND_CLASS = `${HOME_SECTION_TITLE_CLASS} text-[#07234c]`;

export const HOME_SECTION_TITLE_INVERSE_CLASS = `${HOME_SECTION_TITLE_CLASS} text-white`;

/** H3 de tarjetas y bloques destacados en la home. */
export const HOME_CARD_TITLE_CLASS =
  'text-xl font-bold leading-tight tracking-tight text-[#1a1a1a] sm:text-2xl';

/** H3 de pasos o subtítulos compactos en la home. */
export const HOME_STEP_TITLE_CLASS =
  'text-lg font-semibold leading-snug text-[#1a1a1a] sm:text-xl';

/** Esquinas totalmente redondeadas para tarjetas y contenedores tipo card. */
export const CARD_ROUNDED_CLASS = 'rounded-card';

/** Tarjeta promocional de la home (CTA, prensa destacada): mismo contenedor y proporciones. */
export const HOME_PROMO_CARD_SHELL_CLASS = `relative flex w-full flex-col items-center justify-between gap-8 overflow-hidden ${CARD_ROUNDED_CLASS} px-5 py-14 shadow-2xl sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:gap-12 lg:px-10 lg:py-20 xl:px-14 xl:py-24`;

/** Línea fina entre secciones en páginas slug (servicios, prensa, perspectivas). */
export const SLUG_PAGE_SECTION_DIVIDER_CLASS = 'border-t border-[#07234c]/10';

export const SLUG_PAGE_SECTION_SHELL_CLASS = 'bg-white text-[#07234c] px-5 md:px-12 lg:px-24';

export const SLUG_PAGE_SECTION_CLASS = `${SLUG_PAGE_SECTION_DIVIDER_CLASS} ${SLUG_PAGE_SECTION_SHELL_CLASS}`;

export const SLUG_PAGE_SECTION_DIVIDE_CLASS = 'divide-y divide-[#07234c]/10';

export const SLUG_PAGE_HERO_DIVIDER_CLASS = 'border-b border-[#07234c]/10';

/** Enlaces a páginas fuera de la home: visibles solo en desktop (footer en móvil). */
export const OFF_PAGE_LINK_DESKTOP_ONLY_CLASS = 'hidden lg:inline-flex';

/** Botón primario — azul del logo (#07234c). */
export const PRIMARY_BUTTON_CLASS = 'fi-btn-primary';

/** Botón primario grande (formularios y hero). */
export const PRIMARY_BUTTON_XL_CLASS =
  'fi-btn-primary inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl text-base font-semibold disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto';
