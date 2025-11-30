import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { Convenio, ItemPresupuesto, Giro } from '../../types';
import { adminService } from '../../services/adminService';

interface ConvenioFormProps {
  onClose: () => void;
  onSave: (convenio: Omit<Convenio, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  convenio?: Convenio;
  isEditing?: boolean;
}

export const ConvenioForm: React.FC<ConvenioFormProps> = ({ onClose, onSave, convenio, isEditing = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [supervisores, setSupervisores] = useState<any[]>([]);
  const [dependencias, setDependencias] = useState<any[]>([]);
  const [entidades, setEntidades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    numero: convenio?.numero || '',
    supervisor: convenio?.supervisor || '',
    dependencia: convenio?.dependencia || '',
    objeto: convenio?.objeto || '',
    estado: 'activo' as const,
    fechaInicio: convenio?.fechaInicio || '',
    fechaFin: convenio?.fechaFin || '',
    entidadConvenio: convenio?.entidadConvenio || '',
    valorTotal: convenio?.valorTotal || 0,
    aporteCAR: convenio?.aporteCAR || 0,
    aporteEntidad: convenio?.aporteEntidad || 0
  });

  const [presupuesto, setPresupuesto] = useState<ItemPresupuesto[]>(convenio?.presupuesto || []);
  const [giros, setGiros] = useState<Giro[]>(convenio?.giros || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supervisoresData, dependenciasData, entidadesData] = await Promise.all([
          adminService.supervisores.getAll(),
          adminService.dependencias.getAll(),
          adminService.entidades.getAll()
        ]);
        setSupervisores(supervisoresData);
        setDependencias(dependenciasData);
        setEntidades(entidadesData);
      } catch (err) {
        console.error('Error loading form data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Función para calcular vigencia automáticamente (solo para mostrar)
  const calculateVigencia = (fechaInicio: string, fechaFin: string) => {
    if (!fechaInicio || !fechaFin) return { vigenciaInicial: '', vigenciaFinal: '' };
    
    const yearInicio = new Date(fechaInicio).getFullYear().toString();
    const yearFin = new Date(fechaFin).getFullYear().toString();
    
    return {
      vigenciaInicial: yearInicio,
      vigenciaFinal: yearFin
    };
  };

  // Calcular vigencia solo para mostrar (no se guarda en el estado)
  const { vigenciaInicial, vigenciaFinal } = calculateVigencia(formData.fechaInicio, formData.fechaFin);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('valor') || name.includes('aporte') ? Number(value) : value
    }));
  };

  const addPresupuestoItem = () => {
    const newItem: ItemPresupuesto = {
      id: Date.now().toString(),
      item: (presupuesto.length + 1).toString(),
      actividad: '',
      valorTotal: 0,
      aporteCAR: 0,
      aporteEntidad: 0
    };
    setPresupuesto([...presupuesto, newItem]);
  };

  const updatePresupuestoItem = (id: string, field: keyof ItemPresupuesto, value: string | number) => {
    setPresupuesto(presupuesto.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removePresupuestoItem = (id: string) => {
    setPresupuesto(presupuesto.filter(item => item.id !== id));
  };

  const addGiro = (entidad: 'CAR' | 'ENTIDAD') => {
    const newGiro: Giro = {
      id: Date.now().toString(),
      numeroGiro: giros.filter(g => g.entidad === entidad).length + 1,
      entidad,
      monto: 0,
      fechaProgramada: '',
      estado: 'programado'
    };
    setGiros([...giros, newGiro]);
  };

  const updateGiro = (id: string, field: keyof Giro, value: string | number) => {
    setGiros(giros.map(giro =>
      giro.id === id ? { ...giro, [field]: value } : giro
    ));
  };

  const removeGiro = (id: string) => {
    setGiros(giros.filter(giro => giro.id !== id));
  };

  const calculateTotals = () => {
    const totalPresupuesto = presupuesto.reduce((sum, item) => sum + item.valorTotal, 0);
    const totalAporteCAR = presupuesto.reduce((sum, item) => sum + item.aporteCAR, 0);
    const totalAporteEntidad = presupuesto.reduce((sum, item) => sum + item.aporteEntidad, 0);

    return { totalPresupuesto, totalAporteCAR, totalAporteEntidad };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Validaciones básicas
      if (!formData.numero || !formData.supervisor || !formData.dependencia || !formData.objeto || !formData.entidadConvenio || !formData.fechaInicio || !formData.fechaFin) {
        throw new Error('Todos los campos obligatorios deben ser completados');
      }

      // Validar que las fechas generen vigencia válida
      if (!vigenciaInicial || !vigenciaFinal) {
        throw new Error('Las fechas de inicio y fin deben ser válidas para calcular la vigencia');
      }

      if (presupuesto.length === 0) {
        throw new Error('Debe agregar al menos un ítem al presupuesto');
      }

      // Validar que todos los items del presupuesto tengan datos
      for (const item of presupuesto) {
        if (!item.actividad || item.valorTotal <= 0) {
          throw new Error('Todos los ítems del presupuesto deben tener actividad y valor mayor a cero');
        }
      }

      const { totalPresupuesto, totalAporteCAR, totalAporteEntidad } = calculateTotals();
      
      const convenioData: Omit<Convenio, 'id' | 'createdAt' | 'updatedAt'> = {
        ...formData,
        // Vigencia se calcula automáticamente desde las fechas
        vigenciaInicial,
        vigenciaFinal,
        valorTotal: totalPresupuesto,
        aporteCAR: totalAporteCAR,
        aporteEntidad: totalAporteEntidad,
        documentos: [],
        presupuesto,
        giros,
        rendimientos: []
      };

      await onSave(convenioData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Error al guardar el convenio');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { totalPresupuesto, totalAporteCAR, totalAporteEntidad } = calculateTotals();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {isEditing ? `Editar Convenio ${convenio?.numero}` : 'Nuevo Convenio'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          {/* Datos Básicos */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-4">Datos Básicos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Convenio</label>
                <input
                  type="text"
                  name="numero"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.numero}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vigencia (Calculada Automáticamente)</label>
                <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                  {vigenciaInicial && vigenciaFinal ? `${vigenciaInicial} - ${vigenciaFinal}` : 'Ingrese fechas de inicio y fin'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Supervisor</label>
                <select
                  name="supervisor"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.supervisor}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar supervisor</option>
                  {supervisores.map(supervisor => (
                    <option key={supervisor} value={supervisor}>{supervisor}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dependencia</label>
                <select
                  name="dependencia"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.dependencia}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar dependencia</option>
                  {dependencias.map(dependencia => (
                    <option key={dependencia} value={dependencia}>{dependencia}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Entidad Convenio</label>
                <select
                  name="entidadConvenio"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.entidadConvenio}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar entidad</option>
                  {municipios.map(municipio => (
                    <option key={municipio} value={`Municipio de ${municipio}`}>Municipio de {municipio}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                  <input
                    type="date"
                    name="fechaInicio"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
                  <input
                    type="date"
                    name="fechaFin"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.fechaFin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Objeto del Convenio</label>
              <textarea
                name="objeto"
                required
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.objeto}
                onChange={handleInputChange}
                placeholder="Descripción detallada del proyecto ambiental..."
              />
            </div>
          </div>

          {/* Presupuesto */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900">Presupuesto Oficial</h4>
              <button
                type="button"
                onClick={addPresupuestoItem}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Agregar Ítem
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left text-sm font-medium text-gray-700 py-2">Ítem</th>
                    <th className="text-left text-sm font-medium text-gray-700 py-2">Actividad</th>
                    <th className="text-left text-sm font-medium text-gray-700 py-2">Valor Total</th>
                    <th className="text-left text-sm font-medium text-gray-700 py-2">Aporte CAR</th>
                    <th className="text-left text-sm font-medium text-gray-700 py-2">Aporte Entidad</th>
                    <th className="text-left text-sm font-medium text-gray-700 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {presupuesto.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">
                        <input
                          type="text"
                          className="w-full text-sm border-gray-300 rounded"
                          value={item.item}
                          onChange={(e) => updatePresupuestoItem(item.id, 'item', e.target.value)}
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="text"
                          className="w-full text-sm border-gray-300 rounded"
                          placeholder="Descripción de la actividad"
                          value={item.actividad}
                          onChange={(e) => updatePresupuestoItem(item.id, 'actividad', e.target.value)}
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          className="w-full text-sm border-gray-300 rounded"
                          value={item.valorTotal}
                          onChange={(e) => updatePresupuestoItem(item.id, 'valorTotal', Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          className="w-full text-sm border-gray-300 rounded"
                          value={item.aporteCAR}
                          onChange={(e) => updatePresupuestoItem(item.id, 'aporteCAR', Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          className="w-full text-sm border-gray-300 rounded"
                          value={item.aporteEntidad}
                          onChange={(e) => updatePresupuestoItem(item.id, 'aporteEntidad', Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2">
                        <button
                          type="button"
                          onClick={() => removePresupuestoItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-medium">
                    <td colSpan={2} className="py-2 text-right">TOTALES:</td>
                    <td className="py-2">${totalPresupuesto.toLocaleString()}</td>
                    <td className="py-2">${totalAporteCAR.toLocaleString()}</td>
                    <td className="py-2">${totalAporteEntidad.toLocaleString()}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Giros Programados */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-4">Programación de Giros</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Giros CAR */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-sm font-medium text-gray-700">Giros CAR</h5>
                  <button
                    type="button"
                    onClick={() => addGiro('CAR')}
                    className="text-sm text-emerald-600 hover:text-emerald-800"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {giros.filter(g => g.entidad === 'CAR').map((giro) => (
                  <div key={giro.id} className="flex space-x-2 mb-2">
                    <input
                      type="number"
                      placeholder="Monto"
                      className="flex-1 text-sm border-gray-300 rounded"
                      value={giro.monto}
                      onChange={(e) => updateGiro(giro.id, 'monto', Number(e.target.value))}
                    />
                    <input
                      type="date"
                      className="flex-1 text-sm border-gray-300 rounded"
                      value={giro.fechaProgramada}
                      onChange={(e) => updateGiro(giro.id, 'fechaProgramada', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeGiro(giro.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Giros Entidad */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-sm font-medium text-gray-700">Giros Entidad</h5>
                  <button
                    type="button"
                    onClick={() => addGiro('ENTIDAD')}
                    className="text-sm text-emerald-600 hover:text-emerald-800"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {giros.filter(g => g.entidad === 'ENTIDAD').map((giro) => (
                  <div key={giro.id} className="flex space-x-2 mb-2">
                    <input
                      type="number"
                      placeholder="Monto"
                      className="flex-1 text-sm border-gray-300 rounded"
                      value={giro.monto}
                      onChange={(e) => updateGiro(giro.id, 'monto', Number(e.target.value))}
                    />
                    <input
                      type="date"
                      className="flex-1 text-sm border-gray-300 rounded"
                      value={giro.fechaProgramada}
                      onChange={(e) => updateGiro(giro.id, 'fechaProgramada', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeGiro(giro.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar Convenio' : 'Guardar Convenio')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};