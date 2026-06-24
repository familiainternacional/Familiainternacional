'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { hasAdminRole } from '@/lib/supabase/auth';
import { enforceRateLimitByIdentifier, RATE_LIMITS } from '@/server/security/rate-limit';

export type LoginActionState = {
  error?: string;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function loginAdmin(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { error: 'Ingresa correo y contraseña.' };
  }

  const requestHeaders = await headers();
  const clientIp =
    requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    requestHeaders.get('x-real-ip') ||
    'unknown';

  const rateLimited = await enforceRateLimitByIdentifier(
    clientIp,
    RATE_LIMITS.auth,
    'admin-login',
    'Demasiados intentos de acceso. Espera unos minutos e intenta de nuevo.',
  );

  if (rateLimited) {
    return { error: rateLimited };
  }

  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;

  try {
    supabase = await createSupabaseServerClient();
  } catch (error: unknown) {
    console.error('[admin-login] Supabase no esta configurado.', error);
    console.error('[admin-login] Detalles de configuracion:', getErrorMessage(error));
    return { error: 'El acceso admin no esta configurado correctamente.' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: 'Credenciales inválidas.' };
  }

  const { data, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !hasAdminRole(data?.claims)) {
    await supabase.auth.signOut();
    return { error: 'Tu usuario no tiene permisos de administrador.' };
  }

  redirect('/admin/leads');
}
