import React from "react";
import { useParams } from "react-router-dom";
import { useSingleBookings } from "../../../../services/query/booking.query";

export const BookingDetail = () => {
  const { id } = useParams();
  const { booking, loading, error } = useSingleBookings(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center text-red-500">
          <p className="text-xl">Failed to load booking</p>
          <p className="mt-2 text-sm">{error || "Booking not found"}</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  const nights = booking.numNights || 5;
  const isCheckedIn = booking.status === "CHECKED_IN";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 pb-16">
      {/* Hero Header with Image */}
      <div className="relative h-125 w-full overflow-hidden">
        <img
          src={booking.cabin.image}
          alt={booking.cabin.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-8 pb-12">
          <div className="flex flex-wrap gap-3 mb-4">
            <span
              className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wide ${
                isCheckedIn
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-500 text-white"
              }`}
            >
              {booking.status.replace("_", " ")}
            </span>
            <span className="px-6 py-2 rounded-full text-sm font-semibold tracking-wide bg-white/90 text-slate-800">
              {booking.payment?.status || "PENDING"}
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white tracking-tight">
            {booking.cabin.name}
          </h1>
          <p className="text-white/90 mt-2 text-lg">
            Reservation #{booking.id}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Cabin Info Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden">
                  <img
                    src={booking.cabin.image}
                    alt={booking.cabin.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-slate-900">
                    {booking.cabin.name}
                  </h2>
                  <p className="text-slate-600 mt-1">
                    Up to {booking.cabin.maxCapacity} guests
                  </p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-lg">
                {booking.cabin.description}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-t pt-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">Check-in</p>
                  <p className="font-semibold text-lg mt-1">{formatDate(booking.startDate)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">Check-out</p>
                  <p className="font-semibold text-lg mt-1">{formatDate(booking.endDate)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">Nights</p>
                  <p className="font-semibold text-lg mt-1">{nights} nights</p>
                </div>
              </div>
            </div>

            {/* Guest & Booking Info */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Guest Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-medium">
                  {booking.user.fullName[0]}
                </div>
                <div>
                  <p className="font-semibold text-lg">{booking.user.fullName}</p>
                  <p className="text-slate-600">{booking.user.email}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t grid grid-cols-2 gap-8">
                <div>
                  <p className="text-slate-500 text-sm">Number of Guests</p>
                  <p className="text-2xl font-semibold mt-1">{booking.numGuests}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Breakfast Included</p>
                  <p className="text-2xl font-semibold mt-1">
                    {booking.hasBreakfast ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              {booking.observations && (
                <div className="mt-8 pt-6 border-t">
                  <p className="text-slate-500 text-sm">Special Requests</p>
                  <p className="mt-2 text-slate-700">{booking.observations}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Pricing Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
              <h3 className="text-xl font-semibold mb-6">Price Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Cabin ({nights} nights × {formatPrice(booking.cabinPrice / nights)})
                  </span>
                  <span className="font-medium">{formatPrice(booking.cabinPrice)}</span>
                </div>

                {booking.extrasPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Extras</span>
                    <span className="font-medium">{formatPrice(booking.extrasPrice)}</span>
                  </div>
                )}

                {booking.hasBreakfast && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Breakfast Included</span>
                    <span className="font-medium">✓</span>
                  </div>
                )}
              </div>

              <div className="border-t my-6" />

              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>{formatPrice(booking.totalPrice)}</span>
              </div>

              <div className="mt-8">
                <div className="text-xs text-slate-500 mb-2">PAYMENT STATUS</div>
                <div className={`px-5 py-3 rounded-2xl text-center font-semibold text-sm ${
                  booking.payment?.status === "PAID"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {booking.payment?.status || "PENDING"}
                </div>
              </div>

              <button className="mt-6 w-full bg-slate-900 hover:bg-slate-800 transition-colors text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-slate-900/30">
                Manage Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};