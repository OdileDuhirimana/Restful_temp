// src/services/authService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/appConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
   headers: {
    'Content-Type': 'application/json', 
  },
});

export const register = async (formData) => {
  const response = await api.post('/auth/register', formData);
  return response.data;
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Network error - could not connect to server');
    }
  }
};
