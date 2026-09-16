import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DoctorDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow p-8 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-green-600">
                                Doctor Dashboard
                            </h1>

                            <p className="mt-4 text-gray-700">
                                Welcome, Dr. {user?.first_name} {user?.last_name}
                            </p>

                            <p className="mt-2 text-gray-500">
                                Role: {user?.role}
                            </p>
                        </div>

                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Appointments */}
                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-xl font-semibold text-gray-800">
                            My Appointments
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View your scheduled patient appointments.
                        </p>

                        <button
                            onClick={() => navigate("/doctor/appointments")}
                            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium"
                        >
                            View Appointments →
                        </button>
                    </div>

                    {/* Doctor Profile */}
                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-xl font-semibold text-gray-800">
                            My Profile
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View and update your professional information.
                        </p>

                        <button
                            onClick={() => navigate("/doctor/profile")}
                            className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium"
                        >
                            View Profile →
                        </button>
                    </div>

                    {/* Consultation */}
                    <div className="bg-white rounded-2xl shadow p-6">


                        <h2 className="text-xl font-semibold text-gray-800">
                            Consultations
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Manage patient consultations and medical records.
                        </p>

                        <button
                            onClick={() => navigate("/doctor/appointments")}
                            className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium"
                        >
                            Start Consultation
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;