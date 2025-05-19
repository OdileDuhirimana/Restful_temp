// src/hooks/useAuth.js
import { useState } from 'react';
import { login, register } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (credentials) => {
  try {
    setLoading(true);
    setError(null);
    const response = await login(credentials);
    localStorage.setItem('authToken', response.token);
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  } catch (error) {
    setError(error.message || 'Login failed');
    throw error;
  } finally {
    setLoading(false);
  }
};

  const signUp = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await register(formData);
      return response;
    } catch (err) {
      setError(err.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    signIn, 
    signUp, 
    authState: { loading, error },
    clearError: () => setError(null)
  };
};