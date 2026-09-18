import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext'; // adjust path

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { to: '/cabins', label: 'Cabins' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="z-50 flex items-center justify-between">

      <ul className="hidden md:flex items-center gap-10 text-lg font-medium text-primary-100">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="hover:text-accent-400 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        ))}

        {/* Auth Section */}
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/auth" className="hover:text-accent-400 transition">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="auth/register"
                className="bg-accent-500 text-black px-4 py-1 rounded hover:bg-accent-400 transition"
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/account" className="hover:text-accent-400 transition">
                {user?.name || 'Account'}
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-primary-100 p-2 hover:text-accent-400 transition-colors"
      >
        {isOpen ? (
          <XMarkIcon className="h-7 w-7" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-primary-950 z-50 md:hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-primary-800">
              <span className="text-2xl font-bold text-accent-400">Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className="h-8 w-8 text-primary-100" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col px-6 py-10">
              <ul className="flex flex-col gap-8 text-2xl font-medium text-primary-100">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-accent-400 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                {/* Auth Mobile */}
                {!isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-accent-400"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="text-accent-400"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/account"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-accent-400"
                      >
                        {user?.name || 'Account'}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="text-red-400"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
