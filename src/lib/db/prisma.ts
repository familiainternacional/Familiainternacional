import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import type { ConnectionOptions } from 'tls';
import { SUPABASE_PROD_CA_2021 } from '@/lib/db/supabase-ca';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to initialize Prisma.');
  }

  if (!databaseUrl.startsWith('postgresql://') && !databaseUrl.startsWith('postgres://')) {
    throw new Error('DATABASE_URL must be a PostgreSQL connection string. Use the Supabase Transaction Pooler URL for runtime.');
  }

  return databaseUrl;
}

function isSupabaseUrl(databaseUrl: string): boolean {
  return databaseUrl.includes('supabase.com');
}

function requiresSsl(databaseUrl: string): boolean {
  return process.env.NODE_ENV === 'production' || isSupabaseUrl(databaseUrl);
}

/**
 * Prefer the Supabase Root CA for verification.
 * Override with DATABASE_SSL_REJECT_UNAUTHORIZED=false only if a proxy breaks chain validation.
 */
function shouldRejectUnauthorized(databaseUrl: string): boolean {
  const raw = process.env.DATABASE_SSL_REJECT_UNAUTHORIZED?.trim().toLowerCase();
  if (raw === 'false' || raw === '0' || raw === 'no') {
    return false;
  }
  if (raw === 'true' || raw === '1' || raw === 'yes') {
    return true;
  }
  // Default: verify with Supabase CA when talking to Supabase / production.
  return requiresSsl(databaseUrl);
}

function resolveSslConfig(databaseUrl: string): boolean | ConnectionOptions | undefined {
  if (!requiresSsl(databaseUrl)) {
    return undefined;
  }

  const rejectUnauthorized = shouldRejectUnauthorized(databaseUrl);

  if (!rejectUnauthorized) {
    return { rejectUnauthorized: false };
  }

  return {
    rejectUnauthorized: true,
    // Use Supabase Root CA so Node trusts the pooler chain.
    ca: SUPABASE_PROD_CA_2021,
  };
}

function getPoolNumber(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function sanitizeDatabaseUrl(databaseUrl: string): string {
  try {
    const parsedUrl = new URL(databaseUrl);
    // SSL is configured explicitly on the Pool; strip conflicting URL flags.
    parsedUrl.searchParams.delete('sslaccept');
    parsedUrl.searchParams.delete('sslmode');
    parsedUrl.searchParams.delete('sslrootcert');
    return parsedUrl.toString();
  } catch (e) {
    console.error('Failed to parse DATABASE_URL with URL constructor, using raw string.', e);
    return databaseUrl;
  }
}

function createPrismaClient() {
  const dbUrl = getDatabaseUrl();
  const cleanConnectionString = sanitizeDatabaseUrl(dbUrl);

  const pool = new Pool({
    connectionString: cleanConnectionString,
    max: getPoolNumber('DATABASE_POOL_MAX', 3),
    idleTimeoutMillis: getPoolNumber('DATABASE_IDLE_TIMEOUT_MS', 10_000),
    connectionTimeoutMillis: getPoolNumber('DATABASE_CONNECTION_TIMEOUT_MS', 5_000),
    ssl: resolveSslConfig(dbUrl),
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
}
