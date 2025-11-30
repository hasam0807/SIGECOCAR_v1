import React, { useState } from 'react';
import { Download, Upload, Database, Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface BackupRecord {
  id: string;
  fecha: string;
  tipo: 'automatico' | 'manual';
  tamaño: string;
  estado: 'completado' | 'fallido' | 'en_proceso';
  descripcion: string;
}

export const BackupAdmin: React.FC = () => {
  const [backups, setBackups] = useState<BackupRecord[]>([
    {
      id: '1',
      fecha: '2023-11-20 02:00:00',
      tipo: 'automatico',
      tamaño: '245 MB',
      estado: 'completado',
      descripcion: 'Backup automático diario - Base de datos completa'
    },
    {
      id: '2',
      fecha: '2023-11-19 15:30:00',
      tipo: 'manual',
      tamaño: '243 MB',
      estado: 'completado',
      descripcion: 'Backup manual antes de actualización del sistema'
    },
    {
      id: '3',
      fecha: '2023-11-19 02:00:00',
      tipo: 'automatico',
      tamaño: '241 MB',
      estado: 'completado',
      descripcion: 'Backup automático diario - Base de datos completa'
    },
    {
      id: '4',
      fecha: '2023-11-18 02:00:00',
      tipo: 'automatico',
      tamaño: '0 MB',
      estado: 'fallido',
      descripcion: 'Error en backup automático - Espacio insuficiente'
    }
  ]);

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    
    // Simular proceso de backup
    setTimeout(() => {
      const newBackup: BackupRecord = {
        id: Date.now().toString(),
        fecha: new Date().toISOString().replace('T', ' ').substring(0, 19),
        tipo: 'manual',
        tamaño: '247 MB',
        estado: 'completado',
        descripcion: 'Backup manual creado desde panel de administración'
      };
      
      setBackups([newBackup, ...backups]);
      setIsCreatingBackup(false);
      alert('Backup creado exitosamente');
    }, 3000);
  };

  const handleDownloadBackup = (backupId: string) => {
    alert(`Descargando backup ${backupId}...`);
  };

  const handleRestoreBackup = (backupId: string) => {
    if (confirm('¿Está seguro de restaurar este backup? Esta acción no se puede deshacer.')) {
      alert(`Restaurando backup ${backupId}...`);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'fallido':
        return 'bg-red-100 text-red-800';
      case 'en_proceso':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'completado':
        return CheckCircle;
      case 'fallido':
        return AlertTriangle;
      case 'en_proceso':
        return Clock;
      default:
        return Database;
    }
  };

  const getTipoColor = (tipo: string) => {
    return tipo === 'automatico' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Respaldo y Restauración</h2>
          <p className="text-sm text-gray-600">Gestione los backups del sistema y restauración de datos</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => document.getElementById('restore-file')?.click()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Restaurar desde Archivo
          </button>
          <button
            onClick={handleCreateBackup}
            disabled={isCreatingBackup}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isCreatingBackup 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            <Database className="h-4 w-4 mr-2" />
            {isCreatingBackup ? 'Creando Backup...' : 'Crear Backup'}
          </button>
        </div>
      </div>

      <input
        id="restore-file"
        type="file"
        accept=".sql,.backup"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            alert(`Archivo seleccionado: ${e.target.files[0].name}`);
          }
        }}
      />

      {/* Estadísticas de Backup */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Backups Exitosos</p>
              <p className="text-lg font-semibold text-green-600">
                {backups.filter(b => b.estado === 'completado').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Backups Fallidos</p>
              <p className="text-lg font-semibold text-red-600">
                {backups.filter(b => b.estado === 'fallido').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Tamaño Total</p>
              <p className="text-lg font-semibold text-blue-600">975 MB</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Último Backup</p>
              <p className="text-lg font-semibold text-purple-600">Hoy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Configuración de Backup Automático */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración de Backup Automático</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Frecuencia</label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
              <option value="diario">Diario</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hora de Ejecución</label>
            <input
              type="time"
              defaultValue="02:00"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Retención (días)</label>
            <input
              type="number"
              defaultValue="30"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Guardar Configuración
          </button>
        </div>
      </div>

      {/* Historial de Backups */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Historial de Backups</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamaño
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups.map((backup) => {
                const EstadoIcon = getEstadoIcon(backup.estado);
                return (
                  <tr key={backup.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{backup.fecha}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(backup.tipo)}`}>
                        {backup.tipo === 'automatico' ? 'Automático' : 'Manual'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <EstadoIcon className="h-4 w-4 mr-2" />
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(backup.estado)}`}>
                          {backup.estado === 'completado' ? 'Completado' : 
                           backup.estado === 'fallido' ? 'Fallido' : 'En Proceso'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{backup.tamaño}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{backup.descripcion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {backup.estado === 'completado' && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleDownloadBackup(backup.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Descargar"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRestoreBackup(backup.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Restaurar"
                          >
                            <Upload className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-yellow-800 mb-2">Recomendaciones de Backup</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Mantenga al menos 30 días de backups para recuperación</li>
          <li>• Verifique regularmente que los backups se estén ejecutando correctamente</li>
          <li>• Pruebe la restauración periódicamente en un ambiente de pruebas</li>
          <li>• Considere almacenar backups en ubicaciones externas para mayor seguridad</li>
        </ul>
      </div>
    </div>
  );
};