import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PatientDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow p-8 mb-6">

                    <div className="flex justify-between items-start">

                        <div>
                            <h1 className="text-3xl font-bold text-blue-600">
                                Patient Dashboard
                            </h1>

                            <p className="mt-4 text-gray-700">
                                Welcome, {user?.first_name} {user?.last_name}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Find Doctor */}
                    <div className="bg-white rounded-2xl shadow p-6">

                        <div className="text-4xl mb-4">
                            🩺
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            Find a Doctor
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Browse doctors by specialization and department.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/patient/doctors")
                            }
                            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium"
                        >
                            View Doctors
                        </button>

                    </div>


                    {/* My Appointments */}
                    <div className="bg-white rounded-2xl shadow p-6">

                        <div className="text-4xl mb-4">
                            📅
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            My Appointments
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View your booked appointments and their status.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/patient/appointments")
                            }
                            className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium"
                        >
                            View Appointments
                        </button>

                    </div>


                    {/* Patient Profile */}
                    <div className="bg-white rounded-2xl shadow p-6">

                        {/* <div className="text-4xl mb-4">
                            👤
                        </div> */}

                        <h2 className="text-xl font-semibold text-gray-800">
                            My Profile
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View and update your personal information.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/patient/profile")
                            }
                            className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium"
                        >
                            View Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PatientDashboard;