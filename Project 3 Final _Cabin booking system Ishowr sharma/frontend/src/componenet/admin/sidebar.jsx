// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Calendar,
  CreditCard,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={22} />,
      path: '/admin',
    },
    {
      title: 'Cabins',
      icon: <Home size={22} />,
      path: '/admin/cabins',
    },
    {
      title: 'Bookings',
      icon: <Calendar size={22} />,
      path: '/admin/bookings',
    },
    {
      title: 'Payments',
      icon: <CreditCard size={22} />,
      path: '/admin/payments',
    },
  ];

  const handleLogout = () => {
    // Add your logout logic here (clear token, redirect to login)
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col
        ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CabinHub</h1>
              <p className="text-xs text-gray-500 -mt-1">Admin Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? <Menu size={18} /> : <X size={18} />}
      </button>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <span className="shrink-0">{item.icon}</span>
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
        >
          <LogOut size={22} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
