import React from "react";
import { Navigate } from "react-router-dom";
import { AuthStatus } from '../../store/AuthReducers/authSlice';

interface ProtectedRouteProps {
  authentication: AuthStatus;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({authentication, children}) => {
  if (authentication !== AuthStatus.Authenticated) {
      return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;