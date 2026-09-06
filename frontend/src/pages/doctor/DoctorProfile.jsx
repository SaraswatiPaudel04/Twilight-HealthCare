import { useEffect, useState } from "react";
import API from "../../services/api";

const DoctorProfile = () => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await API.get("doctor/profile/");
            setProfile(response.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load doctor profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const response = await API.patch(
                "doctor/profile/",
                profile
            );

            setProfile(response.data);
            setMessage("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            setError("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Loading profile...
                </p>
            </div>
        );
    }

    if (error && !profile) {
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

            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-2xl shadow-md p-8">

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Doctor Profile
                    </h1>

                    <p className="text-gray-500 mb-8">
                        Manage your professional information
                    </p>

                    {message && (
                        <div className="mb-6 p-3 rounded-lg bg-green-100 text-green-700">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-100 text-red-700">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label className="block mb-2 font-medium">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    value={profile.username || ""}
                                    disabled
                                    className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={profile.email || ""}
                                    disabled
                                    className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    value={profile.first_name || ""}
                                    disabled
                                    className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    value={profile.last_name || ""}
                                    disabled
                                    className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Specialization
                                </label>

                                <input
                                    type="text"
                                    name="specialization"
                                    value={profile.specialization || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Qualification
                                </label>

                                <input
                                    type="text"
                                    name="qualification"
                                    value={profile.qualification || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Experience (Years)
                                </label>

                                <input
                                    type="number"
                                    name="experience"
                                    value={profile.experience ?? 0}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Department
                                </label>

                                <input
                                    type="text"
                                    name="department"
                                    value={profile.department || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Consultation Fee
                                </label>

                                <input
                                    type="number"
                                    name="consultation_fee"
                                    value={profile.consultation_fee ?? 0}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>

                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Phone
                            </label>

                            <input
                                type="text"
                                value={profile.phone || ""}
                                disabled
                                className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Bio
                            </label>

                            <textarea
                                name="bio"
                                value={profile.bio || ""}
                                onChange={handleChange}
                                rows="5"
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Write something about yourself..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default DoctorProfile;