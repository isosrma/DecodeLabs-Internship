import { useState } from "react";
import api from "../../api/api";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post("/auth/login", credentials);

            return response.data;
        } catch (err) {
            const message =
                err.response?.data?.message || "Something went wrong";

            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}



export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            // Make POST request to /auth/register
            const response = await api.post("/auth/register", userData);

            // Return the response data (user + token)
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { registerUser, loading, error };
}

export function useForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendForgotPassword = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post("/auth/forgot-password", data);
            // return response to navigate
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { sendForgotPassword, loading, error };
}



export function useVerifyOtp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const verifyOtp = async ({ email, otp }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post("/auth/verify-otp", { email, otp });
            return response.data; // whatever the API returns (like token/user)
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { verifyOtp, loading, error };
}
export function useResetPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const resetPassword = async ({ email, otp, password, confirmPassword }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post("/auth/reset-password", {
                email,
                otp,
                password,
                confirmPassword,
            });
            return response.data; // whatever API returns (like success message)
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong";
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, error };
}