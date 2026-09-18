// src/components/Navbar.jsx
import React from 'react';
import { Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-700" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
