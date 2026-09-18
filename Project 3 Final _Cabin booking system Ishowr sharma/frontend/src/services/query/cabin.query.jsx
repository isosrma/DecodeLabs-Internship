import { useEffect, useState, useCallback } from 'react';
import api from '../../api/api';
import { useSearchParams } from 'react-router-dom';

export function useCabins() {
  const [cabinsData, setCabinsData] = useState({
    cabins: [],
    page: 1,
    totalPages: 1,
    totalCabins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // Get current filters from URL
  const currentPage = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxCapacity = searchParams.get('maxCapacity') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') || 'desc';

  const fetchCabins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/cabins', {
        params: {
          page: currentPage,
          limit: 10,
          search: search || undefined,
          minPrice: minPrice || undefined,
          maxCapacity: maxCapacity || undefined,
          sortBy,
          order,
        },
      });

      const payload = response.data;
      if (Array.isArray(payload)) {
        setCabinsData({
          cabins: payload,
          page: 1,
          totalPages: 1,
          totalCabins: payload.length,
        });
      } else {
        setCabinsData(payload);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch cabins',
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, minPrice, maxCapacity, sortBy, order]);

  useEffect(() => {
    fetchCabins();
  }, [fetchCabins]);

  // Function to update filters (updates URL + triggers refetch)
  const updateFilters = useCallback((newFilters) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key] === '' || newFilters[key] == null) {
          params.delete(key);
        } else {
          params.set(key, newFilters[key]);
        }
      });

      // Reset to page 1 when filters change (except page itself)
      if (!newFilters.page) {
        params.set('page', '1');
      }

      return params;
    });
  }, [setSearchParams]);

  const goToPage = useCallback((page) => {
    updateFilters({ page });
  }, [updateFilters]);

  return {
    cabins: cabinsData.cabins || [],
    pagination: {
      page: cabinsData.page,
      totalPages: cabinsData.totalPages,
      totalCabins: cabinsData.totalCabins,
    },
    loading,
    error,
    refetch: fetchCabins,
    updateFilters,
    goToPage,
    currentFilters: { search, minPrice, maxCapacity, sortBy, order },
    isLoading: loading,
  };
}
export function useSingleCabin(cabinId) {
  const [cabin, setCabin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCabin = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/cabins/${cabinId}`);
      setCabin(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch cabin',
      );
    } finally {
      setLoading(false);
    }
  }, [cabinId]);

  useEffect(() => {
    fetchCabin();
  }, [fetchCabin]);

  return { cabin, loading, isLoading: loading, error, refetch: fetchCabin };
}
