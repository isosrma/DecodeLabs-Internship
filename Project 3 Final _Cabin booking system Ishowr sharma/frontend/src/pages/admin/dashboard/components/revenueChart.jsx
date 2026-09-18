import React from 'react';
import {
  LineChart,
  Line,
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
        Rs. {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

const RevenueLineChart = ({ revenueLastMonth = 0, revenueThisMonth = 0 }) => {
  const data = [
    { name: 'Last Month', revenue: revenueLastMonth },
    { name: 'This Month', revenue: revenueThisMonth },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Revenue Comparison
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `Rs.${v / 1000}k`}
            width={56}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ fill: '#6366f1', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{
              r: 7,
              stroke: '#6366f1',
              strokeWidth: 2,
              fill: '#fff',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueLineChart;
