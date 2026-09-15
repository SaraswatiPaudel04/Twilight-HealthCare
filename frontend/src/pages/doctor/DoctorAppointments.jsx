import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const DoctorAppointments = () => {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("appointments/doctor/");
            setAppointments(response.data);
        } catch (err) {
            console.error("Error fetching doctor appointments:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to load appointments."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600 text-lg">
                    Loading appointments...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            My Appointments
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View and manage your patient appointments.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/doctor/dashboard")}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg"
                    >
                        ← Dashboard
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-100 text-red-700 px-5 py-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Empty */}
                {!error && appointments.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                        <div className="text-5xl mb-4">
                            📅
                        </div>

                        <h2 className="text-xl font-semibold text-gray-700">
                            No appointments found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You currently have no patient appointments.
                        </p>
                    </div>
                )}

                {/* Appointments */}
                {appointments.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {appointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >
                                {/* Patient */}
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-xl">
                                            👤
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">
                                            {appointment.patient_name}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Patient
                                        </p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Date
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {appointment.appointment_date}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Time
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {appointment.appointment_time}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Reason
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {appointment.reason || "No reason provided"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Status
                                        </p>

                                        <span
                                            className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                                appointment.status === "PENDING"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : appointment.status === "CONFIRMED"
                                                    ? "bg-green-100 text-green-700"
                                                    : appointment.status === "CANCELLED"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {appointment.status}
                                        </span>
                                    </div>

                                </div>

                                {/* Action */}
                                {appointment.status === "CONFIRMED" && (
                                    <button
                                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium"
                                    >
                                        Start Consultation
                                    </button>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default DoctorAppointments;