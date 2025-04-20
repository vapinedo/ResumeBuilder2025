import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { appRoutes } from '@router/routesConfig';
import ProtectedRoute from '@router/ProtectedRoute';
import MainLayout from '@shared/layouts/MainLayout';
import NotFoundPage from '@shared/pages/NotFoundPage';

const FallbackLoader = () => <CircularProgress sx={{ display: 'block', margin: '4rem auto' }} />;

export default function AppRouter() {
  return (
    <MainLayout>
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          {appRoutes.map(({ path, Component, isPrivate }) => {
            const element = isPrivate ? <ProtectedRoute Component={Component} /> : <Component />;
            return <Route key={path} path={path} element={element} />;
          })}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}
