-- Supabase Storage setup for the public assets bucket.
-- No-op on generic Postgres (CI) where auth/storage schemas are unavailable.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.schemata
    WHERE schema_name = 'auth'
  ) OR NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'storage'
      AND table_name = 'buckets'
  ) THEN
    RAISE NOTICE 'Skipping rlu-assets storage setup: Supabase auth/storage schemas not found.';
    RETURN;
  END IF;

  INSERT INTO storage.buckets (
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
  )
  VALUES (
    'rlu-assets',
    'rlu-assets',
    true,
    5242880,
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
  )
  ON CONFLICT (id) DO UPDATE
  SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

  DROP POLICY IF EXISTS "rlu_admin_assets_select" ON storage.objects;
  DROP POLICY IF EXISTS "rlu_admin_assets_insert" ON storage.objects;
  DROP POLICY IF EXISTS "rlu_admin_assets_update" ON storage.objects;
  DROP POLICY IF EXISTS "rlu_admin_assets_delete" ON storage.objects;

  EXECUTE $policy$
    CREATE POLICY "rlu_admin_assets_select"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (
      bucket_id = 'rlu-assets'
      AND (
        auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
        OR COALESCE(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb) ? 'admin'
      )
    )
  $policy$;

  EXECUTE $policy$
    CREATE POLICY "rlu_admin_assets_insert"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'rlu-assets'
      AND (
        auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
        OR COALESCE(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb) ? 'admin'
      )
    )
  $policy$;

  EXECUTE $policy$
    CREATE POLICY "rlu_admin_assets_update"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'rlu-assets'
      AND (
        auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
        OR COALESCE(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb) ? 'admin'
      )
    )
    WITH CHECK (
      bucket_id = 'rlu-assets'
      AND (
        auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
        OR COALESCE(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb) ? 'admin'
      )
    )
  $policy$;

  EXECUTE $policy$
    CREATE POLICY "rlu_admin_assets_delete"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'rlu-assets'
      AND (
        auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
        OR COALESCE(auth.jwt() -> 'app_metadata' -> 'roles', '[]'::jsonb) ? 'admin'
      )
    )
  $policy$;
END $$;
