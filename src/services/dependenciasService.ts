import apiClient from '../lib/api';
import { Dependencia } from '../types/api';

export const dependenciasService = {
  getAll: async (): Promise<Dependencia[]> => {
    const response = await apiClient.get<Dependencia[]>('/dependencia');
    return response.data;
  },

  getById: async (id: number): Promise<Dependencia> => {
    const response = await apiClient.get<Dependencia>(`/dependencia/${id}`);
    return response.data;
  },
};
