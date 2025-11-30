import React, { useState } from 'react';
import { Layout } from './components/common/Layout';
import { Convenios } from './components/convenios/Convenios';
import { Documentos } from './components/documentos/Documentos';
import { Admin } from './components/admin/Admin';
import { Dashboard } from './components/dashboard/Dashboard';
import { Financiero } from './components/financiero/Financiero';
import { Reportes } from './components/reportes/Reportes';
import { Alertas } from './components/alertas/Alertas';
import { Auditoria } from './components/auditoria/Auditoria';
import { Login } from './components/auth/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('convenios');
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'convenios':
        return <Convenios />;
      case 'financiero':
        return <Financiero />;
      case 'documentos':
        return <Documentos />;
      case 'reportes':
        return <Reportes />;
      case 'alertas':
        return <Alertas />;
      case 'auditoria':
        return <Auditoria />;
      case 'admin':
        return <Admin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;