import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useVerifyOtp } from '../../services/mutations/auth.mutations';

export default function VerifyOtpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { verifyOtp, loading, error } = useVerifyOtp();
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail');

  const onSubmit = async (data) => {
    if (!email) {
      alert('Email not found. Please start over.');
      return;
    }

    try {
      await verifyOtp({ email, otp: data.otp });
      localStorage.setItem('verifiedEmail', email);
      localStorage.setItem('resetOtp', data.otp);
      navigate('/auth/reset-password');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Verify OTP</h1>
        <p className="text-primary-400">
          Enter the 6-digit code sent to
          <br />
          <span className="font-medium text-white">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-primary-300 text-sm font-medium mb-2">
            OTP Code
          </label>
          <input
            type="text"
            maxLength={6}
            {...register('otp', {
              required: 'OTP is required',
              pattern: {
                value: /^\d{6}$/,
                message: 'OTP must be 6 digits',
              },
            })}
            className="w-full px-5 py-3.5 bg-primary-950 border border-primary-700 rounded-2xl 
                     text-white placeholder:text-primary-500 focus:outline-none 
                     focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all text-center text-2xl tracking-widest"
            placeholder="123456"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1.5">{errors.otp.message}</p>
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
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      <p className="text-center text-primary-400 mt-8 text-sm">
        Didn't receive the code?{' '}
        <button
          onClick={() => navigate('/auth/forgot-password')}
          className="text-accent-500 hover:text-accent-400 font-medium"
        >
          Resend
        </button>
      </p>
    </div>
  );
}
