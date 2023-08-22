import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useContext } from 'react';
import GlobalContext from '../../context/global.context';
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import { AiOutlineMenu } from 'react-icons/ai';
const Header = () => {
  const { setSideNav } = useContext<any>(GlobalContext);
  const signOut = useSignOut();
  const auth = useAuthUser();

  return (
    <header className='bg-neutral-100 fixed top-0 w-full'>
      <nav className='py-2 px-5 flex justify-between items-center'>
        <div className='flex justify-center items-center gap-x-5'>
          <AiOutlineMenu
            title='toogle sidebar'
            size={30}
            className='cursor-pointer'
            onClick={() => setSideNav(true)}
          />
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
              size='small'
              onClick={() => signOut()}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
