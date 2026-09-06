import { Link } from "react-router-dom";
// import logo from "../assets/images/hospitalL.png";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Hospital Logo / Name */}
                    <h1 className="text-2xl font-bold text-blue-600">
                        Twilight-HealthCare
                    </h1>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">

                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Home
                        </Link>

                        <Link
                            to="/doctors"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Doctors
                        </Link>

                        <Link
                            to="/services"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Services
                        </Link>

                        <Link
                            to="/departments"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Departments
                        </Link>

                        <Link
                            to="/appointments"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Appointments
                        </Link>

                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Contact
                        </Link>

                    </div>

                    {/* Login / Register */}
                    <div className="hidden md:flex items-center space-x-3">

                        <Link
                            to="/login"
                            className="px-5 py-2 text-blue-600"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Register
                        </Link>

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;