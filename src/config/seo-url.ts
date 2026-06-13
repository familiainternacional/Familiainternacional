/** Host canónico de marca. */
export const CANONICAL_BRAND_HOST = 'www.rluabogados.cl';

export function getDefaultCanonicalBaseUrl(): string {
  const raw = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.APP_ORIGIN,
    process.env.AUTH_URL,
    process.env.NEXTAUTH_URL,
    `https://${CANONICAL_BRAND_HOST}`,
  ].find((candidate) => {
    const value = candidate?.trim();
    return value && !isLocalCanonicalUrl(value);
  }) ?? `https://${CANONICAL_BRAND_HOST}`;

  return normalizeCanonicalBaseUrl(raw);
}

function isLocalCanonicalUrl(url: string): boolean {
  try {
    const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const parsed = new URL(withProtocol);
    return ['localhost', '127.0.0.1', '0.0.0.0'].includes(parsed.hostname);
  } catch {
    return false;
  }
}

/** Corrige typos conocidos y normaliza a origin sin barra final. */
export function normalizeCanonicalBaseUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return getDefaultCanonicalBaseUrl();

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(withProtocol);
    return parsed.origin;
  } catch {
    return getDefaultCanonicalBaseUrl();
  }
}

export function normalizeOptionalCanonicalUrl(
  url: string | null | undefined,
  baseUrl?: string,
): string | null {
  const trimmed = url?.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      const normalizedBase = normalizeCanonicalBaseUrl(parsed.origin);
      return `${normalizedBase}${parsed.pathname}${parsed.search}`.replace(/\/$/, '');
    } catch {
      return null;
    }
  }

  const base = normalizeCanonicalBaseUrl(baseUrl ?? getDefaultCanonicalBaseUrl());
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${base}${path}`;
}

export function buildCanonicalUrl(
  baseUrl: string,
  pathname: string,
  options?: { locale?: 'en' | 'es' },
): string {
  const base = normalizeCanonicalBaseUrl(baseUrl);
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const url = `${base}${path}`;
  return options?.locale === 'en' ? `${url}?lang=en` : url;
}
