import apiClient from '../lib/api';
import { Convenio as ApiConvenio } from '../types/api';

export const conveniosService = {
  getAll: async (): Promise<ApiConvenio[]> => {
    const response = await apiClient.get<ApiConvenio[]>('/convenio');
    return response.data;
  },

  getById: async (id: string): Promise<ApiConvenio> => {
    const response = await apiClient.get<ApiConvenio>(`/convenio/${id}`);
    return response.data;
  },

  create: async (convenio: Omit<ApiConvenio, 'id' | 'fecha_creacion' | 'fecha_modificacion'>): Promise<ApiConvenio> => {
    const response = await apiClient.post<ApiConvenio>('/convenio', convenio);
    return response.data;
  },

  update: async (id: string, convenio: Partial<ApiConvenio>): Promise<ApiConvenio> => {
    const response = await apiClient.put<ApiConvenio>(`/convenio/${id}`, convenio);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/convenio/${id}`);
  },

  getPresupuesto: async (id: string) => {
    const response = await apiClient.get(`/convenio/${id}/presupuesto`);
    return response.data;
  },

  getGiros: async (id: string) => {
    const response = await apiClient.get(`/convenio/${id}/giros`);
    return response.data;
  },

  getRendimientos: async (id: string) => {
    const response = await apiClient.get(`/convenio/${id}/rendimientos`);
    return response.data;
  },

  getDocumentos: async (id: string) => {
    const response = await apiClient.get(`/convenio/${id}/documentos`);
    return response.data;
  },

  calculateRendimiento: async (id: string, periodo: string, tasaInteres: number) => {
    const response = await apiClient.post(`/convenio/${id}/rendimientos/calcular`, {
      periodo,
      tasaInteres
    });
    return response.data;
  },
};
