/*
  # Datos de ejemplo para el sistema de convenios CAR

  1. Datos de Convenios
    - Convenios realistas basados en proyectos ambientales
    - Supervisores y dependencias de la CAR
    - Municipios de Cundinamarca

  2. Presupuestos Detallados
    - Items típicos de proyectos ambientales
    - Distribución realista de aportes

  3. Giros y Rendimientos
    - Programación de desembolsos
    - Cálculos financieros históricos
*/

-- Insertar convenios de ejemplo
INSERT INTO convenios (id, numero, vigencia, supervisor, dependencia, objeto, estado, fecha_inicio, fecha_fin, entidad_convenio, valor_total, aporte_car, aporte_entidad) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440001',
    '3649/2022',
    '2022-2024',
    'Ing. María González',
    'Dirección de Laboratorio e Investigación Ambiental',
    'Implementación de huertos dendroenergeticos y ecoestufas para comunidades rurales del municipio de Tibirita',
    'activo',
    '2022-03-15',
    '2024-03-15',
    'Municipio de Tibirita',
    180000000,
    108000000,
    72000000
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    '4125/2023',
    '2023-2025',
    'Ing. Carlos Rodríguez',
    'Dirección de Gestión del Recurso Hídrico',
    'Reforestación de cuencas hídricas y construcción de obras de bioingeniería en el municipio de Chía',
    'activo',
    '2023-06-01',
    '2025-06-01',
    'Municipio de Chía',
    320000000,
    192000000,
    128000000
  ),
  (
    '550e8400-e29b-41d4-a716-446655440003',
    '4156/2023',
    '2023-2024',
    'Dr. Ana Martínez',
    'Dirección de Recursos Naturales',
    'Programa de conservación de biodiversidad y restauración ecológica en Zipaquirá',
    'en_proceso',
    '2023-08-01',
    '2024-08-01',
    'Municipio de Zipaquirá',
    250000000,
    150000000,
    100000000
  ),
  (
    '550e8400-e29b-41d4-a716-446655440004',
    '3892/2022',
    '2022-2023',
    'Ing. Luis Pérez',
    'Dirección de Evaluación, Seguimiento y Control Ambiental',
    'Implementación de sistemas de tratamiento de aguas residuales en Fusagasugá',
    'finalizado',
    '2022-01-15',
    '2023-01-15',
    'Municipio de Fusagasugá',
    450000000,
    270000000,
    180000000
  ),
  (
    '550e8400-e29b-41d4-a716-446655440005',
    '4287/2023',
    '2023-2025',
    'Dra. Carmen Silva',
    'Subdirección de Administración de Recursos Naturales',
    'Fortalecimiento de capacidades ambientales y educación ecológica en Facatativá',
    'activo',
    '2023-09-01',
    '2025-09-01',
    'Municipio de Facatativá',
    180000000,
    108000000,
    72000000
  );

-- Insertar items de presupuesto para el convenio 3649/2022
INSERT INTO presupuesto_items (convenio_id, item, actividad, valor_total, aporte_car, aporte_entidad) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '1', 'Construcción preliminar', 25000000, 15000000, 10000000),
  ('550e8400-e29b-41d4-a716-446655440001', '2', 'Suministro e instalación de ecoestufas', 45000000, 27000000, 18000000),
  ('550e8400-e29b-41d4-a716-446655440001', '3', 'Implementación huerto dendroenergetico', 60000000, 36000000, 24000000),
  ('550e8400-e29b-41d4-a716-446655440001', '4', 'Transportes', 15000000, 9000000, 6000000),
  ('550e8400-e29b-41d4-a716-446655440001', '5', 'Asistencia técnica', 20000000, 12000000, 8000000),
  ('550e8400-e29b-41d4-a716-446655440001', '6', 'Interventoría', 10000000, 6000000, 4000000),
  ('550e8400-e29b-41d4-a716-446655440001', '7', 'AIU (Administración, Imprevistos y Utilidades)', 5000000, 3000000, 2000000);

-- Insertar items de presupuesto para el convenio 4125/2023
INSERT INTO presupuesto_items (convenio_id, item, actividad, valor_total, aporte_car, aporte_entidad) VALUES
  ('550e8400-e29b-41d4-a716-446655440002', '1', 'Estudios y diseños técnicos', 40000000, 24000000, 16000000),
  ('550e8400-e29b-41d4-a716-446655440002', '2', 'Adquisición de material vegetal', 80000000, 48000000, 32000000),
  ('550e8400-e29b-41d4-a716-446655440002', '3', 'Obras de bioingeniería', 120000000, 72000000, 48000000),
  ('550e8400-e29b-41d4-a716-446655440002', '4', 'Mantenimiento y seguimiento', 35000000, 21000000, 14000000),
  ('550e8400-e29b-41d4-a716-446655440002', '5', 'Capacitación comunitaria', 25000000, 15000000, 10000000),
  ('550e8400-e29b-41d4-a716-446655440002', '6', 'Supervisión técnica', 15000000, 9000000, 6000000),
  ('550e8400-e29b-41d4-a716-446655440002', '7', 'AIU', 5000000, 3000000, 2000000);

-- Insertar giros programados
INSERT INTO giros (convenio_id, numero_giro, entidad, monto, fecha_programada, fecha_ejecutada, estado) VALUES
  -- Giros CAR para convenio 3649/2022
  ('550e8400-e29b-41d4-a716-446655440001', 1, 'CAR', 54000000, '2022-04-01', '2022-04-01', 'ejecutado'),
  ('550e8400-e29b-41d4-a716-446655440001', 2, 'CAR', 54000000, '2023-04-01', '2023-04-01', 'ejecutado'),
  -- Giros Entidad para convenio 3649/2022
  ('550e8400-e29b-41d4-a716-446655440001', 1, 'ENTIDAD', 36000000, '2022-04-15', '2022-04-15', 'ejecutado'),
  ('550e8400-e29b-41d4-a716-446655440001', 2, 'ENTIDAD', 36000000, '2023-04-15', NULL, 'pendiente'),
  -- Giros CAR para convenio 4125/2023
  ('550e8400-e29b-41d4-a716-446655440002', 1, 'CAR', 96000000, '2023-07-01', '2023-07-01', 'ejecutado'),
  ('550e8400-e29b-41d4-a716-446655440002', 2, 'CAR', 96000000, '2024-07-01', NULL, 'programado'),
  -- Giros Entidad para convenio 4125/2023
  ('550e8400-e29b-41d4-a716-446655440002', 1, 'ENTIDAD', 64000000, '2023-07-15', '2023-07-15', 'ejecutado'),
  ('550e8400-e29b-41d4-a716-446655440002', 2, 'ENTIDAD', 64000000, '2024-07-15', NULL, 'programado');

-- Insertar rendimientos calculados
INSERT INTO rendimientos (convenio_id, periodo, tasa_interes, valor_base, rendimiento_bruto, deducciones, rendimiento_neto, fecha_calculo) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '2023-01', 0.12, 108000000, 1080000, 32400, 1047600, '2023-01-31'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-02', 0.12, 108000000, 1080000, 32400, 1047600, '2023-02-28'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-03', 0.12, 108000000, 1080000, 32400, 1047600, '2023-03-31'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-04', 0.12, 108000000, 1080000, 32400, 1047600, '2023-04-30'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-05', 0.12, 108000000, 1080000, 32400, 1047600, '2023-05-31'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-06', 0.12, 108000000, 1080000, 32400, 1047600, '2023-06-30'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-07', 0.12, 108000000, 1080000, 32400, 1047600, '2023-07-31'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-08', 0.12, 108000000, 1080000, 32400, 1047600, '2023-08-31'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-09', 0.12, 108000000, 1080000, 32400, 1047600, '2023-09-30'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-10', 0.12, 108000000, 1080000, 32400, 1047600, '2023-10-31'),
  ('550e8400-e29b-41d4-a716-446655440001', '2023-11', 0.12, 108000000, 1080000, 32400, 1047600, '2023-11-30'),
  ('550e8400-e29b-41d4-a716-446655440002', '2023-08', 0.12, 192000000, 1920000, 57600, 1862400, '2023-08-31'),
  ('550e8400-e29b-41d4-a716-446655440002', '2023-09', 0.12, 192000000, 1920000, 57600, 1862400, '2023-09-30'),
  ('550e8400-e29b-41d4-a716-446655440002', '2023-10', 0.12, 192000000, 1920000, 57600, 1862400, '2023-10-31'),
  ('550e8400-e29b-41d4-a716-446655440002', '2023-11', 0.12, 192000000, 1920000, 57600, 1862400, '2023-11-30');

-- Insertar documentos de ejemplo
INSERT INTO documentos (convenio_id, nombre, tipo, url, tamaño, usuario) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Convenio_3649_2022_Firmado.pdf', 'convenio', '#', 2621440, 'Ing. María González'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Acta_Liquidacion_3649_2022.pdf', 'acta', '#', 1887436, 'Dr. Ana Martínez'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Comprobante_Giro_001_CAR.pdf', 'comprobante', '#', 838860, 'Sistema'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Convenio_4125_2023_Firmado.pdf', 'convenio', '#', 3145728, 'Ing. Carlos Rodríguez'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Certificacion_Movimientos_Nov_2023.pdf', 'certificacion', '#', 1258291, 'Ing. Carlos Rodríguez'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Formato_Unico_Validado_4156.xlsx', 'otro', '#', 1572864, 'Ing. Luis Pérez');

-- Insertar alertas de ejemplo
INSERT INTO alertas (convenio_id, tipo, mensaje, prioridad, leida) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'vencimiento', 'El convenio 3649/2022 vence en 15 días', 'alta', false),
  ('550e8400-e29b-41d4-a716-446655440002', 'documento', 'Documentos de legalización pendientes para convenio 4125/2023', 'media', false),
  ('550e8400-e29b-41d4-a716-446655440003', 'financiero', 'Giro pendiente de ejecución - Convenio 4156/2023', 'media', false),
  ('550e8400-e29b-41d4-a716-446655440001', 'ejecucion', 'Revisión de avance físico requerida', 'baja', true);

-- Insertar registros de auditoría de ejemplo
INSERT INTO auditoria (convenio_id, usuario, accion, detalles, ip_address) VALUES
  ('550e8400-e29b-41d4-a716-446655440003', 'Ing. María González', 'Creación de convenio', 'Nuevo convenio 4156/2023 registrado con Municipio de Fusagasugá', '192.168.1.45'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Sistema', 'Cálculo de rendimientos', 'Rendimientos calculados automáticamente para el periodo 2023-11', 'Sistema'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Ing. Carlos Rodríguez', 'Ejecución de giro', 'Giro #1 por valor de $96.000.000 ejecutado exitosamente', '192.168.1.67'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Dr. Ana Martínez', 'Carga de documento', 'Documento acta_liquidacion_3649_2022.pdf cargado', '192.168.1.23'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Ing. Luis Pérez', 'Modificación de convenio', 'Actualización de supervisor asignado', '192.168.1.89');