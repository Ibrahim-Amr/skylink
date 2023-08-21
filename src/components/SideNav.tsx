import { Sidebar } from 'primereact/sidebar';
import { useContext } from 'react';
import GlobalContext from '../context/global.context';
import { NavLink } from 'react-router-dom';

const navLinks = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'login',
    href: '/login',
  },
  {
    label: 'register',
    href: '/register',
  },
];

const SideNav = () => {
  const { sideNav, setSideNav } = useContext<any>(GlobalContext);
  return (
    <Sidebar visible={sideNav} position='left' onHide={() => setSideNav(false)}>
      <div>
        <ul className='space-y-4 '>
          {navLinks.map((link) => (
            <li
              key={link.label}
              className='font-semibold text-3xl hover:opacity-75 transition-all ease-in-out '
            >
              <NavLink to={link.href} title={link.label}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </Sidebar>
  );
};

export default SideNav;
