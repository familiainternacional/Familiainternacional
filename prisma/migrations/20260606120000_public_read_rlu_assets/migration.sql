-- Public read access for site assets in Supabase Storage.
-- No-op on generic Postgres (CI) where storage.objects is unavailable.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'storage'
      AND table_name = 'objects'
  ) THEN
    RAISE NOTICE 'Skipping rlu_public_assets_read policy: storage.objects not found.';
    RETURN;
  END IF;

  DROP POLICY IF EXISTS "rlu_public_assets_read" ON storage.objects;

  EXECUTE $policy$
    CREATE POLICY "rlu_public_assets_read"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'rlu-assets')
  $policy$;
END $$;
