import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookingSuccessPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-900 px-4">
      <div className="bg-primary-800 text-primary-100 p-10 rounded-xl shadow-xl max-w-lg w-full text-center flex flex-col gap-6">
        {/* Success Icon */}
        <div className="text-5xl">✅</div>

        <h1 className="text-3xl font-bold text-accent-400">
          Booking Confirmed!
        </h1>

        <p className="text-primary-300">
          Your booking has been successfully confirmed.
        </p>

        <div className="bg-primary-700 py-3 rounded-md">
          <span className="text-primary-300">Booking ID:</span>
          <span className="font-semibold ml-2 text-accent-400">
            #{bookingId}
          </span>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => navigate('/account/reservations')}
            className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold py-3 rounded-md transition"
          >
            View My Bookings
          </button>

          <button
            onClick={() => navigate('/')}
            className="border border-primary-500 hover:bg-primary-700 py-3 rounded-md transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessPage;
