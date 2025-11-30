import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X, User } from "lucide-react";
import { useAdmin } from "../../hooks/useAdmin";

type Rol = "administrador" | "supervisor" | "consulta" | "";

interface Supervisor {
  id: string;
  nombre: string;
  rol: Rol;
  dependencia: string;
  email: string;
  activo: boolean;
}

const getRolColor = (rol: string) => {
  switch (rol) {
    case "administrador":
      return "bg-red-100 text-red-800";
    case "supervisor":
      return "bg-blue-100 text-blue-800";
    case "consulta":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRolLabel = (rol: string) => {
  switch (rol) {
    case "administrador":
      return "Administrador";
    case "supervisor":
      return "Supervisor";
    case "consulta":
      return "Consulta";
    default:
      return "Usuario";
  }
};

export const SupervisoresAdmin: React.FC = () => {
  const { usuarios: adminUsuarios } = useAdmin();
  const [supervisores, setSupervisores] = useState<Supervisor[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Supervisor>>({});

  useEffect(() => {
    const fetchSupervisores = async () => {
      try {
        const data = await adminUsuarios.getAll();
        const mapped = Array.isArray(data)
          ? data
            .map((u: any) => {
              const rolApi = Array.isArray(u.roles) && u.roles.length > 0 ? String(u.roles[0]).toLowerCase() : "";
              const rol: Rol = rolApi.includes("admin")
                ? "administrador"
                : rolApi.includes("supervisor")
                  ? "supervisor"
                  : "consulta";

              return {
                id: String(u.id ?? u.usuario ?? u.email ?? Math.random()),
                nombre: u.nombre && u.apellido ? `${u.nombre} ${u.apellido}` : u.usuario || "",
                rol,
                dependencia: u.dependenciaNombre || u.dependencia || "",
                email: u.email || "",
                activo: true,
              } as Supervisor;
            })
            .filter((s: Supervisor) => s.rol === "supervisor")
          : [];
        setSupervisores(mapped);
      } catch (err) {
        console.error("Error cargando supervisores:", err);
      }
    };

    fetchSupervisores();
  }, [adminUsuarios]);

  const handleEdit = (supervisor: Supervisor) => {
    setIsEditing(supervisor.id);
    setFormData(supervisor);
  };

  const handleSave = () => {
    if (isAdding) {
      const newSupervisor: Supervisor = {
        id: Date.now().toString(),
        nombre: formData.nombre || "",
        rol: (formData.rol as Rol) || "supervisor",
        dependencia: formData.dependencia || "",
        email: formData.email || "",
        activo: formData.activo ?? true,
      };
      setSupervisores([...supervisores, newSupervisor]);
      setIsAdding(false);
    } else if (isEditing) {
      setSupervisores(supervisores.map((s) => (s.id === isEditing ? { ...s, ...formData } : s)));
      setIsEditing(null);
    }
    setFormData({});
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Estas seguro de eliminar este supervisor?")) {
      setSupervisores(supervisores.filter((s) => s.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setSupervisores(supervisores.map((s) => (s.id === id ? { ...s, activo: !s.activo } : s)));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Gestion de Supervisores</h2>
          <p className="text-sm text-gray-600">Administre los supervisores del sistema</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Supervisor
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Agregar Nuevo Supervisor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.nombre || ""}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.rol || "supervisor"}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value as Rol })}
              >
                <option value="consulta">Consulta</option>
                <option value="supervisor">Supervisor</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dependencia</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.dependencia || ""}
                onChange={(e) => setFormData({ ...formData, dependencia: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              <Save className="h-4 w-4 mr-1" />
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supervisor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dependencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {supervisores.map((supervisor) => (
              <tr key={supervisor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === supervisor.id ? (
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.nombre || ""}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{supervisor.nombre}</div>
                        <div className="text-sm text-gray-500">{supervisor.email}</div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === supervisor.id ? (
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.rol || ""}
                      onChange={(e) => setFormData({ ...formData, rol: e.target.value as Rol })}
                    >
                      <option value="consulta">Consulta</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="administrador">Administrador</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRolColor(
                        supervisor.rol
                      )}`}
                    >
                      {getRolLabel(supervisor.rol)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing === supervisor.id ? (
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.dependencia || ""}
                      onChange={(e) => setFormData({ ...formData, dependencia: e.target.value })}
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{supervisor.dependencia}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleActive(supervisor.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      supervisor.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {supervisor.activo ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isEditing === supervisor.id ? (
                    <div className="flex justify-end space-x-2">
                      <button onClick={handleSave} className="text-emerald-600 hover:text-emerald-900">
                        <Save className="h-4 w-4" />
                      </button>
                      <button onClick={handleCancel} className="text-gray-600 hover:text-gray-900">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(supervisor)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(supervisor.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupervisoresAdmin;
