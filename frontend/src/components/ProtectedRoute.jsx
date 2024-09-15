import React from 'react';

import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
 
  // if (isLoading) {
  //   return <Spinner />
  // }

  // if (!data) {
  //   return <Navigate to="/" replace />;
  // }
  return children;
};

export default ProtectedRoute;
