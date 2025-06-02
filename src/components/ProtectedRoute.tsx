import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthStatus } from '../../store/AuthReducers/authSlice';
import CircularProgress from '@mui/material/CircularProgress'; // импортируем спиннер
import { BoxStyled } from '../components/ProfilePage/profile.styles';



interface ProtectedRouteProps {
  authentication: AuthStatus;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({authentication, children}) => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <BoxStyled>
        <CircularProgress />
      </BoxStyled>
    )
  }
  
  if (authentication !== AuthStatus.Authenticated) {
      return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;