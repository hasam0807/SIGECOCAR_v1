import { useEffect, useState } from "react";
import apiClient from "../lib/api";

interface FinancialData {
  mes: string;
  ingresos: number;
  egresos: number;
  rendimientos: number;
}

interface ConveniosByDependencia {
  nombre: string;
  value: number;
  color: string;
}

export const useSupabaseReports = () => {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [conveniosByDependencia, setConveniosByDependencia] = useState<ConveniosByDependencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFinancialData = async () => {
    try {
      const response = await apiClient.get("/convenio");
      const convenios = Array.isArray(response.data) ? response.data : [];

      const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const monthly: Record<string, { ingresos: number; egresos: number; rendimientos: number }> = {};

      convenios.forEach((c: any) => {
        const fecha = c.fecha_creacion || c.created_at;
        const d = fecha ? new Date(fecha) : new Date();
        const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
        if (!monthly[key]) monthly[key] = { ingresos: 0, egresos: 0, rendimientos: 0 };
        monthly[key].ingresos += c.valor_total_aprobado || 0;
      });

      const chartData: FinancialData[] = Object.entries(monthly)
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([key, vals]) => {
          const [, month] = key.split("-");
          const mesNombre = monthNames[(parseInt(month, 10) - 1) % 12];
          return {
            mes: mesNombre,
            ingresos: vals.ingresos,
            egresos: vals.egresos,
            rendimientos: vals.rendimientos,
          };
        });

      setFinancialData(chartData);
    } catch (err) {
      console.error("Error fetching financial data:", err);
      setError(err instanceof Error ? err.message : "Error al cargar datos financieros");
    }
  };

  const fetchConveniosByDependencia = async () => {
    try {
      const response = await apiClient.get("/convenio");
      const convenios = Array.isArray(response.data) ? response.data : [];

      const dependenciaCount: Record<string, number> = {};
      convenios.forEach((c: any) => {
        const dep = c.dependencia?.nombre || "Sin dependencia";
        dependenciaCount[dep] = (dependenciaCount[dep] || 0) + 1;
      });

      const colors = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"];
      const chartData: ConveniosByDependencia[] = Object.entries(dependenciaCount)
        .map(([nombre, value], index) => ({ nombre, value, color: colors[index % colors.length] }))
        .sort((a, b) => b.value - a.value);

      setConveniosByDependencia(chartData);
    } catch (err) {
      console.error("Error fetching convenios by dependencia:", err);
      setError(err instanceof Error ? err.message : "Error al cargar convenios por dependencia");
    }
  };

  const fetchReportsData = async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchFinancialData(), fetchConveniosByDependencia()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  return {
    financialData,
    conveniosByDependencia,
    loading,
    error,
    refreshReports: fetchReportsData,
  };
};

export default useSupabaseReports;