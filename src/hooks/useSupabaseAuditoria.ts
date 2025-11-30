import { useState, useEffect } from 'react';
import apiClient from '../lib/api';

interface AuditoriaLog {
  id: string;
  fecha: string;
  usuario: string;
  accion: string;
  convenio: string;
  detalles: string;
  ipAddress: string;
}

export const useSupabaseAuditoria = () => {
  const [auditLogs, setAuditLogs] = useState<AuditoriaLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuditLogs = async (filters?: {
    dateFrom?: string;
    dateTo?: string;
    usuario?: string;
    convenioId?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get('/evento');
      const data = Array.isArray(response.data) ? response.data : [];

      const transformedLogs: AuditoriaLog[] = data
        .filter((log) => {
          if (filters?.usuario && log.usuario_creacion !== filters.usuario) return false;
          if (filters?.dateFrom && new Date(log.fecha_creacion) < new Date(filters.dateFrom)) return false;
          if (filters?.dateTo && new Date(log.fecha_creacion) > new Date(filters.dateTo)) return false;
          return true;
        })
        .map((log, index) => {
          const convenio = log.periodo?.convenio ? String(log.periodo.convenio) : '';
          const mes = log.periodo?.mes;
          const ano = log.periodo?.ano ?? log.periodo?.año;
          const detalles = log.periodo ? `Periodo ${mes}/${ano ?? ''}` : '';
          return {
            id: log.id ? String(log.id) : String(index),
            fecha: log.fecha_creacion ? String(log.fecha_creacion).split('T')[0] : '',
            usuario: log.usuario_creacion || '',
            accion: log.tipo_evento || '',
            convenio,
            detalles,
            ipAddress: 'N/A',
          };
        });

      setAuditLogs(transformedLogs);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar logs de auditoria');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  return {
    auditLogs,
    loading,
    error,
    fetchAuditLogs,
    addAuditLog: async () => {},
    refreshAuditLogs: () => fetchAuditLogs(),
  };
};

export default useSupabaseAuditoria;