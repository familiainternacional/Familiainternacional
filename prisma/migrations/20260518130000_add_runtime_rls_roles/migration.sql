DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'rlu_public_runtime') THEN
    CREATE ROLE rlu_public_runtime NOLOGIN NOBYPASSRLS;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'rlu_auth_runtime') THEN
    CREATE ROLE rlu_auth_runtime NOLOGIN NOBYPASSRLS;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'rlu_admin_runtime') THEN
    CREATE ROLE rlu_admin_runtime NOLOGIN NOBYPASSRLS;
  END IF;

  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'postgres') THEN
    GRANT rlu_public_runtime TO postgres;
    GRANT rlu_auth_runtime TO postgres;
    GRANT rlu_admin_runtime TO postgres;
  END IF;
END $$;

GRANT USAGE ON SCHEMA public TO rlu_public_runtime, rlu_auth_runtime, rlu_admin_runtime;

GRANT SELECT ON TABLE public."Property" TO rlu_public_runtime;
GRANT INSERT ON TABLE public."Lead" TO rlu_public_runtime;
GRANT SELECT ("id") ON TABLE public."Lead" TO rlu_public_runtime;

GRANT SELECT ("id", "email", "password", "name", "role") ON TABLE public."User" TO rlu_auth_runtime;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public."Property", public."Lead" TO rlu_admin_runtime;

DROP POLICY IF EXISTS "public_runtime_read_published_property" ON public."Property";
CREATE POLICY "public_runtime_read_published_property"
  ON public."Property"
  FOR SELECT
  TO rlu_public_runtime
  USING ("published" = true);

DROP POLICY IF EXISTS "public_runtime_create_lead" ON public."Lead";
CREATE POLICY "public_runtime_create_lead"
  ON public."Lead"
  FOR INSERT
  TO rlu_public_runtime
  WITH CHECK (
    "propertyId" IS NULL
    OR EXISTS (
      SELECT 1
      FROM public."Property"
      WHERE public."Property"."id" = "propertyId"
        AND public."Property"."published" = true
    )
  );

DROP POLICY IF EXISTS "public_runtime_read_created_lead_id" ON public."Lead";
CREATE POLICY "public_runtime_read_created_lead_id"
  ON public."Lead"
  FOR SELECT
  TO rlu_public_runtime
  USING (true);

DROP POLICY IF EXISTS "auth_runtime_read_user" ON public."User";
CREATE POLICY "auth_runtime_read_user"
  ON public."User"
  FOR SELECT
  TO rlu_auth_runtime
  USING (true);

DROP POLICY IF EXISTS "admin_runtime_manage_property" ON public."Property";
CREATE POLICY "admin_runtime_manage_property"
  ON public."Property"
  FOR ALL
  TO rlu_admin_runtime
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_runtime_manage_lead" ON public."Lead";
CREATE POLICY "admin_runtime_manage_lead"
  ON public."Lead"
  FOR ALL
  TO rlu_admin_runtime
  USING (true)
  WITH CHECK (true);
