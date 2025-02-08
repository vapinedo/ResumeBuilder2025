import React from 'react';
import { HomePage } from '@pages/HomePage';
import { AboutPage } from '@pages/AboutPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => (
  <LocalizationProvider
    adapterLocale='es'
    dateAdapter={AdapterDayjs}
    dateFormats={{
      keyboardDate: 'YYYY-MM-DD'
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
