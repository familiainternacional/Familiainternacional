import type { Prisma } from '@prisma/client';
import { getPrismaClient } from '@/lib/db/prisma';
import type { AdminClaims } from '@/lib/supabase/auth';
import type { AuditAction } from '@/lib/admin/audit-log-labels';

export type { AuditAction } from '@/lib/admin/audit-log-labels';

export async function writeAdminAuditLog(
  actor: AdminClaims,
  input: {
    action: AuditAction;
    entityType: string;
    entityId: string;
    metadata?: Record<string, unknown>;
  },
) {
  const prisma = getPrismaClient();

  await prisma.adminAuditLog.create({
    data: {
      actorId: actor.id,
      actorEmail: actor.email,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: (input.metadata ?? undefined) as Prisma.InputJsonValue | undefined,
    },
  });
}

export async function getEntityAuditLogs(entityType: string, entityId: string, limit = 50) {
  const prisma = getPrismaClient();

  return prisma.adminAuditLog.findMany({
    where: { entityType, entityId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}
