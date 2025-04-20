import React, { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '@core/stores/useAuthStore';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { firebaseApp } from '@infrastructure/firebase/firebaseConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
  },
});

const auth = getAuth(firebaseApp);

export default function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
      setInitialized(true); // Indicamos que Firebase ya respondió
    });

    return () => unsubscribe();
  }, [setUser, setInitialized]);

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </LocalizationProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}
