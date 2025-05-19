import apiService from "./api"
import appConfig from "../config/appConfing"

// Authentication service
const authService = {
  // Login user and store token
  login: async (credentials) => {
    try {
      const response = await apiService.custom("post", "/auth/login", credentials)

      if (response.token) {
        localStorage.setItem(appConfig.auth.storageKey, response.token)

        // Store user role if available
        if (response.role) {
          localStorage.setItem(appConfig.auth.roleStorageKey, response.role)
        }
      }

      return response
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await apiService.custom("post", "/auth/register", userData)
      return response
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  // Log out user
  logout: () => {
    localStorage.removeItem(appConfig.auth.storageKey)
    localStorage.removeItem(appConfig.auth.roleStorageKey)

    // Redirect to login page
    window.location.href = appConfig.auth.loginPath
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await apiService.custom("post", "/auth/forgot-password", { email })
      return response
    } catch (error) {
      console.error("Forgot password error:", error)
      throw error
    }
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiService.custom("post", "/auth/reset-password", {
        token,
        newPassword,
      })
      return response
    } catch (error) {
      console.error("Reset password error:", error)
      throw error
    }
  },

  // Change password for authenticated user
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiService.custom("post", "/auth/change-password", {
        currentPassword,
        newPassword,
      })
      return response
    } catch (error) {
      console.error("Change password error:", error)
      throw error
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem(appConfig.auth.storageKey) !== null
  },

  // Get current user role
  getUserRole: () => {
    return localStorage.getItem(appConfig.auth.roleStorageKey) || "user"
  },
}

export default authService
