import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Building } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

interface Dependencia {
  id: string;
  nombre: string;
  codigo: string;
  activa: boolean;
  tipo: 'direccion' | 'subdireccion' | 'oficina';
}

export const DependenciasAdmin: React.FC = () => {
  const { dependencias: adminDependencias, loading, error } = useAdmin();
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Dependencia>>({});

  useEffect(() => {
    const fetchDependencias = async () => {
      try {
        const data = await adminDependencias.getAll();
        const mapped = Array.isArray(data)
          ? data.map((d: any) => ({
              id: String(d.id ?? d.codigo ?? crypto.randomUUID()),
              nombre: d.nombre || '',
              codigo: d.codigo_dependencia?.toString() || d.codigo?.toString() || '',
              activa: d.activa ?? true,
              tipo: (d.tipo as Dependencia['tipo']) || 'oficina',
            }))
          : [];
        setDependencias(mapped);
      } catch (err) {
        console.error('Error loading dependencias:', err);
      }
    };
    fetchDependencias();
  }, []);

  const handleEdit = (dependencia: Dependencia) => {
    setIsEditing(dependencia.id);
    setFormData(dependencia);
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        const newDependencia = await adminDependencias.create(formData);
        setDependencias([...dependencias, newDependencia]);
        setIsAdding(false);
      } else if (isEditing) {
        const updated = await adminDependencias.update(isEditing, formData);
        setDependencias(dependencias.map(d =>
          d.id === isEditing ? updated : d
        ));
        setIsEditing(null);
      }
      setFormData({});
    } catch (err) {
      console.error('Error saving dependencia:', err);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de eliminar esta dependencia?')) {
      try {
        await adminDependencias.delete(id);
        setDependencias(dependencias.filter(d => d.id !== id));
      } catch (err) {
        console.error('Error deleting dependencia:', err);
      }
    }
  };

  const handleToggleActive = (id: string) => {
    setDependencias(dependencias.map(d => 
      d.id === id ? { ...d, activa: !d.activa } : d
    ));
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'direccion':
        return 'bg-blue-100 text-blue-800';
      case 'subdireccion':
        return 'bg-green-100 text-green-800';
      case 'oficina':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'direccion':
        return 'Dirección';
      case 'subdireccion':
        return 'Subdirección';
      case 'oficina':
        return 'Oficina';
      default:
        return 'Otro';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Gestión de Dependencias</h2>
          <p className="text-sm text-gray-600">Administre las direcciones y subdirecciones de la CAR</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Dependencia
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Agregar Nueva Dependencia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Nombre de la Dependencia</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.nombre || ''}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Código</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.codigo || ''}
                onChange={(e) => setFormData({...formData, codigo: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.tipo || ''}
                onChange={(e) => setFormData({...formData, tipo: e.target.value as 'direccion' | 'subdireccion' | 'oficina'})}
              >
                <option value="direccion">Dirección</option>
                <option value="subdireccion">Subdirección</option>
                <option value="oficina">Oficina</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Director/Responsable</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.director || ''}
                onChange={(e) => setFormData({...formData, director: e.target.value})}
              />
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

      {/* Dependencies Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dependencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
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
            {dependencias.map((dependencia) => (
              <tr key={dependencia.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === dependencia.id ? (
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.nombre || ''}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{dependencia.nombre}</div>
                        <div className="text-sm text-gray-500">Código: {dependencia.codigo}</div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === dependencia.id ? (
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.tipo || ''}
                      onChange={(e) => setFormData({...formData, tipo: e.target.value as any})}
                    >
                      <option value="direccion">Dirección</option>
                      <option value="subdireccion">Subdirección</option>
                      <option value="oficina">Oficina</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(dependencia.tipo)}`}>
                      {getTipoLabel(dependencia.tipo)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleActive(dependencia.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      dependencia.activa
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {dependencia.activa ? 'Activa' : 'Inactiva'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isEditing === dependencia.id ? (
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
                        onClick={() => handleEdit(dependencia)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(dependencia.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add missing handleToggleActive function */}
      {isEditing && (
        <div className="hidden">
          {/* This ensures the function is available */}
        </div>
      )}
    </div>
  );
};
