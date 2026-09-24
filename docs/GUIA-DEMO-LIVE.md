# Guía de Demostración en Vivo - IA Jurídica

## Preparación Previa (5 minutos antes)

### 1. Verificar Configuración
- [ ] Confirmar que `NVIDIA_API_KEY` está configurada en `.env.local`
- [ ] Ejecutar `npm run dev` y verificar que el servidor inicie correctamente
- [ ] Abrir http://localhost:3000/demo-ia en el navegador
- [ ] Probar ambas funcionalidades rápidamente para asegurar que funcionan

### 2. Preparar Material
- [ ] Tener listo un documento legal real (contrato, demanda, etc.)
- [ ] Tener lista una descripción de caso real del estudio
- [ ] Abrir https://build.nvidia.com en una pestaña para mostrar la fuente de la IA

## Estructura de la Demo (15-20 minutos)

### Parte 1: Introducción (2-3 minutos)

**Diálogo sugerido:**
"Hoy les voy a mostrar nuestro prototipo de inteligencia artificial para estudios jurídicos. Este sistema utiliza las APIs gratuitas de NVIDIA NIM, que son las mismas tecnologías que usan grandes empresas legaltech."

**Puntos a mostrar:**
- Página principal de demo con las 3 características principales
- Mencionar que es un prototipo funcional, no solo mockups
- Destacar que usa NVIDIA NIM (mostrar pestaña con link)

### Parte 2: Resumen de Documentos (5-6 minutos)

**Paso 1: Explicar la funcionalidad**
"Esta función analiza cualquier documento legal y genera un resumen ejecutivo automático. Identifica puntos clave, plazos, partes involucradas y da recomendaciones."

**Paso 2: Demo con ejemplo**
1. Hacer clic en "Resumen de Documentos"
2. Hacer clic en "Cargar Ejemplo" (contrato de arrendamiento)
3. Explicar: "Este es un contrato de arrendamiento típico de 15 líneas"
4. Hacer clic en "Generar Resumen"
5. Esperar 3-5 segundos (mientras tanto, explicar el proceso)

**Mientras carga:**
"La IA está analizando el documento, identificando cláusulas importantes, plazos, y generando un resumen estructurado."

**Paso 3: Mostrar resultados**
- Leer el resumen generado
- Destacar cómo identificó: partes, plazos, área legal, recomendaciones
- Mencionar: "Esto ahorra tiempo de lectura manual"

**Paso 4: Demo con documento real (opcional)**
1. Borrar el ejemplo
2. Pegar un documento real del cliente
3. Generar resumen
4. Comparar con el ejemplo

**Puntos clave a resaltar:**
- Funciona con cualquier tipo de documento legal
- Resúmenes consistentes y profesionales
- Identifica automáticamente áreas legales
- Proporciona recomendaciones accionables

### Parte 3: Clasificación de Expedientes (5-6 minutos)

**Paso 1: Explicar la funcionalidad**
"Esta función clasifica automáticamente casos legales por área, urgencia y tipo. Ayuda a priorizar el trabajo y organizar el estudio."

**Paso 2: Demo con ejemplo**
1. Hacer clic en "Clasificación de Casos"
2. Hacer clic en "Cargar Ejemplo" (caso laboral)
3. Explicar: "Este es un caso de despido injustificado"
4. Hacer clic en "Clasificar Caso"
5. Esperar 3-5 segundos

**Mientras carga:**
"La IA está analizando el contexto, identificando el área legal, determinando la urgencia basándose en palabras clave y generando etiquetas relevantes."

**Paso 3: Mostrar resultados**
- Explicar cada campo:
  - Área Legal: "Laboral - correcto"
  - Urgencia: "Alta - porque menciona deudas y necesidad urgente"
  - Tipo de Caso: "Despido injustificado"
  - Etiquetas: "Muestra cómo etiqueta automáticamente temas clave"

**Paso 4: Demo con caso real (opcional)**
1. Borrar el ejemplo
2. Pegar descripción de caso real del estudio
3. Clasificar
4. Mostrar cómo se adapta a diferentes tipos de casos

**Puntos clave a resaltar:**
- Clasificación consistente y precisa
- Identificación automática de urgencia
- Etiquetas inteligentes para búsqueda
- Ahorra tiempo en organización manual

### Parte 4: Propuesta de Valor (2-3 minutos)

**Diálogo sugerido:**
"Este prototipo demuestra lo que podemos integrar en su sistema de gestión jurídica. Las ventajas son:"

**Mostrar la página de inicio nuevamente y destacar:**

1. **Sin costo de desarrollo**: Usamos APIs gratuitas de NVIDIA
2. **Escalable**: Crece con el estudio
3. **Fácil de integrar**: Compatible con su CRM existente
4. **Mejora productividad**: Automatiza tareas repetitivas

**Mencionar la propuesta:**
- Paquete básico (600.000 CLP): Sitio web + CRM + 1 integración IA
- Sistema IA completo (+300.000 CLP): Ambas funciones + búsqueda semántica + generación de documentos

### Parte 5: Preguntas y Respuestas (3-5 minutos)

**Preguntas anticipadas y respuestas:**

**P: ¿Cuánto cuesta mantener la IA?**
R: "El desarrollo usa APIs gratuitas de NVIDIA. Para producción con alto volumen, se puede migrar a planes pagos o self-hosting. El costo es mínimo comparado con el valor que genera."

**P: ¿Qué tan preciso es el sistema?**
R: "Usa modelos de última generación (Llama 3.1 405B) optimizados por NVIDIA. La precisión es alta, pero siempre recomendamos revisión humana para decisiones críticas."

**P: ¿Puede integrarse con mi sistema actual?**
R: "Sí, el sistema es modular. Podemos integrarlo con su CRM actual o desarrollar uno nuevo a medida."

**P: ¿Qué pasa si NVIDIA cobra en el futuro?**
R: "La API es compatible con OpenAI, por lo que podemos migrar fácilmente a otros proveedores si es necesario. Además, el código es suyo."

**P: ¿Cuánto tiempo toma implementarlo?**
R: "Para el paquete básico, 3-4 semanas. Para el sistema IA completo, 5-6 semanas incluyendo pruebas y capacitación."

## Tips para una Demo Exitosa

### Durante la Demo
- Hablar con confianza y entusiasmo
- Mantener el ritmo dinámico
- Usar ejemplos relevantes para el cliente
- Mostrar, no solo contar
- Anticipar y preparar respuestas a objeciones

### Si algo falla
- Tener capturas de pantalla de respaldo
- No entrar en pánico, es tecnología
- Explicar que es un prototipo en desarrollo
- Ofrecer hacer una demo privada más controlada

### Después de la Demo
- Enviar la documentación (DEMO-IA-JURIDICA.md)
- Ofrecer una prueba privada con sus documentos
- Seguir con propuesta formal por email
- Programar reunión para discutir detalles

## Checklist de Demo

**Antes:**
- [ ] Servidor corriendo
- [ ] API key configurada
- [ ] Documentos de prueba listos
- [ ] Navegador con pestañas abiertas

**Durante:**
- [ ] Introducción clara
- [ ] Demo de resumen funcional
- [ ] Demo de clasificación funcional
- [ ] Explicación de propuesta
- [ ] Tiempo para preguntas

**Después:**
- [ ] Enviar documentación
- [ ] Enviar propuesta formal
- [ ] Agendar seguimiento

## Contacto de Soporte

Si tienes problemas durante la demo:
- Verificar que el servidor esté corriendo
- Revisar la consola del navegador para errores
- Confirmar que la API key sea válida
- Revisar la documentación en docs/DEMO-IA-JURIDICA.md

---

**Nota**: Esta guía está diseñada para una demo de 15-20 minutos. Ajusta según el tiempo disponible y el interés del cliente.
