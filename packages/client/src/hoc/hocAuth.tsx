import React, { FC } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const hocAuth = (Component: FC) => {
  return () => {
    const isAuthenticated = useAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <Component />;
  };
};

export default hocAuth;
