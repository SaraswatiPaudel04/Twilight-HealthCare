import { useEffect, useState } from "react";
import API from "../../services/api";


function PatientProfile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        API.get("patient/profile/")
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading profile...</p>
            </div>
        );
    }


    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Unable to load profile.</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-2xl shadow p-8">

                    <h1 className="text-3xl font-bold text-blue-600 mb-8">
                        My Profile
                    </h1>


                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <p className="text-sm text-gray-500">
                                Username
                            </p>

                            <p className="font-semibold">
                                {profile.username}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="font-semibold">
                                {profile.email}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                First Name
                            </p>

                            <p className="font-semibold">
                                {profile.first_name}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Last Name
                            </p>

                            <p className="font-semibold">
                                {profile.last_name}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Phone
                            </p>

                            <p className="font-semibold">
                                {profile.phone || "Not provided"}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Blood Group
                            </p>

                            <p className="font-semibold">
                                {profile.blood_group || "Not provided"}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Gender
                            </p>

                            <p className="font-semibold">
                                {profile.gender || "Not provided"}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Date of Birth
                            </p>

                            <p className="font-semibold">
                                {profile.date_of_birth || "Not provided"}
                            </p>
                        </div>

                    </div>


                    <div className="mt-6">

                        <p className="text-sm text-gray-500">
                            Address
                        </p>

                        <p className="font-semibold">
                            {profile.address || "Not provided"}
                        </p>

                    </div>


                    <div className="mt-6">

                        <p className="text-sm text-gray-500">
                            Emergency Contact
                        </p>

                        <p className="font-semibold">
                            {profile.emergency_contact || "Not provided"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default PatientProfile;