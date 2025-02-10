import './index.css'
import { App } from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureDayjs } from '@utils/configureDayjs';

configureDayjs();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
