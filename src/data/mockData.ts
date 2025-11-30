import { Convenio, DashboardMetrics, Alerta, MovimientoAuditoria } from '../types';

export const mockConvenios: Convenio[] = [
  {
    id: '1',
    numero: '3649/2022',
    vigenciaInicial: '2022',
    vigenciaFinal: '2024',
    supervisor: 'Ing. María González',
    dependencia: 'Dirección de Laboratorio e Investigación Ambiental',
    objeto: 'Implementación de huertos dendroenergeticos y ecoestufas para comunidades rurales del municipio de Tibirita',
    estado: 'activo',
    fechaInicio: '2022-03-15',
    fechaFin: '2024-03-15',
    entidadConvenio: 'Municipio de Tibirita',
    valorTotal: 180000000,
    aporteCAR: 108000000,
    aporteEntidad: 72000000,
    documentos: [],
    presupuesto: [
      {
        id: '1',
        item: '1',
        actividad: 'Construcción preliminar',
        valorTotal: 25000000,
        aporteCAR: 15000000,
        aporteEntidad: 10000000
      },
      {
        id: '2',
        item: '2',
        actividad: 'Suministro e instalación de ecoestufas',
        valorTotal: 45000000,
        aporteCAR: 27000000,
        aporteEntidad: 18000000
      },
      {
        id: '3',
        item: '3',
        actividad: 'Implementación huerto dendroenergetico',
        valorTotal: 60000000,
        aporteCAR: 36000000,
        aporteEntidad: 24000000
      },
      {
        id: '4',
        item: '4',
        actividad: 'Transportes',
        valorTotal: 15000000,
        aporteCAR: 9000000,
        aporteEntidad: 6000000
      },
      {
        id: '5',
        item: '5',
        actividad: 'Asistencia técnica',
        valorTotal: 20000000,
        aporteCAR: 12000000,
        aporteEntidad: 8000000
      },
      {
        id: '6',
        item: '6',
        actividad: 'Interventoría',
        valorTotal: 10000000,
        aporteCAR: 6000000,
        aporteEntidad: 4000000
      },
      {
        id: '7',
        item: '7',
        actividad: 'AIU (Administración, Imprevistos y Utilidades)',
        valorTotal: 5000000,
        aporteCAR: 3000000,
        aporteEntidad: 2000000
      }
    ],
    giros: [
      {
        id: '1',
        numeroGiro: 1,
        entidad: 'CAR',
        monto: 54000000,
        fechaProgramada: '2022-04-01',
        fechaEjecutada: '2022-04-01',
        estado: 'ejecutado'
      },
      {
        id: '2',
        numeroGiro: 2,
        entidad: 'CAR',
        monto: 54000000,
        fechaProgramada: '2023-04-01',
        fechaEjecutada: '2023-04-01',
        estado: 'ejecutado'
      },
      {
        id: '3',
        numeroGiro: 1,
        entidad: 'ENTIDAD',
        monto: 36000000,
        fechaProgramada: '2022-04-15',
        fechaEjecutada: '2022-04-15',
        estado: 'ejecutado'
      },
      {
        id: '4',
        numeroGiro: 2,
        entidad: 'ENTIDAD',
        monto: 36000000,
        fechaProgramada: '2023-04-15',
        estado: 'pendiente'
      }
    ],
    rendimientos: [
      {
        id: '1',
        periodo: '2023-01',
        tasaInteres: 0.12,
        valorBase: 108000000,
        rendimientoBruto: 1080000,
        deducciones: 32400,
        rendimientoNeto: 1047600,
        fechaCalculo: '2023-01-31'
      }
    ],
    createdAt: '2022-03-01',
    updatedAt: '2023-11-15'
  },
  {
    id: '2',
    numero: '4125/2023',
    vigenciaInicial: '2023',
    vigenciaFinal: '2025',
    supervisor: 'Ing. Carlos Rodríguez',
    dependencia: 'Dirección de Gestión del Recurso Hídrico',
    objeto: 'Reforestación de cuencas hídricas y construcción de obras de bioingeniería en el municipio de Chía',
    estado: 'activo',
    fechaInicio: '2023-06-01',
    fechaFin: '2025-06-01',
    entidadConvenio: 'Municipio de Chía',
    valorTotal: 320000000,
    aporteCAR: 192000000,
    aporteEntidad: 128000000,
    documentos: [],
    presupuesto: [],
    giros: [],
    rendimientos: [],
    createdAt: '2023-05-15',
    updatedAt: '2023-11-20'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalConvenios: 45,
  conveniosActivos: 28,
  saldoTotal: 2450000000,
  rendimientosDelMes: 24500000,
  vencimientosProximos: 3,
  documentosPendientes: 8
};

export const mockAlertas: Alerta[] = [
  {
    id: '1',
    convenioId: '1',
    tipo: 'vencimiento',
    mensaje: 'El convenio 3649/2022 vence en 15 días',
    prioridad: 'alta',
    fechaCreacion: '2023-11-20',
    leida: false
  },
  {
    id: '2',
    convenioId: '2',
    tipo: 'documento',
    mensaje: 'Documentos de legalización pendientes',
    prioridad: 'media',
    fechaCreacion: '2023-11-19',
    leida: false
  }
];

export const supervisores = [
  'Ing. María González',
  'Ing. Carlos Rodríguez',
  'Dr. Ana Martínez',
  'Ing. Luis Pérez',
  'Dra. Carmen Silva'
];

export const dependencias = [
  'Dirección de Laboratorio e Investigación Ambiental',
  'Dirección de Gestión del Recurso Hídrico',
  'Dirección de Evaluación, Seguimiento y Control Ambiental',
  'Dirección de Recursos Naturales',
  'Subdirección de Administración de Recursos Naturales'
];

export const municipios = [
  'Tibirita',
  'Chía',
  'Zipaquirá',
  'Fusagasugá',
  'Facatativá',
  'Girardot',
  'Ubaté',
  'Villeta'
];