import AccountsRepo from '@/components/accountsPage/AccountsRepo';
import Tabs from '@/components/accountsPage/Tabs';

import Sidebar from '../../components/accountsPage/Sidebar';
import { Navbar } from '../../components/index';

const AccountsPage: React.FC = () => {
  return (
    <div className=' h-screen overflow-hidden bg-[#1b222f]'>
      <Navbar />
      {/* <div className="gradient-03 z-0" /> */}
      <div className='mx-auto flex '>
        <Sidebar />
        <div className='flex w-4/5  flex-col'>
          <Tabs />

          {/* The rest of the profile page content will go here */}
          <AccountsRepo />
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
