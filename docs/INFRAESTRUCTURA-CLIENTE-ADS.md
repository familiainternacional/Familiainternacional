# Infraestructura del sitio — explicación para el cliente

**Para:** Dirección / quien contrata campañas Ads  
**Contexto:** Se quiere contratar un servicio o agencia de publicidad (Google Ads / Meta Ads).  
**Conclusión breve:** La agencia puede **gestionar anuncios y presupuesto**. Para medir conversiones con precisión y conectar el embudo al sitio, **hace falta desarrollo en el código** del sitio. Hoy el proyecto **no está listo** solo con “pegar un pixel” desde un panel de marketing.

---

## 1. Qué es este sitio (en simple)

Familia Internacional no es un WordPress ni un sitio “de plantilla” donde se instalan plugins de Ads con un clic.

Es una **aplicación web a medida**:

| Pieza | Qué es | Rol |
|-------|--------|-----|
| **Next.js** (frontend + APIs) | El sitio público y el panel admin | Páginas, formularios, landings `/asesoria/...` |
| **Vercel** | Hosting / despliegue | Publica cada cambio de código en producción |
| **PostgreSQL + Prisma** | Base de datos | Guarda cada lead (formulario) con datos de origen |
| **Supabase** | Auth + archivos | Login del admin e imágenes |
| **Cliengo** (opcional) | Chat / CRM externo | Conversaciones; sync parcial de leads |
| **Email SMTP** | Avisos internos | Notifica cuando llega un formulario |

Todo lo que ve el visitante y casi todo el tracking **sale del código desplegado**. No hay un “App Store” interno donde marketing instale GTM o Meta Pixel sin tocar el repositorio.

---

## 2. Cómo entra hoy un lead (y qué se mide)

```text
Anuncio (Google / Meta / etc.)
        ↓
Landing del sitio  (ej. /asesoria/divorcios-internacionales?utm_...)
        ↓
Formulario en esa página
        ↓
API del sitio → Base de datos (lead + UTMs si siguen en la URL)
        ↓
        ├── Panel admin (/admin/leads)  ← aquí sí se ve la atribución
        ├── Email interno               ← NO lleva UTMs
        └── Cliengo CRM (si está activo) ← casi no lleva UTMs
```

**Qué sí funciona hoy sin más desarrollo**

- Landings pensadas para Ads: `/asesoria/...`
- Parámetros UTM en la URL (`utm_source`, `utm_medium`, `utm_campaign`, etc.) **si el usuario envía el formulario sin cambiar de página**
- Revisión de leads y campañas en el **admin del sitio**
- Google Analytics 4 básico (ya embebido en el código)

**Qué no está listo para una agencia de Ads “completa”**

| Capacidad típica que pide una agencia | Estado en este proyecto |
|---------------------------------------|-------------------------|
| Google Tag Manager (GTM) | Variable prevista; **no está instalada en el sitio** |
| Meta Pixel / Conversion API | Variables previstas; **no están cableadas** |
| Click IDs (`gclid`, `fbclid`) guardados con el lead | **No implementado** |
| UTMs que “sigan” al usuario si navega a otra página | **No** (no hay first-touch / cookie) |
| Evento de conversión fiable “lead enviado” hacia Ads | Parcial / incompleto sin GTM o Pixel + desarrollo |
| Cambiar creatividades/copy fuerte de landings Ads | Requiere **código** (no solo el CMS) |

Por eso se dijo que **necesita desarrollar código**: no es burocracia; es que las piezas que la agencia asume “ya existen en el sitio” **aún no están construidas o no están conectadas**.

---

## 3. Por qué una agencia sola no alcanza

Una agencia de Ads normalmente entrega:

- Cuentas, campañas, creatividades, pujas, audiencias
- Un **ID de GTM**, un **Pixel de Meta**, o instrucciones de “pegue este script”

En este proyecto, “pegar el script” **no es un paso de admin**: hay que:

1. **Escribir/inyectar** el tag en el layout de Next.js (o cablear las variables de entorno que hoy no se usan)
2. **Desplegar** en Vercel
3. Opcionalmente **ampliar la base de datos** (p. ej. guardar `gclid`/`fbclid`)
4. Definir **eventos de conversión** (formulario enviado, clic a WhatsApp, etc.)
5. Probar que Google/Meta reciban la conversión y que el admin interno siga cuadrando

Sin ese trabajo, la agencia puede **gastar presupuesto**, pero ustedes **no tendrán atribución confiable** ni optimización por conversión real — solo clics e impresiones, o mediciones incompletas.

---

## 4. Diagrama de infraestructura (vista cliente)

```text
                    INTERNET
                        │
                        ▼
              ┌─────────────────────┐
              │  Vercel (hosting)   │
              │  Next.js producción │
              └──────────┬──────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   Páginas /        Formularios        Admin
   landings Ads     → API /api/leads   /admin
        │                │                │
        │                ▼                │
        │         PostgreSQL (leads) ◄────┘
        │                │
        │         ┌──────┴──────┐
        │         ▼             ▼
        │      Email SMTP    Cliengo
        │
        └── Hoy: GA4 en código
            Falta: GTM / Meta Pixel / click IDs
```

---

## 5. Qué se puede contratar por capas

### Capa A — Agencias de Ads (sin tocar código)

Pueden empezar **ya**, con limitaciones:

- Usar landings `/asesoria/...` con UTMs bien armados
- Optimizar por clics / mensajes, no por un embudo de conversión cerrado en Ads
- Revisar leads en `/admin/leads` y `/admin/analytics`

**Riesgo:** atribución incompleta; Google/Meta no “aprenden” bien de las conversiones reales.

### Capa B — Desarrollo (recomendado **antes o en paralelo** al contrato Ads serio)

Trabajo típico a pedir al desarrollador del sitio:

1. Instalar **Google Tag Manager** (o cablear el ID ya previsto)
2. Instalar **Meta Pixel** (+ Conversion API si aplica)
3. Evento de conversión **“lead enviado”** (y opcionalmente WhatsApp / agenda)
4. Guardar **`gclid` / `fbclid`** con cada lead
5. (Recomendado) **First-touch UTM** para que no se pierdan al navegar
6. Pasar UTMs/click IDs al email o a Cliengo si el equipo los necesita ahí

### Capa C — Operación continua

- Agencia: campañas y creatividades  
- Marketing interno: UTMs, CMS, revisión de leads  
- Desarrollo: cambios de landings, tags, mediciones nuevas  

---

## 6. Mensaje claro para la reunión con la agencia

Pueden usar este párrafo:

> El sitio de Familia Internacional es una aplicación Next.js a medida, alojada en Vercel, con leads en base de datos propia y panel admin. Ya existen landings de Ads y captura básica de UTMs al enviar el formulario. **No tenemos Google Tag Manager ni Meta Pixel activos en producción, ni captura de gclid/fbclid.** Para que su servicio de Ads mida y optimice conversiones de forma estándar, necesitamos un paquete de desarrollo en el sitio (tags + eventos + despliegue). La agencia no puede completar esa instalación solo desde su panel.

---

## 7. Orden sugerido de trabajo

1. **Definir** con la agencia qué plataformas (Google, Meta, ambas) y qué cuenta como conversión (formulario, llamada, WhatsApp, cita).
2. **Encargar desarrollo** del paquete de tracking (capa B).
3. **Probar** conversiones de punta a punta (anuncio → landing → form → admin + panel Ads).
4. **Recién entonces** escalar presupuesto de campañas.

Empezar a gastar fuerte en Ads **antes** del desarrollo es posible, pero implica **volar a ciegas** en optimización.

---

## 8. Documentos relacionados

- Operación día a día para marketing: [`MANUAL-TECNICO-MARKETING.md`](./MANUAL-TECNICO-MARKETING.md)
- SEO blog / Search Console: [`seo-search-console-blog.md`](./seo-search-console-blog.md)

---

**En una frase:** la agencia compra y opera el tráfico; el sitio necesita **código desplegado** para registrar y devolver las conversiones. Sin ese puente, contratar Ads no aprovecha la infraestructura que ya tienen (landings + CRM interno).
