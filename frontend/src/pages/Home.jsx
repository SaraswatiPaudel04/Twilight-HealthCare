import { Link } from "react-router-dom";

function Home() {

    return (
        <div className="min-h-screen bg-gray-100">

            {/* <nav className="bg-white shadow">

                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    <h1 className="text-2xl font-bold text-blue-600">
                        Twilight-HealthCare
                    </h1>

                    <div className="flex gap-4">

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

            </nav> */}


            <section className="max-w-7xl mx-auto px-6 py-24 text-center">

                <h2 className="text-5xl font-bold text-gray-800">
                    Welcome to Twilight-HealthCare
                </h2>

                <p className="mt-6 text-xl text-gray-600">
                    Smart and efficient hospital management system.
                </p>

                <Link
                    to="/register"
                    className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
                >
                    Get Started
                </Link>

            </section>

        </div>
    );
}

export default Home;