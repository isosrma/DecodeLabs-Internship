import React from 'react';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { ReservationProvider } from '../context/ReservationContext';

function Reservation({ cabin, bookingData }) {
  return (
    <ReservationProvider bookingData={bookingData}>
      <div className="grid lg:grid-cols-2 gap-8">
        <DateSelector cabin={cabin} />
        <ReservationForm cabin={cabin} bookingData={bookingData} />
      </div>
    </ReservationProvider>
  );
}

export default Reservation;
