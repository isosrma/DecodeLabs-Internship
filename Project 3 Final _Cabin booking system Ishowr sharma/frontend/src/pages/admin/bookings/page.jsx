import React, { useState, useMemo } from 'react';
import { Search, RefreshCw, Filter, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { useAllBookings } from '../../../services/query/booking.query';
import ReusableTable from '../../../componenet/admin/table';

import BookingStatusForm from './edit-bookings';
import { useUpdateBookingStatus } from '../../../services/mutations/booking.mutations';
import { useNavigate } from 'react-router-dom';

const STATUS_OPTIONS = [
  'ALL',
  'UNCONFIRMED',
  'CONFIRMED',
  'CHECKED_IN',
  'CHECKED_OUT',
];

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

const statusStyle = {
  UNCONFIRMED: 'bg-red-50 text-red-600 border border-red-100',
  CONFIRMED: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  CHECKED_IN: 'bg-blue-50 text-blue-600 border border-blue-100',
  CHECKED_OUT: 'bg-gray-100 text-gray-500 border border-gray-200',
};

const BookingsAdminPage = () => {
  const { bookings, loading, error, refetch } = useAllBookings();

  // ── State ────────────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // React Hook Form
  const form = useForm({
    defaultValues: { status: 'CONFIRMED' },
  });

  // Custom Update Hook
  const {
    updateBookingStatus,
    loading: updating,
    error: updateError,
  } = useUpdateBookingStatus();

  // ── Handle Status Update ─────────────────────────────────
  const handleStatusSubmit = async (data) => {
    if (!selectedBookingId) {
      console.error('No booking ID selected');
      return;
    }

    try {
      setSuccess(null);

      await updateBookingStatus(selectedBookingId, { status: data.status });

      setSuccess('Status updated successfully! 🎉');

      await refetch();

      setTimeout(() => {
        setIsModalOpen(false);
        setSelectedBookingId(null);
        setSelectedBooking(null);
        setSuccess(null);
        form.reset();
      }, 1400);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  // ── Columns ──────────────────────────────────────────────
  const columns = [
    { header: 'Guest', accessor: 'user.fullName' },
    { header: 'Email', accessor: 'user.email' },
    { header: 'Cabin', accessor: 'cabin.name' },
    {
      header: 'Start Date',
      key: 'startDate',
      render: (row) =>
        new Date(row.startDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
    },
    {
      header: 'End Date',
      key: 'endDate',
      render: (row) =>
        new Date(row.endDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
    },
    { header: 'Guests', key: 'numGuests' },
    { header: 'Nights', key: 'numNights' },
    {
      header: 'Total',
      key: 'totalPrice',
      render: (row) => (
        <span className="font-semibold text-gray-800">
          Rs. {row.totalPrice?.toLocaleString() ?? 0}
        </span>
      ),
    },
    {
      header: 'Payment',
      key: 'payment',
      render: (row) => {
        const s = row.payment?.status;
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
              s === 'PAID'
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : s === 'PENDING'
                  ? 'bg-amber-50 text-amber-600 border border-amber-100'
                  : 'bg-gray-100 text-gray-400 border border-gray-200'
            }`}
          >
            {s ?? '—'}
          </span>
        );
      },
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
            statusStyle[row.status] ??
            'bg-gray-100 text-gray-400 border border-gray-200'
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  // ── Filtered & Pagination ────────────────────────────────
  const filtered = useMemo(() => {
    if (!bookings) return [];
    const q = search.toLowerCase().trim();

    return bookings.filter((b) => {
      const matchSearch =
        !q ||
        b.user?.fullName?.toLowerCase().includes(q) ||
        b.user?.email?.toLowerCase().includes(q) ||
        b.cabin?.name?.toLowerCase().includes(q) ||
        String(b.id).includes(q);

      const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const handleSearch = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };
  const handleStatus = (val) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };
  const handlePageSizeChange = (val) => {
    setPageSize(Number(val));
    setCurrentPage(1);
  };
  const clearFilters = () => {
    setSearch('');
    setStatusFilter('ALL');
    setCurrentPage(1);
  };

  const hasActiveFilters = search !== '' || statusFilter !== 'ALL';

  const handleEdit = (booking) => {
    setSelectedBookingId(booking.id);
    setSelectedBooking(booking);
    form.reset({ status: booking.status || 'CONFIRMED' });
    setIsModalOpen(true);
  };

  const handleView = (booking) => navigate(`/admin/bookings/${booking.id}`);
  const handleDelete = (booking) => {
    if (window.confirm(`Delete booking for ${booking.user?.fullName}?`)) {
      alert(`Deleted booking ID: ${booking.id}`);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;
    const left = safePage - delta;
    const right = safePage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      } else if (i === left - 1 || i === right + 1) {
        pages.push('...');
      }
    }
    return pages;
  };

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={refetch}
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Bookings Management
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {filtered.length} of {bookings?.length ?? 0} bookings
            {hasActiveFilters && (
              <span className="ml-1 text-indigo-500 font-medium">
                (filtered)
              </span>
            )}
          </p>
        </div>
        <button
          onClick={refetch}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition active:scale-95 shadow-sm"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1 min-w-0">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by guest, email, cabin, or ID…"
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition"
          />
          {search && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter size={14} className="text-gray-400 hidden sm:block" />
          <div className="flex flex-wrap gap-1.5">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === s
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {s === 'ALL' ? 'All' : s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 transition flex-shrink-0"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <ReusableTable
        title="All Bookings"
        columns={columns}
        data={paginated}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        showView
        emptyMessage={
          hasActiveFilters
            ? 'No bookings match your search or filter.'
            : 'No bookings found.'
        }
      />

      {/* Pagination */}
      {!loading && filtered.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 cursor-pointer"
            >
              {PAGE_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-gray-400 order-last sm:order-none">
            Showing{' '}
            <span className="font-semibold text-gray-700">
              {(safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, filtered.length)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-700">
              {filtered.length}
            </span>
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ← Prev
            </button>
            {getPageNumbers().map((page, i) =>
              page === '...' ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-2 text-gray-300 text-sm"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-semibold border transition-all ${safePage === page ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'}`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Update Booking Status
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedBookingId(null);
                  setSelectedBooking(null);
                  form.reset();
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              <BookingStatusForm
                onSubmit={handleStatusSubmit}
                loading={updating}
                error={updateError}
                success={success}
                onCancel={() => {
                  setIsModalOpen(false);
                  setSelectedBookingId(null);
                  setSelectedBooking(null);
                  form.reset();
                }}
                register={form.register}
                handleSubmit={form.handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsAdminPage;
