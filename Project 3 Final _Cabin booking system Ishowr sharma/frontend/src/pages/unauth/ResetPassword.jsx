import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useResetPassword } from '../../services/mutations/auth.mutations';

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { resetPassword, loading, error } = useResetPassword();
  const navigate = useNavigate();

  const password = watch('password');
  const email = localStorage.getItem('verifiedEmail');
  const otp = localStorage.getItem('resetOtp');

  const onSubmit = async (data) => {
    if (!email || !otp) {
      alert('Session expired. Please try again.');
      navigate('/auth/forgot-password');
      return;
    }

    try {
      await resetPassword({
        email,
        otp,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      localStorage.removeItem('verifiedEmail');
      localStorage.removeItem('resetOtp');

      alert(
        'Password reset successfully! Please login with your new password.',
      );
      navigate('/auth');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Set New Password</h1>
        <p className="text-primary-400 text-lg">
          Create a strong new password for your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-primary-300 text-sm font-medium mb-2">
            New Password
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
        </div>

        <div>
          <label className="block text-primary-300 text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            className="w-full px-5 py-3.5 bg-primary-950 border border-primary-700 rounded-2xl 
                     text-white placeholder:text-primary-500 focus:outline-none 
                     focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1.5">
              {errors.confirmPassword.message}
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
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}
