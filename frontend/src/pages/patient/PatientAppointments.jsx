import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const PatientAppointments = () => {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("appointments/my/");

            setAppointments(response.data);
        } catch (err) {
            console.error("Error fetching appointments:", err);

            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Failed to load your appointments.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "CONFIRMED":
                return "bg-green-100 text-green-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            case "COMPLETED":
                return "bg-blue-100 text-blue-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600 text-lg">
                    Loading your appointments...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">

            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/patient/dashboard")}
                    className="text-blue-600 hover:underline mb-6"
                >
                    ← Back to Dashboard
                </button>


                {/* Header */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        My Appointments
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View your appointments and their current status.
                    </p>

                </div>


                {/* Error */}
                {error && (
                    <div className="bg-red-100 text-red-700 px-5 py-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}


                {/* No appointments */}
                {!error && appointments.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-10 text-center">

                        <div className="text-5xl mb-4">
                            📅
                        </div>

                        <h2 className="text-xl font-semibold text-gray-700">
                            No appointments yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You haven't booked any appointments.
                        </p>

                        <button
                            onClick={() => navigate("/patient/doctors")}
                            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg"
                        >
                            Find a Doctor
                        </button>

                    </div>
                )}


                {/* Appointments */}
                {appointments.length > 0 && (
                    <div className="space-y-5">

                        {appointments.map((appointment) => (

                            <div
                                key={appointment.id}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                    {/* Doctor Information */}
                                    <div>

                                        <h2 className="text-xl font-bold text-gray-800">
                                            Dr. {appointment.doctor_name}
                                        </h2>

                                        <p className="text-blue-600 font-medium mt-1">
                                            {appointment.doctor_specialization}
                                        </p>

                                    </div>


                                    {/* Status */}
                                    <div>

                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                                                appointment.status
                                            )}`}
                                        >
                                            {appointment.status}
                                        </span>

                                    </div>

                                </div>


                                {/* Appointment Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Date
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            {appointment.appointment_date}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Time
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            {appointment.appointment_time}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Reason
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            {appointment.reason || "Not provided"}
                                        </p>
                                    </div>

                                </div>


                                {/* Status Message */}
                                <div className="mt-5">

                                    {appointment.status === "PENDING" && (
                                        <p className="text-yellow-700 bg-yellow-50 px-4 py-3 rounded-lg">
                                            ⏳ Your appointment is waiting for receptionist confirmation.
                                        </p>
                                    )}

                                    {appointment.status === "CONFIRMED" && (
                                        <p className="text-green-700 bg-green-50 px-4 py-3 rounded-lg">
                                            ✅ Your appointment has been confirmed.
                                        </p>
                                    )}

                                    {appointment.status === "CANCELLED" && (
                                        <p className="text-red-700 bg-red-50 px-4 py-3 rounded-lg">
                                            ❌ Your appointment has been cancelled.
                                        </p>
                                    )}

                                    {appointment.status === "COMPLETED" && (
                                        <p className="text-blue-700 bg-blue-50 px-4 py-3 rounded-lg">
                                            ✔️ Your appointment has been completed.
                                        </p>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
};

export default PatientAppointments;