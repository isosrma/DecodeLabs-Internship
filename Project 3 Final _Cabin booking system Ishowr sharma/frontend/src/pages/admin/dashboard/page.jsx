import React from 'react';
import {
  Users,
  Home,
  CalendarDays,
  BadgeDollarSign,
  Clock,
  RefreshCw,
} from 'lucide-react';

import StatCard from './components/StatCard';
import RevenueLineChart from './components/revenueChart';
import TopCabins from './components/topCabins';
import RecentBookingsTable from './components/RecentBookingsTable';
import BookingAreaChart from './components/Bookingareachart';
import BookingPieChart from './components/BookingChart';
import { useDashboard } from '../../../services/query/dashbaord.query';

const DashboardPage = () => {
  const { dashboardData, loading, error, refetch } = useDashboard();

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm tracking-wide">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <p className="text-red-500 text-lg mb-4">Failed to load dashboard</p>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const {
    totalUsers = 0,
    totalCabins = 0,
    totalBookings = 0,
    totalRevenue = 0,
    pendingPayments = 0,
    bookingsByStatus = {},
    revenueThisMonth = 0,
    revenueLastMonth = 0,
    recentBookings = [],
    topCabins = [],
  } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Welcome back, Bishal • Here's what's happening with your cabins
            </p>
          </div>

          <button
            onClick={refetch}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-100 border border-gray-200 rounded-2xl text-sm font-medium text-gray-600 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={Users}
            color="blue"
            subtitle="Registered guests"
          />
          <StatCard
            title="Total Cabins"
            value={totalCabins}
            icon={Home}
            color="emerald"
            subtitle="Properties listed"
          />
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            icon={CalendarDays}
            color="violet"
            subtitle="All reservations"
          />
          <StatCard
            title="Total Revenue"
            value={`Rs. ${totalRevenue.toLocaleString()}`}
            icon={BadgeDollarSign}
            color="amber"
            subtitle="Lifetime earnings"
          />
          <StatCard
            title="Pending Payments"
            value={pendingPayments}
            icon={Clock}
            color="rose"
            subtitle="Awaiting confirmation"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <BookingPieChart bookingsByStatus={bookingsByStatus} />
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <RevenueLineChart
              revenueThisMonth={revenueThisMonth}
              revenueLastMonth={revenueLastMonth}
            />
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <BookingAreaChart recentBookings={recentBookings} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <RecentBookingsTable bookings={recentBookings} />
        </div>
        <TopCabins topCabins={topCabins} />
      </div>
    </div>
  );
};

export default DashboardPage;
