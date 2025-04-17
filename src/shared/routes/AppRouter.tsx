import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '@shared/routes/PrivateRoute';
import MainLayout from '@shared/containers/MainContainer';
import NotFoundPage from '@shared/components/NotFoundPage';
import CircularProgress from '@mui/material/CircularProgress';

const LoginPage = lazy(() => import('@feature/auth/pages/LoginPage'));
const PersonasRouter = lazy(() => import('@feature/persona/PersonaRouter'));
const DashboardPage = lazy(() => import('@feature/dashboard/pages/DashboardPage'));

export default function AppRouter() {
  const user = true;

  return (
    <React.Fragment>
      <MainLayout>
        <Suspense fallback={<CircularProgress sx={{ display: 'block', margin: '4rem auto' }} />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute Component={DashboardPage} />} />
            <Route path="/personas/*" element={<PrivateRoute Component={PersonasRouter} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </React.Fragment>
  );
}
