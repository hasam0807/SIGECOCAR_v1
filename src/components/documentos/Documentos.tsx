import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Search, Filter, Folder } from 'lucide-react';

export const Documentos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const documentos = [
    {
      id: '1',
      nombre: 'Convenio_3649_2022_Firmado.pdf',
      tipo: 'convenio',
      convenio: '3649/2022',
      fechaSubida: '2022-03-15',
      tamaño: '2.5 MB',
      usuario: 'Ing. María González',
      url: '#'
    },
    {
      id: '2',
      nombre: 'Acta_Liquidacion_3649_2022.pdf',
      tipo: 'acta',
      convenio: '3649/2022',
      fechaSubida: '2023-11-19',
      tamaño: '1.8 MB',
      usuario: 'Dr. Ana Martínez',
      url: '#'
    },
    {
      id: '3',
      nombre: 'Certificacion_Movimientos_Nov_2023.pdf',
      tipo: 'certificacion',
      convenio: '4125/2023',
      fechaSubida: '2023-11-20',
      tamaño: '1.2 MB',
      usuario: 'Ing. Carlos Rodríguez',
      url: '#'
    },
    {
      id: '4',
      nombre: 'Comprobante_Giro_001_CAR.pdf',
      tipo: 'comprobante',
      convenio: '3649/2022',
      fechaSubida: '2022-04-01',
      tamaño: '0.8 MB',
      usuario: 'Sistema',
      url: '#'
    },
    {
      id: '5',
      nombre: 'Formato_Unico_Validado_4156.xlsx',
      tipo: 'otro',
      convenio: '4156/2023',
      fechaSubida: '2023-11-20',
      tamaño: '1.5 MB',
      usuario: 'Ing. Luis Pérez',
      url: '#'
    }
  ];

  const getDocumentIcon = (tipo: string) => {
    switch (tipo) {
      case 'convenio':
        return '📄';
      case 'acta':
        return '📋';
      case 'certificacion':
        return '🏆';
      case 'comprobante':
        return '🧾';
      default:
        return '📁';
    }
  };

  const getDocumentTypeLabel = (tipo: string) => {
    const labels = {
      convenio: 'Convenio',
      acta: 'Acta',
      certificacion: 'Certificación',
      comprobante: 'Comprobante',
      otro: 'Otro'
    };
    return labels[tipo as keyof typeof labels] || 'Documento';
  };

  const getDocumentTypeColor = (tipo: string) => {
    const colors = {
      convenio: 'bg-blue-100 text-blue-800',
      acta: 'bg-green-100 text-green-800',
      certificacion: 'bg-purple-100 text-purple-800',
      comprobante: 'bg-yellow-100 text-yellow-800',
      otro: 'bg-gray-100 text-gray-800'
    };
    return colors[tipo as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleFileUpload = () => {
    alert('Funcionalidad de carga de archivos...');
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión Documental</h1>
              <p className="mt-1 text-sm text-gray-500">
                Repositorio centralizado de documentos por convenio
              </p>
            </div>
            <button
              onClick={handleFileUpload}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Subir Documento
            </button>
          </div>
        </div>

        {/* Estadísticas de Documentos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-md p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Documentos</p>
                <p className="text-lg font-semibold text-blue-600">127</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-md p-3">
                <Folder className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Convenios Firmados</p>
                <p className="text-lg font-semibold text-green-600">45</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 rounded-md p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Certificaciones</p>
                <p className="text-lg font-semibold text-purple-600">23</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-md p-3">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Subidos Hoy</p>
                <p className="text-lg font-semibold text-yellow-600">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros de Documentos */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Buscar Documentos</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, convenio..."
                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <select
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">Todos los tipos</option>
                  <option value="convenio">Convenios</option>
                  <option value="acta">Actas</option>
                  <option value="certificacion">Certificaciones</option>
                  <option value="comprobante">Comprobantes</option>
                  <option value="otro">Otros</option>
                </select>
              </div>
              <div>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros Avanzados
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Documentos */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Repositorio de Documentos</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Convenio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tamaño
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documentos.map((documento) => (
                  <tr key={documento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getDocumentIcon(documento.tipo)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{documento.nombre}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentTypeColor(documento.tipo)}`}>
                        {getDocumentTypeLabel(documento.tipo)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {documento.convenio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {documento.fechaSubida}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {documento.tamaño}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {documento.usuario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-emerald-600 hover:text-emerald-900">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categorías de Documentos */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Documentos por Categoría</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📄</span>
                    <span className="text-sm text-gray-700">Convenios Firmados</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📋</span>
                    <span className="text-sm text-gray-700">Actas de Liquidación</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🏆</span>
                    <span className="text-sm text-gray-700">Certificaciones</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🧾</span>
                    <span className="text-sm text-gray-700">Comprobantes</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">31</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📁</span>
                    <span className="text-sm text-gray-700">Otros Documentos</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">10</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Validación de Formatos</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800">Formato Anexo 01</h4>
                  <p className="text-xs text-green-600 mt-1">Liquidación de cuentas conjuntas</p>
                  <div className="mt-2">
                    <span className="text-xs text-green-700">✓ Validado automáticamente</span>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800">Formato Único Nacional</h4>
                  <p className="text-xs text-blue-600 mt-1">Registro de proyectos ambientales</p>
                  <div className="mt-2">
                    <span className="text-xs text-blue-700">ⓘ Requiere validación manual</span>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-800">Certificaciones Bancarias</h4>
                  <p className="text-xs text-yellow-600 mt-1">Movimientos y saldos</p>
                  <div className="mt-2">
                    <span className="text-xs text-yellow-700">⚠ Pendiente de validación</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};