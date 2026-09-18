import React from 'react';
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const navLinks = [
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className="h-5 w-5" />,
  },
  {
    name: 'Guest Profile',
    href: '/account/profile',
    icon: <UserIcon className="h-5 w-5" />,
  },
];

function SideNavigation() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-10 px-2">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Account
        </h2>
        <p className="text-primary-400 text-sm mt-1">Manage your stay</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-accent-500 text-primary-950 shadow-sm'
                      : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                  }`
                }
              >
                <span className="transition-transform group-hover:scale-110">
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="mt-auto pt-8 border-t border-primary-800">
        <button
          onClick={() => {
            // Add your logout logic here
            console.log('Logout clicked');
          }}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-red-400 hover:text-red-300 hover:bg-primary-900 rounded-2xl transition-all duration-200 text-[15px] font-medium bottom-0"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default SideNavigation;
