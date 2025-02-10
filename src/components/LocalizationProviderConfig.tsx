import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const LocalizationProviderConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LocalizationProvider
    adapterLocale="es"
    dateAdapter={AdapterDayjs}
    dateFormats={{ keyboardDate: 'YYYY-MM-DD' }}
  >
    {children}
  </LocalizationProvider>
);
