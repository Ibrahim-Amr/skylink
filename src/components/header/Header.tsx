import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useContext } from 'react';
import GlobalContext from '../../context/global.context';
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
const Header = () => {
  const { setSideNav } = useContext<any>(GlobalContext);
  const signOut = useSignOut();
  const auth = useAuthUser();

  return (
    <header className='bg-neutral-100 fixed top-0 w-full'>
      <nav className='py-2 px-5 flex justify-between items-center'>
        <div>
          <Link to={'/'} title='Logo'>
            <h1 className='font-bold text-4xl tracking-tighter'>Skylink</h1>
          </Link>
        </div>
        <div>
          {auth() && (
            <Button
              label='LogOut'
              severity='danger'
              text
              className='!text-xl'
              onClick={() => signOut()}
            />
          )}

          <Button
            label='Menu +'
            text
            className='!text-xl !text-black'
            onClick={() => setSideNav(true)}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
