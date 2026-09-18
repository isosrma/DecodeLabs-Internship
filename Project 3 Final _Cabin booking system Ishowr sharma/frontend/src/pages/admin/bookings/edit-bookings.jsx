import React from 'react';

const BookingStatusForm = ({
  onSubmit,
  loading,
  error,
  success,
  onCancel,
  register,
  handleSubmit, 
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">New Status</label>
        <select
          {...register('status')}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
        >
          <option value="UNCONFIRMED">Unconfirmed</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CHECKED_IN">Checked In</option>
          <option value="CHECKED_OUT">Checked Out</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && (
        <p className="text-emerald-600 text-sm font-medium">{success}</p>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-70 transition font-medium"
        >
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </div>
    </form>
  );
};

export default BookingStatusForm;
