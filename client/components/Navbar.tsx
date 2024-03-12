'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial='hidden'
    whileInView='show'
    className={`${styles.xPaddings} relative border-b-2 border-[#7184f0] py-4 `}
  >
    <div className='gradient-01 absolute inset-0 w-[50%]' />
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
      <img
        src='/logo-no-background.png'
        alt='search'
        className='w-2/12 object-contain'
      />
      {/* <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">
        Docify
      </h2> */}
      <img
        src='/menu.svg'
        alt='menu'
        className='size-[24px] cursor-pointer object-contain'
      />
    </div>
  </motion.nav>
);

export default Navbar;
