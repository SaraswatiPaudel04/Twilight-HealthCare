import { useLocation, useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const doctor = location.state?.doctor;

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Doctor not selected
          </h2>

          <button
            onClick={() => navigate("/doctors")}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Book an Appointment
        </h1>

        <p className="text-gray-600 mb-8">
          Book an appointment with your selected doctor.
        </p>

        {/* Doctor Information */}
        <div className="border rounded-lg p-5 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Dr. {doctor.name}
          </h2>

          <p className="text-gray-600 mt-1">
            {doctor.department}
          </p>
        </div>

        {/* Appointment Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Date
            </label>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Time
            </label>

            <input
              type="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Visit
            </label>

            <textarea
              rows="4"
              placeholder="Describe your reason for appointment..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;