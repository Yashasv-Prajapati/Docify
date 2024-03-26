'use client';

import { motion } from 'framer-motion';
import { Dropdown } from 'react-day-picker';

import '../styles/globals.css';

import { useState } from 'react';

import styles from '../styles';
import { navVariants } from '../utils/motion';

function Navbar() {
  const [open, setOpen] = useState(false);
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
        <img
          src='/logo-no-background.png'
          alt='search'
          className='w-2/12 object-contain'
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
          <div className={`dropdown-menu ${open ? 'active' : 'inactive'} `}>
            <h3 className='bg-gradient-to-r from-sky-400 to-[#8e29f3] bg-clip-text font-medium text-transparent'>
              Anushtha Prakash
              <br />
              <span className='text-white'>anushthaprakash</span>
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
      <a className='text-gray-400'>{props.text}</a>
    </li>
  );
}

export default Navbar;
