import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../../services/mutations/auth.mutations';

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { sendForgotPassword, loading, error } = useForgotPassword();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await sendForgotPassword(data);
      localStorage.setItem('resetEmail', data.email);
      navigate('/auth/verify-otp');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Forgot Password?</h1>
        <p className="text-primary-400 text-lg">
          No worries! We'll send you a reset code.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-400 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-accent-700 
                   text-primary-950 font-semibold py-4 rounded-2xl text-lg transition-all"
        >
          {loading ? 'Sending reset code...' : 'Send Reset Code'}
        </button>
      </form>

      <p className="text-center text-primary-400 mt-8 text-sm">
        Remember your password?{' '}
        <a
          href="/auth"
          className="text-accent-500 hover:text-accent-400 font-medium"
        >
          Back to Login
        </a>
      </p>
    </div>
  );
}
