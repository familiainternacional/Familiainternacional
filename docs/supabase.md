# Supabase setup

This project can use Supabase Postgres through Prisma for administrative data such as leads and site settings.

## Environment Variables

Use two database URLs:

- `DATABASE_URL`: runtime URL for Next.js/Vercel functions. Prefer the Supabase Transaction Pooler.
- `DIRECT_URL`: migration URL for Prisma CLI. Prefer direct connection or Session Pooler.

Recommended local flow:

```bash
cp .env.supabase.example .env.local
npm run db:generate
npm run db:validate
```

## Vercel Variables

Add these in Vercel Project Settings when deploying:

- `DATABASE_URL`
- `DIRECT_URL`
- `DATABASE_POOL_MAX`
- `DATABASE_IDLE_TIMEOUT_MS`
- `DATABASE_CONNECTION_TIMEOUT_MS`
- `AUTH_SECRET`
- `AUTH_URL`
- `AUTH_TRUST_HOST`
- `APP_ORIGIN`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Prisma

```bash
npm run db:generate
npm run db:validate
npm run db:migrate
npm run db:migrate:deploy
```

Keep `DATABASE_POOL_MAX` low for serverless deployments. Supabase already pools connections, and Vercel can create several function instances.
