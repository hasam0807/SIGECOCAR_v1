import { useState, useEffect } from 'react';
import { Documento } from '../types';
import { documentosService } from '../services/documentosService';

export const useDocumentos = (convenioId?: string) => {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocumentos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await documentosService.getAll(convenioId);
      setDocumentos(data);
    } catch (err) {
      console.error('Error fetching documentos:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar documentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, [convenioId]);

  const uploadDocumento = async (convenioId: string, file: File) => {
    try {
      setError(null);
      const newDoc = await documentosService.upload(convenioId, file);
      setDocumentos(prev => [...prev, newDoc]);
      return newDoc;
    } catch (err) {
      console.error('Error uploading documento:', err);
      setError(err instanceof Error ? err.message : 'Error al subir documento');
      throw err;
    }
  };

  const deleteDocumento = async (id: string) => {
    try {
      setError(null);
      await documentosService.delete(id);
      setDocumentos(prev => prev.filter(doc => doc.id !== id));
    } catch (err) {
      console.error('Error deleting documento:', err);
      setError(err instanceof Error ? err.message : 'Error al eliminar documento');
      throw err;
    }
  };

  const downloadDocumento = async (id: string, nombre: string) => {
    try {
      setError(null);
      const blob = await documentosService.download(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = nombre;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading documento:', err);
      setError(err instanceof Error ? err.message : 'Error al descargar documento');
      throw err;
    }
  };

  return {
    documentos,
    loading,
    error,
    uploadDocumento,
    deleteDocumento,
    downloadDocumento,
    refreshDocumentos: fetchDocumentos
  };
};
