import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApiSession } from '@/lib/supabase/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { SUPABASE_SITE_ASSET_BUCKET } from '@/lib/supabase/env';
import { validateImageUpload } from '@/lib/security/validate-image';
import { enforceRateLimitFromRequest, RATE_LIMITS } from '@/server/security/rate-limit';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApiSession();
  if (auth instanceof NextResponse) {
    return auth;
  }

  const rateLimited = await enforceRateLimitFromRequest(request, {
    keyPrefix: 'uploads',
    ...RATE_LIMITS.uploads,
    identifier: auth.email || auth.id,
    message: 'Demasiadas cargas de archivos. Intenta nuevamente en unos minutos.',
  });

  if (rateLimited) {
    return rateLimited;
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const directory = String(formData.get('directory') ?? 'admin').replace(/[^a-zA-Z0-9/_-]/g, '');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Archivo requerido.' }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'El archivo supera 5 MB.' }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const validation = validateImageUpload(bytes, file.type);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const safeName = sanitizeFileName(file.name).replace(/\.[^.]+$/, '') + validation.extension;
  const path = `${directory}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(SUPABASE_SITE_ASSET_BUCKET)
    .upload(path, bytes, {
      cacheControl: '31536000',
      upsert: false,
      contentType: validation.mime,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(SUPABASE_SITE_ASSET_BUCKET).getPublicUrl(path);

  return NextResponse.json({
    path,
    publicUrl: data.publicUrl,
  });
}
