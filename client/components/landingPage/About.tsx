'use client';

import { motion, Variants } from 'framer-motion';

import styles from '../../styles';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { TypingText } from './index';

const About = () => (
  <section className={`${styles.paddings} relative z-10 mt-5`}>
    <div className='gradient-02 z-0' />
    <motion.div
      variants={staggerContainer(0.5, 0)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <h1 className='flex items-center border-b-4 border-[#65aedb] pb-1 text-5xl font-extrabold text-white'>
        About
        <span className='me-2 ms-4 rounded bg-[#7184f0] px-2.5 py-0.5 text-2xl font-semibold  text-[#331062]'>
          Docify
        </span>
      </h1>

      <motion.div
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className='text-secondary-white mt-[8px] text-center text-[20px] font-normal sm:text-[32px]'
      >
        <blockquote className='p-8  text-2xl text-gray-900'>
          <svg
            className='mb-4 size-8 text-gray-400 dark:text-gray-600'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 18 14'
          >
            <path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
          </svg>
          <div className='bg-gradient-to-r from-sky-400 to-[#905dc4] bg-clip-text text-transparent'>
            &quot;Revolutionize your project documentation process with our
            innovative tool. Effortlessly streamline analysis and generate
            essential components like testing plans, UML diagrams, and README
            files. Our platform seamlessly integrates with GitHub repositories
            for maximum efficiency. Experience the future of project
            documentation with us.&quot;
          </div>
        </blockquote>
      </motion.div>

      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src='/arrow-down.svg'
        alt='arrow down'
        className='mt-[28px] h-[28px] w-[18px] object-contain'
      />
    </motion.div>
  </section>
);

export default About;
