import { Outlet } from 'react-router-dom';
import SideNav from '../SideNav';
import { GlobalContextProvider } from '../../context/global.context';
import Header from '../header/Header';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from 'react-auth-kit';

const LayOut = () => {
  return (
    <>
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
    </>
  );
};

export default LayOut;
