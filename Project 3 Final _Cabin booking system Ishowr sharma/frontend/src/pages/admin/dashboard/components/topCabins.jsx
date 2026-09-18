import React from 'react';

const TopCabins = ({ topCabins = [] }) => {
  if (!topCabins.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Top Cabins
        </h3>
        <p className="text-sm text-gray-400 text-center py-6">No cabin data</p>
      </div>
    );
  }

  const maxBookings = Math.max(...topCabins.map((c) => c.bookingCount));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
        Top Cabins
      </h3>
      <div className="space-y-4">
        {topCabins.map((cabin, index) => (
          <div key={cabin.cabinId || index}>
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {cabin.name || cabin.cabinName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Up to {cabin.maxCapacity} guests &nbsp;·&nbsp; Rs.{' '}
                    {cabin.regularPrice?.toLocaleString()}/night
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="text-sm font-semibold text-gray-900">
                  {cabin.bookingCount}
                </p>
                <p className="text-xs text-gray-400">
                  {cabin.bookingCount === 1 ? 'booking' : 'bookings'}
                </p>
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round((cabin.bookingCount / maxBookings) * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCabins;
