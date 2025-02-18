import './index.css'
import { App } from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureDayjs } from '@utils/configureDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

configureDayjs();
const queryClient = new QueryClient();

try {
  const rootElement = document.getElementById('root');

  if (rootElement === null) {
    throw new Error('No se encontró el elemento con id="root" en el HTML. Verifica el archivo index.html.');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );

} catch (error) {
  console.error("Error al inicializar la aplicación:", error);
  document.body.innerHTML = `
    <h2 style="color: red; text-align: center; margin-top: 50px;">
      Ocurrió un error al cargar la aplicación. <br> 
      Por favor, verifica que el archivo index.html contenga un elemento con id="root".
    </h2>
  `;
}
