import React from 'react';
import { useParams } from 'react-router-dom';
import { useSingleBookings } from '../services/query/booking.query';
import Reservation from './Reservation';

export default function EditReservationPage() {
  const { bookingId } = useParams();
  const { booking, loading, error } = useSingleBookings(bookingId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <Reservation cabin={booking.cabin} bookingData={booking} />;
}
