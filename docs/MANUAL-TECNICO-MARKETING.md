# Manual técnico — Campañas de marketing

**Sitio:** [https://www.familiainternacional.cl](https://www.familiainternacional.cl)  
**Panel admin:** [https://www.familiainternacional.cl/admin](https://www.familiainternacional.cl/admin)  
**Audiencia:** encargado de campañas (configuración operativa, atribución, landings y CMS)  
**Última revisión:** marzo 2026

---

## 1. Qué puedes hacer tú vs. qué pide desarrollo

| Puedes hacerlo tú (sin código) | Requiere desarrollo / DevOps |
|--------------------------------|------------------------------|
| Armar URLs de Ads con UTMs | Cambiar ID de Google Analytics |
| Usar landings `/asesoria/...` en campañas | Activar Google Tag Manager o Meta Pixel en el sitio |
| Editar hero, contacto, RRSS y SEO global en el admin | Capturar `gclid` / `fbclid` en leads |
| Publicar blog / perspectivas con meta SEO | Nueva landing Ads o cambio fuerte de copy en `/asesoria` |
| Revisar leads, filtros por origen y analytics CRM | Persistir UTMs si el usuario navega a otra página |
| Exportar CSV de leads | Incluir UTMs en el email de notificación o en Cliengo |
| Pedir cambio de email de avisos, URL de agenda o Cliengo | Variables de entorno en Vercel |

---

## 2. Acceso al panel

1. Entra a `/admin` e inicia sesión (cuenta Supabase autorizada).
2. Menú lateral relevante para marketing:

| Ruta | Para qué sirve |
|------|----------------|
| `/admin/editor` | CMS: hero, nosotros, servicios (listado), contacto, SEO, medios |
| `/admin/leads` | Bandeja de formularios + filtros + export CSV |
| `/admin/leads/[id]` | Detalle del lead + bloque **Atribución marketing** |
| `/admin/analytics` | Totales, distribución por origen y por `utm_campaign` |
| `/admin/blog` | Artículos de Perspectivas + SEO por pieza |
| `/admin/testimonios` | Testimonios |
| `/admin/media` | Biblioteca de imágenes |

> No publiques ni enlaces en campañas: `/admin`, `/api/*`, `/demo-ia`, `/replica-design`.

---

## 3. URLs que debes usar en campañas

**Dominio canónico:** `https://www.familiainternacional.cl`

### 3.1 Landings de Ads (recomendadas para paid)

Ruta base: `/asesoria/{slug}`

| URL | Origen interno del lead (`leadSource`) |
|-----|----------------------------------------|
| `/asesoria/familia-internacional` | `ads_asesoria_familia_internacional` |
| `/asesoria/divorcios-internacionales` | `ads_asesoria_divorcios-internacionales` |
| `/asesoria/exequatur` | `ads_asesoria_exequatur` |
| `/asesoria/cuidado-sustraccion` | `ads_asesoria_cuidado-sustraccion` |
| `/asesoria/autorizaciones-salida-pais` | `ads_asesoria_autorizaciones-salida-pais` |
| `/asesoria/filiacion-alimentos` | `ads_asesoria_filiacion-alimentos` |
| `/asesoria/herencias-internacionales` | `ads_asesoria_herencias-internacionales` |
| `/asesoria/tramites-consulares` | `ads_asesoria_tramites-consulares` |

- `/asesoria` redirige a `/asesoria/familia-internacional`.
- Estas landings **no están en el sitemap** (pensado para paid / no indexar como organico). Confirma con SEO si quieres cambiar esa política.

### 3.2 Landings SEO (orgánico)

| URL | Uso |
|-----|-----|
| `/servicios` | Índice de servicios |
| `/servicios/{slug}` | Misma lista de slugs que arriba (sin el prefijo ads) |

Úsalas en contenido orgánico, blog y Search Console. Para Google/Meta Ads, prioriza `/asesoria/...`.

### 3.3 Páginas de conversión generales

| URL | Origen del lead |
|-----|-----------------|
| `/` (formulario del hero) | `home_hero_form` |
| `/` o `/contacto` (sección contacto) | `home_contact_form` |
| `/evalua-tu-caso` | `evalua_tu_caso_form` (+ agenda si está configurada) |

### 3.4 Otras URLs útiles

`/nosotros`, `/metodologia`, `/preguntas-frecuentes`, `/reseñas`, `/prensa`, `/perspectivas`, `/perspectivas/{slug}`, `/equipo/jaime-soto-silva`

Sitemap: `https://www.familiainternacional.cl/sitemap.xml`

---

## 4. Cómo etiquetar campañas (UTMs)

El sitio guarda estos parámetros cuando alguien **envía el formulario con los UTMs todavía en la URL**:

| Parámetro en la URL | Campo guardado |
|---------------------|----------------|
| (página actual) | `landingPath` |
| `document.referrer` | `referrer` |
| `utm_source` | `utmSource` |
| `utm_medium` | `utmMedium` |
| `utm_campaign` | `utmCampaign` |
| `utm_content` | `utmContent` (se guarda; casi no se muestra en admin) |
| `utm_term` | `utmTerm` |

**No se capturan hoy:** `gclid` (Google Ads) ni `fbclid` (Meta). Si los necesitas en el CRM interno, hay que pedir desarrollo.

### Ejemplo de URL lista para Ads

```text
https://www.familiainternacional.cl/asesoria/divorcios-internacionales?utm_source=google&utm_medium=cpc&utm_campaign=divorcio_q2_2026&utm_content=ad_a&utm_term=divorcio+internacional
```

### Convención recomendada

- `utm_source`: `google` | `meta` | `linkedin` | `email` | `newsletter`
- `utm_medium`: `cpc` | `paid_social` | `organic_social` | `email`
- `utm_campaign`: nombre **estable** (aparece en `/admin/analytics`)
- `utm_content`: variante creativa / anuncio
- `utm_term`: keyword (solo search)

### Limitación crítica (léela antes de lanzar)

**No hay cookie ni first-touch.** Si el usuario llega con UTMs a `/asesoria/...` y luego navega a `/contacto` o `/evalua-tu-caso` **sin** esos parámetros, al enviar el form se pierden los UTMs.  
`landingPath` es la página **al momento del envío**, no necesariamente la primera visita.

**Buenas prácticas:**

1. Que el formulario de conversión esté **en la misma landing** donde aterriza el anuncio (`/asesoria/...`).
2. Si mandas a otra página, **replica los mismos UTMs** en el enlace.
3. Mantén `utm_campaign` consistente para poder comparar en Analytics CRM.

---

## 5. Checklist de lanzamiento de una campaña Ads

1. Elige landing: `/asesoria/{slug}` según el servicio.
2. Construye la URL con UTMs (sección 4).
3. Configura el anuncio con esa URL final (no acortes sin conservar query string).
4. Haz un lead de prueba desde la URL con UTMs.
5. En `/admin/leads`, verifica:
   - Origen ≈ `ads_asesoria_...`
   - Bloque **Atribución marketing** con source / medium / campaign
6. Revisa `/admin/analytics` (campaña en el top de `utmCampaign`).
7. Si Cliengo CRM está activo, confirma el contacto en el panel Cliengo (puede no traer UTMs; ver §7).

---

## 6. CMS: qué editar sin desarrollador

Entra a **`/admin/editor`**.

| Pestaña | Qué cambia en el sitio |
|---------|------------------------|
| **Inicio (Hero)** | Títulos y subtítulo del home |
| **Nosotros** | Intro y textos de abogados |
| **Servicios** | Títulos/descripciones del listado de servicios |
| **Ajustes y Contacto** | WhatsApp, teléfono, email, dirección, Instagram, Facebook, LinkedIn |
| **SEO** | Meta title, meta description e imagen OG por defecto |
| **Medios** | Subida de assets |

**Blog / Perspectivas** (`/admin/blog`): título, cuerpo, slug, `seoTitle`, `seoDescription`, keywords. Al publicar, la URL entra al sitemap automáticamente.

Guía SEO blog + Search Console: [`docs/seo-search-console-blog.md`](./seo-search-console-blog.md)

### Qué no se edita en el CMS (pide desarrollo)

- Copy y SEO de `/asesoria/{slug}` y de `/servicios/{slug}`
- Menú, FAQ, metodología, textos i18n
- Nuevos slugs de campaña
- Tags de analytics (GA / GTM / Pixel)

---

## 7. Qué pasa cuando alguien envía un formulario

Flujo interno (resumen):

1. Se crea el lead en la base de datos (con UTMs si venían en la URL).
2. Se envía un **email SMTP** a los destinatarios configurados (por defecto el correo de contacto del estudio).
3. Si hay API de Cliengo CRM, se crea/sincroniza el contacto.

| Canal | ¿Incluye UTMs? | ¿Incluye origen (`leadSource`)? |
|-------|----------------|----------------------------------|
| Admin → Leads | Sí | Sí |
| Export CSV | Parcial (source, medium, campaign, path, referrer; sin content/term) | Sí |
| Email de aviso | **No** | Texto genérico del formulario |
| Cliengo CRM | **No** (mensaje + origen + ID) | Sí |
| Chat Cliengo (widget) | Independiente; no escribe en la tabla de leads del sitio | — |

Para atribución de campañas **usa siempre el admin del sitio** (`/admin/leads` y `/admin/analytics`), no el email.

---

## 8. Analytics y etiquetas del sitio

| Herramienta | Estado actual | Quién lo gestiona |
|-------------|---------------|-------------------|
| **Google Analytics 4** | Activo (ID fijo en el código del sitio) | Desarrollo para cambiar ID |
| **Google Tag Manager** | Variable prevista en entorno; **aún no inyectada en el sitio** | Desarrollo + DevOps |
| **Meta Pixel / CAPI** | Variables previstas; **aún no cableadas** | Desarrollo + DevOps |
| **Google Search Console** | Verificación activa en el sitio | Marketing en el panel de GSC |
| **Cliengo chat** | Widget según configuración de entorno | DevOps / panel Cliengo |
| **Analytics CRM** | `/admin/analytics` (leads del sitio) | Marketing |

> Tener `NEXT_PUBLIC_GTM_ID` en un `.env` **no significa** que GTM esté corriendo. Hoy el tracking web público es GA4 embebido + lo que configures fuera del CMS.

Si necesitas eventos de conversión de Ads/Meta vía GTM o Pixel, coordínalo con desarrollo antes de optimizar campañas con ese supuesto.

---

## 9. Conversaciones y WhatsApp

- **WhatsApp / teléfono / email / RRSS:** editables en **Admin → Editor → Ajustes y Contacto**.
- **Agenda** en `/evalua-tu-caso`: URL de booking vía variable de entorno (`NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL`). Para cambiarla, pide a DevOps.
- Si el **chat Cliengo** está activo, el botón de WhatsApp del **navbar** puede ocultarse; en landings Ads el CTA secundario de WhatsApp suele seguir visible.

---

## 10. Cómo leer atribución en el día a día

1. `/admin/leads` → filtra por **origen** (`home_hero_form`, `ads_asesoria_...`, etc.).
2. Abre el lead → sección **Atribución marketing** (página, referrer, UTM source/medium/campaign/term).
3. `/admin/analytics` → mira volumen por origen y por campaña (`utm_campaign`).
4. Exporta CSV si necesitas cruzar con Google Ads / Meta Ads fuera del sitio.

Etiquetas legibles de algunos orígenes:

| Código | Etiqueta |
|--------|----------|
| `home_hero_form` | Home — formulario hero |
| `home_contact_form` | Home — sección contacto |
| `evalua_tu_caso_form` | Evalúa tu caso |
| `ads_asesoria_{slug}` | Landing Ads del servicio |

---

## 11. Qué pedir al equipo técnico (plantilla)

Copia y completa según necesites:

```text
Asunto: Cambio marketing — [campaña / tag / landing]

Necesito:
[ ] Activar / configurar GTM (ID: …)
[ ] Activar Meta Pixel (ID: …)
[ ] Cambiar destinatarios del email de leads
[ ] Cambiar URL de agenda / booking
[ ] Nueva landing /asesoria/... o cambio de copy
[ ] Captura de gclid/fbclid o first-touch UTM
[ ] Incluir UTMs en email o Cliengo
[ ] Otro: …

URLs de campaña:
…
Fecha de lanzamiento:
…
```

---

## 12. Advertencias (qué no hacer)

1. **No asumas** que GTM o Meta Pixel están activos solo porque existen en documentación de entorno.
2. **No dependas** de UTMs si el journey es landing → otra página sin query string.
3. **No pongas secretos** (API keys, contraseñas SMTP, service role) en creatividades, URLs ni el CMS.
4. **No uses** `/admin` ni demos internas como destino de Ads.
5. **No edites** “a ciegas” campos de analytics en base de datos: el SEO del CMS solo controla title / description / OG; no controla GA/Pixel.
6. Confirma números y WhatsApp reales de Familia Internacional en el editor (evita datos legacy de otras marcas).

---

## 13. Mapa rápido (referencia para ti y para desarrollo)

```text
Atribución UTM ........ captura al enviar el formulario (query de la URL actual)
Landings Ads .......... /asesoria/{slug}
Landings SEO .......... /servicios/{slug}
CMS visual ............ /admin/editor
Leads + atribución .... /admin/leads
Resumen campañas ...... /admin/analytics
Blog + SEO ............ /admin/blog → /perspectivas/{slug}
Sitemap ............... /sitemap.xml
```

Documentación relacionada:

- [`docs/seo-search-console-blog.md`](./seo-search-console-blog.md) — publicar blog y Search Console
- [`docs/landings-asesoria-aterrizaje.pdf`](./landings-asesoria-aterrizaje.pdf) — material de landings asesoría

---

## 14. Resumen en una frase

**Marketing configura URLs con UTMs (idealmente hacia `/asesoria/...`), contenido y contacto en `/admin`, y mide atribución en `/admin/leads` y `/admin/analytics`; tags Ads avanzados (GTM/Pixel/gclid) y nuevas landings piden desarrollo.**
