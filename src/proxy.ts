import { NextResponse, type NextRequest } from 'next/server';
import { CANONICAL_BRAND_HOST } from '@/config/seo-url';
import { updateSupabaseSession } from '@/lib/supabase/proxy';

function getRequestHost(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-host');
  const host = (forwarded ?? request.headers.get('host') ?? '').split(',')[0]?.trim() ?? '';
  return host.split(':')[0]?.toLowerCase() ?? '';
}

function isVercelAppHost(host: string): boolean {
  return host === 'vercel.app' || host.endsWith('.vercel.app');
}

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
}

function applyVercelHostPolicy(request: NextRequest, response: NextResponse): NextResponse {
  const host = getRequestHost(request);

  if (!isVercelAppHost(host)) {
    return response;
  }

  // Production traffic on the Vercel subdomain must not compete with the brand domain in Google.
  if (process.env.VERCEL_ENV === 'production') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = 'https:';
    redirectUrl.hostname = CANONICAL_BRAND_HOST;
    redirectUrl.port = '';

    const redirectResponse = NextResponse.redirect(redirectUrl, 308);
    response.cookies.getAll().forEach(({ name, value }) => {
      redirectResponse.cookies.set(name, value);
    });
    return redirectResponse;
  }

  // Preview / non-production Vercel URLs remain usable for review, but must not be indexed.
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export async function proxy(request: NextRequest) {
  const response = isAdminRoute(request.nextUrl.pathname)
    ? await updateSupabaseSession(request)
    : NextResponse.next();

  return applyVercelHostPolicy(request, response);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
};
