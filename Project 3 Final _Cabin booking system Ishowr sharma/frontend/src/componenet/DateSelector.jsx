import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useReservation } from '../context/ReservationContext';

function DateSelector({ cabin }) {
  const { range, setRange, resetRange } = useReservation();

  const regularPrice = cabin?.regularPrice || 100;
  const discount = cabin?.discount || 50;

  const numNights =
    range.from && range.to
      ? Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24)) + 1
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="bg-primary-900 p-5 sm:p-6 lg:p-8 rounded-lg shadow-lg flex flex-col h-full">
      {/* Calendar */}
      <div className="flex-1">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
          fromMonth={new Date()}
          toYear={new Date().getFullYear() + 5}
          className="mx-auto"
          classNames={{
            months: 'flex flex-col sm:flex-row gap-6 justify-center',
            month: 'w-full',
            day: 'text-primary-50 hover:bg-primary-800',
            caption: 'text-primary-50 font-semibold text-lg',
            head_cell: 'text-primary-200 font-medium',
            nav_button: 'text-primary-400 hover:text-white',
          }}
        />
      </div>

      {/* Price Summary */}
      <div className="mt-6 bg-accent-500 text-primary-800 px-5 sm:px-8 py-5 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-baseline gap-3 flex-wrap">
            {discount > 0 ? (
              <>
                <span className="text-2xl sm:text-3xl font-bold">
                  ${regularPrice - discount}
                </span>
                <span className="line-through text-primary-700 font-semibold text-lg">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl sm:text-3xl font-bold">
                ${regularPrice}
              </span>
            )}
            <span className="text-sm sm:text-base opacity-80">/ night</span>
          </div>

          {numNights > 0 && (
            <div className="flex items-center gap-3 text-lg font-medium">
              <span className="bg-accent-600 px-3 py-1 rounded">
                × {numNights}
              </span>
              <span>
                Total: <span className="font-bold text-2xl">${cabinPrice}</span>
              </span>
            </div>
          )}
        </div>

        {(range.from || range.to) && (
          <button
            onClick={resetRange}
            className="mt-4 w-full sm:w-auto border border-primary-800 hover:bg-primary-800 hover:text-white transition-all py-2 px-6 text-sm font-semibold rounded"
          >
            Clear dates
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
