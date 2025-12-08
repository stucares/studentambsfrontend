import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading, userType } = useAuth();

  console.log('PrivateRoute check:', { isAuthenticated, isAdmin, loading, userType, adminOnly });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
      </div>
    );
  }

  // Check if user has token and userType in localStorage as fallback
  const hasToken = localStorage.getItem('token');
  const storedUserType = localStorage.getItem('userType');
  
  console.log('Token check:', { hasToken: !!hasToken, storedUserType });

  if (!isAuthenticated && !hasToken) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && storedUserType !== 'admin') {
    console.log('Admin route but not admin, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  if (!adminOnly && storedUserType === 'admin') {
    console.log('Ambassador route but user is admin, redirecting to admin');
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PrivateRoute;
