import React from 'react';
import { HomePage } from '@pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProviderConfig } from '@components/LocalizationProviderConfig';

export const App: React.FC = () => (
  <LocalizationProviderConfig>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </LocalizationProviderConfig>
);