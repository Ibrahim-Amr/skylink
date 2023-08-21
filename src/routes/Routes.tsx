import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import LayOut from '../components/layout/LayOut';
import Login from '../pages/Login';
import Register from '../pages/Register';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LayOut />,
    children: [
      {
        index: true,
        element: <Home />,
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
        element: <ProductDetails />,
      },
    ],
  },
]);

export default routes;
