import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './server';

export type AdminClaims = {
  id: string;
  email: string;
  role: string;
};

type ClaimsWithMetadata = {
  sub?: string;
  email?: string;
  app_metadata?: {
    role?: string;
    roles?: string[];
  };
};

function asClaimsWithMetadata(claims: unknown): ClaimsWithMetadata | null {
  if (!claims || typeof claims !== 'object') {
    return null;
  }

  return claims as ClaimsWithMetadata;
}

function isNextDynamicServerError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    String(error.digest).includes('DYNAMIC_SERVER_USAGE')
  );
}

export function hasAdminRole(claims: unknown) {
  const appMetadata = asClaimsWithMetadata(claims)?.app_metadata;
  return appMetadata?.role === 'admin' || appMetadata?.roles?.includes('admin') === true;
}

export async function getAdminClaims(): Promise<AdminClaims | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims || !hasAdminRole(data.claims)) {
      return null;
    }

    const claims = asClaimsWithMetadata(data.claims);

    return {
      id: claims?.sub ?? '',
      email: claims?.email ?? '',
      role: 'admin',
    };
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error;
    }

    console.error('[admin] No se pudieron obtener claims de administrador.', error);
    return null;
  }
}

export async function requireAdminSession() {
  const admin = await getAdminClaims();

  if (!admin) {
    redirect('/admin/login');
  }

  return admin;
}
