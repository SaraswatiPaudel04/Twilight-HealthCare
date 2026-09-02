import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <div className="bg-white rounded-2xl shadow p-8">

                    <h1 className="text-3xl font-bold text-purple-600">
                        Admin Dashboard
                    </h1>

                    <p className="mt-4 text-gray-700">
                        Welcome, {user?.first_name || user?.username}
                    </p>

                    <p className="mt-2 text-gray-500">
                        Role: {user?.role}
                    </p>

                    <button
                        onClick={logout}
                        className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;