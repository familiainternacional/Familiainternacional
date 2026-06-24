-- Enterprise CRM: asignación, área de práctica, soft-delete y auditoría admin.

ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "assignedToEmail" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "practiceArea" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "priority" TEXT NOT NULL DEFAULT 'normal';
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "contactedAt" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

CREATE INDEX IF NOT EXISTS "Lead_assignedToEmail_createdAt_idx" ON "Lead"("assignedToEmail", "createdAt");
CREATE INDEX IF NOT EXISTS "Lead_practiceArea_createdAt_idx" ON "Lead"("practiceArea", "createdAt");
CREATE INDEX IF NOT EXISTS "Lead_deletedAt_idx" ON "Lead"("deletedAt");

CREATE TABLE IF NOT EXISTS "AdminAuditLog" (
  "id" TEXT NOT NULL,
  "actorId" TEXT NOT NULL,
  "actorEmail" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AdminAuditLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "AdminAuditLog_entityType_entityId_createdAt_idx"
  ON "AdminAuditLog"("entityType", "entityId", "createdAt");
CREATE INDEX IF NOT EXISTS "AdminAuditLog_createdAt_idx" ON "AdminAuditLog"("createdAt");
CREATE INDEX IF NOT EXISTS "AdminAuditLog_actorEmail_createdAt_idx" ON "AdminAuditLog"("actorEmail", "createdAt");
