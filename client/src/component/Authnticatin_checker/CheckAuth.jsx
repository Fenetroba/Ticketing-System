import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuth, user, children }) => {
  const location = useLocation();

  // Paths
  const loginPath = '/auth/login';
  const signupPath = '/auth/signup';
  const adminDashboardPath = '/admin/admin_dashboard';
  const shopHomePath = '/shop/home';
  const shoppingDashboardPath = '/shop/shopping_dashboard';

  // Log current state for debugging
  console.log("isAuth:", isAuth);
  console.log("User Role:", user?.role);
  console.log("Current Path:", location.pathname);

  // Redirect to login if not authenticated and not on login/signup pages
  if (!isAuth && !(location.pathname === loginPath || location.pathname === signupPath)) {
    return <Navigate to={loginPath} />;
  }

  // Redirect authenticated users away from login/signup pages
  if (isAuth && (location.pathname === loginPath || location.pathname === signupPath)) {
    return user?.role === "Admin" ? (
      <Navigate to={adminDashboardPath} />
    ) : (
      <Navigate to={shopHomePath} />
    );
  }

  // Redirect authenticated non-admin users from admin routes
  if (isAuth && user?.role !== "Admin" && location.pathname.includes('/admin')) {
    return <Navigate to={shoppingDashboardPath} />;
  }

  // Redirect authenticated admins from shop routes
  if (isAuth && user?.role === "Admin" && location.pathname.includes('/shop')) {
    return <Navigate to={adminDashboardPath} />;
  }

  // If none of the above conditions match, render the children
  return <div>{children}</div>;
};

export default CheckAuth;