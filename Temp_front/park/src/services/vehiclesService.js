// 

// src/services/vehicleService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/appConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Request Interceptor - Token Management
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if no token exists
    window.location.href = '/login';
    return Promise.reject('No authentication token found');
  }
  
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2. Response Interceptor - Error Handling
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      try {
        // Attempt token refresh
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        
        // Store new tokens
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect on refresh failure
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// 3. Enhanced API Methods with Error Handling
const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      console.error('Forbidden: You lack necessary permissions');
    }
    throw error; // Re-throw for component-level handling
  }
};

export const addVehicle = (formData) => 
  handleRequest(api.post('/vehicles', formData));

export const getAllVehicles = ({ page = 1, limit = 10, search = '' } = {}) =>
  handleRequest(api.get('/vehicles', { params: { page, limit, search } }));

export const updateVehicle = (id, formData) =>
  handleRequest(api.put(`/vehicles/${id}`, formData));

export const deleteVehicle = (id) =>
  handleRequest(api.delete(`/vehicles/${id}`));

export const bulkAddVehicles = (vehicles) =>
  handleRequest(api.post('/vehicles/bulk', vehicles));