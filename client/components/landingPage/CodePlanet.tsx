import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import animationData from '../../public/Animation - 1707626346860.json';
import HeroanimationData from '../../public/Animation - 1711293802123.json';
import GradiantanimationData from '../../public/Animation - 1711293942702.json';
import styles from '../../styles';
import { slideIn, staggerContainer, textVariant } from '../../utils/motion';

function CodePlanet() {
  return (
    <div>
      <motion.div
        variants={staggerContainer(0.5, 0)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className='relative -mt-[12px] w-full md:-mt-[20px]'
        >
          {/* <div className='hero-gradient absolute -top-[30px] z-[0] h-[400px] w-full rounded-tl-[140px]' /> */}

          {/* <img
      src='/cover.png'
      alt='hero_cover'
      className='relative z-10 h-[350px] w-full rounded-tl-[140px] object-cover sm:h-[500px]'
    /> */}

          <a href='#explore'>
            <div className=' relative z-10 -mt-[50px] flex w-full  justify-end sm:-mt-[70px] '>
              <span className='pr-11'>
                <span className='relative z-10 -mt-[50px] flex w-min  justify-end rounded-full  bg-gradient-to-r from-[#b2e0ec] to-[#bec1f3] sm:-mt-[70px]'>
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
    </div>
  );
}

export default CodePlanet;
