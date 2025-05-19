import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, ProtectedRoute } from "./components/auth/AuthProvider"
import appConfig from "./config/appConfing"
import authService from "./services/auth"

// Auth pages
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import ForgotPassword from "./pages/ForgotPassword"

// Main pages
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"

// Entity pages
import EntityPage from "./pages/EntityPage"

function App() {
  // Check if user is authenticated
  const isAuthenticated = authService.isAuthenticated()

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={isAuthenticated ? <Navigate to={appConfig.auth.defaultRedirect} /> : <Login />} />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to={appConfig.auth.defaultRedirect} /> : <Signup />}
          />
          <Route
            path="/forgot-password"
            element={isAuthenticated ? <Navigate to={appConfig.auth.defaultRedirect} /> : <ForgotPassword />}
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
            
                <Dashboard />
      
            }
          />

          {/* Entity routes - primary entity */}
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <EntityPage entityName="vehicle" />
              </ProtectedRoute>
            }
          />

          {/* Entity routes - secondary entity */}
          <Route
            path="/slot-requests"
            element={
              <ProtectedRoute>
                <EntityPage entityName="request" />
              </ProtectedRoute>
            }
          />

          {/* Entity routes - tertiary entity */}
          <Route
            path="/available-slots"
            element={
              <ProtectedRoute>
                <EntityPage entityName="slot" viewMode="table" showViewToggle={false} />
              </ProtectedRoute>
            }
          />

          {/* Profile route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRoles={["admin"]}>
                {/* Admin pages would go here */}
                <div>Admin Area</div>
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
