import React, { FC } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const hocAuth = (Component: FC) => {
  return () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isAuthenticated) {
      return <Component />;
    } else {
      return <Navigate to="/login" />;
    }
  };
};

export default hocAuth;
