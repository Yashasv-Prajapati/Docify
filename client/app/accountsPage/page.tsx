import Authentication from '@/components/accountsPage/Authentication';
import Tabs from '@/components/accountsPage/Tabs';
import Avatar from '@/app/dashboard/_components/avatar';
import Nav from '@/app/dashboard/_components/nav';

import Sidebar from '../../components/accountsPage/Sidebar';
import { Navbar } from '../../components/index';

const AccountsPage: React.FC = () => {
  const AvatarComponent = <Avatar />;
  return (
    <div className=' h-screen overflow-hidden bg-[#d1d4db]'>
      <Nav AvatarComponent={AvatarComponent} />
      <div className='mx-auto flex  '>
        <Sidebar />
        <div className='flex w-4/5  flex-col'>
          {/* <Tabs /> */}
          <Authentication />
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
