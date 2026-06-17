-- Corrige metadatos SEO heredados del template Ruiz Leiva / RLU Abogados.
UPDATE public."SiteSeoSettings"
SET
  "siteName" = 'Familia Internacional',
  "titleTemplate" = '%s | Familia Internacional',
  "defaultTitleEs" = 'Familia Internacional | Estudio Jurídico de Derecho Internacional de Familia',
  "defaultDescriptionEs" = 'Primer estudio jurídico en Chile dedicado exclusivamente al Derecho Internacional de Familia: divorcios, sustracción de menores, exequátur, alimentos y más.',
  "canonicalBaseUrl" = 'https://www.familiainternacional.cl',
  "keywords" = '["Familia Internacional","derecho de familia internacional","abogados familia internacional Chile","divorcio extranjero","sustracción internacional de niños","Convenio de La Haya","exequátur sentencias extranjeras","abogados Lo Barnechea"]',
  "serviceAreas" = '["Santiago","Chile"]',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE
  "id" = 'main'
  AND (
    "siteName" ILIKE '%leiva%'
    OR "siteName" ILIKE '%rlu%'
    OR "defaultTitleEs" ILIKE '%leiva%'
    OR "defaultTitleEs" ILIKE '%rlu%'
    OR "titleTemplate" ILIKE '%leiva%'
    OR "titleTemplate" ILIKE '%rlu%'
    OR "keywords" ILIKE '%leiva%'
    OR "keywords" ILIKE '%rlu%'
    OR "canonicalBaseUrl" ILIKE '%rluabogados%'
    OR "defaultDescriptionEs" ILIKE '%asesoria juridica estrategica%'
  );
