import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '@shared/routes/PrivateRoute';
import MainLayout from '@shared/containers/MainContainer';
import useAuthService from '@core/services/useAuthService';
import NotFoundPage from '@shared/components/NotFoundPage';
import React, { useEffect, useState, lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('@feature/auth/pages/LoginPage'));
const PersonasRouter = lazy(() => import('@feature/persona/PersonaRouter'));
const DashboardPage = lazy(() => import('@feature/dashboard/pages/DashboardPage'));

export default function AppRouter() {
  // const { user } = useAuthService();
  const user = true;
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setIsAuthChecked(true);
  }, [user]);

  return (
    <React.Fragment>
      {isAuthChecked && user && (
        <MainLayout>
          <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<PrivateRoute Component={DashboardPage} />} />
              <Route path="/personas/*" element={<PrivateRoute Component={PersonasRouter} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </MainLayout>
      )}
    </React.Fragment>
  );
}
