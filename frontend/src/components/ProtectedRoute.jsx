import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context';

const ProtectedRoute = ({ children }) => {
  const {User} = useUser()

  if (!User) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
