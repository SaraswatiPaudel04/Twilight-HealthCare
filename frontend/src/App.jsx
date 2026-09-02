import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";

import { AuthProvider, useAuth } from "./context/AuthContext";


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

        </Routes>
    );
}


function App() {

    return (
        <BrowserRouter>

            <AuthProvider>

                <AppRoutes />

            </AuthProvider>

        </BrowserRouter>
    );
}


export default App;