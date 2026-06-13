DO $$
DECLARE
  previous_brand TEXT := concat('R', 'L', 'U', ' Abogados');
  current_brand TEXT := 'Ruiz Leiva Abogados';
BEGIN
  IF to_regclass('public."SiteSeoSettings"') IS NULL THEN
    RETURN;
  END IF;

  UPDATE public."SiteSeoSettings"
  SET
    "siteName" = current_brand,
    "titleTemplate" = REPLACE("titleTemplate", previous_brand, current_brand),
    "defaultTitleEs" = REPLACE("defaultTitleEs", previous_brand, current_brand),
    "keywords" = REPLACE("keywords", previous_brand, current_brand),
    "canonicalBaseUrl" = 'https://www.rluabogados.cl',
    "updatedAt" = CURRENT_TIMESTAMP
  WHERE
    "siteName" = previous_brand
    OR "titleTemplate" LIKE '%' || previous_brand || '%'
    OR "defaultTitleEs" LIKE '%' || previous_brand || '%'
    OR "keywords" LIKE '%' || previous_brand || '%';
END $$;
