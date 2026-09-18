import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../componenet/Logo';
import Navigation from '../componenet/Navigation';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-950 text-primary-100 font-sans">
      {/* Header */}
      <header className="bg-primary-900 border-b border-primary-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* Navigation */}
            <Navigation />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 border-t border-primary-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-primary-400 text-sm">
            &copy; {new Date().getFullYear()} The Wild Oasis. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
