import apiClient from '../lib/api';
import { MovimientoAuditoria } from '../types';

export const auditoriaService = {
  getAll: async (filters?: {
    convenioId?: string;
    usuario?: string;
    accion?: string;
    fechaInicio?: string;
    fechaFin?: string;
  }): Promise<MovimientoAuditoria[]> => {
    const params = new URLSearchParams();
    if (filters?.convenioId) params.append('convenioId', filters.convenioId);
    if (filters?.usuario) params.append('usuario', filters.usuario);
    if (filters?.accion) params.append('accion', filters.accion);
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio);
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin);

    const response = await apiClient.get<MovimientoAuditoria[]>(
      `/auditoria?${params.toString()}`
    );
    return response.data;
  },

  getByConvenio: async (convenioId: string): Promise<MovimientoAuditoria[]> => {
    const response = await apiClient.get<MovimientoAuditoria[]>(
      `/auditoria/convenio/${convenioId}`
    );
    return response.data;
  },
};
