import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ReceptionistDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Receptionist Dashboard
                    </h1>

                    <p className="text-sm text-gray-500">
                        Welcome, {user?.first_name || user?.username}
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </header>


            {/* Dashboard */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Patients */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="text-3xl mb-3">👥</div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            Patients
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Register and manage patients
                        </p>

                        <button
                            className="mt-4 text-blue-600 font-medium hover:underline"
                        >
                            Manage Patients →
                        </button>
                    </div>


                    {/* Appointments */}
                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <div className="text-3xl mb-3">📅</div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            Appointments
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            View and manage patient appointments
                        </p>

                        <button
                            onClick={() =>
                                navigate("/receptionist/appointments")
                            }
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium"
                        >
                            Manage Appointments →
                        </button>

                    </div>


                    {/* Doctors */}
                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <div className="text-3xl mb-3">🩺</div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            Doctors
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            View doctors and departments
                        </p>

                        <button
                            className="mt-4 text-blue-600 font-medium hover:underline"
                        >
                            View Doctors →
                        </button>

                    </div>


                    {/* Billing */}
                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <div className="text-3xl mb-3">💰</div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            Billing
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Manage patient billing
                        </p>

                        <button
                            className="mt-4 text-blue-600 font-medium hover:underline"
                        >
                            Manage Billing →
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default ReceptionistDashboard;