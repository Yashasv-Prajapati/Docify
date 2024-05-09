//navbar.tsx

import Logo from './logo';
import { NavigationMenuBar } from './navigation-bar';

interface NavbarProps {
  type: 'home' | string; // Adjusted type to allow for potential future expansion
}

const Navbar: React.FC<NavbarProps> = ({ type }) => {
  return (
    <div className='mr-14 flex h-16  items-center border-b px-10'>
      <div data-testid='logo'>
        <Logo />
      </div>
      {type === 'home' ? (
        <div className='mx-auto' data-testid='navigation-menu-bar'>
          <NavigationMenuBar />
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
