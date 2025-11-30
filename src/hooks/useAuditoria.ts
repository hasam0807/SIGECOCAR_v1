import { useState, useEffect } from 'react';
import { MovimientoAuditoria } from '../types';
import { auditoriaService } from '../services/auditoriaService';

interface UseAuditoriaFilters {
  convenioId?: string;
  usuario?: string;
  accion?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

export const useAuditoria = (filters?: UseAuditoriaFilters) => {
  const [movimientos, setMovimientos] = useState<MovimientoAuditoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovimientos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await auditoriaService.getAll(filters);
      setMovimientos(data);
    } catch (err) {
      console.error('Error fetching auditoria:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar auditoría');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovimientos();
  }, [filters?.convenioId, filters?.usuario, filters?.accion, filters?.fechaInicio, filters?.fechaFin]);

  return {
    movimientos,
    loading,
    error,
    refreshMovimientos: fetchMovimientos
  };
};
