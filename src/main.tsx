import './index.css'
import App from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
