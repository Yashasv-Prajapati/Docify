'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

import { Button } from '../../../components/ui/button';

export default function Nav({ AvatarComponent }: { AvatarComponent: any }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const response = await axios.post('/api/logout');

    if (response.status === 200) {
      toast.success('Logged out successfully');
      router.push('/auth/signup');
    } else {
      toast.error('Error logging out');
    }
  }

  return (
    <header className='flex h-16 shrink-0 items-center  border-b-2 bg-gray-100/40 px-4 sm:justify-between md:px-6'>
      <Link className='flex items-center gap-2 text-lg font-semibold' href='#'>
        <FrameIcon className='size-6' />
        <span className='ml-1 text-xl'>Docify</span>
      </Link>
      <nav className='mr-8 hidden w-full flex-row items-center justify-center gap-6 px-24 text-sm font-medium  sm:flex lg:gap-14'>
        <NavLink href='/' currentPath={pathname}>
          Home
        </NavLink>
        <NavLink href='/dashboard' currentPath={pathname}>
          Dashboard
        </NavLink>
        <NavLink href='/new' currentPath={pathname}>
          Repositories
        </NavLink>
        <NavLink href='/settings' currentPath={pathname}>
          Settings
        </NavLink>
        {/* <NavLink href='/logout' currentPath={pathname}>
          Logout
        </NavLink> */}
      </nav>
      <div className='relative flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <Button
          className='ml-auto rounded-full'
          size='icon'
          variant='ghost'
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {AvatarComponent}
          <span className='sr-only'>Toggle user menu</span>
        </Button>
        {showDropdown && (
          <div className='absolute right-0 top-full z-10 mt-2 w-48 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-md'>
            {/* we can show user profile (profile readme from github) at this page ****** */}
            <Link href='/accountsPage' passHref>
              <span className='block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100'>
                Your Account
              </span>
            </Link>
            <Link href='/' passHref className='sm:hidden'>
              <span className='block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100'>
                Home
              </span>
            </Link>
            <Link href='/dashboard' passHref className='sm:hidden'>
              <span className='block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100'>
                Dashboard
              </span>
            </Link>
            <Link href='/new' passHref className='sm:hidden'>
              <span className='block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100'>
                Your Repositories
              </span>
            </Link>
            <Link href='/settings' passHref className='sm:hidden'>
              <span className='block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100'>
                Settings
              </span>
            </Link>
            {/* show this only when user is Logged in ******** */}
            <span
              onClick={logout}
              className='block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100'
            >
              Logout
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
function FrameIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='22' x2='2' y1='6' y2='6' />
      <line x1='22' x2='2' y1='18' y2='18' />
      <line x1='6' x2='6' y1='2' y2='22' />
      <line x1='18' x2='18' y1='2' y2='22' />
    </svg>
  );
}

function NavLink({
  href,
  currentPath,
  children,
}: {
  href: string;
  currentPath: string;
  children: React.ReactNode;
}) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`font-medium ${isActive ? 'text-black' : 'text-gray-500 dark:text-gray-400'}`}
    >
      {children}
    </Link>
  );
}
