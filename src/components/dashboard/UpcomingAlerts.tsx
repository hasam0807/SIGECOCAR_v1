import React from 'react';
import { AlertTriangle, Clock, FileText, Calendar } from 'lucide-react';
import { mockAlertas } from '../../data/mockData';

export const UpcomingAlerts: React.FC = () => {
  const alerts = mockAlertas;

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
        return 'text-red-600 bg-red-100';
      case 'media':
        return 'text-yellow-600 bg-yellow-100';
      case 'baja':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Alertas y Notificaciones</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.tipo);
            const colorClasses = getAlertColor(alert.prioridad);
            
            return (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${colorClasses}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{alert.mensaje}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses.replace('bg-', 'bg-').replace('text-', 'text-')}`}>
                      {alert.prioridad.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{alert.fechaCreacion}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <button className="w-full text-center text-sm text-emerald-600 hover:text-emerald-800 font-medium">
            Ver todas las alertas
          </button>
        </div>
      </div>
    </div>
  );
};