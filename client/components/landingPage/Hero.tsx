'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import animationData from '../../public/Animation - 1707626346860.json';
import HeroanimationData from '../../public/Animation - 1711293802123.json';
import GradiantanimationData from '../../public/Animation - 1711293942702.json';
import styles from '../../styles';
import { slideIn, staggerContainer, textVariant } from '../../utils/motion';

const Hero = () => {
  const router = useRouter();
  return (
    <div>
      <section className={` h-auto pl-6 sm:pl-16 xl:h-screen`}>
        <motion.div
          variants={staggerContainer(0.5, 0)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} mx-auto flex flex-col`}
        >
          <div className='relative z-10 flex flex-col items-center justify-center p-9'>
            {/* <motion.h1 variants={textVariant(1.1)}> */}
            {/* Lets Us handle  */}
            <div className='text-2xl font-bold text-white md:text-3xl lg:text-4xl xl:mt-5 xl:text-5xl'>
              <div className='mb-1 bg-gradient-to-r from-sky-400 to-[#8e29f3] bg-clip-text text-transparent'>
                Streamline your project documentation:
              </div>{' '}
              <span className=''>Automate analysis</span>,{' '}
              <span>Generate essentials!</span>
            </div>
            <div className='mt-2 flex flex-row items-center justify-center p-4 xl:mt-5 xl:scale-125'>
              <div className='flex'>
                <button
                  onClick={() => router.push('/auth/signup')}
                  type='button'
                  className='mb-2  me-2 mr-10 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 '
                >
                  <span className='flex flex-row'>
                    <svg
                      className='mr-1 size-6 text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z'
                        clip-rule='evenodd'
                      />
                    </svg>
                    Get Started
                  </span>
                </button>
              </div>
              <div className='flex'>
                <button
                  type='button'
                  className=' mb-2 me-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-2.5 text-center text-base font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800'
                >
                  Get a Demo
                </button>
              </div>
            </div>
            <Lottie
              animationData={GradiantanimationData}
              className='mx-auto size-[300px] object-contain xl:size-[500px]'
            />
            {/* </motion.h1> */}
            <motion.div
              variants={textVariant(1.2)}
              className='flex flex-row items-center justify-center'
            ></motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
