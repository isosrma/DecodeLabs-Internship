import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCreatePayment } from '../../services/mutations/payment.mutations';

import esewa from '/esewa.png';
import khalti from '/khalti.png';
import cod from '/cod.png';

function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookingId = Number(id);

  const [paymentMethod, setPaymentMethod] = useState('');

  const { createPayment, loading, error } = useCreatePayment({
    bookingId,
    paymentMethod,
  });

  const handlePayment = async () => {
    if (!paymentMethod) return alert('Please select a payment method.');
    if (!bookingId) return alert('Booking ID not found.');

    try {
      const response = await createPayment();

      if (response?.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else if (paymentMethod === 'COD') {
        navigate(`/booking-success/${bookingId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const paymentOptions = [
    {
      name: 'KHALTI',
      label: 'Pay with Khalti',
      image: khalti,
    },
    {
      name: 'ESEWA',
      label: 'Pay with eSewa',
      image: esewa,
    },
    {
      name: 'COD',
      label: 'Cash on Arrival',
      image: cod,
    },
  ];

  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center px-4">
      <div className="bg-primary-800 text-primary-100 w-full max-w-xl rounded-xl shadow-2xl p-8 flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-accent-400">Checkout</h2>
          <p className="text-primary-300 mt-2">
            Booking ID: <span className="font-semibold">#{bookingId}</span>
          </p>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-1 gap-4">
          {paymentOptions.map((option) => (
            <div
              key={option.name}
              onClick={() => setPaymentMethod(option.name)}
              className={`cursor-pointer border-2 rounded-lg p-4 flex items-center gap-4 transition-all
                ${
                  paymentMethod === option.name
                    ? 'border-accent-500 bg-primary-700 scale-[1.02]'
                    : 'border-primary-600 hover:border-accent-400 hover:bg-primary-700'
                }`}
            >
              <img
                src={option.image}
                alt={option.name}
                className="w-14 h-14 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{option.label}</h3>
                <p className="text-sm text-primary-300">
                  {option.name === 'COD'
                    ? 'Pay when you arrive at the property.'
                    : 'Secure online payment.'}
                </p>
              </div>

              {paymentMethod === option.name && (
                <span className="text-accent-400 font-bold text-xl">✔</span>
              )}
            </div>
          ))}
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold py-3 rounded-lg transition-all disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Confirm & Pay'}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default CheckoutPage;
