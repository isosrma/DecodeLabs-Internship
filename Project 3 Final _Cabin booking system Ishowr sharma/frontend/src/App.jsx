// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import ProfileLayout from './layout/ProfileLayout';
import HomePage from './pages/home/page';
import CabinPage from './pages/cabins/page';
import CabinDetail from './pages/cabins/detail/page';
import About from './pages/about/pagae';
import LoginPage from './pages/unauth/LoginPage';
import { AuthProvider } from './context/AuthContext';
import UnauthLayout from './layout/UnAuthLayout';
import RegisterPage from './pages/unauth/RegisterPage';
import ForgotPasswordPage from './pages/unauth/ForgetPassword';
import VerifyOtpPage from './pages/unauth/verify-otp';
import ResetPasswordPage from './pages/unauth/ResetPassword';
import ProfilePage from './pages/profile/page';
import ReservationPage from './pages/profile/reservation/page';
import BookingDetailPage from './pages/profile/reservation/detail/page';
import CheckoutPage from './pages/checkout/page';
import PaymentVerifyPage from './pages/verify/page';
import BookingSuccessPage from './pages/booking-sucess/page';
import EditReservationPage from './componenet/EditReservation';

// Admin Pages (Create these files)
import DashboardPage from './pages/admin/dashboard/page';
import BookingsAdminPage from './pages/admin/bookings/page';
import AdminLayout from './layout/adminLayout';
import Payment from './pages/admin/payment/page';
import CabinsAdminPage from './pages/admin/cabins/page';
import { BookingDetail } from './pages/admin/bookings/detail/page';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ====================== PUBLIC LAYOUT ====================== */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="cabins" element={<CabinPage />} />
            <Route path="cabins/:id" element={<CabinDetail />} />
            <Route path="about" element={<About />} />

            {/* User Account Routes */}
            <Route path="account" element={<ProfileLayout />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="reservations" element={<ReservationPage />} />
              <Route path="reservations/:id" element={<BookingDetailPage />} />
              <Route
                path="reservations/edit/:bookingId"
                element={<EditReservationPage />}
              />
            </Route>

            {/* Checkout & Booking Flow */}
            <Route path="checkout/:id" element={<CheckoutPage />} />
            <Route path="/payment-verify" element={<PaymentVerifyPage />} />
            <Route
              path="/booking-success/:bookingId"
              element={<BookingSuccessPage />}
            />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="cabins" element={<CabinsAdminPage />} />
            <Route path="bookings" element={<BookingsAdminPage />} />
            <Route path="bookings/:id" element={<BookingDetail />} />
            <Route path="payments" element={<Payment />} />
          </Route>

          {/* ====================== AUTH (Unauthenticated) ====================== */}
          <Route path="/auth" element={<UnauthLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="verify-otp" element={<VerifyOtpPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Catch-all / 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
