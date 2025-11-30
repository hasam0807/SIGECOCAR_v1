import apiClient from '../lib/api';
import { Documento } from '../types';

export const documentosService = {
  getAll: async (convenioId?: string): Promise<Documento[]> => {
    const params = convenioId ? `?convenioId=${convenioId}` : '';
    const response = await apiClient.get<Documento[]>(`/documentos${params}`);
    return response.data;
  },

  getById: async (id: string): Promise<Documento> => {
    const response = await apiClient.get<Documento>(`/documentos/${id}`);
    return response.data;
  },

  upload: async (convenioId: string, file: File): Promise<Documento> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('convenioId', convenioId);

    const response = await apiClient.post<Documento>('/documentos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/documentos/${id}`);
  },

  download: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`/documentos/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
