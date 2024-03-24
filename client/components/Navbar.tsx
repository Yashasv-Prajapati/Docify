'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Dropdown } from 'react-day-picker';

import '../styles/globals.css';

import { useState } from 'react';

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
        className={`${styles.innerWidth} mx-auto flex items-center justify-between gap-8`}
      >
        {' '}
        {/* Anchor tag with onClick handler */}
        <img
          src='/logo-no-background.png'
          alt='search'
          className='h-10 cursor-pointer  object-contain xl:h-12' // Add cursor-pointer to show the cursor as pointer
        />
        {/* <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">
        Docify
      </h2> */}
        <div className='menu-container'>
          <img
            className='h-10 w-10 rounded-full p-1 ring-2 ring-gray-500 '
            src='/cover.png'
            alt='Bordered avatar'
            onClick={() => setOpen(!open)}
          />
          <div
            className={`dropdown-menu rounded-lg bg-neutral-200 ${open ? 'active' : 'inactive'} absolute right-0 top-full z-50 `}
          >
            <h3 className='bg-gradient-to-r from-sky-400 to-[#8e29f3] bg-clip-text font-medium text-transparent'>
              Anushtha Prakash
              <br />
              <span className='text-gray-600'>anushthaprakash</span>
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

function DropdownItem(props: { text: string }) {
  return (
    <li className='flex'>
      <a className='text-gray-500'>{props.text}</a>
    </li>
  );
}

export default Navbar;
