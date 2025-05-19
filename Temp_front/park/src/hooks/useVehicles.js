// src/hooks/useVehicle.js
import { useState } from 'react';
import { 
  addVehicle, 
  getAllVehicles, 
  updateVehicle, 
  deleteVehicle, 
  bulkAddVehicles 
} from '../services/vehiclesService';

export const useVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVehicles = async ({ page = 1, limit = 10, search = '' } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllVehicles({ page, limit, search });
      setVehicles(response.vehicles || []);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  const createVehicle = async (formData) => {
    try {
      setLoading(true);
      const newVehicle = await addVehicle(formData);
      setVehicles(prev => [newVehicle.vehicle, ...prev]);
      return newVehicle;
    } catch (err) {
      setError(err.message || 'Failed to add vehicle');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const modifyVehicle = async (id, updatedData) => {
    try {
      setLoading(true);
      const updated = await updateVehicle(id, updatedData);
      setVehicles(prev => prev.map(v => v.id === id ? updated.vehicle : v));
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update vehicle');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeVehicle = async (id) => {
    try {
      setLoading(true);
      await deleteVehicle(id);
      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete vehicle');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createBulkVehicles = async (vehicleArray) => {
    try {
      setLoading(true);
      const response = await bulkAddVehicles(vehicleArray);
      setVehicles(prev => [...response.created, ...prev]);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to bulk add vehicles');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    createVehicle,
    modifyVehicle,
    removeVehicle,
    createBulkVehicles,
    clearError: () => setError(null),
  };
};
