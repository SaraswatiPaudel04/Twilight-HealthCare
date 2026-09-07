import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
// import BookAppointment from "./pages/patient/BookAppointment";
import PatientProfile from "./pages/patient/PatientProfile";


import { AuthProvider, useAuth } from "./context/AuthContext";

import DoctorProfile from "./pages/doctor/DoctorProfile";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import DoctorList from "./pages/patient/DoctorList";

function ProtectedRoute({ children, role }) {

  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function AppRoutes() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute role="DOCTOR">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute role="PATIENT">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />



      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute role="PATIENT">
            <PatientProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute allowedRoles={["DOCTOR"]}>
            <DoctorProfile />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/book-appointment"
        element={<BookAppointment />}
      /> */}

      <Route
        path="/receptionist/dashboard"
        element={
          <ProtectedRoute allowedRoles={["RECEPTIONIST"]}>
            <ReceptionistDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/doctors"
        element={
          <ProtectedRoute allowedRoles={["PATIENT"]}>
            <DoctorList />
          </ProtectedRoute>
        }
      />

    </Routes>





  );
}


function App() {

  return (
    <BrowserRouter>

      <AuthProvider>

        <Navbar />
        <AppRoutes />

      </AuthProvider>

    </BrowserRouter>


  );
}


export default App;