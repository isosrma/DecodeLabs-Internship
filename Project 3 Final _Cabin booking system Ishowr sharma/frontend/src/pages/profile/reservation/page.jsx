import React from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useBookings } from '../../../services/query/booking.query';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../../componenet/Modal';

export default function ReservationList() {
  const { bookings, loading, error } = useBookings();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  React.useEffect(() => {
    setData(bookings);
  }, [bookings]);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setModalOpen(true); // open modal
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    // optimistic remove
    setData((prev) => prev.filter((b) => b.id !== selectedId));
    setModalOpen(false);

    try {
      // call your delete API here
      // await deleteBooking(selectedId);
    } catch (err) {
      console.log(err);
      // optionally restore data on error
    } finally {
      setSelectedId(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/account/reservations/edit/${id}`);
  };

  if (loading) return <p className="text-center">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!data.length) return <p className="text-center">No bookings found.</p>;

  return (
    <>
      <ul className="space-y-6">
        {data.map((booking) => (
          <li
            key={booking.id}
            className="flex gap-6 border border-primary-900 p-5 rounded-xl items-center bg-primary-900/40"
          >
            <img
              src={booking.cabin?.image || '/placeholder.jpg'}
              alt={booking.cabin?.name}
              className="w-40 h-28 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-1">
              <h3 className="text-xl font-semibold text-primary-100">
                {booking.cabin?.name}
              </h3>
              <p className="text-sm text-primary-300">
                {new Date(booking.startDate).toLocaleDateString()} —{' '}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-primary-300">
                {booking.numNights} nights · {booking.numGuests} guests
              </p>
              <p className="text-sm text-primary-200 font-medium">
                Total: ${booking.totalPrice}
              </p>
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  booking.status === 'CONFIRMED'
                    ? 'bg-green-600 text-white'
                    : 'bg-yellow-600 text-white'
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleEdit(booking.id)}
                className="text-primary-400 hover:text-blue-500 transition"
              >
                <PencilSquareIcon className="w-6 h-6" />
              </button>

              <button
                onClick={() => handleDeleteClick(booking.id)}
                className="text-primary-400 hover:text-red-500 transition"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
      />
    </>
  );
}
