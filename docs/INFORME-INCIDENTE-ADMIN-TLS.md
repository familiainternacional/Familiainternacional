# Informe técnico: caída del panel admin

**Proyecto:** Familia Internacional  
**Fecha:** 24 de septiembre de 2026  
**Alcance:** Acceso al panel `/admin` en producción  
**Estado:** Mitigado (fix desplegado en `main`)

---

## 1. Resumen ejecutivo

El panel de administración mostraba el error *«No se pudo cargar el dashboard»* pese a que la sesión admin seguía activa. La causa **no** fue el cambio de layout de tracking (GTM/GA), sino una modificación de la configuración SSL de Prisma hacia Supabase **sin** el certificado CA correspondiente.

---

## 2. Síntoma observado

- **UI:** «No se pudo cargar el dashboard»
- **Mensaje de apoyo:** la sesión admin estaba activa, pero el panel no lograba consultar la base de datos
- **Detalle técnico:**
  ```
  Invalid `prisma.lead.count()` / `prisma.lead.findMany()` invocation:
  Error opening a TLS connection: self-signed certificate in certificate chain
  ```

Interpretación: autenticación/sesión OK; fallo en la capa de conexión TLS entre la app (Vercel) y PostgreSQL (Supabase pooler).

---

## 3. Qué se cambió en layout (campañas / tracking)

En `src/app/layout.tsx` se intervinieron componentes de medición:

- Inclusión / ajuste de **Google Tag Manager** (`GTM-PXTTJKZ`)
- Uso de **Google Analytics** (`G-GSG9KGPXX3`)
- Cambios de formato y, en algún momento, duplicación temporal de Analytics

**Impacto de estos cambios:** tracking y medición de campañas.  
**No explican** el error de TLS ni la imposibilidad de consultar leads en el admin.

---

## 4. Causa raíz real

En `src/lib/db/prisma.ts` se modificó la opción SSL del cliente `pg` / Prisma:

| Antes (operativo) | Después (roto) |
|---|---|
| `ssl: { rejectUnauthorized: false }` | `ssl: { rejectUnauthorized: true }` |

Con `rejectUnauthorized: true`, Node exige validar la cadena de certificados del pooler de Supabase. Sin el **Supabase Root CA 2021** (`prod-ca-2021.crt`), la validación falla con *self-signed certificate in certificate chain* y cualquier consulta Prisma del admin (`lead.count`, `lead.findMany`, etc.) queda bloqueada.

**Commit relevante (ejemplo):** `321ee28` — *Update prisma.ts* (cuenta `familiainternacional` / `jaimesotosilva@gmail.com`).

### Frase clave

> No fue el layout de ads; fue un cambio de SSL en Prisma sin el CA de Supabase. El layout solo tocaba tracking (GTM/GA).

---

## 5. Resolución aplicada

1. Incorporar el certificado **Supabase Root CA 2021** al repositorio (`certs/supabase-prod-ca-2021.crt`) y embeberlo en código (`src/lib/db/supabase-ca.ts`) para que Vercel lo incluya en el bundle.
2. Configurar Prisma/pg con TLS cifrado **y** verificación usando ese CA (`rejectUnauthorized: true` + `ca`).
3. Eliminar flags conflictivos de `DATABASE_URL` (`sslmode`, `sslaccept`, etc.) que podían interferir con la configuración explícita del `Pool`.
4. Corregir el typecheck de producción: `ConnectionOptions` se importa desde `tls` (Node), no desde `pg`.

### Commits de remediación (selección)

| Commit | Descripción |
|---|---|
| `8de324d` | Restaurar TLS compatible con Supabase (ajuste inicial) |
| `c5ec097` | Confiar en Supabase Root CA 2021 para Prisma TLS |
| `a44ddc3` | Importar `ConnectionOptions` desde `tls` (build TypeScript) |

---

## 6. Conclusiones

1. El fallo del admin fue de **conectividad TLS a la base de datos**, no de sesión ni de layout de marketing.
2. Los cambios de **GTM/GA en layout** son independientes del incidente de base de datos.
3. Activar verificación SSL estricta en producción **requiere** el CA de Supabase; sin él, el panel queda inutilizable aunque el login funcione.
4. Conviene separar responsabilidades: tracking de campañas no debería modificar `prisma.ts` ni variables críticas de BD sin revisión.

---

## 7. Recomendaciones

1. **Proteger** `src/lib/db/prisma.ts` y variables `DATABASE_*` (revisión obligatoria / CODEOWNERS).
2. **Documentar** en el runbook: “si se usa `rejectUnauthorized: true`, debe estar presente el CA de Supabase”.
3. **No mezclar** cambios de ads/tracking con cambios de infraestructura en el mismo PR sin revisión técnica.
4. Tras deploys de infra, validar smoke test: login admin + listado de leads.

---

## 8. Estado final

- Causa identificada y documentada  
- Fix en `main` con CA de Supabase  
- Tracking (GTM/GA) puede permanecer; no fue la causa del incidente  

---

*Informe generado a partir del diagnóstico técnico del incidente de producción del panel admin.*
