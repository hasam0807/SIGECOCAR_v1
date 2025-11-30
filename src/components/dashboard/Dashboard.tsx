import React from 'react';
import { MetricsCardsSupabase } from './MetricsCardsSupabase';
import { ChartsSection } from './ChartsSection';
import { RecentActivity } from './RecentActivity';
import { UpcomingAlertsSupabase } from './UpcomingAlertsSupabase';

export const Dashboard: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Ejecutivo</h1>
          <p className="mt-1 text-sm text-gray-500">
            Resumen general del estado de convenios y cuentas conjuntas
          </p>
        </div>

        {/* Metrics Cards */}
        <MetricsCardsSupabase />

        {/* Charts Section */}
        <div className="mt-8">
          <ChartsSection />
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivity />
          <UpcomingAlertsSupabase />
        </div>
      </div>
    </div>
  );
};