# Auditoría de seguridad — Familia Internacional

**Cliente:** Familia Internacional  
**Alcance:** sitio web institucional (Next.js)

## Resumen

Revisión orientada a riesgos habituales en sitios corporativos públicos: cabeceras HTTP, exposición de rutas admin, formularios y datos de contacto.

## Hallazgos relevantes

### Clickjacking (X-Frame-Options)

El sitio define `X-Frame-Options: DENY` en `vercel.json`, lo que impide que terceros embeban páginas en iframes.

Un atacante podría intentar incrustar el sitio de Familia Internacional dentro de un `<iframe>` transparente en una página fraudulenta. Con la cabecera configurada, los navegadores compatibles bloquean ese vector.

### Rutas administrativas

Las rutas bajo `/admin` deben permanecer protegidas por autenticación y no indexarse (`robots` / `X-Robots-Tag` donde corresponda).

### Formulario de contacto

Validar rate limiting en `/api/leads` y no exponer credenciales SMTP en el cliente.

## Recomendaciones

- Mantener dependencias actualizadas (`npm audit`).
- Rotar `AUTH_SECRET` y credenciales SMTP si hubo exposición.
- Revisar políticas RLS en Supabase para roles de runtime.
