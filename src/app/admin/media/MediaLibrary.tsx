/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { listMediaFiles, deleteMediaFile, type MediaFile } from './actions';
import { Loader2, UploadCloud, Copy, Trash2, Check, File as FileIcon, Image as ImageIcon } from 'lucide-react';

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const data = await listMediaFiles('admin');
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFiles();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('directory', 'admin');

    try {
      const response = await fetch('/api/admin/storage/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchFiles();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Error al subir archivo');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error de conexión al subir el archivo');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (path: string) => {
    if (!confirm('¿Estás seguro de eliminar este archivo permanentemente?')) return;
    
    setIsLoading(true);
    const success = await deleteMediaFile(path);
    if (success) {
      setFiles(files.filter(f => f.path !== path));
    } else {
      alert('Error al eliminar archivo');
    }
    setIsLoading(false);
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedPath(url);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const isImage = (mimetype: string) => mimetype?.startsWith('image/');

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="bg-white p-6 rounded-card border border-[#07234c]/10 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Galería de Medios</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sube y gestiona imágenes para usar en el blog, configuración de SEO o en el sitio.
          </p>
        </div>
        
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/png, image/jpeg, image/webp, image/svg+xml, application/pdf"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-dark disabled:opacity-70 transition-all whitespace-nowrap"
          >
            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
            {isUploading ? 'Subiendo...' : 'Subir Archivo'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-card border border-[#07234c]/10 shadow-sm min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p>Cargando medios...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
            <ImageIcon className="w-12 h-12 mb-3 text-gray-300" />
            <p>No hay archivos en la galería.</p>
            <p className="text-sm mt-1">Sube el primero usando el botón de arriba.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file) => (
              <div key={file.id} className="group relative border border-gray-200 rounded-card overflow-hidden bg-gray-50 flex flex-col">
                <div className="relative aspect-square w-full flex items-center justify-center bg-gray-100 overflow-hidden">
                  {isImage(file.metadata.mimetype) ? (
                    <img 
                      src={file.publicUrl} 
                      alt={file.name} 
                      className="object-cover w-full h-full transition-transform group-hover:scale-105" 
                    />
                  ) : (
                    <FileIcon className="w-12 h-12 text-gray-400" />
                  )}
                  
                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-white/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopy(file.publicUrl)}
                      className="p-2 bg-white rounded-full text-brand hover:bg-gray-200 transition-colors"
                      title="Copiar URL"
                    >
                      {copiedPath === file.publicUrl ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(file.path)}
                      className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3 text-xs border-t border-gray-200">
                  <p className="font-medium text-gray-800 truncate" title={file.name}>{file.name}</p>
                  <p className="text-gray-500 mt-0.5">{(file.metadata.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
