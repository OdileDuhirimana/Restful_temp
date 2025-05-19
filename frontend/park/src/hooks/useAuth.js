"use client"

import { useState, useEffect, useCallback } from "react"
import authService from "../services/auth"

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check user authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = authService.isAuthenticated()
      setIsAuthenticated(isLoggedIn)

      if (isLoggedIn) {
        try {
          // Try to get user profile if needed
          // This would be a good place to validate the token with the server
          // const userProfile = await apiService.custom("get", "/auth/me");
          // setUser(userProfile);

          // For now, we'll just set a basic user object with the role
          const role = authService.getUserRole()
          setUser({ role })
        } catch (err) {
          console.error("Error fetching user profile:", err)
          // On error, log out the user
          handleLogout()
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  // Login handler
  const handleLogin = useCallback(async (credentials) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authService.login(credentials)

      setIsAuthenticated(true)

      // Set user data if available
      if (response.user) {
        setUser(response.user)
      } else {
        // Set minimal user data with role
        const role = authService.getUserRole()
        setUser({ role })
      }

      return response
    } catch (err) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Register handler
  const handleRegister = useCallback(async (userData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authService.register(userData)
      return response
    } catch (err) {
      setError(err.message || "Registration failed")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Logout handler
  const handleLogout = useCallback(() => {
    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
  }, [])

  // Forgot password handler
  const handleForgotPassword = useCallback(async (email) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authService.forgotPassword(email)
      return response
    } catch (err) {
      setError(err.message || "Password reset request failed")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Check if user has a specific role
  const hasRole = useCallback(
    (role) => {
      if (!user) return false

      // If role is an array, check if user has any of the roles
      if (Array.isArray(role)) {
        return role.includes(user.role)
      }

      // Check for specific role
      return user.role === role
    },
    [user],
  )

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
    hasRole,
  }
}

export default useAuth
