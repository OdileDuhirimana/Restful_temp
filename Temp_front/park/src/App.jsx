import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Vehicles from "./pages/Vehicles";
import SlotRequests from "./pages/SlotRequests";
import AvailableSlots from "./pages/AvailableSlots";

function App() {
  // Check if user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
  };

  console.log(isAuthenticated);
  

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/signup"
          element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <Signup />
          }
        />
        <Route
          path="/forgot-password"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" />
            ) : (
              <ForgotPassword />
            )
          }
        />

        {/* Private Routes */}
        {isAuthenticated() && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/slot-requests" element={<SlotRequests />} />
            <Route path="/available-slots" element={<AvailableSlots />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
