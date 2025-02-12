import './index.css'
import { App } from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureDayjs } from '@utils/configureDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

configureDayjs();
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
