'use server';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { SUPABASE_SITE_ASSET_BUCKET } from '@/lib/supabase/env';
import { requireAdminSession } from '@/lib/supabase/auth';

export type MediaFile = {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    size: number;
    mimetype: string;
  };
  publicUrl: string;
  path: string;
};

export async function listMediaFiles(directory = 'admin'): Promise<MediaFile[]> {
  await requireAdminSession();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.storage
    .from(SUPABASE_SITE_ASSET_BUCKET)
    .list(directory, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

  if (error) {
    console.error('Error listing media:', error);
    return [];
  }

  // Filter out the empty folder placeholder and map to include public URL
  return (data || [])
    .filter((file) => file.name !== '.emptyFolderPlaceholder')
    .map((file) => {
      const path = `${directory}/${file.name}`;
      const { data: urlData } = supabase.storage
        .from(SUPABASE_SITE_ASSET_BUCKET)
        .getPublicUrl(path);

      return {
        ...file,
        path,
        publicUrl: urlData.publicUrl,
      } as MediaFile;
    });
}

export async function deleteMediaFile(path: string): Promise<boolean> {
  await requireAdminSession();
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.storage
    .from(SUPABASE_SITE_ASSET_BUCKET)
    .remove([path]);

  if (error) {
    console.error('Error deleting media:', error);
    return false;
  }

  return true;
}
