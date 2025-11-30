import React from 'react';
import { FileText, TrendingUp, DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { mockDashboardMetrics } from '../../data/mockData';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const MetricsCards: React.FC = () => {
  const metrics = mockDashboardMetrics;

  const cards = [
    {
      title: 'Total Convenios',
      value: metrics.totalConvenios.toString(),
      icon: FileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Convenios Activos',
      value: metrics.conveniosActivos.toString(),
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Saldo Total',
      value: formatCurrency(metrics.saldoTotal),
      icon: DollarSign,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Rendimientos del Mes',
      value: formatCurrency(metrics.rendimientosDelMes),
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Vencimientos Próximos',
      value: metrics.vencimientosProximos.toString(),
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Documentos Pendientes',
      value: metrics.documentosPendientes.toString(),
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className={`${card.bgColor} rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-center">
              <div className={`${card.color} rounded-md p-3`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{card.title}</dt>
                  <dd className={`text-lg font-medium ${card.textColor}`}>{card.value}</dd>
                </dl>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};