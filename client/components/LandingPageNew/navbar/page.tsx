import ActionButtons from './action-buttons';
import Logo from './logo';
import { NavigationMenuBar } from './navigation-bar';

const Navbar = () => {
  return (
    <div className='flex h-20 items-center justify-between border-b px-10 '>
      <Logo />
      <NavigationMenuBar />
      <ActionButtons />
    </div>
  );
};

export default Navbar;
