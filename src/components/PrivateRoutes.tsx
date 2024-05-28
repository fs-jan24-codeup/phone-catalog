import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';

export const PrivateRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // return isAuthenticated ? element : (<Navigate to="/login"/>);
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};
