// src/layouts/AdminLayout.jsx
import React from 'react';
import Sidebar from '../componenet/admin/sidebar';
import Navbar from '../componenet/admin/navbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
