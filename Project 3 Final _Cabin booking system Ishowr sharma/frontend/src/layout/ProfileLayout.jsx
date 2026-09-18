import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNavigation from '../componenet/SideNavigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ProfileLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-primary-950">
      <div className="">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Mobile Hamburger Button - Positioned on LEFT */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed top-17 left-0 z-50 bg-primary-900 p-3 rounded-2xl border border-primary-800 text-primary-100 hover:bg-primary-800 transition-colors shadow-lg"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Sidebar */}
          <div
            className={`
              fixed lg:static inset-y-5 left-0 z-40 
              w-72 lg:w-80 bg-primary-900 border-r border-primary-800 
              transform transition-transform duration-300 ease-in-out
              lg:translate-x-0
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <div className="min-h-screen overflow-y-auto py-8 px-6 lg:px-8 pt-20 lg:pt-8 ">
              <SideNavigation />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 py-8 lg:py-12 px-4 sm:px-6 lg:px-8 lg:ml-0">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/70 z-30"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
