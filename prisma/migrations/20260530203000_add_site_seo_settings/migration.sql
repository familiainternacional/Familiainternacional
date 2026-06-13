CREATE TABLE IF NOT EXISTS public."SiteSeoSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "siteName" TEXT NOT NULL DEFAULT 'Ruiz Leiva Abogados',
    "titleTemplate" TEXT NOT NULL DEFAULT '%s | Ruiz Leiva Abogados',
    "defaultTitleEs" TEXT NOT NULL DEFAULT 'Ruiz Leiva Abogados | Asesoria juridica estrategica en Santiago',
    "defaultDescriptionEs" TEXT NOT NULL DEFAULT 'Asesoria juridica de alto estandar para empresas y empresarios en litigacion civil, derecho corporativo, derecho administrativo, compliance y resolucion de conflictos.',
    "defaultTitleEn" TEXT,
    "defaultDescriptionEn" TEXT,
    "keywords" TEXT NOT NULL DEFAULT '[]',
    "canonicalBaseUrl" TEXT NOT NULL DEFAULT 'https://rluabogados.cl',
    "defaultOgImage" TEXT,
    "googleSiteVerification" TEXT,
    "googleAnalyticsId" TEXT,
    "metaPixelId" TEXT,
    "allowIndexing" BOOLEAN NOT NULL DEFAULT true,
    "robotsDisallow" TEXT NOT NULL DEFAULT '["/admin/","/api/","/gracias"]',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SiteSeoSettings_pkey" PRIMARY KEY ("id")
);

INSERT INTO public."SiteSeoSettings" (
    "id",
    "siteName",
    "titleTemplate",
    "defaultTitleEs",
    "defaultDescriptionEs",
    "keywords",
    "canonicalBaseUrl",
    "robotsDisallow",
    "updatedAt"
)
VALUES (
    'main',
    'Ruiz Leiva Abogados',
    '%s | Ruiz Leiva Abogados',
    'Ruiz Leiva Abogados | Asesoria juridica estrategica en Santiago',
    'Asesoria juridica de alto estandar para empresas y empresarios en litigacion civil, derecho corporativo, derecho administrativo, compliance y resolucion de conflictos.',
    '["Ruiz Leiva Abogados","abogados en Santiago","abogados en Las Condes","asesoria juridica","derecho corporativo","litigacion civil","derecho administrativo","compliance","resolucion de conflictos"]',
    'https://rluabogados.cl',
    '["/admin/","/api/","/gracias"]',
    CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;

ALTER TABLE public."SiteSeoSettings" ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON TABLE public."SiteSeoSettings" TO rlu_public_runtime;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public."SiteSeoSettings" TO rlu_admin_runtime;

DROP POLICY IF EXISTS "public_runtime_read_site_seo_settings" ON public."SiteSeoSettings";
CREATE POLICY "public_runtime_read_site_seo_settings"
  ON public."SiteSeoSettings"
  FOR SELECT
  TO rlu_public_runtime
  USING (true);

DROP POLICY IF EXISTS "admin_runtime_manage_site_seo_settings" ON public."SiteSeoSettings";
CREATE POLICY "admin_runtime_manage_site_seo_settings"
  ON public."SiteSeoSettings"
  FOR ALL
  TO rlu_admin_runtime
  USING (true)
  WITH CHECK (true);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public."SiteSeoSettings" TO service_role;

    DROP POLICY IF EXISTS "service_role_full_access_site_seo_settings" ON public."SiteSeoSettings";
    CREATE POLICY "service_role_full_access_site_seo_settings"
      ON public."SiteSeoSettings"
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
