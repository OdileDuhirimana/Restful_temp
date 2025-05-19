import axios from "axios"
import appConfig from "../config/appConfing"

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: appConfig.api.baseUrl,
  timeout: appConfig.api.timeout,
  withCredentials: appConfig.api.withCredentials,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(appConfig.auth.storageKey)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle authentication errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If using refresh tokens, you could implement token refresh logic here
      // For now, just redirect to login
      localStorage.removeItem(appConfig.auth.storageKey)
      window.location.href = appConfig.auth.loginPath
      return Promise.reject(error)
    }

    // Add global error handling here
    return Promise.reject(error)
  },
)

// Generic API service with CRUD operations
const apiService = {
  // GET all records with optional filtering
  getAll: async (endpoint, params = {}) => {
    try {
      const response = await apiClient.get(endpoint, { params })
      return response.data
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error)
      throw error
    }
  },

  // GET a single record by ID
  getById: async (endpoint, id) => {
    try {
      const response = await apiClient.get(`${endpoint}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching item with ID ${id} from ${endpoint}:`, error)
      throw error
    }
  },

  // POST a new record
  create: async (endpoint, data) => {
    try {
      const response = await apiClient.post(endpoint, data)
      return response.data
    } catch (error) {
      console.error(`Error creating record in ${endpoint}:`, error)
      throw error
    }
  },

  // PUT an existing record
  update: async (endpoint, id, data) => {
    try {
      const response = await apiClient.put(`${endpoint}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating record with ID ${id} in ${endpoint}:`, error)
      throw error
    }
  },

  // DELETE a record
  delete: async (endpoint, id) => {
    try {
      const response = await apiClient.delete(`${endpoint}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting record with ID ${id} from ${endpoint}:`, error)
      throw error
    }
  },

  // Custom request method for other API endpoints
  custom: async (method, url, data = null, config = {}) => {
    try {
      const response = await apiClient[method.toLowerCase()](url, data, config)
      return response.data
    } catch (error) {
      console.error(`Error in custom request to ${url}:`, error)
      throw error
    }
  },
}

export default apiService
