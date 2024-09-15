import React from 'react';

import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const PublicRoute = ({ children }) => {
 
  // if(isLoading) return <Spinner />

  // if (data) {
  //   return <Navigate to="/home" replace />;
  // }

  return children;
};

export default PublicRoute;
