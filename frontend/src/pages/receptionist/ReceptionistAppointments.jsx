import React, { useEffect, useState } from "react";
import API from "../../services/api";

const ReceptionistAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all appointments
    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("appointments/all/");

            setAppointments(response.data);
        } catch (err) {
            console.error("Error fetching appointments:", err);

            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Failed to load appointments.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Confirm appointment
    const handleConfirm = async (id) => {
        try {
            await API.post(`appointments/${id}/confirm/`);

            alert("Appointment confirmed successfully.");

            fetchAppointments();
        } catch (err) {
            console.error("Error confirming appointment:", err);

            alert(
                err.response?.data?.detail ||
                "Failed to confirm appointment."
            );
        }
    };

    // Cancel appointment
    const handleCancel = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await API.post(`appointments/${id}/cancel/`);

            alert("Appointment cancelled successfully.");

            fetchAppointments();
        } catch (err) {
            console.error("Error cancelling appointment:", err);

            alert(
                err.response?.data?.detail ||
                "Failed to cancel appointment."
            );
        }
    };

    // Loading
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Appointment Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and manage patient appointments.
                    </p>
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
                        <h2 className="text-xl font-semibold text-gray-700">
                            No appointments found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            There are currently no patient appointments.
                        </p>
                    </div>
                )}

                {/* Appointment Table */}
                {appointments.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Patient
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Doctor
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Date
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Time
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Reason
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Status
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">

                                    {appointments.map((appointment) => (

                                        <tr
                                            key={appointment.id}
                                            className="hover:bg-gray-50"
                                        >

                                            {/* Patient */}
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-800">
                                                    {appointment.patient_name}
                                                </p>
                                            </td>

                                            {/* Doctor */}
                                            <td className="px-6 py-4">
                                                <p className="text-gray-700">
                                                    Dr.{" "}
                                                    {appointment.doctor_name}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {appointment.doctor_specialization}
                                                </p>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4 text-gray-700">
                                                {appointment.appointment_date}
                                            </td>

                                            {/* Time */}
                                            <td className="px-6 py-4 text-gray-700">
                                                {appointment.appointment_time}
                                            </td>

                                            {/* Reason */}
                                            <td className="px-6 py-4 text-gray-700">
                                                {appointment.reason || "—"}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        appointment.status ===
                                                        "PENDING"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : appointment.status ===
                                                              "CONFIRMED"
                                                            ? "bg-green-100 text-green-700"
                                                            : appointment.status ===
                                                              "CANCELLED"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"
                                                    }`}
                                                >
                                                    {appointment.status}
                                                </span>

                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">

                                                {appointment.status ===
                                                    "PENDING" ? (
                                                    <div className="flex gap-2">

                                                        <button
                                                            onClick={() =>
                                                                handleConfirm(
                                                                    appointment.id
                                                                )
                                                            }
                                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                                                        >
                                                            Confirm
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleCancel(
                                                                    appointment.id
                                                                )
                                                            }
                                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                                                        >
                                                            Cancel
                                                        </button>

                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">
                                                        No action
                                                    </span>
                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ReceptionistAppointments;