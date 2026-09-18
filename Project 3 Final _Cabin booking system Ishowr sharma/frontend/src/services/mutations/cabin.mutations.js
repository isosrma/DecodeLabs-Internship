import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";

export function useCabin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Form setup (reusable for both create and edit)
    const form = useForm({
        defaultValues: {
            name: "",
            maxCapacity: "",
            regularPrice: "",
            discount: "",
            description: "",
        },
    });

    // ==================== CREATE CABIN ====================
    const createCabin = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("maxCapacity", data.maxCapacity);
            formData.append("regularPrice", data.regularPrice);
            formData.append("discount", data.discount || 0);
            if (data.description) formData.append("description", data.description);

            if (data.cabinImage && data.cabinImage[0]) {
                formData.append("cabinImage", data.cabinImage[0]);
            }

            const response = await api.post("/cabins", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccess("Cabin created successfully!");
            form.reset();
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to create cabin";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    // ==================== UPDATE CABIN ====================
    const updateCabin = async (cabinId, data) => {
        if (!cabinId) throw new Error("Cabin ID is required");

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("maxCapacity", data.maxCapacity);
            formData.append("regularPrice", data.regularPrice);
            formData.append("discount", data.discount || 0);
            if (data.description) formData.append("description", data.description);

            // Only append image if new one is selected
            if (data.cabinImage && data.cabinImage[0]) {
                formData.append("cabinImage", data.cabinImage[0]);
            }

            const response = await api.patch(`/cabins/${cabinId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccess("Cabin updated successfully!");
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to update cabin";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    // ==================== DELETE CABIN ====================
    const deleteCabin = async (cabinId) => {
        if (!cabinId) throw new Error("Cabin ID is required");

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await api.delete(`/cabins/${cabinId}`);
            setSuccess("Cabin deleted successfully!");
            return true;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to delete cabin";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        createCabin,
        updateCabin,
        deleteCabin,
        loading,
        error,
        success,
        resetForm: form.reset,
    };
}