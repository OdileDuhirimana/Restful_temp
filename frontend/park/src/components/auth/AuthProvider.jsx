import { createContext, useContext } from "react"
import useAuth from "../../hooks/useAuth"

// Create authentication context
const AuthContext = createContext(null)

// AuthProvider component to wrap the app and provide authentication context
export const AuthProvider = ({ children }) => {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }

  return context
}

// Protected route component
export const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuthContext()

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    window.location.href = "/"
    return null
  }

  // Check for required roles
  if (requiredRoles.length > 0) {
    const userRole = user?.role || "user"
    if (!requiredRoles.includes(userRole)) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 text-center mb-6">You don't have permission to access this page.</p>
          <button onClick={() => window.history.back()} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Go Back
          </button>
        </div>
      )
    }
  }

  // User is authenticated and has required roles, render children
  return children
}
