-- Campos CRM para leads: sync Cliengo, notas internas y seguimiento.
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "cliengoContactId" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "internalNotes" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE INDEX IF NOT EXISTS "Lead_leadSource_createdAt_idx" ON "Lead"("leadSource", "createdAt");
CREATE INDEX IF NOT EXISTS "Lead_cliengoContactId_idx" ON "Lead"("cliengoContactId");
