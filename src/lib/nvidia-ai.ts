/**
 * NVIDIA NIM AI Service
 * Servicios de IA para estudio jurídico usando NVIDIA NIM APIs
 * Documentación: https://docs.api.nvidia.com/nim/docs/introduction
 */

interface NVIDIAChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface NVIDIAChatResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class NVIDIAAIService {
  private apiKey: string;
  private baseUrl: string = 'https://integrate.api.nvidia.com/v1';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NVIDIA_API_KEY || '';
    if (!this.apiKey) {
      console.warn('NVIDIA API Key no configurada. Set NVIDIA_API_KEY en .env.local');
    }
  }

  /**
   * Resumen de documentos legales
   */
  async summarizeDocument(documentText: string, documentType?: string): Promise<string> {
    const systemPrompt = `Eres un asistente legal experto. Tu tarea es crear resúmenes ejecutivos claros y concisos de documentos legales.
    
El resumen debe incluir:
1. Puntos clave del documento
2. Partes involucradas
3. Plazos o fechas importantes
4. Área legal (civil, penal, laboral, etc.)
5. Recomendaciones o próximos pasos

Responde en español, de manera profesional y estructurada.`;

    const userPrompt = documentType 
      ? `Resume el siguiente documento legal de tipo ${documentType}:\n\n${documentText}`
      : `Resume el siguiente documento legal:\n\n${documentText}`;

    return this.callChatAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  /**
   * Clasificación de expedientes legales
   */
  async classifyCase(caseDescription: string): Promise<{
    areaLegal: string;
    urgencia: 'baja' | 'media' | 'alta';
    tipoCaso: string;
    etiquetas: string[];
  }> {
    const systemPrompt = `Eres un experto en clasificación de casos legales. Analiza la descripción del caso y proporciona:
1. Área legal (civil, penal, laboral, comercial, familia, etc.)
2. Nivel de urgencia (baja, media, alta)
3. Tipo de caso específico
4. Etiquetas relevantes (máximo 5)

Responde en formato JSON válido con esta estructura:
{
  "areaLegal": "string",
  "urgencia": "baja|media|alta",
  "tipoCaso": "string",
  "etiquetas": ["string"]
}`;

    const userPrompt = `Clasifica el siguiente caso legal:\n\n${caseDescription}`;

    const response = await this.callChatAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    try {
      // Extraer JSON de la respuesta
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No se pudo extraer JSON de la respuesta');
    } catch (error) {
      console.error('Error parseando clasificación:', error);
      // Retornar clasificación por defecto
      return {
        areaLegal: 'Por definir',
        urgencia: 'media',
        tipoCaso: 'General',
        etiquetas: ['pendiente revisión']
      };
    }
  }

  /**
   * Búsqueda semántica en documentos
   */
  async semanticSearch(query: string, documents: string[]): Promise<Array<{
    document: string;
    relevance: number;
  }>> {
    // Para una implementación completa, necesitaríamos embeddings
    // Por ahora, usamos el modelo para encontrar relevancia
    const systemPrompt = `Eres un asistente que encuentra la relevancia de documentos para una consulta legal.
    Para cada documento, asigna un puntaje de relevancia del 0 al 100.
    Responde en formato JSON válido con esta estructura:
    {
      "results": [
        {
          "document": "texto del documento",
          "relevance": 0-100
        }
      ]
    }`;

    const documentsText = documents.map((doc, i) => `Documento ${i + 1}: ${doc}`).join('\n\n');
    const userPrompt = `Consulta: "${query}"\n\nDocumentos:\n${documentsText}\n\nEncuentra los documentos más relevantes.`;

    const response = await this.callChatAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed.results || [];
      }
      return [];
    } catch (error) {
      console.error('Error parseando búsqueda semántica:', error);
      return [];
    }
  }

  /**
   * Generación de documentos legales
   */
  async generateDocument(template: string, variables: Record<string, string>): Promise<string> {
    const systemPrompt = `Eres un asistente legal experto en redacción de documentos. Genera documentos legales profesionales basados en plantillas.
    Usa las variables proporcionadas para personalizar el documento.
    El resultado debe estar en formato legal apropiado.`;

    const variablesText = Object.entries(variables)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const userPrompt = `Plantilla:\n${template}\n\nVariables:\n${variablesText}\n\nGenera el documento completo.`;

    return this.callChatAPI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  /**
   * Llamada genérica a la API de chat de NVIDIA
   */
  private async callChatAPI(messages: NVIDIAChatMessage[], model: string = 'meta/llama-3.1-405b-instruct'): Promise<string> {
    if (!this.apiKey) {
      throw new Error('NVIDIA API Key no configurada');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en API NVIDIA: ${response.status} - ${errorText}`);
      }

      const data: NVIDIAChatResponse = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      }

      throw new Error('Respuesta vacía de la API');
    } catch (error) {
      console.error('Error en llamada a NVIDIA API:', error);
      throw error;
    }
  }

  /**
   * Verificar conexión con la API
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.callChatAPI([
        { role: 'user', content: 'Responde con "OK" si puedes leer esto.' }
      ]);
      return true;
    } catch (error) {
      console.error('Error de conexión:', error);
      return false;
    }
  }
}

export default NVIDIAAIService;
