import { useState, useEffect } from 'react';
import apiClient from '../lib/api';
import { DashboardMetrics, Alerta } from '../types';

interface RendimientoMensual {
  month: string;
  rendimientos: number;
}

interface EvolucionConvenio {
  month: string;
  convenios: number;
}

interface EstadoConvenio {
  name: string;
  value: number;
  color: string;
}

interface ConveniosDependencia {
  nombre: string;
  total: number;
  porcentaje: number;
}

export const useSupabaseDashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rendimientosMensuales, setRendimientosMensuales] = useState<RendimientoMensual[]>([]);
  const [evolucionConvenios, setEvolucionConvenios] = useState<EvolucionConvenio[]>([]);
  const [estadoConvenios, setEstadoConvenios] = useState<EstadoConvenio[]>([]);
  const [conveniosPorDependencia, setConveniosPorDependencia] = useState<ConveniosDependencia[]>([]);

  const fetchMetrics = async () => {
    try {
      const response = await apiClient.get('/convenio');
      const convenios = Array.isArray(response.data) ? response.data : [];

      const totalConvenios = convenios.length;
      const today = new Date();
      const conveniosActivos = convenios.filter((c: any) => {
        const fin = c.fecha_final ? new Date(c.fecha_final) : null;
        return !fin || fin >= today;
      }).length;
      const saldoTotal = convenios.reduce((sum: number, c: any) => sum + (c.valor_total_aprobado || 0), 0);
      const vencimientosProximos = convenios.filter((c: any) => {
        if (!c.fecha_final) return false;
        const fin = new Date(c.fecha_final);
        const diff = (fin.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 30;
      }).length;

      setMetrics({
        totalConvenios,
        conveniosActivos,
        saldoTotal,
        rendimientosDelMes: 0,
        vencimientosProximos,
        documentosPendientes: 0,
      });

      // Rendimientos mensuales y evolución por mes (mock con datos del periodo)
      const byMonth = new Map<string, { rendimientos: number; convenios: number }>();
      convenios.forEach((c: any) => {
        const fecha = c.fecha_creacion || c.fecha_creacion || c.created_at;
        const d = fecha ? new Date(fecha) : new Date();
        const key = d.toLocaleString('es-CO', { month: 'short' });
        if (!byMonth.has(key)) byMonth.set(key, { rendimientos: 0, convenios: 0 });
        const entry = byMonth.get(key)!;
        entry.convenios += 1;
        entry.rendimientos += 0; // sin dato en API
        byMonth.set(key, entry);
      });
      const monthly = Array.from(byMonth.entries()).map(([month, vals]) => ({ month, rendimientos: vals.rendimientos }));
      const evol = Array.from(byMonth.entries()).map(([month, vals]) => ({ month, convenios: vals.convenios }));
      setRendimientosMensuales(monthly);
      setEvolucionConvenios(evol);

      // Estado de convenios (no hay campo estado en API; asumimos activos/otros)
      const activos = conveniosActivos;
      const total = totalConvenios || 1;
      setEstadoConvenios([
        { name: 'Activos', value: activos, color: '#10B981' },
        { name: 'Otros', value: total - activos, color: '#6B7280' },
      ]);

      // Convenios por dependencia
      const depMap = new Map<string, number>();
      convenios.forEach((c: any) => {
        const dep = c.dependencia?.nombre || 'Sin dependencia';
        depMap.set(dep, (depMap.get(dep) || 0) + 1);
      });
      const depList = Array.from(depMap.entries()).map(([nombre, total]) => ({ nombre, total }));
      const max = Math.max(...depList.map((d) => d.total), 1);
      setConveniosPorDependencia(depList.map((d) => ({ ...d, porcentaje: Math.round((d.total / max) * 100) })));
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar métricas');
    }
  };

  const fetchAlertas = async () => {
    try {
      const response = await apiClient.get('/evento');
      const eventos = Array.isArray(response.data) ? response.data : [];
      const transformed: Alerta[] = eventos.slice(0, 10).map((evt: any, idx: number) => ({
        id: evt.id ? String(evt.id) : String(idx),
        convenioId: evt.periodo?.convenio ? String(evt.periodo.convenio) : '',
        tipo: 'ejecucion',
        mensaje: `${evt.tipo_evento || 'Evento'} - Periodo ${evt.periodo?.mes || ''}/${evt.periodo?.ano || evt.periodo?.año || ''}`,
        prioridad: 'media',
        fechaCreacion: evt.fecha_creacion || '',
        leida: false,
      }));
      setAlertas(transformed);
    } catch (err) {
      console.error('Error fetching alertas:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar alertas');
    }
  };

  const markAlertaAsRead = async (alertaId: string) => {
    setAlertas((prev) => prev.map((alerta) => (alerta.id === alertaId ? { ...alerta, leida: true } : alerta)));
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchMetrics(), fetchAlertas()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    metrics,
    alertas,
    loading,
    error,
    metricsData: {
      rendimientosMensuales,
      evolucionConvenios,
      estadoConvenios,
      conveniosPorDependencia,
    },
    markAlertaAsRead,
    refreshDashboard: fetchDashboardData,
  };
};