import React from 'react';
import { useSearchParams } from 'react-router-dom';

const options = [
  { label: 'All Cabins', value: '' },
  { label: '2–3 Guests', value: '2-3' },
  { label: '4–7 Guests', value: '4-7' },
  { label: '8–12 Guests', value: '8-12' },
];

function CabinFilterTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get('capacity') || '';

  const handleClick = (value) => {
    if (value) {
      searchParams.set('capacity', value);
    } else {
      searchParams.delete('capacity');
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {options.map((option) => {
          const isActive = selected === option.value;

          return (
            <button
              key={option.value}
              onClick={() => handleClick(option.value)}
              className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${
                  isActive
                    ? 'bg-accent-500 text-primary-950 shadow-md scale-105'
                    : 'bg-primary-900 text-primary-300 hover:bg-primary-800 hover:text-white border border-primary-700'
                }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Optional subtle hint */}
      <p className="text-center sm:text-left text-primary-400 text-xs mt-4 tracking-wide">
        Filter by number of guests
      </p>
    </div>
  );
}

export default CabinFilterTabs;
