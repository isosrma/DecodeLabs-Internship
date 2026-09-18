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
    <div className="bg-white border border-gray-100 rounded-lg px-4 py-3 text-sm shadow-lg">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="font-semibold text-gray-900">
        Rs. {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

const RevenueTrendChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.revenue));
  const total = data.reduce((s, d) => s + d.revenue, 0);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 h-full">
      {/* Chart Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Revenue trend
          </p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            Rs. {total.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Total across {data.length} months
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
          <span className="text-xs text-gray-400">Monthly revenue</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `Rs.${v / 1000}k`}
            width={60}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#revGrad)"
            dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{
              r: 6,
              stroke: '#3b82f6',
              strokeWidth: 2,
              fill: '#fff',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Month summary pills */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {data.map((d) => (
          <div
            key={d.month}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition
              ${
                d.revenue === max
                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                  : 'border-gray-100 bg-gray-50 text-gray-500'
              }`}
          >
            <span className="font-medium">{d.month}</span>
            <span>Rs. {(d.revenue / 1000).toFixed(1)}k</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueTrendChart;
