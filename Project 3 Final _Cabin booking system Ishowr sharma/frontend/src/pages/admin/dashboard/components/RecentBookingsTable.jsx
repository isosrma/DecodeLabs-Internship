import React from 'react';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const PaymentBadge = ({ status }) => {
  const styles = {
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
    PAID: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    FAILED: 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium ${
        styles[status] || 'bg-gray-100 text-gray-500 border-gray-200'
      }`}
    >
      {status}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    UNCONFIRMED: 'bg-red-50 text-red-700 border-red-200',
    CONFIRMED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    CHECKED_IN: 'bg-blue-50 text-blue-700 border-blue-200',
    CHECKED_OUT: 'bg-gray-100 text-gray-500 border-gray-200',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium ${
        styles[status] || 'bg-gray-100 text-gray-500 border-gray-200'
      }`}
    >
      {status}
    </span>
  );
};

const RecentBookingsTable = ({ bookings = [] }) => {
  if (!bookings.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-sm text-gray-400">
        No recent bookings found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Recent Bookings</h3>
        <span className="text-xs text-gray-400">Latest {bookings.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {[
                'ID',
                'Guest',
                'Cabin',
                'Dates',
                'Nights',
                'Guests',
                'Total',
                'Payment',
                'Status',
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50/70 transition-colors duration-150"
              >
                <td className="px-4 py-3.5 font-mono text-xs text-gray-400">
                  #{booking.id}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {booking.user?.fullName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 leading-tight">
                        {booking.user?.fullName || '—'}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {booking.user?.email || ''}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-700 font-medium">
                  {booking.cabin?.name || '—'}
                </td>
                <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(booking.startDate)} →{' '}
                  {formatDate(booking.endDate)}
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600 text-center">
                  {booking.numNights}
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600 text-center">
                  {booking.numGuests}
                </td>
                <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Rs. {booking.totalPrice?.toLocaleString()}
                </td>
                <td className="px-4 py-3.5">
                  <PaymentBadge status={booking.payment?.status} />
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={booking.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookingsTable;
