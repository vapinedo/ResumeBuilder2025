import React from 'react';
import dayjs from './utils/dayjsConfig'; // Importa la configuración de dayjs
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => (
  <LocalizationProvider
    dateAdapter={AdapterDayjs}
    adapterLocale='es'
    dateFormats={{
      keyboardDate: 'YYYY-MM-DD' // Configura el formato de fecha
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  </LocalizationProvider>
);

export default App;
