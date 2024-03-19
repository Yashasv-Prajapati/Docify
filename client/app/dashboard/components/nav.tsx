'use client';
import Link from 'next/link';
import { useState } from 'react';
import { UserSchema } from '@/lib/validations/user';
import { Button } from '../../../components/ui/button';
import { usePathname } from 'next/navigation';
import Avatar from './avatar';

interface NavProps {
  curr_user: UserSchema;
}

export default function Nav({ AvatarComponent }: { AvatarComponent: any }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  return (
    <header className='flex h-16 shrink-0 items-center sm:justify-between border-b bg-gray-100/40 px-4 md:px-6'>
      <Link href='/'  className='w-full sm:w-auto flex items-center justify-center sm:justify-normal gap-2 text-lg font-semibold'>
          <span>Docify</span>
      </Link>
      <nav className='w-full px-24 hidden flex-row items-center justify-start gap-6 text-sm font-medium  sm:flex lg:gap-14'>
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
      <div className='flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 relative'>
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
          <div className='absolute top-full z-10 right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-lg py-1 overflow-y-auto'>
            {/* we can show user profile (profile readme from github) at this page ****** */}
            <Link href='/account' passHref>
              <span className='block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer'>Your Account</span>
            </Link>
            <Link href='/' passHref className='sm:hidden'>
              <span className='block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer'>Home</span>
            </Link>
            <Link href='/dashboard' passHref className='sm:hidden'>
              <span className='block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer'>Dashboard</span>
            </Link>
            <Link href='/new' passHref className='sm:hidden'>
              <span className='block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer'>Your Repositories</span>
            </Link>
            <Link href='/settings' passHref className='sm:hidden'>
              <span className='block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer'>Settings</span>
            </Link>
            {/* show this only when user is Logged in ******** */}
            <Link href='/logout' passHref>
              <span className='block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer'>Log out</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, currentPath, children }: { href: string; currentPath: string; children: React.ReactNode }) {
  const isActive = currentPath === href;

  return (
    <Link href={href} className={`font-medium ${isActive ? 'text-black' : 'text-gray-500 dark:text-gray-400'}`}>
      
        {children}

    </Link>
  );
}
