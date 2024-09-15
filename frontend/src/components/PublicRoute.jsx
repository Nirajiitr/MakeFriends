import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context';

const PublicRoute = ({ children }) => {
  const {User} = useUser()
  

  if (User) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
