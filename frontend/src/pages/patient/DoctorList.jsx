import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await API.get("doctor/list/");
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    // Get unique departments
    const departments = [
        "All",
        ...new Set(
            doctors
                .map((doctor) => doctor.department_name)
                .filter(Boolean)
        ),
    ];

    // Search + filter
    const filteredDoctors = doctors.filter((doctor) => {
        const searchText = search.toLowerCase();

        const doctorName =
            `${doctor.first_name || ""} ${doctor.last_name || ""}`.toLowerCase();

        const specialization =
            (doctor.specialization || "").toLowerCase();

        const matchesSearch =
            doctorName.includes(searchText) ||
            specialization.includes(searchText);

        const matchesDepartment =
            department === "All" ||
            doctor.department_name === department;

        return matchesSearch && matchesDepartment;
    });

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Find a Doctor
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Search for doctors by name, specialization, or department.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Doctor
                            </label>

                            <input
                                type="text"
                                placeholder="Search by name or specialization..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Department
                            </label>

                            <select
                                value={department}
                                onChange={(e) =>
                                    setDepartment(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>

                {/* Results count */}
                <div className="mb-5">
                    <p className="text-gray-600">
                        Showing{" "}
                        <span className="font-semibold">
                            {filteredDoctors.length}
                        </span>{" "}
                        doctor
                        {filteredDoctors.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {/* Doctor Cards */}
                {filteredDoctors.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No doctors found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try a different search or department.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6"
                            >

                                {/* Doctor Image */}
                                <div className="flex justify-center mb-5">
                                    {doctor.profile_image ? (
                                        <img
                                            src={doctor.profile_image}
                                            alt={`${doctor.first_name} ${doctor.last_name}`}
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-blue-600">
                                                {doctor.first_name?.[0] || "D"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Name */}
                                <h2 className="text-xl font-bold text-gray-800 text-center">
                                    Dr. {doctor.first_name} {doctor.last_name}
                                </h2>

                                {/* Specialization */}
                                <p className="text-blue-600 text-center mt-1 font-medium">
                                    {doctor.specialization}
                                </p>

                                {/* Details */}
                                <div className="mt-5 space-y-2 text-sm text-gray-600">

                                    <p>
                                        <span className="font-semibold">
                                            Department:
                                        </span>{" "}
                                        {doctor.department_name || "Not assigned"}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Qualification:
                                        </span>{" "}
                                        {doctor.qualification || "Not provided"}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Experience:
                                        </span>{" "}
                                        {doctor.experience} years
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Consultation Fee:
                                        </span>{" "}
                                        Rs. {doctor.consultation_fee}
                                    </p>

                                </div>

                                {/* Bio */}
                                {doctor.bio && (
                                    <p className="text-sm text-gray-500 mt-4 line-clamp-3">
                                        {doctor.bio}
                                    </p>
                                )}

                                {/* Appointment Button */}
                                <button
                                    onClick={() =>
                                        navigate("/patient/book-appointment", {
                                            state: { doctor },
                                        })
                                    }
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                                >
                                    Book Appointment
                                </button>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default DoctorList;