import { Outlet } from 'react-router-dom';
import SideNav from '../SideNav';
import { GlobalContextProvider } from '../../context/global.context';
import Header from '../header/Header';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from 'react-auth-kit';
import { QueryClient, QueryClientProvider } from 'react-query';

const LayOut = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider
          authType='cookie'
          authName='_auth'
          cookieDomain={window.location.hostname}
        >
          <GlobalContextProvider>
            <Header />
            <SideNav />
            <Outlet></Outlet>
            <Toaster />
          </GlobalContextProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default LayOut;
