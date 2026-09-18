import React from 'react';

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-100',
    ring: 'ring-blue-100',
  },
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    border: 'border-emerald-100',
    ring: 'ring-emerald-100',
  },
  violet: {
    bg: 'bg-violet-50',
    icon: 'text-violet-600',
    border: 'border-violet-100',
    ring: 'ring-violet-100',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    border: 'border-amber-100',
    ring: 'ring-amber-100',
  },
  rose: {
    bg: 'bg-rose-50',
    icon: 'text-rose-600',
    border: 'border-rose-100',
    ring: 'ring-rose-100',
  },
};

const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle }) => {
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {title}
        </p>
        <div
          className={`w-9 h-9 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center`}
        >
          {Icon && <Icon className={`w-4 h-4 ${c.icon}`} />}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 tracking-tight leading-none">
          {value}
        </p>
        {subtitle && <p className="text-xs text-gray-400 mt-1.5">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;
