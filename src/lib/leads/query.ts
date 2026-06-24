import type { Prisma } from '@prisma/client';

export const ACTIVE_LEADS_WHERE = {
  deletedAt: null,
} satisfies Prisma.LeadWhereInput;

export const ACTIVE_LEADS_ORDER = {
  createdAt: 'desc' as const,
};
