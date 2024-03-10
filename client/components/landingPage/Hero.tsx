'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import animationData from '../../public/Animation - 1707626346860.json';
import styles from '../../styles';
import { slideIn, staggerContainer, textVariant } from '../../utils/motion';

const Hero = () => {
  const router = useRouter();
  return (
    <div>
      <section className={`${styles.yPaddings} pl-6 sm:pl-16`}>
        <motion.div
          variants={staggerContainer(0.5, 0)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} mx-auto flex flex-col`}
        >
          <div className='relative z-10 flex flex-col items-center justify-center p-9'>
            <motion.h1 variants={textVariant(1.1)}>
              {/* Lets Us handle  */}

              <div className='text-2xl font-extrabold text-white  md:text-3xl lg:text-4xl'>
                <div className='bg-gradient-to-r from-sky-400 to-[#8e29f3] bg-clip-text text-transparent'>
                  Streamline your project documentation:
                </div>{' '}
                Automate analysis, Generate essentials!
              </div>
            </motion.h1>
            <motion.div
              variants={textVariant(1.2)}
              className='flex flex-row items-center justify-center'
            ></motion.div>
          </div>

          <motion.div
            variants={slideIn('right', 'tween', 0.2, 1)}
            className='relative -mt-[12px] w-full md:-mt-[20px]'
          >
            <div className='hero-gradient absolute -top-[30px] z-[0] h-[400px] w-full rounded-tl-[140px]' />

            <img
              src='/cover.png'
              alt='hero_cover'
              className='relative z-10 h-[350px] w-full rounded-tl-[140px] object-cover sm:h-[500px]'
            />
            <div className='absolute left-1/2 top-20 z-10 -translate-x-1/2 -translate-y-1/2'>
              <button
                onClick={() => router.push('/auth/signup')}
                type='button'
                className='mb-2  me-2 mr-10 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800'
              >
                Get Started
              </button>
              <button
                type='button'
                className='mb-2 me-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800'
              >
                Get a Demo
              </button>
            </div>

            <a href='#explore'>
              <div className=' relative z-10 -mt-[50px] flex w-full  justify-end sm:-mt-[70px] '>
                <span className='pr-11'>
                  <span className='relative z-10 -mt-[50px] flex w-min  justify-end rounded-full  bg-gradient-to-r from-[#250b47] to-[#2a0670] sm:-mt-[70px]'>
                    <Lottie
                      animationData={animationData}
                      className='size-[100px] object-contain sm:size-[155px]'
                    />
                  </span>
                </span>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
