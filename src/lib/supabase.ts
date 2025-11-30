import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables de entorno de Supabase faltantes:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ Faltante');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Configurada' : '❌ Faltante');
  throw new Error('Faltan las variables de entorno de Supabase. Revisa el archivo .env');
}

console.log('🔗 Conectando a Supabase:', supabaseUrl);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Database {
  public: {
    Tables: {
      convenios: {
        Row: {
          id: string;
          numero: string;
          vigencia: string;
          supervisor: string;
          dependencia: string;
          objeto: string;
          estado: 'activo' | 'finalizado' | 'en_proceso';
          fecha_inicio: string;
          fecha_fin: string;
          entidad_convenio: string;
          valor_total: number;
          aporte_car: number;
          aporte_entidad: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          numero: string;
          vigencia: string;
          supervisor: string;
          dependencia: string;
          objeto: string;
          estado?: 'activo' | 'finalizado' | 'en_proceso';
          fecha_inicio: string;
          fecha_fin: string;
          entidad_convenio: string;
          valor_total?: number;
          aporte_car?: number;
          aporte_entidad?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          numero?: string;
          vigencia?: string;
          supervisor?: string;
          dependencia?: string;
          objeto?: string;
          estado?: 'activo' | 'finalizado' | 'en_proceso';
          fecha_inicio?: string;
          fecha_fin?: string;
          entidad_convenio?: string;
          valor_total?: number;
          aporte_car?: number;
          aporte_entidad?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      presupuesto_items: {
        Row: {
          id: string;
          convenio_id: string;
          item: string;
          actividad: string;
          valor_total: number;
          aporte_car: number;
          aporte_entidad: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          convenio_id: string;
          item: string;
          actividad: string;
          valor_total?: number;
          aporte_car?: number;
          aporte_entidad?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          convenio_id?: string;
          item?: string;
          actividad?: string;
          valor_total?: number;
          aporte_car?: number;
          aporte_entidad?: number;
          created_at?: string;
        };
      };
      giros: {
        Row: {
          id: string;
          convenio_id: string;
          numero_giro: number;
          entidad: 'CAR' | 'ENTIDAD';
          monto: number;
          fecha_programada: string;
          fecha_ejecutada: string | null;
          estado: 'programado' | 'ejecutado' | 'pendiente';
          comprobante_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          convenio_id: string;
          numero_giro: number;
          entidad: 'CAR' | 'ENTIDAD';
          monto?: number;
          fecha_programada: string;
          fecha_ejecutada?: string | null;
          estado?: 'programado' | 'ejecutado' | 'pendiente';
          comprobante_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          convenio_id?: string;
          numero_giro?: number;
          entidad?: 'CAR' | 'ENTIDAD';
          monto?: number;
          fecha_programada?: string;
          fecha_ejecutada?: string | null;
          estado?: 'programado' | 'ejecutado' | 'pendiente';
          comprobante_url?: string | null;
          created_at?: string;
        };
      };
      rendimientos: {
        Row: {
          id: string;
          convenio_id: string;
          periodo: string;
          tasa_interes: number;
          valor_base: number;
          rendimiento_bruto: number;
          deducciones: number;
          rendimiento_neto: number;
          fecha_calculo: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          convenio_id: string;
          periodo: string;
          tasa_interes?: number;
          valor_base?: number;
          rendimiento_bruto?: number;
          deducciones?: number;
          rendimiento_neto?: number;
          fecha_calculo?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          convenio_id?: string;
          periodo?: string;
          tasa_interes?: number;
          valor_base?: number;
          rendimiento_bruto?: number;
          deducciones?: number;
          rendimiento_neto?: number;
          fecha_calculo?: string;
          created_at?: string;
        };
      };
      documentos: {
        Row: {
          id: string;
          convenio_id: string;
          nombre: string;
          tipo: 'convenio' | 'acta' | 'certificacion' | 'comprobante' | 'otro';
          url: string;
          tamaño: number;
          usuario: string;
          fecha_subida: string;
        };
        Insert: {
          id?: string;
          convenio_id: string;
          nombre: string;
          tipo: 'convenio' | 'acta' | 'certificacion' | 'comprobante' | 'otro';
          url: string;
          tamaño?: number;
          usuario: string;
          fecha_subida?: string;
        };
        Update: {
          id?: string;
          convenio_id?: string;
          nombre?: string;
          tipo?: 'convenio' | 'acta' | 'certificacion' | 'comprobante' | 'otro';
          url?: string;
          tamaño?: number;
          usuario?: string;
          fecha_subida?: string;
        };
      };
      alertas: {
        Row: {
          id: string;
          convenio_id: string;
          tipo: 'vencimiento' | 'financiero' | 'documento' | 'ejecucion';
          mensaje: string;
          prioridad: 'alta' | 'media' | 'baja';
          leida: boolean;
          fecha_creacion: string;
        };
        Insert: {
          id?: string;
          convenio_id: string;
          tipo: 'vencimiento' | 'financiero' | 'documento' | 'ejecucion';
          mensaje: string;
          prioridad?: 'alta' | 'media' | 'baja';
          leida?: boolean;
          fecha_creacion?: string;
        };
        Update: {
          id?: string;
          convenio_id?: string;
          tipo?: 'vencimiento' | 'financiero' | 'documento' | 'ejecucion';
          mensaje?: string;
          prioridad?: 'alta' | 'media' | 'baja';
          leida?: boolean;
          fecha_creacion?: string;
        };
      };
      auditoria: {
        Row: {
          id: string;
          convenio_id: string;
          usuario: string;
          accion: string;
          detalles: string;
          valor_anterior: any;
          valor_nuevo: any;
          ip_address: string | null;
          fecha: string;
        };
        Insert: {
          id?: string;
          convenio_id: string;
          usuario: string;
          accion: string;
          detalles: string;
          valor_anterior?: any;
          valor_nuevo?: any;
          ip_address?: string | null;
          fecha?: string;
        };
        Update: {
          id?: string;
          convenio_id?: string;
          usuario?: string;
          accion?: string;
          detalles?: string;
          valor_anterior?: any;
          valor_nuevo?: any;
          ip_address?: string | null;
          fecha?: string;
        };
      };
      configuracion: {
        Row: {
          id: string;
          clave: string;
          valor: string;
          descripcion: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clave: string;
          valor: string;
          descripcion?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clave?: string;
          valor?: string;
          descripcion?: string | null;
          updated_at?: string;
        };
      };
      dashboard_metrics: {
        Row: {
          total_convenios: number;
          convenios_activos: number;
          saldo_total: number;
          rendimientos_del_mes: number;
          vencimientos_proximos: number;
          documentos_pendientes: number;
        };
      };
    };
    Views: {
      dashboard_metrics: {
        Row: {
          total_convenios: number;
          convenios_activos: number;
          saldo_total: number;
          rendimientos_del_mes: number;
          vencimientos_proximos: number;
          documentos_pendientes: number;
        };
      };
    };
    Functions: {
      calcular_rendimiento: {
        Args: {
          p_convenio_id: string;
          p_periodo: string;
          p_tasa_interes?: number;
        };
        Returns: void;
      };
    };
  };
}