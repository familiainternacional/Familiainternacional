# Familia Internacional

Sitio web oficial de Familia Internacional, estudio jurídico chileno especializado en Derecho Internacional de Familia. Desarrollado con Next.js App Router.

## Desarrollo

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000` salvo que Next.js use otro puerto disponible.

## Comandos

```bash
npm run lint
npm run build
npm run ci:verify
```

## Variables principales

- `NEXT_PUBLIC_SITE_URL`: URL pública canónica del sitio, `https://www.familiainternacional.cl`.
- `APP_ORIGIN`: origen público usado por la aplicación, `https://www.familiainternacional.cl`.
- `AUTH_SECRET` o `NEXTAUTH_SECRET`: secreto para sesiones administrativas.
- `ADMIN_EMAIL`: correo del administrador inicial.
- `ADMIN_PASSWORD`: contraseña del administrador inicial.
- `DATABASE_URL`: conexión a PostgreSQL.
- `DIRECT_URL`: conexión directa para migraciones, cuando aplique.
- `SMTP_HOST`: servidor SMTP para notificaciones del formulario. Para Google Workspace usar `smtp.gmail.com`.
- `SMTP_PORT`: puerto SMTP. Para Gmail SMTP usar `465`.
- `SMTP_SECURE`: usar `true` con puerto `465`.
- `SMTP_USER`: correo emisor, por ejemplo `contacto@familiainternacional.cl`.
- `SMTP_PASSWORD`: app password o credencial SMTP del correo emisor. No usar una variable pública.
- `LEAD_NOTIFICATION_FROM`: remitente visible, por ejemplo `Familia Internacional <contacto@familiainternacional.cl>`.
- `LEAD_NOTIFICATION_TO`: destinatario interno del formulario, `contacto@familiainternacional.cl`.
- `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL`: URL pública de reservas con Google Calendar o Cal.com.

## Deploy en Vercel

- **Proyecto:** [jaime-soto-s-projects/familiainternacional](https://vercel.com/jaime-soto-s-projects/familiainternacional)
- **URL temporal:** `https://familiainternacional-jaime-soto-s-projects.vercel.app`
- **Rama de producción en Git:** `main`
