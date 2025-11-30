import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useConveniosAPI } from '../../hooks/useConveniosAPI';
import { Convenio } from '../../types';

interface ConveniosListProps {
  onCreateConvenio: () => void;
  onViewConvenio: (convenio: Convenio) => void;
  onEditConvenio: (convenio: Convenio) => void;
}

export const ConveniosList: React.FC<ConveniosListProps> = ({ onCreateConvenio, onViewConvenio, onEditConvenio }) => {
  const { convenios, loading, error } = useConveniosAPI();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [sortBy, setSortBy] = useState('numero');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      activo: 'bg-green-100 text-green-800',
      finalizado: 'bg-gray-100 text-gray-800',
      en_proceso: 'bg-yellow-100 text-yellow-800'
    };
    
    const statusLabels = {
      activo: 'Activo',
      finalizado: 'Finalizado',
      en_proceso: 'En Proceso'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status as keyof typeof statusConfig]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const filteredConvenios = convenios.filter(convenio => {
    const matchesSearch = convenio.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         convenio.entidadConvenio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         convenio.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || convenio.estado === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteConvenio = async (convenio: Convenio) => {
    alert('La eliminación de convenios está deshabilitada. Los convenios se gestionan desde el sistema externo.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500">
        </div>
        <div className="ml-4">
          <p className="text-gray-600">Cargando convenios desde la base de datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-800">Error al cargar convenios</h3>
            <p className="text-red-600 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Convenios</h1>
              <p className="mt-1 text-sm text-gray-500">
                Administre todos los convenios de cuentas conjuntas
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por número, entidad o supervisor..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos los estados</option>
                  <option value="activo">Activos</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="finalizado">Finalizados</option>
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="numero">Ordenar por Número</option>
                  <option value="fechaInicio">Ordenar por Fecha</option>
                  <option value="valorTotal">Ordenar por Valor</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Convenios Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Convenio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supervisor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vigencia
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConvenios.map((convenio) => (
                  <tr key={convenio.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{convenio.numero}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{convenio.entidadConvenio}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{convenio.supervisor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(convenio.estado)}
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(convenio.valorTotal)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{convenio.fechaInicio} - {convenio.fechaFin}</div>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => onViewConvenio(convenio)}
                          className="text-emerald-600 hover:text-emerald-900"
                          title="Ver detalles"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => onEditConvenio(convenio)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar convenio"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteConvenio(convenio)}
                          disabled={deletingId === convenio.id}
                          className={`text-red-600 hover:text-red-900 ${deletingId === convenio.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          title="Eliminar convenio"
                        >
                          <Trash2 className={`h-4 w-4 ${deletingId === convenio.id ? 'animate-spin' : ''}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredConvenios.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron convenios que coincidan con los filtros.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
