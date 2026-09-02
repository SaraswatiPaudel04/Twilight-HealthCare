import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        password: "",
        role: "PATIENT",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await API.post(
                "auth/register/",
                formData
            );

            setSuccess(
                "Registration successful! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error(error);

            const data = error.response?.data;

            if (data) {
                setError(
                    Object.values(data)
                        .flat()
                        .join(" ")
                );
            } else {
                setError(
                    "Registration failed."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-blue-600">
                        Twilight-HealthCare
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your account
                    </p>

                </div>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-5">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            First Name
                        </label>

                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Last Name
                        </label>

                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Role
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="PATIENT">
                                Patient
                            </option>

                            <option value="DOCTOR">
                                Doctor
                            </option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="8"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;