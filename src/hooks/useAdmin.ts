import { useState } from 'react';
import { adminService } from '../services/adminService';

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const usuarios = {
    getAll: async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.usuarios.getAll();
        return data;
      } catch (err) {
        console.error('Error fetching usuarios:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    create: async (usuario: any) => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.usuarios.create(usuario);
        return data;
      } catch (err) {
        console.error('Error creating usuario:', err);
        setError(err instanceof Error ? err.message : 'Error al crear usuario');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    update: async (id: string, usuario: any) => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.usuarios.update(id, usuario);
        return data;
      } catch (err) {
        console.error('Error updating usuario:', err);
        setError(err instanceof Error ? err.message : 'Error al actualizar usuario');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    delete: async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        await adminService.usuarios.delete(id);
      } catch (err) {
        console.error('Error deleting usuario:', err);
        setError(err instanceof Error ? err.message : 'Error al eliminar usuario');
        throw err;
      } finally {
        setLoading(false);
      }
    },
  };

  const supervisores = {
    getAll: async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.supervisores.getAll();
        return data;
      } catch (err) {
        console.error('Error fetching supervisores:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar supervisores');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    create: async (supervisor: any) => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.supervisores.create(supervisor);
        return data;
      } catch (err) {
        console.error('Error creating supervisor:', err);
        setError(err instanceof Error ? err.message : 'Error al crear supervisor');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    update: async (id: string, supervisor: any) => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.supervisores.update(id, supervisor);
        return data;
      } catch (err) {
        console.error('Error updating supervisor:', err);
        setError(err instanceof Error ? err.message : 'Error al actualizar supervisor');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    delete: async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        await adminService.supervisores.delete(id);
      } catch (err) {
        console.error('Error deleting supervisor:', err);
        setError(err instanceof Error ? err.message : 'Error al eliminar supervisor');
        throw err;
      } finally {
        setLoading(false);
      }
    },
  };

  const entidades = {
    getAll: async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.entidades.getAll();
        return data;
      } catch (err) {
        console.error('Error fetching entidades:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar entidades');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    create: async (entidad: any) => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.entidades.create(entidad);
        return data;
      } catch (err) {
        console.error('Error creating entidad:', err);
        setError(err instanceof Error ? err.message : 'Error al crear entidad');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    update: async (id: string, entidad: any) => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.entidades.update(id, entidad);
        return data;
      } catch (err) {
        console.error('Error updating entidad:', err);
        setError(err instanceof Error ? err.message : 'Error al actualizar entidad');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    delete: async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        await adminService.entidades.delete(id);
      } catch (err) {
        console.error('Error deleting entidad:', err);
        setError(err instanceof Error ? err.message : 'Error al eliminar entidad');
        throw err;
      } finally {
        setLoading(false);
      }
    },
  };

  const dependencias = {
    getAll: async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.dependencias.getAll();
        return data;
      } catch (err) {
        console.error('Error fetching dependencias:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar dependencias');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    create: async (dependencia: any) => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.dependencias.create(dependencia);
        return data;
      } catch (err) {
        console.error('Error creating dependencia:', err);
        setError(err instanceof Error ? err.message : 'Error al crear dependencia');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    update: async (id: string, dependencia: any) => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.dependencias.update(id, dependencia);
        return data;
      } catch (err) {
        console.error('Error updating dependencia:', err);
        setError(err instanceof Error ? err.message : 'Error al actualizar dependencia');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    delete: async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        await adminService.dependencias.delete(id);
      } catch (err) {
        console.error('Error deleting dependencia:', err);
        setError(err instanceof Error ? err.message : 'Error al eliminar dependencia');
        throw err;
      } finally {
        setLoading(false);
      }
    },
  };

  const configuracion = {
    get: async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.configuracion.get();
        return data;
      } catch (err) {
        console.error('Error fetching configuracion:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar configuración');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    update: async (config: any) => {
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.configuracion.update(config);
        return data;
      } catch (err) {
        console.error('Error updating configuracion:', err);
        setError(err instanceof Error ? err.message : 'Error al actualizar configuración');
        throw err;
      } finally {
        setLoading(false);
      }
    },
  };

  const backup = {
    create: async () => {
      try {
        setLoading(true);
        setError(null);
        const blob = await adminService.backup.create();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup-${new Date().toISOString().split('T')[0]}.sql`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Error creating backup:', err);
        setError(err instanceof Error ? err.message : 'Error al crear backup');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    restore: async (file: File) => {
      try {
        setLoading(true);
        setError(null);
        await adminService.backup.restore(file);
      } catch (err) {
        console.error('Error restoring backup:', err);
        setError(err instanceof Error ? err.message : 'Error al restaurar backup');
        throw err;
      } finally {
        setLoading(false);
      }
    },
  };

  return {
    loading,
    error,
    usuarios,
    supervisores,
    entidades,
    dependencias,
    configuracion,
    backup,
  };
};
