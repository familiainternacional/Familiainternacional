import { getPrismaClient } from '../src/lib/db/prisma';
const prisma = getPrismaClient();

async function main() {
  console.log('Enabling Row Level Security (RLS) for all tables...');

  // Get all table names in the public schema
  const tables: { tablename: string }[] = await prisma.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public';
  `;

  for (const { tablename } of tables) {
    // Skip Prisma's internal migrations table
    if (tablename === '_prisma_migrations') continue;

    console.log(`Enabling RLS on table: ${tablename}`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "${tablename}" ENABLE ROW LEVEL SECURITY;`);
  }

  console.log('RLS has been successfully enabled on all application tables.');
  console.log('Since no policies are defined, this effectively denies all access via the Supabase Data API (anon key),');
  console.log('which perfectly secures the database against unauthorized access while allowing Prisma (admin) full access.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
