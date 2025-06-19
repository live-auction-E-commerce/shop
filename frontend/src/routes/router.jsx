import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home.jsx';
import Login from '@/pages/Login.jsx';
import Register from '@/pages/Register.jsx';
import ProductPage from '@/pages/ListingPage';
import CategoryPage from '@/pages/CategoryPage';
import LiveAuctions from '@/pages/LiveAuctions';
import AddressesPage from '@/pages/AddressesPage';
import NewAddress from '@/pages/NewAddress';
import BuyNowPage from '@/pages/BuyNowPage';
import ListingPage from '@/pages/ListingPage';
import UploadProduct from '@/pages/UploadProduct';
import OrdersPage from '@/pages/OrdersPage';
import NotFound from '@/pages/NotFound';
import { ROUTES } from '@/routes/routes_consts';
import ChangePasswordPage from '@/pages/ChangePasswordPage';

const router = createBrowserRouter([
  {
    element: <App />,
    //errorElement: <Error />, TO RETURN THIS WHEN WE DO THE ERROR COMPONENT
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.CHANGE_PASSWORD, element: <ChangePasswordPage /> },
      { path: ROUTES.CATEGORY, element: <CategoryPage /> },
      { path: ROUTES.LIVE, element: <LiveAuctions /> },
      { path: ROUTES.ADDRESSES, element: <AddressesPage /> },
      { path: ROUTES.NEW_ADDRESS, element: <NewAddress /> },
      { path: ROUTES.EDIT_ADDRESS, element: <NewAddress /> },
      { path: ROUTES.BUY_NOW, element: <BuyNowPage /> },
      { path: ROUTES.LISTING_PAGE, element: <ListingPage /> },
      { path: ROUTES.NEW_PRODUCT, element: <UploadProduct /> },
      { path: ROUTES.ORDERS, element: <OrdersPage /> },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
    ],
  },
]);

export default router;
