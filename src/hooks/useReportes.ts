import { useState } from 'react';
import { reportesService } from '../services/reportesService';

export const useReportes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEstadoConvenios = async (fechaInicio?: string, fechaFin?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportesService.getEstadoConvenios(fechaInicio, fechaFin);
      return data;
    } catch (err) {
      console.error('Error fetching estado convenios:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar reporte');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRendimientosFinancieros = async (anio: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportesService.getRendimientosFinancieros(anio);
      return data;
    } catch (err) {
      console.error('Error fetching rendimientos financieros:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar reporte');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEjecucionPresupuestal = async (convenioId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportesService.getEjecucionPresupuestal(convenioId);
      return data;
    } catch (err) {
      console.error('Error fetching ejecucion presupuestal:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar reporte');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const exportar = async (tipo: string, formato: 'pdf' | 'excel', filtros?: any) => {
    try {
      setLoading(true);
      setError(null);
      const blob = await reportesService.exportar(tipo, formato, filtros);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reporte-${tipo}.${formato === 'pdf' ? 'pdf' : 'xlsx'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting reporte:', err);
      setError(err instanceof Error ? err.message : 'Error al exportar reporte');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getEstadoConvenios,
    getRendimientosFinancieros,
    getEjecucionPresupuestal,
    exportar
  };
};
