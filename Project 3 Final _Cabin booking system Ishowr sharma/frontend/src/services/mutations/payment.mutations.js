import { useState } from "react";
import api from "../../api/api";

export const useCreatePayment = ({ bookingId, paymentMethod }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPayment = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post(`/payments/initiate`, {
                bookingId,
                paymentMethod
            });

            return response.data;
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Failed to create payment"
            );
            throw err; // optional but recommended
        } finally {
            setLoading(false);
        }
    };

    return { createPayment, loading, error };
};


export const useVerifyPayment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const verifyPayment = async (pidx) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post("/payments/verify", { pidx });

            return response.data;
        } catch (err) {
            setError(
                err.response?.data?.message || "Payment verification failed"
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { verifyPayment, loading, error };
}
