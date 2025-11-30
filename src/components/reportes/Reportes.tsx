import React, { useState } from 'react';
import { BarChart3, FileText, Download, Calendar, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { useSupabaseReports } from '../../hooks/useSupabaseReports';

export const Reportes: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('financiero');
  const [dateFrom, setDateFrom] = useState('2023-01-01');
  const [dateTo, setDateTo] = useState('2023-12-31');
  const { financialData, conveniosByDependencia, loading, error } = useSupabaseReports();


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const generateReport = (type: string) => {
    alert(`Generando reporte ${type}...`);
  };

  if (loading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
            <div className="ml-4">
              <p className="text-gray-600">Cargando datos de reportes...</p>
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
            <h3 className="text-lg font-medium text-red-800">Error al cargar reportes</h3>
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
          <h1 className="text-2xl font-bold text-gray-900">Reportes y Consultas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Análisis financiero y reportes especializados por área
          </p>
        </div>

        {/* Selector de Reportes */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Tipo de Reporte</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => setSelectedReport('financiero')}
                className={`p-4 rounded-lg border text-left ${selectedReport === 'financiero' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <DollarSign className={`h-6 w-6 mr-3 ${selectedReport === 'financiero' ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <div>
                    <h4 className="font-medium">Reporte Financiero</h4>
                    <p className="text-sm text-gray-500">Estados y movimientos</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setSelectedReport('tecnico')}
                className={`p-4 rounded-lg border text-left ${selectedReport === 'tecnico' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <BarChart3 className={`h-6 w-6 mr-3 ${selectedReport === 'tecnico' ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <div>
                    <h4 className="font-medium">Reporte Técnico</h4>
                    <p className="text-sm text-gray-500">Seguimiento de proyectos</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setSelectedReport('juridico')}
                className={`p-4 rounded-lg border text-left ${selectedReport === 'juridico' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <FileText className={`h-6 w-6 mr-3 ${selectedReport === 'juridico' ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <div>
                    <h4 className="font-medium">Reporte Jurídico</h4>
                    <p className="text-sm text-gray-500">Cumplimiento contractual</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Filtros de Fecha */}
            <div className="flex space-x-4 items-end">
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
              <button
                onClick={() => generateReport(selectedReport)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </button>
            </div>
          </div>
        </div>

        {/* Contenido del Reporte */}
        {selectedReport === 'financiero' && (
          <div className="space-y-8">
            {/* Métricas Financieras */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-emerald-500 rounded-md p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Total Ingresos</p>
                  <p className="text-lg font-semibold text-emerald-600">
                    {formatCurrency(
                      financialData.reduce((sum, item) => sum + (item.ingresos || 0), 0)
                    )}
                  </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-red-500 rounded-md p-3">
                    <TrendingUp className="h-6 w-6 text-white transform rotate-180" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Total Egresos</p>
                    <p className="text-lg font-semibold text-red-600">{formatCurrency(90000000)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-purple-500 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Rendimientos</p>
                    <p className="text-lg font-semibold text-purple-600">{formatCurrency(135800000)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-blue-500 rounded-md p-3">
                    <PieChart className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Margen Neto</p>
                    <p className="text-lg font-semibold text-blue-600">84.0%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos Financieros */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Evolución Financiera Mensual</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                    <Bar dataKey="ingresos" fill="#10B981" name="Ingresos" />
                    <Bar dataKey="egresos" fill="#EF4444" name="Egresos" />
                    <Bar dataKey="rendimientos" fill="#8B5CF6" name="Rendimientos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Convenios por Dependencia</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={conveniosByDependencia}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ nombre, value }) => `${nombre}: ${value}`}
                    >
                      {conveniosByDependencia.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabla de Rendimientos Detallada */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Detalle de Rendimientos por Convenio</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Convenio</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Capital Base</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tasa %</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rend. Bruto</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Deducciones</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rend. Neto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">3649/2022</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{formatCurrency(108000000)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">12.0%</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{formatCurrency(10800000)}</td>
                      <td className="px-6 py-4 text-sm text-red-600 text-right">-{formatCurrency(324000)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600 text-right">{formatCurrency(10476000)}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">4125/2023</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{formatCurrency(192000000)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">12.0%</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{formatCurrency(19200000)}</td>
                      <td className="px-6 py-4 text-sm text-red-600 text-right">-{formatCurrency(576000)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600 text-right">{formatCurrency(18624000)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'tecnico' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reporte Técnico - Seguimiento de Proyectos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Proyectos por Estado</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">En Ejecución</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Finalizados</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">En Planificación</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">8</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Tipos de Proyecto</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Huertos Dendroenergeticos</span>
                    <span className="text-sm font-medium">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Reforestación</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Obras de Bioingeniería</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ecoestufas</span>
                    <span className="text-sm font-medium">13</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'juridico' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reporte Jurídico - Cumplimiento Contractual</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Cumplimiento General</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-gray-600">Vencimientos Próximos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">2</div>
                <div className="text-sm text-gray-600">Incumplimientos</div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Estado Contractual</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm">Convenios al día</span>
                  <span className="text-sm font-medium text-green-600">40</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span className="text-sm">Próximos a vencer</span>
                  <span className="text-sm font-medium text-yellow-600">3</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="text-sm">En mora</span>
                  <span className="text-sm font-medium text-red-600">2</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reportes Rápidos */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Reportes Rápidos</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => generateReport('consolidado-mensual')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <h4 className="font-medium text-gray-900">Consolidado Mensual</h4>
                <p className="text-sm text-gray-500 mt-1">Resumen de todos los convenios del mes</p>
              </button>
              <button
                onClick={() => generateReport('rendimientos-periodo')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <h4 className="font-medium text-gray-900">Rendimientos por Período</h4>
                <p className="text-sm text-gray-500 mt-1">Análisis detallado de rendimientos</p>
              </button>
              <button
                onClick={() => generateReport('proyecciones')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <h4 className="font-medium text-gray-900">Proyecciones Financieras</h4>
                <p className="text-sm text-gray-500 mt-1">Estimaciones futuras de rendimientos</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
