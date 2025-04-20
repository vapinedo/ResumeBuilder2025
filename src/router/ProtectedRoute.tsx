import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthService from '@core/services/useAuthService';

interface ProtectedRouteProps {
  Component: ComponentType<any>;
}

const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {
  const { user } = useAuthService();

  if (user === null) {
    // Aún no sabemos si hay usuario (puedes mostrar un loader aquí si quieres)
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
