import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout.jsx';
import Home from '@/pages/Home.jsx';
import Login from '@/pages/Login.jsx';
import Register from '@/pages/Register.jsx';
import NotFound from '@/pages/NotFound';
import { ROUTES } from '@/routes/routes_consts';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    //errorElement: <Error />, TO RETURN THIS WHEN WE DO THE ERROR COMPONENT
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
    ],
  },
]);

export default router;
