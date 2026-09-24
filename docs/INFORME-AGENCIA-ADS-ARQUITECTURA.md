# Informe técnico para agencia de Ads  
## Cómo está construido el sitio Familia Internacional

| | |
|---|---|
| **Sitio** | https://www.familiainternacional.cl |
| **Destinatario** | Agencia de publicidad / performance |
| **Objetivo** | Explicar la arquitectura del sitio y por qué la instalación de tracking de conversiones requiere desarrollo de código |
| **Fecha** | Marzo 2026 |

---

## 1. Resumen ejecutivo

El sitio de **Familia Internacional** es una **aplicación web a medida**, no un WordPress ni un CMS con plugins de marketing.

- **Stack:** Next.js (App Router) + hosting en Vercel + base de datos PostgreSQL + panel administrativo propio.
- **Ya existe:** landings orientadas a Ads, captura básica de UTMs al enviar formularios, Google Analytics 4 embebido, CRM interno de leads.
- **No existe aún en producción:** Google Tag Manager, Meta Pixel / Conversion API, ni captura de click IDs (`gclid`, `fbclid`).

Por tanto, una agencia **puede operar campañas** (cuentas, creatividades, pujas), pero **no puede completar por sí sola** la medición estándar de conversiones: eso exige **desarrollo en el repositorio y despliegue**.

---

## 2. Cómo está construido el sitio

### 2.1 Arquitectura

| Componente | Tecnología | Función |
|------------|------------|---------|
| Frontend y APIs | Next.js | Páginas públicas, landings, formularios, panel `/admin` |
| Hosting / CI | Vercel | Despliegue desde el repositorio Git (rama de producción `main`) |
| Leads | PostgreSQL (Prisma) | Persistencia de cada formulario con datos de origen |
| Auth y archivos | Supabase | Acceso al admin e imágenes |
| Chat / CRM externo | Cliengo (opcional) | Widget de chat; sync parcial de contactos |
| Avisos | Email SMTP | Notificación interna al recibir un lead |

No hay un panel tipo “instalar plugin de Google Ads / Meta”. Cualquier script de tracking se incorpora en el **código de la aplicación** y se publica con un **deploy**.

### 2.2 Flujo actual de un lead

```text
Anuncio (Google Ads / Meta / etc.)
        ↓
Landing del sitio  (ej. /asesoria/divorcios-internacionales?...utm_...)
        ↓
Usuario completa el formulario en esa página
        ↓
API del sitio (POST /api/leads)
        ↓
Base de datos (lead + UTMs si siguen en la URL)
        ├── Panel admin (/admin/leads)     → sí se ve atribución UTM
        ├── Email interno                 → no incluye UTMs
        └── Cliengo CRM (si está activo)  → casi no incluye UTMs
```

### 2.3 Landings disponibles para campañas

Ruta recomendada para paid:

`https://www.familiainternacional.cl/asesoria/{slug}`

Ejemplos de slugs: `familia-internacional`, `divorcios-internacionales`, `exequatur`, `cuidado-sustraccion`, `autorizaciones-salida-pais`, `filiacion-alimentos`, `herencias-internacionales`, `tramites-consulares`.

También existen landings SEO en `/servicios/{slug}` (uso orgánico; para Ads se prioriza `/asesoria/...`).

---

## 3. Qué medición existe hoy

| Capacidad | Estado |
|-----------|--------|
| Landings Ads (`/asesoria/...`) | Operativo |
| UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) | Se guardan **solo si** el formulario se envía con esos parámetros aún en la URL |
| Persistencia first-touch (cookie / storage) | **No implementado** |
| Google Analytics 4 | Activo (ID fijo en el código del sitio) |
| Google Tag Manager | Variable de entorno prevista; **no inyectado en el sitio** |
| Meta Pixel / CAPI | Variables previstas; **no cableadas** |
| `gclid` / `fbclid` en el lead | **No implementado** |
| Evento de conversión “lead enviado” hacia Ads | **Incompleto** sin GTM/Pixel + desarrollo |
| Revisión interna de leads / campañas | Operativo en `/admin/leads` y `/admin/analytics` |

### Limitación operativa importante

Si el usuario llega con UTMs a una landing y luego navega a otra página (por ejemplo `/contacto` o `/evalua-tu-caso`) **sin** llevar los parámetros en la URL, **se pierden** al enviar el formulario. No hay atribución first-touch.

---

## 4. Por qué se requiere desarrollo de código

Una agencia suele entregar un contenedor GTM, un Pixel ID o un snippet para “pegar en el sitio”.

En esta infraestructura eso implica:

1. Modificar el código (layout / componentes de tracking) o cablear variables de entorno que hoy **no se usan**.
2. Definir eventos de conversión (envío de formulario, y opcionalmente WhatsApp / agenda).
3. Desplegar en Vercel.
4. Validar punta a punta: anuncio → landing → conversión → panel Ads + admin interno.
5. (Recomendado) Extender el modelo de leads para `gclid`/`fbclid` y first-touch UTM.

**Sin ese trabajo**, la agencia puede generar tráfico, pero la optimización por conversión real quedará **ciega o incompleta**.

---

## 5. División de responsabilidades

| Actor | Puede hacer | No puede hacer solo |
|-------|-------------|---------------------|
| **Agencia de Ads** | Cuentas, campañas, creatividades, presupuestos, audiencias; proponer IDs de GTM/Pixel y definición de conversiones | Instalar tags en el código, desplegar Vercel, ampliar la base de datos de leads |
| **Desarrollo del sitio** | Implementar GTM/Pixel/CAPI, eventos, click IDs, first-touch, deploy y pruebas técnicas | Gestionar pujas y creatividades de la agencia |
| **Marketing del estudio** | UTMs en URLs, uso de landings, revisión de leads en admin, CMS de contenidos básicos | Activar GTM/Pixel sin desarrollo |

---

## 6. Alcance técnico recomendado (paquete mínimo)

Para que la agencia opere con medición estándar, se recomienda encargar al desarrollo:

1. Instalación de **Google Tag Manager** (o activación real del ID previsto).
2. Instalación de **Meta Pixel** y, si aplica, **Conversion API**.
3. Evento de conversión **“lead enviado”** (formulario → tag).
4. Captura y almacenamiento de **`gclid` / `fbclid`** junto al lead.
5. (Recomendado) **First-touch UTM** para no perder atribución al navegar.
6. Pruebas de conversión en Google Ads / Meta Events Manager.

Opcional posterior: incluir UTMs/click IDs en email interno y en Cliengo; nuevas landings o cambios fuertes de copy en `/asesoria` (también requieren código).

---

## 7. Conclusión

El sitio **sí está preparado** para recibir tráfico de Ads en landings dedicadas y para registrar leads con UTMs básicos en un CRM interno.

El sitio **no está preparado** para el stack de medición que una agencia de performance asume por defecto (GTM, Pixel, click IDs, eventos de conversión cerrados).

**Conclusión para la agencia:** pueden iniciar planificación y, con cuidado, campañas limitadas usando UTMs + landings `/asesoria/...`. Para medición y optimización profesional de conversiones, el estudio debe ejecutar un **paquete de desarrollo y despliegue** antes de escalar presupuesto.

---

## 8. Contacto técnico (referencia)

- Dominio canónico: `https://www.familiainternacional.cl`
- Sitemap: `https://www.familiainternacional.cl/sitemap.xml`
- Documentación interna relacionada:
  - `docs/MANUAL-TECNICO-MARKETING.md` (operación marketing)
  - `docs/INFRAESTRUCTURA-CLIENTE-ADS.md` (explicación para dirección)

---

*Documento informativo. No incluye secretos, claves API ni accesos al repositorio.*
