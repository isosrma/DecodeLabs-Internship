import React from 'react';

import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useVerifyPayment } from '../../services/mutations/payment.mutations';

function PaymentVerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyPayment, loading, error } = useVerifyPayment();

  const pidx = searchParams.get('pidx');

  useEffect(() => {
    const verify = async () => {
      if (!pidx) return;

      try {
        const res = await verifyPayment(pidx);

        if (res.success) {
          alert('Payment successful!');
          navigate(`/booking-success/${res.bookingId}`);
        } else {
          alert('Payment failed or pending.');
        }
      } catch (err) {
        console.log(err);
      }
    };

    verify();
  }, [pidx, verifyPayment, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? 'Verifying payment...' : error ? error : 'Processing...'}
    </div>
  );
}

export default PaymentVerifyPage;
