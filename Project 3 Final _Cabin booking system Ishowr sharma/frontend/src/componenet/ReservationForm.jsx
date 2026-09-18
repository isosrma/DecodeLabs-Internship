import React, { useState } from 'react';
import { useReservation } from '../context/ReservationContext';
import {
  useBooking,
  useUpdateBooking,
} from '../services/mutations/booking.mutations';
import { useNavigate } from 'react-router-dom';

function ReservationForm({ cabin, bookingData }) {
  const isEditMode = !!bookingData;

  const { range } = useReservation();
  const navigate = useNavigate();

  const [numGuests, setNumGuests] = useState(
    bookingData?.numGuests ? String(bookingData.numGuests) : '',
  );
  const [observations, setObservations] = useState(
    bookingData?.observations || '',
  );

  const { bookCabin, loading: bookingLoading } = useBooking();
  const { updateBooking, loading: updateLoading } = useUpdateBooking();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!range.from || !range.to) {
      alert('Please select dates first');
      return;
    }

    try {
      if (isEditMode) {
        await updateBooking(bookingData.id, {
          startDate: range.from,
          endDate: range.to,
          numGuests: Number(numGuests),
          observations,
        });
        navigate('/account/reservations');
      } else {
        const response = await bookCabin({
          cabinId: cabin.id,
          startDate: range.from,
          endDate: range.to,
          numGuests: Number(numGuests),
          observations,
        });
        navigate(`/checkout/${response.booking.id}`);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  const isLoading = bookingLoading || updateLoading;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-900 py-8 sm:py-10 px-6 sm:px-8 lg:px-12 rounded-lg flex flex-col gap-6 text-lg"
    >
      <div className="space-y-2">
        <label className="block text-primary-200 font-medium">
          How many guests?
        </label>
        <select
          className="w-full px-5 py-3.5 bg-primary-200 text-primary-800 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
          value={numGuests}
          onChange={(e) => setNumGuests(e.target.value)}
          required
        >
          <option value="">Select number of guests...</option>
          {Array.from({ length: cabin?.maxCapacity || 5 }, (_, i) => i + 1).map(
            (x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-primary-200 font-medium">
          Anything we should know? (optional)
        </label>
        <textarea
          className="w-full px-5 py-3.5 bg-primary-200 text-primary-800 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 min-h-30 resize-y"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          placeholder="Any special requests or notes..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !range.from || !range.to}
        className="mt-4 bg-accent-500 hover:bg-accent-600 disabled:bg-accent-700 disabled:cursor-not-allowed transition-all text-primary-900 font-semibold py-4 px-8 text-lg rounded-sm w-full"
      >
        {isLoading
          ? isEditMode
            ? 'Updating reservation...'
            : 'Processing booking...'
          : isEditMode
            ? 'Update Reservation'
            : 'Reserve Now'}
      </button>
    </form>
  );
}

export default ReservationForm;
