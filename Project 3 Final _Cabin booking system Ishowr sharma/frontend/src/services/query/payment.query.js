import { useState, useEffect, useCallback } from 'react';
import api from '../../api/api';

export function usePayments() {
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalPayments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/payments', {
        params: { page, limit: 10 },
      });

      const data = response.data || {};

      setPayments(data.payments || []);
      setPagination({
        page: data.page || 1,
        totalPages: data.totalPages || 1,
        totalPayments: data.totalPayments || 0,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch payments'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const goToPage = (page) => {
    fetchPayments(page);
  };

  return {
    payments,
    pagination,
    loading,
    error,
    refetch: fetchPayments,
    goToPage,
  };
}