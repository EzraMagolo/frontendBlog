import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return isLoggedIn === "true" ? (
    <div className="min-h-screen bg-gray-100 p-6">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
