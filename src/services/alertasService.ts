import apiClient from '../lib/api';
import { Alerta } from '../types';

export const alertasService = {
  getAll: async (): Promise<Alerta[]> => {
    const response = await apiClient.get<Alerta[]>('/alertas');
    return response.data;
  },

  getUnread: async (): Promise<Alerta[]> => {
    const response = await apiClient.get<Alerta[]>('/alertas?leida=false');
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/alertas/${id}`, { leida: true });
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.patch('/alertas/mark-all-read');
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/alertas/${id}`);
  },
};
