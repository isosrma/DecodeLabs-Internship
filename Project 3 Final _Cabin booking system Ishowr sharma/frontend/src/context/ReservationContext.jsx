import React, { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

function ReservationProvider({ children, bookingData }) {
  const initialState = bookingData
    ? {
        from: new Date(bookingData.startDate),
        to: new Date(bookingData.endDate),
      }
    : { from: undefined, to: undefined };

  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange({ from: undefined, to: undefined });

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error('Context was used outside provider');
  return context;
}

export { ReservationProvider, useReservation };
