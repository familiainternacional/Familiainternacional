# Auditoría de Seguridad y Ciberdefensa 2026
**Cliente:** Ruiz Leiva Abogados
**Fecha:** Junio 2026
**Objetivo:** Identificar vulnerabilidades críticas y vectores de ataque modernos en la plataforma web (Next.js 15, Supabase, Prisma) que puedan impactar la operación, finanzas o reputación del estudio jurídico.

---

> [!CAUTION]
> **Vulnerabilidad Crítica Encontrada:** Bot Spam y *Denial of Wallet* (DoW) en el Formulario de Contacto. Requiere mitigación inmediata.

## 1. Ataque de "Denial of Wallet" y Exhaustión de Recursos (Severidad: ALTA)

**Descripción del Riesgo:**
He revisado el código fuente de tu formulario público (`src/components/forms/EvaluaTuCasoForm.tsx`) y el endpoint que lo procesa (`src/app/api/leads/route.ts`). Actualmente **no existe ninguna protección contra bots** (como Google reCAPTCHA v3 o Cloudflare Turnstile), ni **Rate Limiting** (límite de peticiones por IP).

**Vector de Ataque 2026:**
Un atacante (o un competidor malintencionado) puede usar un script básico para enviar **10.000 solicitudes falsas por minuto** al servidor. 
- **Efecto 1:** Tu base de datos en Supabase se llenará de "basura".
- **Efecto 2:** Tu proveedor de correos (Resend/SendGrid) detectará el envío masivo de notificaciones y **bloqueará tu dominio**, impidiendo que recibas correos legítimos de clientes reales.
- **Efecto 3:** Vercel te cobrará cientos de dólares por el exceso de invocaciones de "Serverless Functions" (fenómeno conocido como *Denial of Wallet*).

**Recomendación Inmediata:**
Implementar Google reCAPTCHA v3 (ya tienes las llaves en tu `.env`) e instalar `upstash/ratelimit` para bloquear IPs que envíen más de 3 solicitudes por minuto.

---

## 2. Clickjacking y Ausencia de Cabeceras de Seguridad (Severidad: MEDIA)

**Descripción del Riesgo:**
En las aplicaciones Next.js, por defecto no se configuran las cabeceras estrictas de seguridad (Security Headers). 

**Vector de Ataque 2026:**
Un atacante podría incrustar el sitio de "Ruiz Leiva Abogados" dentro de un `<iframe>` transparente en una página fraudulenta. Un usuario engañado creería estar interactuando con tu sitio, pero en realidad sus clics serían interceptados (Clickjacking), afectando la reputación del estudio.

**Recomendación:**
Configurar `headers()` en `next.config.js` inyectando directivas como `X-Frame-Options: DENY`, `Strict-Transport-Security` y un `Content-Security-Policy` básico.

---

## 3. Credential Stuffing en Panel de Administrador (Severidad: MEDIA-ALTA)

**Descripción del Riesgo:**
El panel de administración (`/admin/login`) está fuertemente protegido por Supabase Auth, lo cual evita inyecciones SQL (SQLi) gracias a que Prisma ORM escapa todas las variables. Sin embargo, no estás exento de ataques de fuerza bruta modernos.

**Vector de Ataque 2026:**
Redes de bots automatizadas utilizan diccionarios de contraseñas filtradas en la dark web (Credential Stuffing). Si algún administrador del estudio utiliza la misma contraseña para su correo y para el panel, podrían secuestrar el CMS del blog.

**Recomendación:**
Dado que manejas información legal (Bandeja de Casos) altamente confidencial, se recomienda activar obligatoriamente **Autenticación de Dos Factores (2FA)** o iniciar sesión vía *Magic Links* sin contraseña para los administradores.

---

## 4. Cross-Site Scripting (XSS) en Blog Markdown (Severidad: BAJA)

**Descripción del Riesgo:**
El nuevo CMS del blog permite escribir en Markdown. 

**Análisis de Seguridad:**
Afortunadamente, la librería `react-markdown` que instalamos hace unos momentos **sanitiza automáticamente** cualquier etiqueta HTML maliciosa como `<script>alert('hack')</script>`. Por lo tanto, estás protegido contra ataques XSS almacenados, a menos que en el futuro un desarrollador modifique el código y active la propiedad `rehypeRaw` sin precauciones. Esta es una excelente noticia.

---

### Conclusión Estratégica

La arquitectura subyacente (Next.js App Router + Prisma + Supabase) es de las más sólidas en el mercado y elimina el 90% de los ataques clásicos (como Inyecciones SQL o CSRF) de forma nativa. 

Sin embargo, **la falta de CAPTCHA y Rate Limiting en el formulario de contacto es una bomba de tiempo** que debe desactivarse antes de lanzar el sitio oficialmente o iniciar cualquier campaña de Google Ads, ya que los bots rastreadores lo encontrarán en cuestión de días.
