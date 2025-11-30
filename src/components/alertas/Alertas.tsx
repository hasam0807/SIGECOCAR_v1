import React from 'react';
import { Bell, AlertTriangle, Calendar, FileText, Clock, CheckCircle } from 'lucide-react';
import { mockAlertas } from '../../data/mockData';

export const Alertas: React.FC = () => {
  const alertas = mockAlertas;

  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case 'vencimiento':
        return Calendar;
      case 'documento':
        return FileText;
      case 'financiero':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getAlertColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'bg-red-500',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-800'
        };
      case 'media':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'bg-yellow-500',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      case 'baja':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'bg-blue-500',
          text: 'text-blue-700',
          badge: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'bg-gray-500',
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sistema de Alertas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Notificaciones automáticas y seguimiento de eventos críticos
          </p>
        </div>

        {/* Resumen de Alertas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-red-500 rounded-md p-3">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Alertas Críticas</p>
                <p className="text-lg font-semibold text-red-600">1</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-md p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Vencimientos</p>
                <p className="text-lg font-semibold text-yellow-600">3</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-md p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Documentos</p>
                <p className="text-lg font-semibold text-blue-600">8</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-md p-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Resueltas Hoy</p>
                <p className="text-lg font-semibold text-green-600">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Configuración de Alertas */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Configuración de Notificaciones</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Vencimientos Contractuales</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="ml-2 text-sm text-gray-700">Alertar 30 días antes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="ml-2 text-sm text-gray-700">Alertar 15 días antes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="ml-2 text-sm text-gray-700">Alertar 7 días antes</span>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Movimientos Financieros</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="ml-2 text-sm text-gray-700">Giros pendientes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="ml-2 text-sm text-gray-700">Movimientos inusuales</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="ml-2 text-sm text-gray-700">Rendimientos calculados</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Alertas */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Alertas Activas</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {alertas.map((alerta) => {
              const Icon = getAlertIcon(alerta.tipo);
              const colors = getAlertColor(alerta.prioridad);
              
              return (
                <div key={alerta.id} className={`p-6 ${colors.bg} ${colors.border} border-l-4`}>
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-lg font-medium ${colors.text}`}>
                          {alerta.tipo === 'vencimiento' ? 'Vencimiento Contractual' :
                           alerta.tipo === 'documento' ? 'Documento Pendiente' :
                           alerta.tipo === 'financiero' ? 'Movimiento Financiero' : 'Notificación General'}
                        </h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                          {alerta.prioridad.toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{alerta.mensaje}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{alerta.fechaCreacion}</span>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button className="text-sm bg-white border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50">
                          Ver Detalles
                        </button>
                        <button className="text-sm bg-emerald-600 text-white rounded-md px-3 py-1 hover:bg-emerald-700">
                          Marcar como Resuelta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Historial de Alertas */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Historial de Alertas Resueltas</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Giro ejecutado - Convenio 4125/2023</p>
                    <p className="text-xs text-gray-500">Resuelto el 2023-11-19</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 font-medium">RESUELTO</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Documento cargado - Acta de liquidación</p>
                    <p className="text-xs text-gray-500">Resuelto el 2023-11-18</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 font-medium">RESUELTO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};