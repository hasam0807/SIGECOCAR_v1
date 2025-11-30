import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useSupabaseDashboard } from "../../hooks/useSupabaseDashboard";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export const ChartsSection: React.FC = () => {
  const { metricsData } = useSupabaseDashboard();

  const monthlyData = useMemo(() => metricsData.rendimientosMensuales, [metricsData]);
  const evolutionData = useMemo(() => metricsData.evolucionConvenios, [metricsData]);
  const statusData = useMemo(() => metricsData.estadoConvenios, [metricsData]);
  const dependenciaData = useMemo(() => metricsData.conveniosPorDependencia, [metricsData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Rendimientos Mensuales */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rendimientos Mensuales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
            <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Rendimientos"]} />
            <Bar dataKey="rendimientos" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Evolución de Convenios */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Evolución de Convenios</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={evolutionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="convenios" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Estado de Convenios */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Estado de Convenios</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Convenios por Dependencia */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Convenios por Dependencia</h3>
        <div className="space-y-4">
          {dependenciaData.map((dep) => (
            <div key={dep.nombre} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{dep.nombre}</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${dep.porcentaje}%` }}></div>
                </div>
                <span className="text-sm font-medium">{dep.total}</span>
              </div>
            </div>
          ))}
          {dependenciaData.length === 0 && (
            <p className="text-sm text-gray-500">Sin información de dependencias.</p>
          )}
        </div>
      </div>
    </div>
  );
};