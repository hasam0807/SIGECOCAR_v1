import React from 'react';
import { Calculator, TrendingUp, DollarSign, Percent } from 'lucide-react';

export const Financiero: React.FC = () => {
  const rendimientos = [
    { convenio: '3649/2022', periodo: '2023-11', valorBase: 108000000, tasa: 12, rendimientoBruto: 1080000, deducciones: 32400, rendimientoNeto: 1047600 },
    { convenio: '4125/2023', periodo: '2023-11', valorBase: 192000000, tasa: 12, rendimientoBruto: 1920000, deducciones: 57600, rendimientoNeto: 1862400 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalRendimientos = rendimientos.reduce((sum, r) => sum + r.rendimientoNeto, 0);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Módulo Financiero</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestión de rendimientos y estados financieros de convenios
          </p>
        </div>

        {/* Métricas Financieras */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-emerald-500 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Rendimientos del Mes</p>
                <p className="text-lg font-semibold text-emerald-600">{formatCurrency(totalRendimientos)}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Tasa Promedio</p>
                <p className="text-lg font-semibold text-blue-600">12.0%</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 rounded-md p-3">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Deducciones</p>
                <p className="text-lg font-semibold text-purple-600">{formatCurrency(90000)}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-md p-3">
                <Percent className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">% Deducciones</p>
                <p className="text-lg font-semibold text-yellow-600">3.0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculadora de Rendimientos */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Calculadora de Rendimientos</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Valor Base</label>
                <input
                  type="number"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ingrese el valor base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tasa de Interés (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="12.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Período (días)</label>
                <input
                  type="number"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="30"
                />
              </div>
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
              Calcular Rendimiento
            </button>
          </div>
        </div>

        {/* Tabla de Rendimientos */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Rendimientos por Convenio</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Convenio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Base
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tasa (%)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rend. Bruto
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deducciones
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rend. Neto
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rendimientos.map((rendimiento, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rendimiento.convenio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rendimiento.periodo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {formatCurrency(rendimiento.valorBase)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {rendimiento.tasa}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {formatCurrency(rendimiento.rendimientoBruto)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                      -{formatCurrency(rendimiento.deducciones)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 text-right">
                      {formatCurrency(rendimiento.rendimientoNeto)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={6} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                    Total Rendimientos Netos:
                  </td>
                  <td className="px-6 py-3 text-right text-sm font-bold text-green-600">
                    {formatCurrency(totalRendimientos)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Configuración de Deducciones */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Configuración de Deducciones</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Retención en la Fuente (%)</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue="2.5"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gastos Bancarios (%)</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue="0.5"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};