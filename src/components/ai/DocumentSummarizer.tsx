'use client';

import { useState } from 'react';
import { FileText, Sparkles, Loader2, CheckCircle } from 'lucide-react';

export default function DocumentSummarizer() {
  const [documentText, setDocumentText] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!documentText.trim()) {
      setError('Por favor ingresa el texto del documento');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentText, documentType })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el documento');
      }

      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setDocumentText(`CONTRATO DE ARRENDAMIENTO

En la ciudad de Santiago, a 15 de enero de 2024, comparecen:
DON JUAN PÉREZ, de nacionalidad chilena, domiciliado en Av. Libertador 1234, comuna de Providencia, en adelante "EL ARRENDADOR".
Y DOÑA MARÍA GONZÁLEZ, de nacionalidad chilena, domiciliada en Calle Las Condes 567, comuna de Las Condes, en adelante "EL ARRENDATARIO".

PRIMERO: EL ARRENDADOR da en arriendo a EL ARRENDATARIO el inmueble ubicado en Av. Providencia 890, departamento 12, comuna de Providencia, Santiago.

SEGUNDO: El plazo del arriendo será de doce meses, contados desde el 1 de febrero de 2024 hasta el 31 de enero de 2025.

TERCERO: La renta mensual será de $450.000, pagaderas los primeros 5 días de cada mes.

CUARTO: EL ARRENDATARIO constituye garantía mediante depósito de una mensualidad de renta, que se mantendrá durante todo el contrato.

QUINTO: EL ARRENDATARIO se obliga a mantener el inmueble en buen estado de conservación e higiene.`);
    setDocumentType('Contrato de Arrendamiento');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FileText className="w-12 h-12 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Resumen de Documentos Legales</h2>
        </div>
        <p className="text-gray-600">
          IA que analiza y resume documentos legales automáticamente
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de documento (opcional)
          </label>
          <input
            type="text"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            placeholder="Ej: Contrato, Demanda, Sentencia..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texto del documento
          </label>
          <textarea
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder="Pega aquí el texto del documento legal..."
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generar Resumen
              </>
            )}
          </button>

          <button
            onClick={loadExample}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cargar Ejemplo
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>

      {summary && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Resumen Generado</h3>
          </div>
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-700">{summary}</div>
          </div>
        </div>
      )}
    </div>
  );
}
