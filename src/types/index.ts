// Types for the CAR Convenios Management System

export interface Convenio {
  id: string;
  numero: string;
  vigenciaInicial: string;
  vigenciaFinal: string;
  supervisor: string;
  dependencia: string;
  objeto: string;
  estado: 'activo' | 'finalizado' | 'en_proceso';
  fechaInicio: string;
  fechaFin: string;
  entidadConvenio: string;
  valorTotal: number;
  aporteCAR: number;
  aporteEntidad: number;
  documentos: Documento[];
  presupuesto: ItemPresupuesto[];
  giros: Giro[];
  rendimientos: Rendimiento[];
  createdAt: string;
  updatedAt: string;
}

export interface ItemPresupuesto {
  id: string;
  item: string;
  actividad: string;
  valorTotal: number;
  aporteCAR: number;
  aporteEntidad: number;
}

export interface Giro {
  id: string;
  numeroGiro: number;
  entidad: 'CAR' | 'ENTIDAD';
  monto: number;
  fechaProgramada: string;
  fechaEjecutada?: string;
  estado: 'programado' | 'ejecutado' | 'pendiente';
}

export interface Rendimiento {
  id: string;
  periodo: string;
  tasaInteres: number;
  valorBase: number;
  rendimientoBruto: number;
  deducciones: number;
  rendimientoNeto: number;
  fechaCalculo: string;
}

export interface Documento {
  id: string;
  nombre: string;
  tipo: 'convenio' | 'acta' | 'certificacion' | 'comprobante' | 'otro';
  url: string;
  fechaSubida: string;
  tamaño: number;
}

export interface Alerta {
  id: string;
  convenioId: string;
  tipo: 'vencimiento' | 'financiero' | 'documento' | 'ejecucion';
  mensaje: string;
  prioridad: 'alta' | 'media' | 'baja';
  fechaCreacion: string;
  leida: boolean;
}

export interface MovimientoAuditoria {
  id: string;
  convenioId: string;
  usuario: string;
  accion: string;
  detalles: string;
  fecha: string;
  valorAnterior?: any;
  valorNuevo?: any;
}

export interface DashboardMetrics {
  totalConvenios: number;
  conveniosActivos: number;
  saldoTotal: number;
  rendimientosDelMes: number;
  vencimientosProximos: number;
  documentosPendientes: number;
}