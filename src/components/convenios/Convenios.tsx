import React, { useState } from 'react';
import { ConveniosList } from './ConveniosList';
import { ConvenioForm } from './ConvenioForm';
import { ConvenioDetails } from './ConvenioDetails';
import { useSupabaseConvenios } from '../../hooks/useSupabaseConvenios';
import { Convenio } from '../../types';

export const Convenios: React.FC = () => {
  const [view, setView] = useState<'list' | 'form' | 'details'>('list');
  const [selectedConvenio, setSelectedConvenio] = useState<Convenio | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { addConvenio, updateConvenio } = useSupabaseConvenios();

  const handleCreateConvenio = () => {
    setSelectedConvenio(null);
    setIsEditing(false);
    setView('form');
  };

  const handleEditConvenio = (convenio: Convenio) => {
    setSelectedConvenio(convenio);
    setIsEditing(true);
    setView('form');
  };

  const handleSaveConvenio = async (convenioData: Omit<Convenio, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (isEditing && selectedConvenio) {
        await updateConvenio(selectedConvenio.id, convenioData);
      } else {
        await addConvenio(convenioData);
      }
      setView('list');
    } catch (error) {
      // Error is handled in the form component
      throw error;
    }
  };

  const handleViewConvenio = (convenio: Convenio) => {
    setSelectedConvenio(convenio);
    setView('details');
  };

  const handleCloseForm = () => {
    setView('list');
    setSelectedConvenio(null);
  };

  return (
    <>
      {view === 'list' && (
        <ConveniosList 
          onCreateConvenio={handleCreateConvenio}
          onViewConvenio={handleViewConvenio}
          onEditConvenio={handleEditConvenio}
        />
      )}
      
      {view === 'form' && (
        <ConvenioForm 
          onClose={handleCloseForm}
          onSave={handleSaveConvenio}
          convenio={isEditing ? selectedConvenio : undefined}
          isEditing={isEditing}
        />
      )}
      
      {view === 'details' && selectedConvenio && (
        <ConvenioDetails 
          convenio={selectedConvenio}
          onClose={handleCloseForm}
          onEdit={() => handleEditConvenio(selectedConvenio)}
        />
      )}
    </>
  );
};