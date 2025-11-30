import React, { useState } from 'react';
import { Settings, Users, Building, MapPin, Percent, Database, Shield, FileText } from 'lucide-react';
import { SupervisoresAdmin } from './SupervisoresAdmin';
import { DependenciasAdmin } from './DependenciasAdmin';
import { EntidadesAdmin } from './EntidadesAdmin';
import { ConfiguracionAdmin } from './ConfiguracionAdmin';
import { UsuariosAdmin } from './UsuariosAdmin';
import { BackupAdmin } from './BackupAdmin';

export const Admin: React.FC = () => {
  const [activeSection, setActiveSection] = useState('supervisores');

  const adminSections = [
    { id: 'supervisores', label: 'Supervisores', icon: Users, description: 'Gestión de supervisores CAR' },
    { id: 'dependencias', label: 'Dependencias', icon: Building, description: 'Direcciones y subdirecciones' },
    { id: 'entidades', label: 'Entidades Convenio', icon: MapPin, description: 'Municipios y organizaciones' },
    { id: 'configuracion', label: 'Configuración', icon: Settings, description: 'Parámetros del sistema' },
    { id: 'usuarios', label: 'Usuarios', icon: Shield, description: 'Gestión de usuarios y roles' },
    { id: 'backup', label: 'Respaldo', icon: Database, description: 'Backup y restauración' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'supervisores':
        return <SupervisoresAdmin />;
      case 'dependencias':
        return <DependenciasAdmin />;
      case 'entidades':
        return <EntidadesAdmin />;
      case 'configuracion':
        return <ConfiguracionAdmin />;
      case 'usuarios':
        return <UsuariosAdmin />;
      case 'backup':
        return <BackupAdmin />;
      default:
        return <SupervisoresAdmin />;
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestión de datos maestros y configuración del sistema
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`p-6 rounded-lg border text-left transition-all ${
                  activeSection === section.id
                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                    : 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center mb-3">
                  <Icon className={`h-6 w-6 mr-3 ${
                    activeSection === section.id ? 'text-emerald-600' : 'text-gray-400'
                  }`} />
                  <h3 className={`text-lg font-medium ${
                    activeSection === section.id ? 'text-emerald-900' : 'text-gray-900'
                  }`}>
                    {section.label}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">{section.description}</p>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};