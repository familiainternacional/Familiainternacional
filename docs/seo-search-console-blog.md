# Guia SEO para articulos del blog

Esta guia explica que ocurre cuando el cliente publica un articulo desde el panel de administracion y que pasos se pueden seguir en Google Search Console para acelerar la indexacion.

## Que queda automatizado

Cuando un articulo se guarda como publicado en el admin:

1. Se crea la URL publica del articulo: `https://www.rluabogados.cl/perspectivas/slug-del-articulo`.
2. La pagina genera automaticamente:
   - `title` SEO.
   - `meta description`.
   - canonical hacia la URL correcta con `www`.
   - Open Graph para compartir.
   - Twitter card.
   - JSON-LD tipo `BlogPosting`.
3. El articulo queda incluido automaticamente en `https://www.rluabogados.cl/sitemap.xml`.
4. Se revalidan las rutas necesarias:
   - `/perspectivas`
   - `/perspectivas/[slug]`
   - `/perspectivas/slug-del-articulo`
   - `/sitemap.xml`

Si el articulo queda como borrador, no deberia aparecer como pagina indexable ni en el sitemap.

## Checklist antes de publicar

Completar estos campos en el panel:

- Titulo del articulo: claro, especifico y con el tema legal principal.
- Slug: corto, en minusculas y sin caracteres especiales.
- Resumen: una descripcion breve del articulo.
- Contenido: texto completo en Markdown.
- Imagen de portada: URL valida de imagen.
- Meta titulo: idealmente 45 a 60 caracteres.
- Meta descripcion: idealmente 140 a 160 caracteres.
- Keywords: palabras separadas por coma, solo como apoyo interno.

## Proceso manual en Google Search Console

Despues de publicar un articulo importante:

1. Entrar a Google Search Console.
2. Seleccionar la propiedad `https://www.rluabogados.cl`.
3. Ir a "Inspeccion de URL".
4. Pegar la URL completa del articulo publicado.
5. Esperar el analisis de Google.
6. Presionar "Solicitar indexacion".
7. Revisar tambien que el sitemap este enviado:
   `https://www.rluabogados.cl/sitemap.xml`

Google puede tardar desde algunas horas hasta varios dias en indexar una pagina nueva. Solicitar indexacion ayuda, pero no garantiza indexacion inmediata.

## Mantenimiento recomendado

Se puede ofrecer un plan de mantenimiento SEO por `$50.000 pesos mensuales`, que incluya:

- Revision mensual de Search Console.
- Envio manual de nuevas URLs importantes.
- Revision de errores de cobertura e indexacion.
- Verificacion del sitemap.
- Ajustes basicos de meta titulos y meta descripciones.
- Reporte simple de estado: paginas indexadas, errores y recomendaciones.

Este plan es util cuando el cliente publica articulos de forma recurrente y quiere evitar que contenido nuevo quede sin revisar en Google.
