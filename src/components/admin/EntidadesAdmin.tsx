import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, MapPin } from 'lucide-react';

interface Entidad {
  id: string;
  nombre: string;
  tipo: 'municipio' | 'fundacion' | 'corporacion' | 'universidad' | 'otro';
  nit: string;
  representante: string;
  email: string;
  telefono: string;
  direccion: string;
  activa: boolean;
}

export const EntidadesAdmin: React.FC = () => {
  const [entidades, setEntidades] = useState<Entidad[]>([
    {
      id: '1',
      nombre: 'Municipio de Tibirita',
      tipo: 'municipio',
      nit: '832001234-1',
      representante: 'Alcalde Juan Pérez',
      email: 'alcaldia@tibirita-cundinamarca.gov.co',
      telefono: '3201234567',
      direccion: 'Carrera 5 # 4-20, Tibirita, Cundinamarca',
      activa: true
    },
    {
      id: '2',
      nombre: 'Municipio de Chía',
      tipo: 'municipio',
      nit: '832005678-2',
      representante: 'Alcalde María González',
      email: 'alcaldia@chia-cundinamarca.gov.co',
      telefono: '3207654321',
      direccion: 'Calle 11 # 4-56, Chía, Cundinamarca',
      activa: true
    },
    {
      id: '3',
      nombre: 'Fundación Ambiental Verde',
      tipo: 'fundacion',
      nit: '900123456-3',
      representante: 'Director Carlos Silva',
      email: 'info@fundacionverde.org',
      telefono: '3109876543',
      direccion: 'Calle 72 # 10-34, Bogotá D.C.',
      activa: true
    },
    {
      id: '4',
      nombre: 'Universidad Nacional de Colombia',
      tipo: 'universidad',
      nit: '899999063-3',
      representante: 'Rector Dolly Montoya',
      email: 'rectoría@unal.edu.co',
      telefono: '3165000000',
      direccion: 'Ciudad Universitaria, Bogotá D.C.',
      activa: true
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Entidad>>({});

  const handleEdit = (entidad: Entidad) => {
    setIsEditing(entidad.id);
    setFormData(entidad);
  };

  const handleSave = () => {
    if (isAdding) {
      const newEntidad: Entidad = {
        id: Date.now().toString(),
        nombre: formData.nombre || '',
        tipo: formData.tipo || 'municipio',
        nit: formData.nit || '',
        representante: formData.representante || '',
        email: formData.email || '',
        telefono: formData.telefono || '',
        direccion: formData.direccion || '',
        activa: formData.activa ?? true
      };
      setEntidades([...entidades, newEntidad]);
      setIsAdding(false);
    } else if (isEditing) {
      setEntidades(entidades.map(e => 
        e.id === isEditing ? { ...e, ...formData } : e
      ));
      setIsEditing(null);
    }
    setFormData({});
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar esta entidad?')) {
      setEntidades(entidades.filter(e => e.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setEntidades(entidades.map(e => 
      e.id === id ? { ...e, activa: !e.activa } : e
    ));
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'municipio':
        return 'bg-blue-100 text-blue-800';
      case 'fundacion':
        return 'bg-green-100 text-green-800';
      case 'corporacion':
        return 'bg-purple-100 text-purple-800';
      case 'universidad':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'municipio':
        return 'Municipio';
      case 'fundacion':
        return 'Fundación';
      case 'corporacion':
        return 'Corporación';
      case 'universidad':
        return 'Universidad';
      default:
        return 'Otro';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Gestión de Entidades Convenio</h2>
          <p className="text-sm text-gray-600">Administre las entidades que participan en convenios</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Entidad
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Agregar Nueva Entidad</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre de la Entidad</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.nombre || ''}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.tipo || ''}
                onChange={(e) => setFormData({...formData, tipo: e.target.value as any})}
              >
                <option value="municipio">Municipio</option>
                <option value="fundacion">Fundación</option>
                <option value="corporacion">Corporación</option>
                <option value="universidad">Universidad</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">NIT</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.nit || ''}
                onChange={(e) => setFormData({...formData, nit: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Representante Legal</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.representante || ''}
                onChange={(e) => setFormData({...formData, representante: e.target.value})}
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
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.telefono || ''}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.direccion || ''}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
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

      {/* Entities Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Representante
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
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
            {entidades.map((entidad) => (
              <tr key={entidad.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === entidad.id ? (
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.nombre || ''}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-emerald-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{entidad.nombre}</div>
                        <div className="text-sm text-gray-500">NIT: {entidad.nit}</div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === entidad.id ? (
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.tipo || ''}
                      onChange={(e) => setFormData({...formData, tipo: e.target.value as any})}
                    >
                      <option value="municipio">Municipio</option>
                      <option value="fundacion">Fundación</option>
                      <option value="corporacion">Corporación</option>
                      <option value="universidad">Universidad</option>
                      <option value="otro">Otro</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(entidad.tipo)}`}>
                      {getTipoLabel(entidad.tipo)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === entidad.id ? (
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.representante || ''}
                      onChange={(e) => setFormData({...formData, representante: e.target.value})}
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{entidad.representante}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === entidad.id ? (
                    <div className="space-y-1">
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        value={formData.telefono || ''}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm text-gray-900">{entidad.email}</div>
                      <div className="text-sm text-gray-500">{entidad.telefono}</div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleActive(entidad.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      entidad.activa
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {entidad.activa ? 'Activa' : 'Inactiva'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isEditing === entidad.id ? (
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
                        onClick={() => handleEdit(entidad)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(entidad.id)}
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
    </div>
  );
};