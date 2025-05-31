import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { AuthProvider } from './context/AuthContext';
import { StripeProvider } from './context/StripeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <StripeProvider>
        <RouterProvider router={router} />
      </StripeProvider>
    </AuthProvider>
  </StrictMode>
);
