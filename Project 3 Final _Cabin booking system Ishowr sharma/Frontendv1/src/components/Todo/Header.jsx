import React from 'react';

function Header({ filter, onFilterChange }) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
        TaskMaster Pro
      </h1>
      <p className="text-xl text-gray-600 mb-8">Professional Todo Management</p>

      {/* Filter buttons - uses drilled props */}
      <div className="flex bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/50">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 mx-1 ${
              filter === f
                ? 'bg-linear-to-r from-indigo-500 to-blue-600 text-white shadow-lg scale-105'
                : 'text-gray-600 hover:text-indigo-600 hover:scale-105'
            }`}
            onClick={() => onFilterChange(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Header;