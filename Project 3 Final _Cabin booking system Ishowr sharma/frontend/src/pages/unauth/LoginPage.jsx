import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../services/mutations/auth.mutations';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login: loginRequest, loading, error } = useLogin();
  const { login, user } = useAuth(); // include user
  const navigate = useNavigate();

  // Role-based redirect after login
  useEffect(() => {
    if (!user) return;

    const role = user.role?.toLowerCase();

    if (role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      const { user: loggedUser, token } = await loginRequest(data);
      login(loggedUser, token); // update context
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
        <p className="text-primary-400 text-lg">
          Sign in to continue to your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-primary-300 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter a valid email',
              },
            })}
            className="w-full px-5 py-3.5 bg-primary-950 border border-primary-700 rounded-2xl
                     text-white placeholder:text-primary-500 focus:outline-none
                     focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-primary-300 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="w-full px-5 py-3.5 bg-primary-950 border border-primary-700 rounded-2xl
                     text-white placeholder:text-primary-500 focus:outline-none
                     focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1.5">
              {errors.password.message}
            </p>
          )}

          <div className="text-right mt-3">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-accent-500 hover:text-accent-400 font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Server Error */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-400 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-accent-700
                   text-primary-950 font-semibold py-4 rounded-2xl text-lg
                   transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Register Link */}
      <p className="text-center text-primary-400 mt-8 text-sm">
        Don't have an account?{' '}
        <Link
          to="/auth/register"
          className="text-accent-500 hover:text-accent-400 font-semibold transition-colors"
        >
          Create one here
        </Link>
      </p>
    </div>
  );
}
