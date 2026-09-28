import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route Guard Component for Assignment 7 Protected Routes
 * Protects Dashboard, Tasks, Task Details, Add Task, and Completed routes.
 * Verifies both active session state and simulated JWT token validity.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, tokenStatus, tokenError } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || tokenStatus !== 'valid') {
    // Intercept unauthorized access and redirect to the /login security gate,
    // preserving the intended destination in location.state.from
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location,
          reason: tokenError || 'Clearance credentials required to access protected mainframe terminal.'
        }} 
        replace 
      />
    );
  }

  return children;
};
