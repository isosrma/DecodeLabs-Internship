import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-lg text-sm">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="font-semibold text-gray-800">
        {payload[0].value} booking{payload[0].value !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

const BookingAreaChart = ({ recentBookings = [] }) => {
  const grouped = recentBookings.reduce((acc, booking) => {
    const date = new Date(booking.createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Bookings Trend
      </p>
      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No booking data
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={data}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={28}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#bookingGrad)"
              dot={{ fill: '#10b981', r: 4, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{
                r: 6,
                stroke: '#10b981',
                strokeWidth: 2,
                fill: '#fff',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BookingAreaChart;
