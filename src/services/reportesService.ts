import apiClient from '../lib/api';

export const reportesService = {
  getEstadoConvenios: async (fechaInicio?: string, fechaFin?: string) => {
    const params = new URLSearchParams();
    if (fechaInicio) params.append('fechaInicio', fechaInicio);
    if (fechaFin) params.append('fechaFin', fechaFin);

    const response = await apiClient.get(`/reportes/estado-convenios?${params.toString()}`);
    return response.data;
  },

  getRendimientosFinancieros: async (anio: number) => {
    const response = await apiClient.get(`/reportes/rendimientos-financieros?anio=${anio}`);
    return response.data;
  },

  getEjecucionPresupuestal: async (convenioId?: string) => {
    const params = convenioId ? `?convenioId=${convenioId}` : '';
    const response = await apiClient.get(`/reportes/ejecucion-presupuestal${params}`);
    return response.data;
  },

  exportar: async (tipo: string, formato: 'pdf' | 'excel', filtros?: any) => {
    const response = await apiClient.post(`/reportes/exportar`, {
      tipo,
      formato,
      filtros
    }, {
      responseType: 'blob'
    });
    return response.data;
  },
};
