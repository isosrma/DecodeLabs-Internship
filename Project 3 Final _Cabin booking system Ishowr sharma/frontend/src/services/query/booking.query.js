import { useState, useEffect, useCallback } from "react";
import api from "../../api/api";

export function useBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get("/bookings/user");
            setBookings(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Failed to fetch bookings"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return { bookings, loading, error, refetch: fetchBookings };
}
export function useAllBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get("/bookings");
            setBookings(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Failed to fetch bookings"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return { bookings, loading, error, refetch: fetchBookings };
}
export function useSingleBookings(id) {
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get(`/bookings/${id}`);
            setBooking(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Failed to fetch booking"
            );
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return { booking, loading, error, refetch: fetchBookings };
}