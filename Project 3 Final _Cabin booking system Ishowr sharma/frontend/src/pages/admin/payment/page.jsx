import React from 'react';
import { usePayments } from '../../../services/query/payment.query';
import ReusableTable from '../../../componenet/admin/table';

const PaymentsAdminPage = () => {
  const { payments, pagination, loading, error, refetch, goToPage } =
    usePayments();

  // 🔹 Columns
  const columns = [
    { header: 'Guest', accessor: 'booking.user.fullName' },
    { header: 'Email', accessor: 'booking.user.email' },
    { header: 'Cabin', accessor: 'booking.cabin.name' },
    {
      header: 'Amount',
      key: 'amount',
      render: (row) => `Rs. ${row.amount?.toLocaleString() || 0}`,
    },
    {
      header: 'Method',
      key: 'paymentMethod',
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => (
        <span className="px-2 py-1 text-xs rounded-lg bg-gray-100">
          {row.status}
        </span>
      ),
    },
    {
      header: 'Date',
      key: 'paymentDate',
      render: (row) =>
        row.paymentDate ? new Date(row.paymentDate).toLocaleDateString() : '-',
    },
  ];

  // 🔹 Delete (optional)
  const handleDelete = (payment) => {
    if (
      window.confirm(`Delete payment for ${payment.booking?.user?.fullName}?`)
    ) {
      console.log(payment);
      alert(`Deleted payment ${payment.id}`);
    }
  };

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={refetch}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Payments Management
          </h1>
          <p className="text-gray-500 mt-1">
            Total Payments: {pagination.totalPayments}
          </p>
        </div>
      </div>

      {/* 🔹 Table */}
      <ReusableTable
        title="All Payments"
        columns={columns}
        data={payments}
        loading={loading}
        onDelete={handleDelete}
      />

      {/* 🔹 Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={() => goToPage(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-5 py-2 border rounded-lg disabled:opacity-50"
          >
            ← Previous
          </button>

          <span className="px-4 py-2">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            onClick={() => goToPage(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="px-5 py-2 border rounded-lg disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentsAdminPage;
