import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, User, Shield, Eye, EyeOff } from 'lucide-react';
import { adminService } from '../../services/adminService';
import apiClient from '../../lib/api';

type Rol = 'administrador' | 'supervisor' | 'consulta';

interface Usuario {
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  usuario?: string;
  rol: Rol;
  dependencia: string;
  activo: boolean;
  ultimoAcceso: string;
  fechaCreacion: string;
}

type FormState = Partial<Usuario> & {
  password?: string;
  dependenciaId?: number;
  usuario?: string;
  rolesIds?: number[];
};

interface RolData {
  id: string;
  nombreCorto: string;
  descripcion: string;
  fechaCreacion: string;
}

interface DependenciaData {
  id: string;
  nombre: string;
}

const rolToIds: Record<Rol, number[]> = {
  administrador: [1],
  supervisor: [2],
  consulta: [3],
};

export const UsuariosAdmin: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<RolData[]>([]);
  const [dependencias, setDependencias] = useState<DependenciaData[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<FormState>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [dependenciasLoading, setDependenciasLoading] = useState(false);
  const [isAddingRol, setIsAddingRol] = useState(false);
  const [rolForm, setRolForm] = useState<{ nombre: string; descripcion: string }>({ nombre: '', descripcion: '' });

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await adminService.usuarios.getAll();

      const mapped: Usuario[] = data.map((u: any) => {
        const rolesApi = Array.isArray(u.roles) ? u.roles.map((r: any) => String(r).toLowerCase()) : [];
        const esAdmin = rolesApi.some((r: string) => r.includes('admin'));
        const esSupervisor = rolesApi.some((r: string) => r.includes('supervisor'));

        let rol: Rol = 'consulta';
        if (esAdmin) {
          rol = 'administrador';
        } else if (esSupervisor) {
          rol = 'supervisor';
        }

        return {
          id: String(u.id),
          nombres: u.nombre || '',
          apellidos: u.apellido || '',
          email: u.email || '',
          usuario: u.usuario || '',
          rol,
          dependencia: u.dependenciaNombre || '',
          activo: u.activo ?? true,
          ultimoAcceso: u.ultimoAcceso || u.ultimo_acceso || '-',
          fechaCreacion: (u.fecha_creacion || u.fechaCreacion || '').split('T')[0] || '',
        };
      });

      setUsuarios(mapped);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setRolesLoading(true);
        const response = await apiClient.get('/role');
        const list = Array.isArray(response.data) ? response.data : [];
        const mapped: RolData[] = list.map((r: any) => ({
          id: String(r.id ?? Math.random()),
          nombreCorto: r.nombre_corto || r.nombre || '',
          descripcion: r.descripcion || '',
          fechaCreacion: (
            r.fecha_creacion ||
            r.fecha_creación ||
            r.fechaCreacion ||
            ''
          ).toString().split('T')[0] || '',
        }));
        setRoles(mapped);
      } catch (err) {
        console.error('Error cargando roles:', err);
      } finally {
        setRolesLoading(false);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchDependencias = async () => {
      try {
        setDependenciasLoading(true);
        const response = await apiClient.get('/dependencia');
        const list = Array.isArray(response.data) ? response.data : [];
        const mapped: DependenciaData[] = list.map((d: any) => ({
          id: String(d.id ?? d.codigo_dependencia ?? Math.random()),
          nombre: d.nombre || '',
        }));
        setDependencias(mapped);
      } catch (err) {
        console.error('Error cargando dependencias:', err);
      } finally {
        setDependenciasLoading(false);
      }
    };
    fetchDependencias();
  }, []);

  const handleSaveRol = async () => {
    if (!rolForm.nombre || !rolForm.descripcion) return;
    try {
      const response = await apiClient.post('/role', {
        nombre: rolForm.nombre,
        descripcion: rolForm.descripcion
      });
      const nuevoRol: RolData = {
        id: String(response.data?.id ?? Math.random()),
        nombreCorto: response.data?.nombre_corto || response.data?.nombre || rolForm.nombre,
        descripcion: response.data?.descripcion || rolForm.descripcion,
        fechaCreacion: (response.data?.fecha_creacion || response.data?.fecha_creación || '').toString().split('T')[0] || ''
      };
      setRoles([...roles, nuevoRol]);
      setRolForm({ nombre: '', descripcion: '' });
      setIsAddingRol(false);
    } catch (err) {
      console.error('Error creando rol:', err);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setIsEditing(usuario.id);
    setFormData(usuario);
  };

  const handleSave = async () => {
    if (isAdding) {
      const rolSeleccionado: Rol = formData.rol || 'consulta';
      const payload = {
        usuario: formData.usuario || (formData.email ? formData.email.split('@')[0] : ''),
        nombre: formData.nombres || '',
        apellido: formData.apellidos || '',
        email: formData.email || '',
        password: formData.password || 'Temporal123*',
        dependenciaId: formData.dependenciaId ?? 0,
        rolesIds: formData.rolesIds && formData.rolesIds.length > 0
          ? formData.rolesIds
          : rolToIds[rolSeleccionado] || [3],
      };

      try {
        await adminService.usuarios.create(payload);
        await fetchUsuarios();
      } catch (error) {
        console.error('Error creando usuario:', error);
      } finally {
        setIsAdding(false);
        setFormData({});
      }
    } else if (isEditing) {
      setUsuarios(usuarios.map(u =>
        u.id === isEditing ? { ...u, ...formData } : u
      ));
      setIsEditing(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Estas seguro de eliminar este usuario?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setUsuarios(usuarios.map(u => 
      u.id === id ? { ...u, activo: !u.activo } : u
    ));
  };

  const getRolColor = (rol: string) => {
    switch (rol) {
      case 'administrador':
        return 'bg-red-100 text-red-800';
      case 'supervisor':
        return 'bg-blue-100 text-blue-800';
      case 'consulta':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRolLabel = (rol: string) => {
    switch (rol) {
      case 'administrador':
        return 'Administrador';
      case 'supervisor':
        return 'Supervisor';
      case 'consulta':
        return 'Consulta';
      default:
        return 'Usuario';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Gestion de Usuarios</h2>
          <p className="text-sm text-gray-600">Administre los usuarios y sus permisos en el sistema</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </button>
      </div>

      {/* Estadisticas de Usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Total Usuarios</p>
              <p className="text-lg font-semibold text-blue-600">{usuarios.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <User className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Usuarios de Consulta</p>
              <p className="text-lg font-semibold text-green-600">{usuarios.filter(u => u.rol === 'consulta').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Administradores</p>
              <p className="text-lg font-semibold text-red-600">{usuarios.filter(u => u.rol === 'administrador').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <User className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Supervisores</p>
              <p className="text-lg font-semibold text-purple-600">{usuarios.filter(u => u.rol === 'supervisor').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Agregar Nuevo Usuario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombres</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.nombres || ''}
                onChange={(e) => setFormData({...formData, nombres: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellidos</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.apellidos || ''}
                onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.usuario || ''}
                onChange={(e) => setFormData({...formData, usuario: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 pr-10"
                  placeholder="Contrasena temporal"
                  value={formData.password || ''}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dependencia</label>
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.dependenciaId || ''}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedDep = dependencias.find(d => d.id === selectedId);
                  setFormData({
                    ...formData,
                    dependenciaId: selectedId ? Number(selectedId) : undefined,
                    dependencia: selectedDep?.nombre || ''
                  });
                }}
                disabled={dependenciasLoading}
              >
                <option value="">{dependenciasLoading ? 'Cargando dependencias...' : 'Seleccionar dependencia'}</option>
                {dependencias.map(dep => (
                  <option key={dep.id} value={dep.id}>{dep.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
              <div className="space-y-2 border border-gray-200 rounded-md p-3 max-h-40 overflow-y-auto">
                {rolesLoading && <p className="text-xs text-gray-500">Cargando roles...</p>}
                {!rolesLoading && roles.length === 0 && (
                  <p className="text-xs text-gray-500">No hay roles disponibles.</p>
                )}
                {!rolesLoading &&
                  roles.map((rol) => {
                    const checked = (formData.rolesIds || []).includes(Number(rol.id));
                    return (
                      <label key={rol.id} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                          checked={checked}
                          onChange={() => {
                            const current = formData.rolesIds || [];
                            let next: number[];
                            if (checked) {
                              next = current.filter((id) => id !== Number(rol.id));
                            } else {
                              next = [...current, Number(rol.id)];
                            }
                            const nombres = roles
                              .filter((r) => next.includes(Number(r.id)))
                              .map((r) => r.nombreCorto.toLowerCase())
                              .join(' ');
                            let rolSeleccionado: Rol = 'consulta';
                            if (nombres.includes('admin')) rolSeleccionado = 'administrador';
                            else if (nombres.includes('supervisor')) rolSeleccionado = 'supervisor';
                            setFormData({
                              ...formData,
                              rolesIds: next,
                              rol: rolSeleccionado,
                            });
                          }}
                        />
                        <span>{rol.nombreCorto}</span>
                      </label>
                    );
                  })}
              </div>
              <p className="text-xs text-gray-500 mt-1">Seleccione uno o varios roles.</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              <Save className="h-4 w-4 mr-1" />
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dependencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Creacion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === usuario.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Nombres"
                        value={formData.nombres || ''}
                        onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                      />
                      <input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Apellidos"
                        value={formData.apellidos || ''}
                        onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{usuario.nombres} {usuario.apellidos}</div>
                        <div className="text-sm text-gray-500">{usuario.email}</div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === usuario.id ? (
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.rol || ''}
                      onChange={(e) => setFormData({...formData, rol: e.target.value as any})}
                    >
                      <option value="consulta">Consulta</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="administrador">Administrador</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRolColor(usuario.rol)}`}>
                      {getRolLabel(usuario.rol)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === usuario.id ? (
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.dependenciaId || usuario.dependencia}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedDep = dependencias.find(d => d.id === selectedId);
                        setFormData({
                          ...formData,
                          dependenciaId: selectedId ? Number(selectedId) : undefined,
                          dependencia: selectedDep?.nombre || ''
                        });
                      }}
                      disabled={dependenciasLoading}
                    >
                      <option value="">{dependenciasLoading ? 'Cargando dependencias...' : 'Seleccionar dependencia'}</option>
                      {dependencias.map(dep => (
                        <option key={dep.id} value={dep.id}>{dep.nombre}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-sm text-gray-900">{usuario.dependencia}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{usuario.fechaCreacion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleActive(usuario.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      usuario.activo
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {usuario.activo ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isEditing === usuario.id ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(usuario)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={usuario.rol === 'administrador'}
                      >
                        <Trash2 className={`h-4 w-4 ${usuario.rol === 'administrador' ? 'opacity-50 cursor-not-allowed' : ''}`} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roles Panel */}
      <div className="mt-12 bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Roles</h3>
            <p className="text-sm text-gray-600">Listado de roles disponibles en el sistema</p>
          </div>
          <button
            onClick={() => setIsAddingRol(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Rol
          </button>
        </div>

        {isAddingRol && (
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={rolForm.nombre}
                  onChange={(e) => setRolForm({ ...rolForm, nombre: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripcion</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={rolForm.descripcion}
                  onChange={(e) => setRolForm({ ...rolForm, descripcion: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleSaveRol}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
              >
                <Save className="h-4 w-4 mr-1" />
                Guardar
              </button>
              <button
                onClick={() => { setIsAddingRol(false); setRolForm({ nombre: '', descripcion: '' }); }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-1" />
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Creacion</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((rol) => (
                <tr key={rol.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{rol.nombreCorto}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{rol.descripcion}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{rol.fechaCreacion}</div>
                  </td>
                </tr>
              ))}
              {!rolesLoading && roles.length === 0 && (
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-500" colSpan={3}>No hay roles disponibles.</td>
                </tr>
              )}
              {rolesLoading && (
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-500" colSpan={3}>Cargando roles...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsuariosAdmin;
