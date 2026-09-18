import React from 'react';
import { Mail, Calendar, Users } from 'lucide-react';
import { useProfile } from '../../services/query/auth.query';

export default function ProfilePage() {
  const { profile: user, loading, error } = useProfile();

  if (loading)
    return (
      <div className="max-h-[70vh] overflow-y-scroll flex items-center justify-center bg-primary-950 text-primary-100">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="max-h-[70vh] overflow-y-scroll flex items-center justify-center bg-primary-950 text-red-400">
        {error}
      </div>
    );

  const createdDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const initials = user.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-primary-950 text-primary-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 mb-12">
          {/* Avatar + Name */}
          <div className="flex flex-col gap-4">
            <div className="h-32 w-32 rounded-full bg-accent-600/20 flex items-center justify-center text-3xl font-bold border-2 border-accent-500 text-accent-500">
              {initials}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-primary-50">
                {user.fullName}
              </h1>

              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-accent-600/20 text-accent-400 text-sm font-medium">
                {user.role}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="md:ml-auto">
            <div className="bg-primary-900 border border-primary-800 rounded-xl px-8 py-6">
              <p className="text-sm text-primary-300">Total Bookings</p>
              <p className="text-3xl font-bold text-accent-400 mt-2">
                {user._count.bookings}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-primary-800 mb-12"></div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-6 text-primary-100">
              Contact Information
            </h2>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex gap-4 bg-primary-900 border border-primary-800 p-5 rounded-xl hover:bg-primary-800 transition">
                <Mail className="h-5 w-5 text-accent-400 mt-1" />
                <div>
                  <p className="text-sm text-primary-300">Email</p>
                  <p className="font-medium text-primary-50">{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 bg-primary-900 border border-primary-800 p-5 rounded-xl">
                <Users className="h-5 w-5 text-primary-400 mt-1" />
                <div>
                  <p className="text-sm text-primary-300">Phone Number</p>
                  <p className="font-medium text-primary-50">
                    {user.phoneNumber || 'Not provided'}
                  </p>
                </div>
              </div>

              {/* Nationality */}
              <div className="flex gap-4 bg-primary-900 border border-primary-800 p-5 rounded-xl">
                <Users className="h-5 w-5 text-primary-400 mt-1" />
                <div>
                  <p className="text-sm text-primary-300">Nationality</p>
                  <p className="font-medium text-primary-50">
                    {user.nationality || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-primary-900 border border-primary-800 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-5 w-5 text-accent-400" />
              <h3 className="font-semibold text-primary-100">Member Since</h3>
            </div>

            <p className="text-sm text-primary-300 mb-1">Joined</p>
            <p className="text-lg font-semibold text-primary-50 mb-6">
              {createdDate}
            </p>

            <div className="border-t border-primary-800 pt-4">
              <p className="text-xs text-primary-400 mb-2">Account Status</p>

              <div className="inline-flex items-center gap-2 bg-accent-600/20 px-3 py-1 rounded-full">
                <div className="h-2 w-2 rounded-full bg-accent-500"></div>
                <span className="text-sm font-medium text-accent-400">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mt-12 bg-primary-900 border border-primary-800 p-8 rounded-xl">
          <h2 className="text-lg font-semibold text-primary-100 mb-4">
            Account Overview
          </h2>

          <p className="text-sm text-primary-300 leading-relaxed">
            Your account was created on {createdDate}. You currently have{' '}
            {user._count.bookings} booking
            {user._count.bookings !== 1 ? 's' : ''} in the system.
          </p>
        </div>
      </div>
    </div>
  );
}
