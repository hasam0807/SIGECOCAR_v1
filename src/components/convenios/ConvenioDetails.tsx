import React from 'react';
import { X, Download, FileText, Calendar, DollarSign, Building, CreditCard as Edit } from 'lucide-react';
import { Convenio } from '../../types';

interface ConvenioDetailsProps {
  convenio: Convenio;
  onClose: () => void;
  onEdit: () => void;
}

export const ConvenioDetails: React.FC<ConvenioDetailsProps> = ({ convenio, onClose, onEdit }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const generateLiquidationFormat = () => {
    // This would generate the PDF format for liquidation
    alert('Generando formato de liquidación Anexo 01...');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Convenio {convenio.numero}</h3>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar Convenio
            </button>
            <button
              onClick={generateLiquidationFormat}
              className="inline-flex items-center px-3 py-2 border border-emerald-300 rounded-md text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
            >
              <Download className="h-4 w-4 mr-2" />
              Formato Liquidación
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-emerald-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Número</p>
                  <p className="font-semibold text-gray-900">{convenio.numero}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Vigencia</p>
                  <p className="font-semibold text-gray-900">{convenio.vigenciaInicial} - {convenio.vigenciaFinal}</p>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Valor Total</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(convenio.valorTotal)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Información General</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Supervisor Asignado</p>
                <p className="text-gray-900">{convenio.supervisor}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Dependencia Responsable</p>
                <p className="text-gray-900">{convenio.dependencia}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Entidad Convenio</p>
                <p className="text-gray-900">{convenio.entidadConvenio}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Estado</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  convenio.estado === 'activo' ? 'bg-green-100 text-green-800' :
                  convenio.estado === 'finalizado' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {convenio.estado === 'activo' ? 'Activo' : 
                   convenio.estado === 'finalizado' ? 'Finalizado' : 'En Proceso'}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Objeto del Convenio</p>
              <p className="text-gray-900 mt-1">{convenio.objeto}</p>
            </div>
          </div>

          {/* Presupuesto */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Presupuesto Oficial del Convenio</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ítem</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actividad</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valor Total</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aporte CAR</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aporte Entidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {convenio.presupuesto.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.item}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.actividad}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.valorTotal)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.aporteCAR)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.aporteEntidad)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={2} className="px-4 py-3 text-sm font-medium text-gray-900">TOTALES</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(convenio.valorTotal)}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(convenio.aporteCAR)}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(convenio.aporteEntidad)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Giros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Giros CAR */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Giros CAR</h4>
              <div className="space-y-3">
                {convenio.giros.filter(g => g.entidad === 'CAR').map((giro) => (
                  <div key={giro.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">Giro #{giro.numeroGiro}</p>
                      <p className="text-xs text-gray-500">{giro.fechaProgramada}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(giro.monto)}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        giro.estado === 'ejecutado' ? 'bg-green-100 text-green-800' :
                        giro.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {giro.estado === 'ejecutado' ? 'Ejecutado' :
                         giro.estado === 'pendiente' ? 'Pendiente' : 'Programado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Giros Entidad */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Giros Entidad</h4>
              <div className="space-y-3">
                {convenio.giros.filter(g => g.entidad === 'ENTIDAD').map((giro) => (
                  <div key={giro.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">Giro #{giro.numeroGiro}</p>
                      <p className="text-xs text-gray-500">{giro.fechaProgramada}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(giro.monto)}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        giro.estado === 'ejecutado' ? 'bg-green-100 text-green-800' :
                        giro.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {giro.estado === 'ejecutado' ? 'Ejecutado' :
                         giro.estado === 'pendiente' ? 'Pendiente' : 'Programado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rendimientos */}
          {convenio.rendimientos.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Rendimientos Financieros</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Período</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tasa</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valor Base</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rend. Bruto</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Deducciones</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rend. Neto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {convenio.rendimientos.map((rendimiento) => (
                      <tr key={rendimiento.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">{rendimiento.periodo}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{(rendimiento.tasaInteres * 100).toFixed(2)}%</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(rendimiento.valorBase)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(rendimiento.rendimientoBruto)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(rendimiento.deducciones)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-green-600 text-right">{formatCurrency(rendimiento.rendimientoNeto)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};