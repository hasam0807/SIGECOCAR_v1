import apiClient from '../lib/api';
import { DashboardMetrics } from '../types';

export const dashboardService = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    const response = await apiClient.get<DashboardMetrics>('/dashboard/metrics');
    return response.data;
  },

  getChartData: async (tipo: string) => {
    const response = await apiClient.get(`/dashboard/charts/${tipo}`);
    return response.data;
  },

  getRecentActivity: async (limit: number = 10) => {
    const response = await apiClient.get(`/dashboard/activity?limit=${limit}`);
    return response.data;
  },
};
