import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { useSingleBookings } from '../../../../services/query/booking.query';

export default function BookingDetailPage() {
  const { id } = useParams();
  const { booking, loading, error } = useSingleBookings(id);
    console.log('Booking data:', booking);

  if (!booking) return <p>No booking data available</p>;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading booking...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-primary-950 text-primary-100 pt-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/bookings"
            className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-100 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bookings
          </Link>

          <h1 className="text-3xl font-bold">Booking #{booking.id}</h1>

          <p className="text-primary-400 mt-2">
            Created on {format(new Date(booking.createdAt), 'MMM dd, yyyy')}
          </p>
        </div>

        {/* Cabin Info */}
        <div className="bg-primary-900 border border-primary-800 rounded-xl overflow-hidden mb-8">
          <img
            src={booking.cabin.image}
            alt={booking.cabin.name}
            className="w-full h-80 object-cover"
          />

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{booking.cabin.name}</h2>

            <p className="text-primary-300 mb-4">{booking.cabin.description}</p>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-accent-400" />
                <div>
                  <p className="text-sm text-primary-400">Guests</p>
                  <p className="font-semibold">{booking.numGuests}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-accent-400" />
                <div>
                  <p className="text-sm text-primary-400">Total Price</p>
                  <p className="font-semibold text-accent-400">
                    ₹{booking.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-primary-900 border border-primary-800 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent-400" />
            Stay Dates
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-primary-400">Check-in</p>
              <p className="font-semibold">
                {format(new Date(booking.startDate), 'MMM dd, yyyy')}
              </p>
            </div>

            <div>
              <p className="text-sm text-primary-400">Check-out</p>
              <p className="font-semibold">
                {format(new Date(booking.endDate), 'MMM dd, yyyy')}
              </p>
            </div>

            <div>
              <p className="text-sm text-primary-400">Nights</p>
              <p className="font-semibold">{booking.numNights}</p>
            </div>
          </div>
        </div>

        {/* Guest Info */}
        <div className="bg-primary-900 border border-primary-800 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Guest Information</h3>

          <p>
            <strong>Name:</strong> {booking.user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {booking.user.email}
          </p>
        </div>

        {/* Payment */}
        <div className="bg-primary-900 border border-primary-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Payment</h3>

          <div className="flex justify-between items-center">
            <span>Status</span>
            <span
              className={`px-4 py-2 rounded-lg ${
                booking.payment
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}
            >
              {booking.payment ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
