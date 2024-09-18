import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context';

const ProtectedRoute = ({ children }) => {
  const {token} =useUser()

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
