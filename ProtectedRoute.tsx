
import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: ReactElement;
  role: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { currentUser } = useAppContext();
  const location = useLocation();

  if (!currentUser) {
    const redirectPath = role === 'admin' ? '/admin/login' : '/login';
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (currentUser.role !== role) {
    const redirectPath = currentUser.role === 'admin' ? '/admin/dashboard' : '/';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
