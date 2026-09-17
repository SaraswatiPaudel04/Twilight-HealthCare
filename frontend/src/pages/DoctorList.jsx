import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function DoctorList() {
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

            console.log("DOCTORS FROM API:", response.data);

            setDoctors(response.data);
        } catch (error) {
            console.error("DOCTOR API ERROR:", error);
        }
    };

    const departments = [
        "All",
        ...new Set(
            doctors
                .map((doctor) => doctor.department_name)
                .filter(Boolean)
        ),
    ];

    const filteredDoctors = doctors.filter((doctor) => {
        const fullName = `${doctor.first_name || ""} ${
            doctor.last_name || ""
        }`.toLowerCase();

        const matchesSearch =
            fullName.includes(search.toLowerCase()) ||
            (doctor.specialization || "")
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesDepartment =
            department === "All" ||
            doctor.department_name === department;

        return matchesSearch && matchesDepartment;
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">
                Our Doctors
            </h1>

            {/* Search */}
            <input
                type="text"
                placeholder="Search doctor or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/2 p-3 border rounded-lg mb-4"
            />

            {/* Department */}
            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="p-3 border rounded-lg mb-8 ml-0 md:ml-4"
            >
                {departments.map((dept) => (
                    <option key={dept} value={dept}>
                        {dept}
                    </option>
                ))}
            </select>

            {/* Doctors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="bg-white rounded-xl shadow p-6"
                        >
                            <h2 className="text-xl font-bold">
                                Dr. {doctor.first_name}{" "}
                                {doctor.last_name}
                            </h2>

                            <p className="text-gray-600 mt-2">
                                {doctor.specialization}
                            </p>

                            <p className="text-gray-500 mt-1">
                                Department:{" "}
                                {doctor.department_name || "N/A"}
                            </p>

                            <p className="text-gray-500 mt-1">
                                Experience:{" "}
                                {doctor.experience || 0} years
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/book-appointment/${doctor.id}`
                                    )
                                }
                                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                            >
                                Book Appointment
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">
                        No doctors found.
                    </p>
                )}
            </div>
        </div>
    );
}

export default DoctorList;