// src/hooks/useDashboard.js
import { useState, useEffect, useCallback } from "react";
import api from "../../api/api";

export function useDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get("/dashboard");

            // Assuming your backend returns { success: true, data: { ... } }
            if (response.data?.success) {
                setData(response.data.data);
            } else {
                setData(response.data);
            }
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to fetch dashboard summary"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto fetch on mount
    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return {
        dashboardData: data,
        loading,
        error,
        refetch: fetchDashboard,     // Useful for manual refresh (e.g., after actions)
    };
}