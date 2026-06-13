# Ruiz Leiva Abogados

Sitio web institucional de Ruiz Leiva Abogados, desarrollado con Next.js App Router.

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

- `NEXT_PUBLIC_SITE_URL`: URL pública canónica del sitio, `https://www.rluabogados.cl`.
- `APP_ORIGIN`: origen público usado por la aplicación, `https://www.rluabogados.cl`.
- `AUTH_SECRET` o `NEXTAUTH_SECRET`: secreto para sesiones administrativas.
- `ADMIN_EMAIL`: correo del administrador inicial.
- `ADMIN_PASSWORD`: contraseña del administrador inicial.
- `DATABASE_URL`: conexión a PostgreSQL.
- `DIRECT_URL`: conexión directa para migraciones, cuando aplique.
- `SMTP_HOST`: servidor SMTP para notificaciones del formulario. Para Google Workspace usar `smtp.gmail.com`.
- `SMTP_PORT`: puerto SMTP. Para Gmail SMTP usar `465`.
- `SMTP_SECURE`: usar `true` con puerto `465`.
- `SMTP_USER`: correo Google Workspace que enviara los avisos, por ejemplo `sleiva@rluabogados.cl`.
- `SMTP_PASSWORD`: app password o credencial SMTP del correo emisor. No usar una variable publica.
- `LEAD_NOTIFICATION_FROM`: remitente visible, por ejemplo `Ruiz Leiva Abogados <sleiva@rluabogados.cl>`.
- `LEAD_NOTIFICATION_TO`: destinatario interno del formulario, `contacto@rluabogados.cl`.
- `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL`: URL publica de reservas. Puede ser una pagina de reservas de Google Calendar o Cal.com, por ejemplo `https://cal.com/sebastian-leiva-gutierrez-unljsw`.

## SEO

El sitio usa metadata de Next.js, sitemap, robots, JSON-LD y landings por servicio bajo `/servicios/[slug]`.
