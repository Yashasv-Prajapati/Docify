'use client';

import Link from 'next/link';

import { UserSchema } from '@/lib/validations/user';

import { Button } from '../../../components/ui/button';
import Avatar from './avatar';

interface NavProps {
  curr_user: UserSchema;
}

export default function Nav({ AvatarComponent }: { AvatarComponent: any }) {
  // const curr_user = getCurrentUser();
  return (
    <header className='flex h-16 shrink-0 items-center border-b bg-gray-100/40 px-4 md:px-6'>
      <Link className='flex items-center gap-2 text-lg font-semibold' href='#'>
        {/* <FrameIcon className='size-6' /> */}
        <svg
          className='size-6'
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
        <span className='sr-only'>Docify</span>
      </Link>
      <nav className='hidden flex-row items-center gap-5 text-sm font-medium sm:flex lg:gap-6'>
        <Link className='text-gray-500 dark:text-gray-400' href='#'>
          Dashboard
        </Link>
        <Link className='font-bold' href='#'>
          Projects
        </Link>
        <Link className='text-gray-500 dark:text-gray-400' href='#'>
          Settings
        </Link>
        <Link className='w-full text-gray-500 dark:text-gray-400' href='#'>
          Logout
        </Link>
      </nav>
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <Button className='ml-auto rounded-full' size='icon' variant='ghost'>
          {/* <Avatar /> */}
          {/* <AvatarComponent/> */}
          {AvatarComponent}
          <span className='sr-only'>Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
}
