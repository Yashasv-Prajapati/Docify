'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Dropdown } from 'react-day-picker';
import Link from 'next/link';
import '../styles/globals.css';

import { useState } from 'react';
import Image from 'next/image';

import styles from '../styles';
import { navVariants } from '../utils/motion';

function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter

  return (
    <motion.nav
      variants={navVariants}
      initial='hidden'
      whileInView='show'
      className={`${styles.xPaddings} relative border-b-2 border-[#7184f0] py-4 `}
    >
      <div className='gradient-01 absolute inset-0 w-[50%]' />
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
      >
       <Link className='flex items-center gap-2 text-lg font-semibold' href='#'>
        <FrameIcon className='size-6' />
        <span className='sr-only'>Docify</span>
      </Link>
        <div className='menu-container'>
          <Image
            width={1000}
            height={500}
            className='size-10 rounded-full p-1 ring-2 ring-gray-500 '
            src='/cover.png'
            alt='Bordered avatar'
            onClick={() => setOpen(!open)}
          />
          <div
            className={`dropdown-menu rounded-lg bg-neutral-200 ${open ? 'active' : 'inactive'} absolute right-0 top-full z-50 `}
          >
            <h3 className='bg-gradient-to-r from-sky-400 to-[#8e29f3] bg-clip-text font-medium text-transparent'>
              DOCIFY
              <br />
              <span className='text-gray-600'>docifywiki</span>
            </h3>
            <ul>
              <DropdownItem text={'My Profile'} />
              <DropdownItem text={'Repositories'} />
              <DropdownItem text={'Stars'} />
              <DropdownItem text={'Logout'} />
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
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


function DropdownItem(props: { text: string }) {
  return (
    <li className='flex'>
      <a className='text-gray-500'>{props.text}</a>
    </li>
  );
}

export default Navbar;
