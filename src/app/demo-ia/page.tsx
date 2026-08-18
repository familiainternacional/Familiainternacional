'use client';

import { useState } from 'react';
import { Brain, FileText, FolderKanban, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import DocumentSummarizer from '@/components/ai/DocumentSummarizer';
import CaseClassifier from '@/components/ai/CaseClassifier';

type DemoTab = 'home' | 'summarize' | 'classify';

export default function DemoIAPage() {
  const [activeTab, setActiveTab] = useState<DemoTab>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Demo IA Jurídica</h1>
                <p className="text-sm text-gray-600">Prototipo de inteligencia artificial para estudios jurídicos</p>
              </div>
            </div>
            <a
              href="https://build.nvidia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              Powered by NVIDIA NIM
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'home'
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setActiveTab('summarize')}
              className={`px-6 py-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'summarize'
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Resumen de Documentos
            </button>
            <button
              onClick={() => setActiveTab('classify')}
              className={`px-6 py-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'classify'
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              Clasificación de Casos
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Inteligencia Artificial para Estudios Jurídicos
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Sistema avanzado de IA que automatiza el análisis de documentos legales, 
                  clasificación de expedientes y generación de resúmenes ejecutivos.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Resumen de Documentos</h3>
                  <p className="text-gray-600 text-sm">
                    Analiza documentos legales y genera resúmenes ejecutivos con puntos clave, 
                    plazos y recomendaciones.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <FolderKanban className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Clasificación de Casos</h3>
                  <p className="text-gray-600 text-sm">
                    Clasifica automáticamente expedientes por área legal, urgencia y tipo, 
                    con etiquetas inteligentes.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Búsqueda Semántica</h3>
                  <p className="text-gray-600 text-sm">
                    Encuentra documentos y casos similares mediante búsqueda inteligente 
                    basada en el contenido.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Características del Sistema</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">API NVIDIA NIM Gratis</h4>
                    <p className="text-gray-600 text-sm">
                      Desarrollo sin costos usando el tier gratuito de NVIDIA NIM para prototipos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Modelos Optimizados</h4>
                    <p className="text-gray-600 text-sm">
                      Llama 3.1 y otros modelos de última generación optimizados por NVIDIA.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Compatible con OpenAI</h4>
                    <p className="text-gray-600 text-sm">
                      Mismo formato de API que OpenAI, fácil de integrar y migrar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Escalable</h4>
                    <p className="text-gray-600 text-sm">
                      Crece con tu estudio, desde prototipo hasta producción con miles de casos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">¿Interesado en este sistema?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Este prototipo demuestra las capacidades de IA que podemos integrar en tu 
                  sistema de gestión jurídica. Contáctanos para una propuesta personalizada.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab('summarize')}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Probar Resumen de Documentos
                  </button>
                  <button
                    onClick={() => setActiveTab('classify')}
                    className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors border border-blue-500"
                  >
                    Probar Clasificación
                  </button>
                </div>
              </div>
            </div>

            {/* Setup Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Configuración Requerida</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Para que este prototipo funcione, necesitas configurar tu API key de NVIDIA NIM:
                  </p>
                  <ol className="text-gray-700 text-sm space-y-1 list-decimal list-inside">
                    <li>Ve a <a href="https://build.nvidia.com/settings" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">build.nvidia.com/settings</a></li>
                    <li>Genera una API key gratuita</li>
                    <li>Agrega <code className="bg-gray-200 px-2 py-1 rounded">NVIDIA_API_KEY=tu_key</code> al archivo <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code></li>
                    <li>Reinicia el servidor de desarrollo</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'summarize' && <DocumentSummarizer />}
        {activeTab === 'classify' && <CaseClassifier />}
      </main>
    </div>
  );
}
