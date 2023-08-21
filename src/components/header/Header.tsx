import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useContext } from 'react';
import GlobalContext from '../../context/global.context';
const Header = () => {
  const { setSideNav } = useContext<any>(GlobalContext);
  return (
    <header className='bg-neutral-100'>
      <nav className='py-2 px-5 flex justify-between items-center'>
        <div>
          <Link to={'/'} title='Logo'>
            <h1 className='font-bold text-4xl tracking-tighter'>Skylink</h1>
          </Link>
        </div>
        <div>
          <Button
            label='Menu +'
            text
            className='!text-2xl !text-black'
            onClick={() => setSideNav(true)}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
