import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";

const BookAppointment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const doctor = location.state?.doctor;

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    if (!doctor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600">
                        Doctor information not found.
                    </h2>

                    <button
                        onClick={() => navigate("/patient/doctors")}
                        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Back to Doctors
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const response = await API.post("appointments/create/", {
                doctor: doctor.id,
                appointment_date: date,
                appointment_time: time,
                reason: reason,
            });

            console.log("Appointment created:", response.data);

            setSuccess(
                "Appointment booked successfully! Waiting for confirmation."
            );

            setDate("");
            setTime("");
            setReason("");
        } catch (err) {
            console.error("Appointment booking error:", err);

            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Failed to book appointment. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-2xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/patient/doctors")}
                    className="text-blue-600 hover:underline mb-6"
                >
                    ← Back to Doctors
                </button>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Book Appointment
                </h1>

                <p className="text-gray-500 mb-8">
                    Select your preferred date and time.
                </p>

                {/* Doctor Information */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

                    <div className="flex items-center gap-5">

                        {doctor.profile_image ? (
                            <img
                                src={doctor.profile_image}
                                alt="Doctor"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-2xl font-bold text-blue-600">
                                    {doctor.first_name?.[0] || "D"}
                                </span>
                            </div>
                        )}

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Dr. {doctor.first_name} {doctor.last_name}
                            </h2>

                            <p className="text-blue-600 font-medium">
                                {doctor.specialization}
                            </p>

                            <p className="text-gray-500">
                                {doctor.department_name || "Department not assigned"}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Appointment Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-sm p-6"
                >

                    {/* Date */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Appointment Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Time */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Appointment Time
                        </label>

                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Reason */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Reason for Visit
                        </label>

                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows="4"
                            placeholder="Enter the reason for your appointment..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="mb-5 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
                            {success}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-5 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? "Booking..." : "Book Appointment"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default BookAppointment;