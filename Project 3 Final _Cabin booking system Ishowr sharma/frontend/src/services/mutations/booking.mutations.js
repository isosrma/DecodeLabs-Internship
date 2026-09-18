import { useState } from "react";
import api from "../../api/api";

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookCabin = async (bookingData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/bookings", bookingData);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { bookCabin, loading, error };
}

export function useUpdateBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBooking = async (bookingId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/bookings/${bookingId}`, updatedData);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update booking";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { updateBooking, loading, error };
}

export function useUpdateBookingStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBookingStatus = async (bookingId, statusData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.patch(`/bookings/${bookingId}/status`, statusData);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update booking status";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { updateBookingStatus, loading, error };
}
