import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../componenet/Navigation';
import Logo from '../componenet/Logo';

export default function UnauthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-950 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className=" bg-primary-950 flex flex-col">
      {/* Header */}
      <header className="bg-primary-900 border-b border-primary-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Branding (Hidden on mobile) */}
            <div className="hidden md:block space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Escape to
                  <br />
                  <span className="text-accent-400">Nature's Luxury</span>
                </h1>
                <p className="text-xl text-primary-300 max-w-lg">
                  Experience unforgettable stays in premium cabins nestled in
                  the breathtaking Dolomites.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent-400 text-xl">🏔️</span>
                  </div>
                  <div>
                    <p className="text-primary-100 font-medium">
                      Premium Cabins
                    </p>
                    <p className="text-primary-400 text-sm">
                      Handpicked luxury in the mountains
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent-400 text-xl">🔒</span>
                  </div>
                  <div>
                    <p className="text-primary-100 font-medium">
                      Secure Booking
                    </p>
                    <p className="text-primary-400 text-sm">
                      Safe, fast and transparent process
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent-400 text-xl">🌲</span>
                  </div>
                  <div>
                    <p className="text-primary-100 font-medium">
                      Pay on Arrival
                    </p>
                    <p className="text-primary-400 text-sm">
                      No upfront payment required
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="w-full  mx-auto">
              <div className="bg-primary-950   p-8 sm:p-10 ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-900 border-t border-primary-800 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-400 text-sm">
            &copy; {new Date().getFullYear()} The Wild Oasis • All Rights
            Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
