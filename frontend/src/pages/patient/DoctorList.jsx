import { useEffect, useState } from "react";
import API from "../../services/api";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await API.get("doctor/list/");
            setDoctors(response.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load doctors.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Loading doctors...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">

            <div className="max-w-6xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Our Doctors
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Find the right doctor for your healthcare needs.
                    </p>
                </div>

                {doctors.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-8 text-center">
                        <p className="text-gray-500">
                            No doctors available.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {doctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                            >

                                <div className="h-40 bg-blue-100 flex items-center justify-center">
                                    {doctor.profile_image ? (
                                        <img
                                            src={doctor.profile_image}
                                            alt={`Dr. ${doctor.first_name} ${doctor.last_name}`}
                                            className="w-28 h-28 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                                            {doctor.first_name?.charAt(0)}
                                            {doctor.last_name?.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">

                                    <h2 className="text-xl font-bold text-gray-800">
                                        Dr. {doctor.first_name} {doctor.last_name}
                                    </h2>

                                    <p className="text-blue-600 font-medium mt-1">
                                        {doctor.specialization}
                                    </p>

                                    <div className="mt-4 space-y-2 text-sm text-gray-600">

                                        <p>
                                            <strong>Department:</strong>{" "}
                                            {doctor.department_name || "Not assigned"}
                                        </p>

                                        <p>
                                            <strong>Qualification:</strong>{" "}
                                            {doctor.qualification || "Not provided"}
                                        </p>

                                        <p>
                                            <strong>Experience:</strong>{" "}
                                            {doctor.experience} years
                                        </p>

                                        <p>
                                            <strong>Consultation Fee:</strong>{" "}
                                            Rs. {doctor.consultation_fee}
                                        </p>

                                    </div>

                                    {doctor.bio && (
                                        <p className="mt-4 text-sm text-gray-500 line-clamp-3">
                                            {doctor.bio}
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

export default DoctorList;