import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Convenio, ItemPresupuesto, Giro, Rendimiento, Documento } from '../types';

export const useSupabaseConvenios = () => {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all convenios with related data
  const fetchConvenios = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch convenios
      const { data: conveniosData, error: conveniosError } = await supabase
        .from('convenios')
        .select('*')
        .order('created_at', { ascending: false });

      if (conveniosError) throw conveniosError;

      // Fetch related data for each convenio
      const conveniosWithRelatedData = await Promise.all(
        conveniosData.map(async (convenio) => {
          // Fetch presupuesto items
          const { data: presupuestoData } = await supabase
            .from('presupuesto_items')
            .select('*')
            .eq('convenio_id', convenio.id)
            .order('item');

          // Fetch giros
          const { data: girosData } = await supabase
            .from('giros')
            .select('*')
            .eq('convenio_id', convenio.id)
            .order('numero_giro');

          // Fetch rendimientos
          const { data: rendimientosData } = await supabase
            .from('rendimientos')
            .select('*')
            .eq('convenio_id', convenio.id)
            .order('fecha_calculo', { ascending: false });

          // Fetch documentos
          const { data: documentosData } = await supabase
            .from('documentos')
            .select('*')
            .eq('convenio_id', convenio.id)
            .order('fecha_subida', { ascending: false });

          // Transform data to match frontend types
          const transformedConvenio: Convenio = {
            id: convenio.id,
            numero: convenio.numero,
            vigenciaInicial: convenio.vigencia.split('-')[0] || '',
            vigenciaFinal: convenio.vigencia.split('-')[1] || '',
            supervisor: convenio.supervisor,
            dependencia: convenio.dependencia,
            objeto: convenio.objeto,
            estado: convenio.estado,
            fechaInicio: convenio.fecha_inicio,
            fechaFin: convenio.fecha_fin,
            entidadConvenio: convenio.entidad_convenio,
            valorTotal: convenio.valor_total,
            aporteCAR: convenio.aporte_car,
            aporteEntidad: convenio.aporte_entidad,
            presupuesto: presupuestoData?.map(item => ({
              id: item.id,
              item: item.item,
              actividad: item.actividad,
              valorTotal: item.valor_total,
              aporteCAR: item.aporte_car,
              aporteEntidad: item.aporte_entidad
            })) || [],
            giros: girosData?.map(giro => ({
              id: giro.id,
              numeroGiro: giro.numero_giro,
              entidad: giro.entidad,
              monto: giro.monto,
              fechaProgramada: giro.fecha_programada,
              fechaEjecutada: giro.fecha_ejecutada || undefined,
              estado: giro.estado
            })) || [],
            rendimientos: rendimientosData?.map(rendimiento => ({
              id: rendimiento.id,
              periodo: rendimiento.periodo,
              tasaInteres: rendimiento.tasa_interes,
              valorBase: rendimiento.valor_base,
              rendimientoBruto: rendimiento.rendimiento_bruto,
              deducciones: rendimiento.deducciones,
              rendimientoNeto: rendimiento.rendimiento_neto,
              fechaCalculo: rendimiento.fecha_calculo
            })) || [],
            documentos: documentosData?.map(doc => ({
              id: doc.id,
              nombre: doc.nombre,
              tipo: doc.tipo,
              url: doc.url,
              fechaSubida: doc.fecha_subida,
              tamaño: doc.tamaño
            })) || [],
            createdAt: convenio.created_at,
            updatedAt: convenio.updated_at
          };

          return transformedConvenio;
        })
      );

      setConvenios(conveniosWithRelatedData);
    } catch (err) {
      console.error('Error fetching convenios:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Add new convenio
  const addConvenio = async (convenioData: Omit<Convenio, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);

      // Insert convenio
      const { data: convenio, error: convenioError } = await supabase
        .from('convenios')
        .insert({
          numero: convenioData.numero,
          vigencia: `${convenioData.vigenciaInicial}-${convenioData.vigenciaFinal}`,
          supervisor: convenioData.supervisor,
          dependencia: convenioData.dependencia,
          objeto: convenioData.objeto,
          estado: convenioData.estado,
          fecha_inicio: convenioData.fechaInicio,
          fecha_fin: convenioData.fechaFin,
          entidad_convenio: convenioData.entidadConvenio,
          valor_total: convenioData.valorTotal,
          aporte_car: convenioData.aporteCAR,
          aporte_entidad: convenioData.aporteEntidad
        })
        .select()
        .single();

      if (convenioError) throw convenioError;

      // Insert presupuesto items
      if (convenioData.presupuesto.length > 0) {
        const { error: presupuestoError } = await supabase
          .from('presupuesto_items')
          .insert(
            convenioData.presupuesto.map(item => ({
              convenio_id: convenio.id,
              item: item.item,
              actividad: item.actividad,
              valor_total: item.valorTotal,
              aporte_car: item.aporteCAR,
              aporte_entidad: item.aporteEntidad
            }))
          );

        if (presupuestoError) throw presupuestoError;
      }

      // Insert giros
      if (convenioData.giros.length > 0) {
        const { error: girosError } = await supabase
          .from('giros')
          .insert(
            convenioData.giros.map(giro => ({
              convenio_id: convenio.id,
              numero_giro: giro.numeroGiro,
              entidad: giro.entidad,
              monto: giro.monto,
              fecha_programada: giro.fechaProgramada,
              fecha_ejecutada: giro.fechaEjecutada || null,
              estado: giro.estado
            }))
          );

        if (girosError) throw girosError;
      }

      // Refresh convenios list
      await fetchConvenios();

      return convenio;
    } catch (err) {
      console.error('Error adding convenio:', err);
      setError(err instanceof Error ? err.message : 'Error al crear convenio');
      throw err;
    }
  };

  // Update convenio
  const updateConvenio = async (id: string, updates: Partial<Convenio>) => {
    try {
      setError(null);

      // Prepare update data, filtering out undefined values
      const updateData: any = {};
      if (updates.numero !== undefined) updateData.numero = updates.numero;
      if (updates.vigenciaInicial !== undefined && updates.vigenciaFinal !== undefined) {
        updateData.vigencia = `${updates.vigenciaInicial}-${updates.vigenciaFinal}`;
      }
      if (updates.supervisor !== undefined) updateData.supervisor = updates.supervisor;
      if (updates.dependencia !== undefined) updateData.dependencia = updates.dependencia;
      if (updates.objeto !== undefined) updateData.objeto = updates.objeto;
      if (updates.estado !== undefined) updateData.estado = updates.estado;
      if (updates.fechaInicio !== undefined) updateData.fecha_inicio = updates.fechaInicio;
      if (updates.fechaFin !== undefined) updateData.fecha_fin = updates.fechaFin;
      if (updates.entidadConvenio !== undefined) updateData.entidad_convenio = updates.entidadConvenio;
      if (updates.valorTotal !== undefined) updateData.valor_total = updates.valorTotal;
      if (updates.aporteCAR !== undefined) updateData.aporte_car = updates.aporteCAR;
      if (updates.aporteEntidad !== undefined) updateData.aporte_entidad = updates.aporteEntidad;

      // Update main convenio record
      const { error: convenioError } = await supabase
        .from('convenios')
        .update(updateData)
        .eq('id', id);

      if (convenioError) throw convenioError;

      // Update presupuesto items if provided
      if (updates.presupuesto) {
        // Delete existing presupuesto items
        const { error: deletePresupuestoError } = await supabase
          .from('presupuesto_items')
          .delete()
          .eq('convenio_id', id);

        if (deletePresupuestoError) throw deletePresupuestoError;

        // Insert new presupuesto items
        if (updates.presupuesto.length > 0) {
          const { error: insertPresupuestoError } = await supabase
            .from('presupuesto_items')
            .insert(
              updates.presupuesto.map(item => ({
                convenio_id: id,
                item: item.item,
                actividad: item.actividad,
                valor_total: item.valorTotal,
                aporte_car: item.aporteCAR,
                aporte_entidad: item.aporteEntidad
              }))
            );

          if (insertPresupuestoError) throw insertPresupuestoError;
        }
      }

      // Update giros if provided
      if (updates.giros) {
        // Delete existing giros
        const { error: deleteGirosError } = await supabase
          .from('giros')
          .delete()
          .eq('convenio_id', id);

        if (deleteGirosError) throw deleteGirosError;

        // Insert new giros
        if (updates.giros.length > 0) {
          const { error: insertGirosError } = await supabase
            .from('giros')
            .insert(
              updates.giros.map(giro => ({
                convenio_id: id,
                numero_giro: giro.numeroGiro,
                entidad: giro.entidad,
                monto: giro.monto,
                fecha_programada: giro.fechaProgramada,
                fecha_ejecutada: giro.fechaEjecutada || null,
                estado: giro.estado
              }))
            );

          if (insertGirosError) throw insertGirosError;
        }
      }

      // Refresh convenios list
      await fetchConvenios();
    } catch (err) {
      console.error('Error updating convenio:', err);
      setError(err instanceof Error ? err.message : 'Error al actualizar convenio');
      throw err;
    }
  };

  // Delete convenio
  const deleteConvenio = async (id: string) => {
    try {
      setError(null);

      const { error } = await supabase
        .from('convenios')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh convenios list
      await fetchConvenios();
    } catch (err) {
      console.error('Error deleting convenio:', err);
      setError(err instanceof Error ? err.message : 'Error al eliminar convenio');
      throw err;
    }
  };

  // Get convenio by ID
  const getConvenioById = (id: string) => {
    return convenios.find(convenio => convenio.id === id);
  };

  // Calculate rendimiento for a convenio
  const calculateRendimiento = async (convenioId: string, periodo: string, tasaInteres: number = 0.12) => {
    try {
      setError(null);

      const { error } = await supabase.rpc('calcular_rendimiento', {
        p_convenio_id: convenioId,
        p_periodo: periodo,
        p_tasa_interes: tasaInteres
      });

      if (error) throw error;

      // Refresh convenios to get updated rendimientos
      await fetchConvenios();
    } catch (err) {
      console.error('Error calculating rendimiento:', err);
      setError(err instanceof Error ? err.message : 'Error al calcular rendimiento');
      throw err;
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  return {
    convenios,
    loading,
    error,
    addConvenio,
    updateConvenio,
    deleteConvenio,
    getConvenioById,
    calculateRendimiento,
    refreshConvenios: fetchConvenios
  };
};