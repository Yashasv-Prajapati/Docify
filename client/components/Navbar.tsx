'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Dropdown } from 'react-day-picker';

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
        <Image
          width={1000}
          height={500}
          src='/logo-no-background.png'
          alt='search'
          className='w-2/12 object-contain'
        />
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

function DropdownItem(props: { text: string }) {
  return (
    <li className='flex'>
      <a className='text-gray-500'>{props.text}</a>
    </li>
  );
}

export default Navbar;
