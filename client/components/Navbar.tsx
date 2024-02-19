'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-4 relative border-b-2 border-[#7184f0] `}
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div
      className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
    >
      <img
        src="/logo-no-background.png"
        alt="search"
        className="w-2/12 object-contain"
      />
      {/* <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">
        Docify
      </h2> */}
      <img
        src="/menu.svg"
        alt="menu"
        className="w-[24px] h-[24px] object-contain cursor-pointer"
      />
    </div>
  </motion.nav>
);

export default Navbar;
