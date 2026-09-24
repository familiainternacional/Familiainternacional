# Demo IA Jurídica - Prototipo para Estudios Legales

Este prototipo demuestra las capacidades de inteligencia artificial que podemos integrar en sistemas de gestión para estudios jurídicos.

## Características

### 1. Resumen de Documentos Legales
- Analiza documentos legales (contratos, demandas, sentencias, etc.)
- Genera resúmenes ejecutivos con puntos clave
- Identifica plazos, fechas importantes y partes involucradas
- Clasifica por área legal automáticamente
- Proporciona recomendaciones y próximos pasos

### 2. Clasificación de Expedientes
- Clasifica casos por área legal (civil, penal, laboral, comercial, familia)
- Determina nivel de urgencia (baja, media, alta)
- Identifica tipo de caso específico
- Genera etiquetas relevantes automáticamente
- Facilita la organización y priorización de casos

## Tecnologías

- **NVIDIA NIM APIs**: Servicios de IA gratuitos para desarrollo
- **Modelos**: Llama 3.1 405B y otros modelos optimizados por NVIDIA
- **Next.js 16**: Framework React moderno
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS**: Estilos modernos y responsivos

## Configuración

### 1. Obtener API Key de NVIDIA

1. Ve a [https://build.nvidia.com/settings](https://build.nvidia.com/settings)
2. Crea una cuenta o inicia sesión
3. Genera una API key gratuita (sin tarjeta de crédito requerida)
4. Copia tu API key

### 2. Configurar Variables de Entorno

Agrega tu API key al archivo `.env.local`:

```env
NVIDIA_API_KEY=tu_api_key_aqui
```

### 3. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

### 4. Acceder a la Demo

Abre tu navegador en: `http://localhost:3000/demo-ia`

## Uso

### Resumen de Documentos

1. Ve a la pestaña "Resumen de Documentos"
2. Opcionalmente, especifica el tipo de documento
3. Pega el texto del documento legal
4. Haz clic en "Generar Resumen"
5. La IA analizará el documento y generará un resumen ejecutivo

**Tip**: Usa el botón "Cargar Ejemplo" para ver cómo funciona con un contrato de arrendamiento de ejemplo.

### Clasificación de Casos

1. Ve a la pestaña "Clasificación de Casos"
2. Describe el caso legal (antecedentes, partes, situación)
3. Haz clic en "Clasificar Caso"
4. La IA clasificará el caso por área, urgencia y tipo

**Tip**: Usa el botón "Cargar Ejemplo" para ver cómo funciona con un caso laboral de ejemplo.

## Arquitectura

```
src/
├── lib/
│   └── nvidia-ai.ts          # Servicio de IA con NVIDIA NIM
├── components/
│   └── ai/
│       ├── DocumentSummarizer.tsx    # UI para resumen de documentos
│       └── CaseClassifier.tsx        # UI para clasificación de casos
└── app/
    ├── api/
    │   └── ai/
    │       ├── summarize/route.ts    # API endpoint para resumen
    │       └── classify/route.ts     # API endpoint para clasificación
    └── demo-ia/
        └── page.tsx                   # Página principal de demo
```

## API NVIDIA NIM

El servicio utiliza la API de NVIDIA NIM que es compatible con OpenAI:

- **Base URL**: `https://integrate.api.nvidia.com/v1`
- **Modelo principal**: `meta/llama-3.1-405b-instruct`
- **Autenticación**: Bearer token via API key
- **Costo**: Gratis para desarrollo/POC

## Ventajas para el Cliente

### Para el Estudio Jurídico

- **Ahorro de tiempo**: Automatiza tareas repetitivas de análisis
- **Mejor organización**: Clasificación inteligente de expedientes
- **Acceso rápido**: Resúmenes ejecutivos en segundos
- **Escalabilidad**: Crece con el estudio sin costos adicionales de infraestructura
- **Sin costo inicial**: Desarrollo con APIs gratuitas de NVIDIA

### Para los Abogados

- **Enfoque en casos complejos**: La IA maneja tareas rutinarias
- **Mejor toma dedecisiones**: Resúmenes claros y clasificación precisa
- **Priorización automática**: Casos urgentes identificados automáticamente
- **Búsqueda inteligente**: Encuentra casos similares rápidamente

## Propuesta Comercial

Este prototipo demuestra las capacidades que podemos incluir en el sistema completo:

### Paquete Básico (600.000 CLP)
- Sitio web profesional
- Panel admin básico (CRM)
- Una integración IA (resumen o clasificación)
- 1 mes de soporte

### Sistema IA Avanzado (+300.000 CLP)
- Resumen automático de documentos
- Clasificación inteligente de expedientes
- Búsqueda semántica en jurisprudencia
- Generación de documentos con plantillas
- Dashboard con métricas del estudio

## Soporte y Mantenimiento

- Capacitación al equipo incluida
- Documentación completa
- Soporte técnico por 1 mes
- Actualizaciones y mejoras continuas

## Contacto

Para más información o una propuesta personalizada, contáctanos.

---

**Nota**: Este prototipo usa el tier gratuito de NVIDIA NIM. Para producción con alto volumen, se puede migrar a planes pagos o self-hosting con infraestructura propia.
