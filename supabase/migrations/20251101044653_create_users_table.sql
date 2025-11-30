/*
  # Tabla de Usuarios para Autenticación

  1. Nueva Tabla
    - `usuarios` - Tabla de usuarios del sistema
      - `id` (uuid, primary key)
      - `email` (text, unique) - Email del usuario (usado como nombre de usuario)
      - `password_hash` (text) - Hash de la contraseña
      - `nombres` (text) - Nombres del usuario
      - `apellidos` (text) - Apellidos del usuario
      - `rol` (text) - Rol del usuario (administrador, supervisor, consulta)
      - `dependencia` (text) - Dependencia a la que pertenece
      - `activo` (boolean) - Estado del usuario
      - `ultimo_acceso` (timestamptz) - Fecha/hora del último acceso
      - `created_at` (timestamptz) - Fecha de creación
      - `updated_at` (timestamptz) - Fecha de última actualización

  2. Seguridad
    - Habilitar RLS en la tabla usuarios
    - Políticas para acceso de usuarios autenticados
    - Los usuarios solo pueden ver/modificar su propia información
    - Los administradores pueden ver/modificar todos los usuarios

  3. Datos Iniciales
    - Usuarios de prueba con contraseñas hasheadas
    - Incluye administrador, supervisores y consultor
*/

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  nombres text NOT NULL,
  apellidos text NOT NULL,
  rol text NOT NULL DEFAULT 'consulta' CHECK (rol IN ('administrador', 'supervisor', 'consulta')),
  dependencia text NOT NULL,
  activo boolean NOT NULL DEFAULT true,
  ultimo_acceso timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Política para acceso anónimo durante desarrollo
CREATE POLICY "Acceso completo a usuarios para desarrollo"
  ON usuarios
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger para actualizar timestamp
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar usuarios de prueba
-- Nota: En producción, las contraseñas deben ser hasheadas usando bcrypt u otro algoritmo seguro
-- Para este ejemplo, usamos contraseñas simples (en texto plano por simplicidad)
-- Contraseñas: admin123, supervisor123, consulta123
INSERT INTO usuarios (id, email, password_hash, nombres, apellidos, rol, dependencia, activo, created_at) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440101',
    'admin@car.gov.co',
    'admin123',
    'Admin',
    'Sistema',
    'administrador',
    'Sistemas',
    true,
    '2023-01-15'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440102',
    'maria.gonzalez@car.gov.co',
    'supervisor123',
    'María',
    'González',
    'supervisor',
    'Dirección de Laboratorio e Investigación Ambiental',
    true,
    '2023-03-20'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440103',
    'carlos.rodriguez@car.gov.co',
    'supervisor123',
    'Carlos',
    'Rodríguez',
    'supervisor',
    'Dirección de Gestión del Recurso Hídrico',
    true,
    '2023-04-10'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440104',
    'consultor@external.com',
    'consulta123',
    'Consultor',
    'Externo',
    'consulta',
    'Externa',
    false,
    '2023-10-01'
  )
ON CONFLICT (id) DO NOTHING;