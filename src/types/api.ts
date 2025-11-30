export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    usuarioCreacion: number;
    fecha_creacion: string;
    roles: string[];
    dependenciaId: number | null;
    dependenciaNombre: string | null;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Convenio {
  id: number;
  numero_convenio: number;
  vigencia: number;
  objeto: string;
  fecha_inicio: string;
  fecha_final: string;
  valor_total_aprobado: number;
  fecha_creacion: string;
  fecha_modificacion: string | null;
  catalogo_tipo_id: number;
  dependencia: {
    id: number;
    nombre: string;
    abreviatura: string;
    codigo_dependencia: number;
  };
  usuarioCreacion?: {
    usuario_id: number;
    usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    usuario_creacion: number;
    created_at: string;
    updated_at: string;
  };
}

export interface Dependencia {
  id: number;
  nombre: string;
  abreviatura: string;
  codigo_dependencia: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
