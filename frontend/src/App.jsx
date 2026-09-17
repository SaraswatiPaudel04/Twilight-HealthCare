import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import DoctorList from "./pages/patient/DoctorList";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientProfile from "./pages/patient/PatientProfile";
import BookAppointment from "./pages/patient/BookAppointment";

import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import ReceptionistAppointments from "./pages/receptionist/ReceptionistAppointments";
import PatientAppointments from "./pages/patient/PatientAppointments";

import { AuthProvider, useAuth } from "./context/AuthContext";


function ProtectedRoute({ children, allowedRoles }) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}


function AppRoutes() {
    return (
        <Routes>

            {/* Home */}
            <Route
                path="/"
                element={<Home />}
            />

            <Route path="/doctors" element={<DoctorList />} />

            {/* Authentication */}
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* Admin */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />


            {/* Doctor */}
            <Route
                path="/doctor/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["DOCTOR"]}>
                        <DoctorDashboard />
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

            <Route
                path="/doctor/appointments"
                element={
                    <ProtectedRoute allowedRoles={["DOCTOR"]}>
                        <DoctorAppointments />
                    </ProtectedRoute>
                }
            />

            <Route path="/doctors" element={<DoctorList />} />

            {/* Patient */}
            <Route
                path="/patient/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["PATIENT"]}>
                        <PatientDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/patient/profile"
                element={
                    <ProtectedRoute allowedRoles={["PATIENT"]}>
                        <PatientProfile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/patient/appointments"
                element={
                    <ProtectedRoute allowedRoles={["PATIENT"]}>
                        <PatientAppointments />
                    </ProtectedRoute>
                }
            />

            {/* Patient Doctor List */}
            {/* <Route
                path="/patient/doctors"
                element={
                    <ProtectedRoute allowedRoles={["PATIENT"]}>
                        <DoctorList />
                    </ProtectedRoute>
                }
            /> */}

            {/* Patient Book Appointment */}
            <Route
                path="/patient/book-appointment"
                element={
                    <ProtectedRoute allowedRoles={["PATIENT"]}>
                        <BookAppointment />
                    </ProtectedRoute>
                }
            />


            {/* Receptionist */}
            <Route
                path="/receptionist/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["RECEPTIONIST"]}>
                        <ReceptionistDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/receptionist/appointments"
                element={
                    <ProtectedRoute allowedRoles={["RECEPTIONIST"]}>
                        <ReceptionistAppointments />
                    </ProtectedRoute>
                }
            />


            {/* Unknown URL */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
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