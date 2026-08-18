'use client';

import { useState } from 'react';
import { FolderKanban, Tag, AlertTriangle, Clock, Loader2, CheckCircle } from 'lucide-react';

interface ClassificationResult {
  areaLegal: string;
  urgencia: 'baja' | 'media' | 'alta';
  tipoCaso: string;
  etiquetas: string[];
}

export default function CaseClassifier() {
  const [caseDescription, setCaseDescription] = useState('');
  const [classification, setClassification] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClassify = async () => {
    if (!caseDescription.trim()) {
      setError('Por favor ingresa la descripción del caso');
      return;
    }

    setLoading(true);
    setError('');
    setClassification(null);

    try {
      const response = await fetch('/api/ai/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseDescription })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al clasificar el caso');
      }

      setClassification(data.classification);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setCaseDescription(`El cliente, Sr. Roberto Sánchez, ha sido despedido de su empresa después de 15 años de trabajo sin justificación aparente. La empresa no ha pagado sus indemnizaciones ni vacaciones proporcionales. El cliente tiene pruebas de su relación laboral y testigos que pueden confirmar su situación. Busca asesoría para demandar a la empresa por despido injustificado y cobro de prestaciones. El caso es urgente porque tiene deudas pendientes y necesita resolver su situación laboral lo antes posible.`);
  };

  const getUrgencyColor = (urgencia: string) => {
    switch (urgencia) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-300';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'baja': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getUrgencyIcon = (urgencia: string) => {
    switch (urgencia) {
      case 'alta': return <AlertTriangle className="w-5 h-5" />;
      case 'media': return <Clock className="w-5 h-5" />;
      case 'baja': return <CheckCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FolderKanban className="w-12 h-12 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">Clasificación de Expedientes</h2>
        </div>
        <p className="text-gray-600">
          IA que clasifica automáticamente casos legales por área, urgencia y tipo
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción del caso
          </label>
          <textarea
            value={caseDescription}
            onChange={(e) => setCaseDescription(e.target.value)}
            placeholder="Describe el caso legal: antecedentes, partes involucradas, situación actual..."
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClassify}
            disabled={loading}
            className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Clasificando...
              </>
            ) : (
              <>
                <Tag className="w-5 h-5" />
                Clasificar Caso
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

      {classification && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border border-purple-200">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900">Clasificación Generada</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <FolderKanban className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">Área Legal</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{classification.areaLegal}</p>
            </div>

            <div className={`rounded-lg p-4 border ${getUrgencyColor(classification.urgencia)}`}>
              <div className="flex items-center gap-2 mb-2">
                {getUrgencyIcon(classification.urgencia)}
                <span className="font-medium">Nivel de Urgencia</span>
              </div>
              <p className="text-2xl font-bold capitalize">{classification.urgencia}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700">Tipo de Caso</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{classification.tipoCaso}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200 md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-700">Etiquetas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {classification.etiquetas.map((etiqueta, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                  >
                    {etiqueta}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
