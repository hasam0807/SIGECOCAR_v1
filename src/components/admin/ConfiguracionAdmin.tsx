import React, { useState } from 'react';
import { Save, RefreshCw, Percent, DollarSign, Calendar, Mail } from 'lucide-react';

interface ConfigItem {
  key: string;
  label: string;
  value: string;
  type: 'text' | 'number' | 'email' | 'percentage' | 'currency';
  description: string;
  category: 'financiero' | 'sistema' | 'notificaciones' | 'general';
}

export const ConfiguracionAdmin: React.FC = () => {
  const [config, setConfig] = useState<ConfigItem[]>([
    // Configuración Financiera
    {
      key: 'tasa_interes_default',
      label: 'Tasa de Interés por Defecto',
      value: '12.0',
      type: 'percentage',
      description: 'Tasa de interés anual aplicada por defecto a los rendimientos',
      category: 'financiero'
    },
    {
      key: 'retencion_fuente',
      label: 'Retención en la Fuente',
      value: '2.5',
      type: 'percentage',
      description: 'Porcentaje de retención en la fuente aplicado a rendimientos',
      category: 'financiero'
    },
    {
      key: 'gastos_bancarios',
      label: 'Gastos Bancarios',
      value: '0.5',
      type: 'percentage',
      description: 'Porcentaje de gastos bancarios aplicado a transacciones',
      category: 'financiero'
    },
    {
      key: 'valor_minimo_convenio',
      label: 'Valor Mínimo de Convenio',
      value: '50000000',
      type: 'currency',
      description: 'Valor mínimo permitido para crear un convenio',
      category: 'financiero'
    },
    
    // Configuración de Sistema
    {
      key: 'registros_por_pagina',
      label: 'Registros por Página',
      value: '25',
      type: 'number',
      description: 'Número de registros mostrados por página en las tablas',
      category: 'sistema'
    },
    {
      key: 'tiempo_sesion',
      label: 'Tiempo de Sesión (minutos)',
      value: '120',
      type: 'number',
      description: 'Tiempo máximo de inactividad antes de cerrar sesión',
      category: 'sistema'
    },
    {
      key: 'backup_automatico',
      label: 'Backup Automático (días)',
      value: '7',
      type: 'number',
      description: 'Frecuencia en días para realizar backup automático',
      category: 'sistema'
    },
    
    // Configuración de Notificaciones
    {
      key: 'dias_alerta_vencimiento',
      label: 'Días de Alerta Vencimiento',
      value: '30,15,7',
      type: 'text',
      description: 'Días antes del vencimiento para enviar alertas (separados por coma)',
      category: 'notificaciones'
    },
    {
      key: 'email_notificaciones',
      label: 'Email para Notificaciones',
      value: 'notificaciones@car.gov.co',
      type: 'email',
      description: 'Dirección de email para envío de notificaciones del sistema',
      category: 'notificaciones'
    },
    {
      key: 'habilitar_sms',
      label: 'Habilitar SMS',
      value: 'false',
      type: 'text',
      description: 'Habilitar o deshabilitar notificaciones por SMS (true/false)',
      category: 'notificaciones'
    },
    
    // Configuración General
    {
      key: 'nombre_institucion',
      label: 'Nombre de la Institución',
      value: 'Corporación Autónoma Regional de Cundinamarca - CAR',
      type: 'text',
      description: 'Nombre oficial de la institución para reportes y documentos',
      category: 'general'
    },
    {
      key: 'nit_institucion',
      label: 'NIT de la Institución',
      value: '899999114-8',
      type: 'text',
      description: 'Número de identificación tributaria de la CAR',
      category: 'general'
    }
  ]);

  const [hasChanges, setHasChanges] = useState(false);

  const handleValueChange = (key: string, newValue: string) => {
    setConfig(config.map(item => 
      item.key === key ? { ...item, value: newValue } : item
    ));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Aquí se guardarían los cambios en la base de datos
    alert('Configuración guardada exitosamente');
    setHasChanges(false);
  };

  const handleReset = () => {
    if (confirm('¿Está seguro de restablecer la configuración a los valores por defecto?')) {
      // Aquí se restablecerían los valores por defecto
      alert('Configuración restablecida');
      setHasChanges(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financiero':
        return DollarSign;
      case 'sistema':
        return RefreshCw;
      case 'notificaciones':
        return Mail;
      default:
        return Calendar;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financiero':
        return 'bg-green-50 border-green-200';
      case 'sistema':
        return 'bg-blue-50 border-blue-200';
      case 'notificaciones':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const categories = [
    { key: 'financiero', label: 'Configuración Financiera' },
    { key: 'sistema', label: 'Configuración del Sistema' },
    { key: 'notificaciones', label: 'Configuración de Notificaciones' },
    { key: 'general', label: 'Configuración General' }
  ];

  const formatValue = (item: ConfigItem) => {
    switch (item.type) {
      case 'percentage':
        return `${item.value}%`;
      case 'currency':
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
        }).format(Number(item.value));
      default:
        return item.value;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Configuración del Sistema</h2>
          <p className="text-sm text-gray-600">Administre los parámetros y configuraciones globales</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Restablecer
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              hasChanges 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Hay cambios sin guardar. Recuerde guardar la configuración antes de salir.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {categories.map((category) => {
          const categoryItems = config.filter(item => item.category === category.key);
          const Icon = getCategoryIcon(category.key);
          
          return (
            <div key={category.key} className={`border rounded-lg p-6 ${getCategoryColor(category.key)}`}>
              <div className="flex items-center mb-4">
                <Icon className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">{category.label}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryItems.map((item) => (
                  <div key={item.key} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {item.label}
                      </label>
                      <div className="text-xs text-gray-500">
                        {formatValue(item)}
                      </div>
                    </div>
                    
                    <input
                      type={item.type === 'percentage' || item.type === 'currency' ? 'number' : item.type}
                      step={item.type === 'percentage' ? '0.1' : item.type === 'currency' ? '1000' : '1'}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                      value={item.value}
                      onChange={(e) => handleValueChange(item.key, e.target.value)}
                    />
                    
                    <p className="mt-2 text-xs text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Información del Sistema */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Versión:</span>
            <span className="ml-2 text-gray-600">1.0.0</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Última actualización:</span>
            <span className="ml-2 text-gray-600">2023-11-20</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Base de datos:</span>
            <span className="ml-2 text-gray-600">PostgreSQL 15.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};