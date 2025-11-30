import { useState, useEffect } from 'react';
import { Alerta } from '../types';
import { alertasService } from '../services/alertasService';

export const useAlertas = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlertas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await alertasService.getUnread();
      setAlertas(data);
    } catch (err) {
      console.error('Error fetching alertas:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar alertas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlertas();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      setError(null);
      await alertasService.markAsRead(id);
      setAlertas(prev => prev.map(alerta =>
        alerta.id === id ? { ...alerta, leida: true } : alerta
      ));
    } catch (err) {
      console.error('Error marking alerta as read:', err);
      setError(err instanceof Error ? err.message : 'Error al marcar alerta como leída');
      throw err;
    }
  };

  const markAllAsRead = async () => {
    try {
      setError(null);
      await alertasService.markAllAsRead();
      setAlertas(prev => prev.map(alerta => ({ ...alerta, leida: true })));
    } catch (err) {
      console.error('Error marking all alertas as read:', err);
      setError(err instanceof Error ? err.message : 'Error al marcar todas las alertas como leídas');
      throw err;
    }
  };

  return {
    alertas,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refreshAlertas: fetchAlertas
  };
};
