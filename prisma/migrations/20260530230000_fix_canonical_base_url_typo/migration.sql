-- Corrige typo rluabogados -> rluabogados en URLs canónicas.

UPDATE "SiteSeoSettings"
SET "canonicalBaseUrl" = REPLACE("canonicalBaseUrl", 'rluabogados', 'rluabogados')
WHERE "canonicalBaseUrl" LIKE '%rluabogados%';

UPDATE "Property"
SET "customCanonical" = REPLACE("customCanonical", 'rluabogados', 'rluabogados')
WHERE "customCanonical" IS NOT NULL
  AND "customCanonical" LIKE '%rluabogados%';

UPDATE "StaticPage"
SET "customCanonical" = REPLACE("customCanonical", 'rluabogados', 'rluabogados')
WHERE "customCanonical" IS NOT NULL
  AND "customCanonical" LIKE '%rluabogados%';

ALTER TABLE "SiteSeoSettings"
  ALTER COLUMN "canonicalBaseUrl" SET DEFAULT 'https://rluabogados.vercel.app';
