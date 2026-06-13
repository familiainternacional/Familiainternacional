import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/supabase/auth';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { SUPABASE_SITE_ASSET_BUCKET } from '@/lib/supabase/env';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export async function POST(request: Request) {
  await requireAdminSession();

  const formData = await request.formData();
  const file = formData.get('file');
  const directory = String(formData.get('directory') ?? 'admin').replace(/[^a-zA-Z0-9/_-]/g, '');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Archivo requerido.' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Tipo de archivo no permitido.' }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'El archivo supera 5 MB.' }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const safeName = sanitizeFileName(file.name);
  const path = `${directory}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(SUPABASE_SITE_ASSET_BUCKET)
    .upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type,
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
