import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { AuthProvider } from './context/AuthContext';
import { StripeProvider } from './context/StripeContext';
import { BidProvider } from './context/BidContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <StripeProvider>
        <BidProvider>
          <RouterProvider router={router} />
        </BidProvider>
      </StripeProvider>
    </AuthProvider>
  </StrictMode>
);
