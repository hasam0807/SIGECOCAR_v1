import { useState, useEffect } from 'react';
import { conveniosService } from '../services/conveniosService';
import { Convenio as ApiConvenio } from '../types/api';

interface ConvenioUI {
  id: string;
  numero: string;
  vigencia: number;
  objeto: string;
  fechaInicio: string;
  fechaFin: string;
  valorTotal: number;
  dependencia: string;
  entidadConvenio: string;
  estado: string;
  supervisor: string;
  aporteCAR: number;
  aporteEntidad: number;
  vigenciaInicial: number;
  vigenciaFinal: number;
  createdAt: string;
  updatedAt: string;
}

const mapApiConvenioToUI = (apiConvenio: ApiConvenio): ConvenioUI => {
  const fechaInicio = new Date(apiConvenio.fecha_inicio);
  const fechaFin = new Date(apiConvenio.fecha_final);

  return {
    id: apiConvenio.id.toString(),
    numero: `${apiConvenio.numero_convenio}/${apiConvenio.vigencia}`,
    vigencia: apiConvenio.vigencia,
    objeto: apiConvenio.objeto,
    fechaInicio: fechaInicio.toISOString().split('T')[0],
    fechaFin: fechaFin.toISOString().split('T')[0],
    valorTotal: apiConvenio.valor_total_aprobado,
    dependencia: apiConvenio.dependencia.nombre,
    entidadConvenio: apiConvenio.dependencia.nombre,
    estado: 'activo',
    supervisor: apiConvenio.usuarioCreacion?.nombre
      ? `${apiConvenio.usuarioCreacion.nombre} ${apiConvenio.usuarioCreacion.apellido}`
      : 'Sin asignar',
    aporteCAR: apiConvenio.valor_total_aprobado,
    aporteEntidad: 0,
    vigenciaInicial: apiConvenio.vigencia,
    vigenciaFinal: apiConvenio.vigencia,
    createdAt: apiConvenio.fecha_creacion,
    updatedAt: apiConvenio.fecha_modificacion || apiConvenio.fecha_creacion,
  };
};

export const useConveniosAPI = () => {
  const [convenios, setConvenios] = useState<ConvenioUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConvenios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await conveniosService.getAll();
      const mappedData = data.map(mapApiConvenioToUI);
      setConvenios(mappedData);
    } catch (err: any) {
      console.error('Error fetching convenios:', err);
      setError(err.response?.data?.message || 'Error al cargar los convenios desde la API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  return {
    convenios,
    loading,
    error,
    refetch: fetchConvenios,
  };
};
