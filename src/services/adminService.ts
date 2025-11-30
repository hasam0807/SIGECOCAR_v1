import apiClient from '../lib/api';

export const adminService = {
  usuarios: {
    getAll: async () => {
      const response = await apiClient.get('/usuarios');
      return response.data;
    },
    getById: async (id: string) => {
      const response = await apiClient.get(`/usuarios/${id}`);
      return response.data;
    },
    create: async (usuario: any) => {
      const response = await apiClient.post('/usuarios', usuario);
      return response.data;
    },
    update: async (id: string, usuario: any) => {
      const response = await apiClient.put(`/usuarios/${id}`, usuario);
      return response.data;
    },
    delete: async (id: string) => {
      await apiClient.delete(`/usuarios/${id}`);
    },
  },

  supervisores: {
    getAll: async () => {
      const response = await apiClient.get('/admin/supervisores');
      return response.data;
    },
    create: async (supervisor: any) => {
      const response = await apiClient.post('/admin/supervisores', supervisor);
      return response.data;
    },
    update: async (id: string, supervisor: any) => {
      const response = await apiClient.put(`/admin/supervisores/${id}`, supervisor);
      return response.data;
    },
    delete: async (id: string) => {
      await apiClient.delete(`/admin/supervisores/${id}`);
    },
  },

  entidades: {
    getAll: async () => {
      const response = await apiClient.get('/admin/entidades');
      return response.data;
    },
    create: async (entidad: any) => {
      const response = await apiClient.post('/admin/entidades', entidad);
      return response.data;
    },
    update: async (id: string, entidad: any) => {
      const response = await apiClient.put(`/admin/entidades/${id}`, entidad);
      return response.data;
    },
    delete: async (id: string) => {
      await apiClient.delete(`/admin/entidades/${id}`);
    },
  },

  dependencias: {
    getAll: async () => {
      const response = await apiClient.get('/dependencia');
      return response.data;
    },
    create: async (dependencia: any) => {
      const response = await apiClient.post('/dependencia', dependencia);
      return response.data;
    },
    update: async (id: string, dependencia: any) => {
      const response = await apiClient.put(`/dependencia/${id}`, dependencia);
      return response.data;
    },
    delete: async (id: string) => {
      await apiClient.delete(`/dependencia/${id}`);
    },
  },

  configuracion: {
    get: async () => {
      const response = await apiClient.get('/admin/configuracion');
      return response.data;
    },
    update: async (config: any) => {
      const response = await apiClient.put('/admin/configuracion', config);
      return response.data;
    },
  },

  backup: {
    create: async () => {
      const response = await apiClient.post('/admin/backup', null, {
        responseType: 'blob',
      });
      return response.data;
    },
    restore: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post('/admin/backup/restore', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  },
};
