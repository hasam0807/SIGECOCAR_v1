import { useState, useEffect } from 'react';
import { Convenio } from '../types';
import { conveniosService } from '../services/conveniosService';

export const useConvenios = () => {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConvenios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await conveniosService.getAll();
      setConvenios(data);
    } catch (err) {
      console.error('Error fetching convenios:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar convenios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  const addConvenio = async (convenio: Omit<Convenio, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const newConvenio = await conveniosService.create(convenio);
      setConvenios(prev => [...prev, newConvenio]);
      return newConvenio;
    } catch (err) {
      console.error('Error adding convenio:', err);
      setError(err instanceof Error ? err.message : 'Error al crear convenio');
      throw err;
    }
  };

  const updateConvenio = async (id: string, updates: Partial<Convenio>) => {
    try {
      setError(null);
      const updatedConvenio = await conveniosService.update(id, updates);
      setConvenios(prev =>
        prev.map(convenio =>
          convenio.id === id ? updatedConvenio : convenio
        )
      );
    } catch (err) {
      console.error('Error updating convenio:', err);
      setError(err instanceof Error ? err.message : 'Error al actualizar convenio');
      throw err;
    }
  };

  const deleteConvenio = async (id: string) => {
    try {
      setError(null);
      await conveniosService.delete(id);
      setConvenios(prev => prev.filter(convenio => convenio.id !== id));
    } catch (err) {
      console.error('Error deleting convenio:', err);
      setError(err instanceof Error ? err.message : 'Error al eliminar convenio');
      throw err;
    }
  };

  const getConvenioById = (id: string) => {
    return convenios.find(convenio => convenio.id === id);
  };

  return {
    convenios,
    loading,
    error,
    addConvenio,
    updateConvenio,
    deleteConvenio,
    getConvenioById,
    refreshConvenios: fetchConvenios
  };
};