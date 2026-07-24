import { NextResponse, type NextRequest } from 'next/server';
import { CANONICAL_BRAND_HOST } from '@/config/seo-url';

function getRequestHost(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-host');
  const host = (forwarded ?? request.headers.get('host') ?? '').split(',')[0]?.trim() ?? '';
  return host.split(':')[0]?.toLowerCase() ?? '';
}

function isVercelAppHost(host: string): boolean {
  return host === 'vercel.app' || host.endsWith('.vercel.app');
}

export function middleware(request: NextRequest) {
  const host = getRequestHost(request);

  if (!isVercelAppHost(host)) {
    return NextResponse.next();
  }

  // Production traffic on the Vercel subdomain must not compete with the brand domain in Google.
  if (process.env.VERCEL_ENV === 'production') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = 'https:';
    redirectUrl.hostname = CANONICAL_BRAND_HOST;
    redirectUrl.port = '';
    return NextResponse.redirect(redirectUrl, 308);
  }

  // Preview / non-production Vercel URLs remain usable for review, but must not be indexed.
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = {
  matcher: [
    /*
     * Run on all routes except static assets and Next internals.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
};
