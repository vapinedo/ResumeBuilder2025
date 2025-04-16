import 'dayjs/locale/es';
import React from 'react';
import AppRouter from '@shared/routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

export default function App() {
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
