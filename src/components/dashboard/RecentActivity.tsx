import React from 'react';
import { Clock, User, FileText, DollarSign } from 'lucide-react';

const recentActivities = [
  {
    id: 1,
    type: 'convenio_created',
    message: 'Nuevo convenio 4156/2023 registrado',
    user: 'Ing. María González',
    timestamp: '2023-11-20 14:30',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    id: 2,
    type: 'rendimiento_calculated',
    message: 'Rendimientos calculados para convenio 3649/2022',
    user: 'Sistema',
    timestamp: '2023-11-20 10:15',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    id: 3,
    type: 'giro_executed',
    message: 'Giro ejecutado - Convenio 4125/2023',
    user: 'Ing. Carlos Rodríguez',
    timestamp: '2023-11-19 16:45',
    icon: DollarSign,
    color: 'text-emerald-600'
  },
  {
    id: 4,
    type: 'document_uploaded',
    message: 'Documento cargado - Acta de liquidación',
    user: 'Dr. Ana Martínez',
    timestamp: '2023-11-19 09:20',
    icon: FileText,
    color: 'text-purple-600'
  }
];

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <User className="w-3 h-3 mr-1" />
                    <span className="mr-3">{activity.user}</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <button className="w-full text-center text-sm text-emerald-600 hover:text-emerald-800 font-medium">
            Ver toda la actividad
          </button>
        </div>
      </div>
    </div>
  );
};