import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../services/mutations/auth.mutations';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    mode: 'onBlur',
  });

  const { registerUser, loading, error } = useRegister();
  const { login } = useAuth();
  const navigate = useNavigate();

  const password = watch('password');

  // Handle Next with validation
  const handleNext = async () => {
    const isValid = await trigger(
      step === 1
        ? ['fullName', 'email']
        : step === 2
          ? ['password', 'confirmPassword']
          : ['phoneNumber'],
    );

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      const { user, token } = response;
      login(user, token);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" bg-primary-950 flex items-center justify-center px-4 py-12">
      <div className="w-full ">
        {/* Card */}
        <div className="bg-primary-900 border border-primary-800 rounded-3xl shadow-2xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-primary-400 text-lg">
              Step {step} of 3 — Join us today
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-10 rounded-full transition-all ${
                  s <= step ? 'bg-accent-500' : 'bg-primary-700'
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-primary-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('fullName', {
                      required: 'Full name is required',
                    })}
                    className="w-full px-5 py-3.5 bg-primary-950 border border-primary-700 rounded-2xl 
                             text-white placeholder:text-primary-500 focus:outline-none 
                             focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

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

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-accent-500 hover:bg-accent-600 text-primary-950 font-semibold 
                           py-4 rounded-2xl text-lg transition-all duration-200"
                >
                  Continue
                </button>
              </>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <>
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
                    placeholder="Create a strong password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-primary-300 text-sm font-medium mb-2">
                    Confirm Password
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
                    placeholder="Re-enter your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-primary-800 hover:bg-primary-700 text-white font-medium 
                             py-4 rounded-2xl transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 bg-accent-500 hover:bg-accent-600 text-primary-950 
                             font-semibold py-4 rounded-2xl transition-all"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Additional Info */}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-primary-300 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phoneNumber', {
                      required: 'Phone number is required',
                    })}
                    className="w-full px-5 py-3.5 bg-primary-950 border border-primary-700 rounded-2xl 
                             text-white placeholder:text-primary-500 focus:outline-none 
                             focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                    placeholder="+977 98XXXXXXXX"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-primary-300 text-sm font-medium mb-2">
                    Nationality (Optional)
                  </label>
                  <input
                    type="text"
                    {...register('nationality')}
                    className="w-full px-5 py-3.5 bg-primary-950 border border-primary-700 rounded-2xl 
                             text-white placeholder:text-primary-500 focus:outline-none 
                             focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                    placeholder="Nepali"
                  />
                </div>

                <div>
                  <label className="block text-primary-300 text-sm font-medium mb-2">
                    Profile Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    {...register('profileImage')}
                    className="w-full px-5 py-3.5 bg-primary-950 border border-primary-700 rounded-2xl 
                             text-white placeholder:text-primary-500 focus:outline-none 
                             focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>

                {error && (
                  <div className="bg-red-900/50 border border-red-700 text-red-400 px-4 py-3 rounded-2xl text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-primary-800 hover:bg-primary-700 text-white font-medium 
                             py-4 rounded-2xl transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-accent-500 hover:bg-accent-600 disabled:bg-accent-700 
                             text-primary-950 font-semibold py-4 rounded-2xl text-lg transition-all 
                             flex items-center justify-center"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Login Link */}
          <p className="text-center text-primary-400 mt-8 text-sm">
            Already have an account?{' '}
            <Link
              to="/auth"
              className="text-accent-500 hover:text-accent-400 font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-primary-500 text-xs mt-8">
          Your information is safe and secure with us
        </p>
      </div>
    </div>
  );
}
