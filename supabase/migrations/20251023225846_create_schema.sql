/*
  # Schema para Sistema de Gestión de Convenios CAR

  1. Nuevas Tablas
    - `convenios` - Tabla principal de convenios
    - `presupuesto_items` - Items del presupuesto oficial
    - `giros` - Programación de giros CAR y entidad
    - `rendimientos` - Cálculos de rendimientos financieros
    - `documentos` - Gestión documental
    - `alertas` - Sistema de notificaciones
    - `auditoria` - Trazabilidad de movimientos
    - `configuracion` - Parámetros del sistema

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas para usuarios anónimos y autenticados
    - Auditoría automática de cambios

  3. Funcionalidades
    - Triggers para auditoría automática
    - Funciones para cálculo de rendimientos
    - Vistas para reportes consolidados
*/

-- Tabla principal de convenios
CREATE TABLE IF NOT EXISTS convenios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero text UNIQUE NOT NULL,
  vigencia text NOT NULL,
  supervisor text NOT NULL,
  dependencia text NOT NULL,
  objeto text NOT NULL,
  estado text NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo', 'finalizado', 'en_proceso')),
  fecha_inicio date NOT NULL,
  fecha_fin date NOT NULL,
  entidad_convenio text NOT NULL,
  valor_total numeric(15,2) NOT NULL DEFAULT 0,
  aporte_car numeric(15,2) NOT NULL DEFAULT 0,
  aporte_entidad numeric(15,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de items del presupuesto
CREATE TABLE IF NOT EXISTS presupuesto_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  convenio_id uuid REFERENCES convenios(id) ON DELETE CASCADE,
  item text NOT NULL,
  actividad text NOT NULL,
  valor_total numeric(15,2) NOT NULL DEFAULT 0,
  aporte_car numeric(15,2) NOT NULL DEFAULT 0,
  aporte_entidad numeric(15,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tabla de giros programados
CREATE TABLE IF NOT EXISTS giros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  convenio_id uuid REFERENCES convenios(id) ON DELETE CASCADE,
  numero_giro integer NOT NULL,
  entidad text NOT NULL CHECK (entidad IN ('CAR', 'ENTIDAD')),
  monto numeric(15,2) NOT NULL DEFAULT 0,
  fecha_programada date NOT NULL,
  fecha_ejecutada date,
  estado text NOT NULL DEFAULT 'programado' CHECK (estado IN ('programado', 'ejecutado', 'pendiente')),
  comprobante_url text,
  created_at timestamptz DEFAULT now()
);

-- Tabla de rendimientos financieros
CREATE TABLE IF NOT EXISTS rendimientos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  convenio_id uuid REFERENCES convenios(id) ON DELETE CASCADE,
  periodo text NOT NULL,
  tasa_interes numeric(5,4) NOT NULL DEFAULT 0.12,
  valor_base numeric(15,2) NOT NULL DEFAULT 0,
  rendimiento_bruto numeric(15,2) NOT NULL DEFAULT 0,
  deducciones numeric(15,2) NOT NULL DEFAULT 0,
  rendimiento_neto numeric(15,2) NOT NULL DEFAULT 0,
  fecha_calculo date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Tabla de documentos
CREATE TABLE IF NOT EXISTS documentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  convenio_id uuid REFERENCES convenios(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  tipo text NOT NULL CHECK (tipo IN ('convenio', 'acta', 'certificacion', 'comprobante', 'otro')),
  url text NOT NULL,
  tamaño integer NOT NULL DEFAULT 0,
  usuario text NOT NULL,
  fecha_subida timestamptz DEFAULT now()
);

-- Tabla de alertas
CREATE TABLE IF NOT EXISTS alertas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  convenio_id uuid REFERENCES convenios(id) ON DELETE CASCADE,
  tipo text NOT NULL CHECK (tipo IN ('vencimiento', 'financiero', 'documento', 'ejecucion')),
  mensaje text NOT NULL,
  prioridad text NOT NULL DEFAULT 'media' CHECK (prioridad IN ('alta', 'media', 'baja')),
  leida boolean NOT NULL DEFAULT false,
  fecha_creacion timestamptz DEFAULT now()
);

-- Tabla de auditoría
CREATE TABLE IF NOT EXISTS auditoria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  convenio_id uuid REFERENCES convenios(id) ON DELETE CASCADE,
  usuario text NOT NULL,
  accion text NOT NULL,
  detalles text NOT NULL,
  valor_anterior jsonb,
  valor_nuevo jsonb,
  ip_address text,
  fecha timestamptz DEFAULT now()
);

-- Tabla de configuración del sistema
CREATE TABLE IF NOT EXISTS configuracion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clave text UNIQUE NOT NULL,
  valor text NOT NULL,
  descripcion text,
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE convenios ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuesto_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE giros ENABLE ROW LEVEL SECURITY;
ALTER TABLE rendimientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para usuarios anónimos y autenticados (desarrollo)
CREATE POLICY "Acceso completo a convenios para desarrollo"
  ON convenios
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Acceso completo a presupuesto_items para desarrollo"
  ON presupuesto_items
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Acceso completo a giros para desarrollo"
  ON giros
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Acceso completo a rendimientos para desarrollo"
  ON rendimientos
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Acceso completo a documentos para desarrollo"
  ON documentos
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Acceso completo a alertas para desarrollo"
  ON alertas
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Acceso completo a auditoria para desarrollo"
  ON auditoria
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Acceso completo a configuracion para desarrollo"
  ON configuracion
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Función para actualizar timestamp automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar timestamps
CREATE TRIGGER update_convenios_updated_at BEFORE UPDATE ON convenios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracion_updated_at BEFORE UPDATE ON configuracion
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para auditoría automática
CREATE OR REPLACE FUNCTION audit_convenio_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO auditoria (convenio_id, usuario, accion, detalles, valor_nuevo)
    VALUES (NEW.id, current_user, 'INSERT', 'Convenio creado', to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO auditoria (convenio_id, usuario, accion, detalles, valor_anterior, valor_nuevo)
    VALUES (NEW.id, current_user, 'UPDATE', 'Convenio actualizado', to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO auditoria (convenio_id, usuario, accion, detalles, valor_anterior)
    VALUES (OLD.id, current_user, 'DELETE', 'Convenio eliminado', to_jsonb(OLD));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger para auditoría automática
CREATE TRIGGER audit_convenios_changes
  AFTER INSERT OR UPDATE OR DELETE ON convenios
  FOR EACH ROW EXECUTE FUNCTION audit_convenio_changes();

-- Vista para dashboard metrics
CREATE OR REPLACE VIEW dashboard_metrics AS
SELECT 
  (SELECT COUNT(*) FROM convenios) as total_convenios,
  (SELECT COUNT(*) FROM convenios WHERE estado = 'activo') as convenios_activos,
  (SELECT COALESCE(SUM(valor_total), 0) FROM convenios WHERE estado = 'activo') as saldo_total,
  (SELECT COALESCE(SUM(rendimiento_neto), 0) FROM rendimientos WHERE DATE_TRUNC('month', fecha_calculo) = DATE_TRUNC('month', CURRENT_DATE)) as rendimientos_del_mes,
  (SELECT COUNT(*) FROM convenios WHERE fecha_fin <= CURRENT_DATE + INTERVAL '30 days' AND estado = 'activo') as vencimientos_proximos,
  (SELECT COUNT(*) FROM alertas WHERE NOT leida) as documentos_pendientes;

-- Función para calcular rendimientos
CREATE OR REPLACE FUNCTION calcular_rendimiento(
  p_convenio_id uuid,
  p_periodo text,
  p_tasa_interes numeric DEFAULT 0.12
)
RETURNS void AS $$
DECLARE
  v_valor_base numeric;
  v_rendimiento_bruto numeric;
  v_deducciones numeric;
  v_rendimiento_neto numeric;
BEGIN
  SELECT aporte_car INTO v_valor_base
  FROM convenios 
  WHERE id = p_convenio_id;
  
  v_rendimiento_bruto := v_valor_base * (p_tasa_interes / 12);
  v_deducciones := v_rendimiento_bruto * 0.03;
  v_rendimiento_neto := v_rendimiento_bruto - v_deducciones;
  
  INSERT INTO rendimientos (convenio_id, periodo, tasa_interes, valor_base, rendimiento_bruto, deducciones, rendimiento_neto)
  VALUES (p_convenio_id, p_periodo, p_tasa_interes, v_valor_base, v_rendimiento_bruto, v_deducciones, v_rendimiento_neto);
END;
$$ LANGUAGE plpgsql;

-- Insertar configuración inicial
INSERT INTO configuracion (clave, valor, descripcion) VALUES
  ('tasa_interes_default', '0.12', 'Tasa de interés por defecto para cálculo de rendimientos'),
  ('porcentaje_deducciones', '0.03', 'Porcentaje de deducciones sobre rendimientos brutos'),
  ('dias_alerta_vencimiento', '30,15,7', 'Días de anticipación para alertas de vencimiento'),
  ('email_notificaciones', 'convenios@car.gov.co', 'Email para notificaciones del sistema')
ON CONFLICT (clave) DO NOTHING;