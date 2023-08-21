import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import LayOut from '../components/layout/LayOut';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { RequireAuth } from 'react-auth-kit';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth loginPath='/login'>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/product/:id',
        element: (
          <RequireAuth loginPath='/login'>
            <ProductDetails />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default routes;
