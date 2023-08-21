import { Outlet } from 'react-router-dom';
import SideNav from '../SideNav';
import { GlobalContextProvider } from '../../context/global.context';
import Header from '../header/Header';

const LayOut = () => {
  return (
    <>
      <GlobalContextProvider>
        <Header />
        <SideNav />
        <Outlet></Outlet>
      </GlobalContextProvider>
    </>
  );
};

export default LayOut;
