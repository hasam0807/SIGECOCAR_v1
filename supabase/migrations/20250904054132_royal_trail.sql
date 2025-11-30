/*
  # Corregir políticas RLS para convenios

  1. Políticas de Seguridad
    - Permitir acceso completo a usuarios autenticados para todas las operaciones CRUD
    - Habilitar acceso temporal para usuarios anónimos durante desarrollo
    - Configurar políticas para tablas relacionadas (presupuesto_items, giros)

  2. Tablas Afectadas
    - `convenios` - tabla principal
    - `presupuesto_items` - ítems del presupuesto
    - `giros` - programación de giros
    - `rendimientos` - cálculos de rendimientos
    - `documentos` - documentos asociados
    - `alertas` - alertas del sistema
    - `auditoria` - logs de auditoría

  3. Notas Importantes
    - Las políticas permiten acceso completo durante desarrollo
    - En producción se debe implementar autenticación de usuarios
    - Se mantiene la integridad referencial entre tablas
*/

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Usuarios autenticados pueden ver convenios" ON convenios;
DROP POLICY IF EXISTS "Usuarios autenticados pueden crear convenios" ON convenios;
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar convenios" ON convenios;
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar convenios" ON convenios;

-- Crear políticas más permisivas para desarrollo
CREATE POLICY "Acceso completo a convenios para desarrollo"
  ON convenios
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para presupuesto_items
DROP POLICY IF EXISTS "Acceso completo a presupuesto_items" ON presupuesto_items;
CREATE POLICY "Acceso completo a presupuesto_items para desarrollo"
  ON presupuesto_items
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para giros
DROP POLICY IF EXISTS "Acceso completo a giros" ON giros;
CREATE POLICY "Acceso completo a giros para desarrollo"
  ON giros
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para rendimientos
DROP POLICY IF EXISTS "Acceso completo a rendimientos" ON rendimientos;
CREATE POLICY "Acceso completo a rendimientos para desarrollo"
  ON rendimientos
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para documentos
DROP POLICY IF EXISTS "Acceso completo a documentos" ON documentos;
CREATE POLICY "Acceso completo a documentos para desarrollo"
  ON documentos
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para alertas
DROP POLICY IF EXISTS "Acceso completo a alertas" ON alertas;
CREATE POLICY "Acceso completo a alertas para desarrollo"
  ON alertas
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para auditoria
DROP POLICY IF EXISTS "Acceso completo a auditoria" ON auditoria;
CREATE POLICY "Acceso completo a auditoria para desarrollo"
  ON auditoria
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para configuracion
DROP POLICY IF EXISTS "Acceso completo a configuracion" ON configuracion;
CREATE POLICY "Acceso completo a configuracion para desarrollo"
  ON configuracion
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Verificar que RLS esté habilitado en todas las tablas
ALTER TABLE convenios ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuesto_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE giros ENABLE ROW LEVEL SECURITY;
ALTER TABLE rendimientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;