import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = [
  '#6366f1',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#3b82f6',
  '#8b5cf6',
];

const STATUS_LABELS = {
  UNCONFIRMED: 'Unconfirmed',
  CONFIRMED: 'Confirmed',
  CHECKED_IN: 'Checked In',
  CHECKED_OUT: 'Checked Out',
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-lg text-sm">
      <p className="font-semibold text-gray-800">{payload[0].name}</p>
      <p className="text-gray-500">
        {payload[0].value} booking{payload[0].value !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

const BookingPieChart = ({ bookingsByStatus = {} }) => {
  const data = Object.entries(bookingsByStatus).map(([key, value]) => ({
    name: STATUS_LABELS[key] || key,
    value,
  }));

  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Booking Status
        </p>
        <p className="text-sm text-gray-400 text-center py-8">
          No data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Booking Status
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-gray-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingPieChart;
