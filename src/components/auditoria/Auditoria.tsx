import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, User, Calendar, Activity, Download } from 'lucide-react';
import { useSupabaseAuditoria } from '../../hooks/useSupabaseAuditoria';
import { adminService } from '../../services/adminService';

export const Auditoria: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const { auditLogs, loading, error, fetchAuditLogs } = useSupabaseAuditoria();
  const [totalUsuarios, setTotalUsuarios] = useState<number>(0);

  const usuariosUnicos = useMemo(() => {
    const set = new Set<string>();
    auditLogs.forEach((log) => {
      if (log.usuario) set.add(log.usuario);
    });
    return Array.from(set);
  }, [auditLogs]);

  const usuariosActivos = useMemo(() => {
    const unique = new Set<string>();
    auditLogs.forEach((log) => {
      if (log.usuario) unique.add(log.usuario);
    });
    return unique.size;
  }, [auditLogs]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await adminService.usuarios.getAll();
        setTotalUsuarios(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        console.error('Error cargando usuarios para auditoria:', err);
        setTotalUsuarios(0);
      }
    };
    fetchUsuarios();
  }, []);

  const getActionIcon = (accion: string) => {
    if (accion.includes('Creacion')) return '??';
    if (accion.includes('Modificacion')) return '??';
    if (accion.includes('Calculo')) return '??';
    if (accion.includes('Ejecucion')) return '??';
    if (accion.includes('Carga')) return '??';
    return '??';
  };

  const getActionColor = (accion: string) => {
    if (accion.includes('Creacion')) return 'text-green-600 bg-green-50';
    if (accion.includes('Modificacion')) return 'text-blue-600 bg-blue-50';
    if (accion.includes('Calculo')) return 'text-purple-600 bg-purple-50';
    if (accion.includes('Ejecucion')) return 'text-emerald-600 bg-emerald-50';
    if (accion.includes('Carga')) return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  const exportAuditLog = () => {
    alert('Exportando log de auditoria...');
  };

  const handleApplyFilters = () => {
    fetchAuditLogs({
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      usuario: userFilter || undefined
    });
  };

  if (loading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
            <div className="ml-4">
              <p className="text-gray-600">Cargando registros de auditoria...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-800">Error al cargar auditoria</h3>
            <p className="text-red-600 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trazabilidad y Auditoria</h1>
              <p className="mt-1 text-sm text-gray-500">
                Registro completo de actividades y movimientos del sistema
              </p>
            </div>
            <button
              onClick={exportAuditLog}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Log
            </button>
          </div>
        </div>

        {/* Estadisticas de Auditoria */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-md p-3">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Actividades</p>
                <p className="text-lg font-semibold text-blue-600">{auditLogs.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-md p-3">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Usuarios Activos</p>
                <p className="text-lg font-semibold text-green-600">{totalUsuarios}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 rounded-md p-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Actividades Hoy</p>
                <p className="text-lg font-semibold text-purple-600">23</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-orange-500 rounded-md p-3">
                <Filter className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Registros Filtrados</p>
                <p className="text-lg font-semibold text-orange-600">{auditLogs.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros de Auditoria */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Filtros de Busqueda</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Buscar</label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Usuario, accion, convenio..."
                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha Desde</label>
                <input
                  type="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha Hasta</label>
                <input
                  type="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Usuario</label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                >
                  <option value="">Todos los usuarios</option>
                  {usuariosUnicos.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleApplyFilters}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Auditoria */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Registros Recientes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accion</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Convenio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auditLogs
                  .filter(log =>
                    (!searchTerm ||
                      log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      log.accion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      log.convenio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      log.detalles.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  )
                  .map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.fecha}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.usuario}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.accion)}`}>
                          <span className="mr-2">{getActionIcon(log.accion)}</span>
                          {log.accion}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.convenio}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.detalles}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
