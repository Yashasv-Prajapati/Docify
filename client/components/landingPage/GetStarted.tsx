import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import { startingFeatures } from '../../constants';
import BlueanimationData from '../../public/Animation - 1711299754830.json';
import styles from '../../styles';
import { fadeIn, planetVariants, staggerContainer } from '../../utils/motion';
import CodePlanet from './CodePlanet';
import { StartSteps, TitleText, TypingText } from './index';

const GetStarted = () => (
  <section className={`${styles.paddings} relative z-10 h-auto lg:h-screen `}>
    <motion.div
      variants={staggerContainer(0.5, 0)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col lg:flex-row`}
    >
      <div className='flex w-full flex-row'>
        <div className='my-auto w-2/5 border-r-2 border-neutral-300 xl:w-1/2'>
          <motion.div
            variants={planetVariants('left')}
            className={`flex-1 ${styles.flexCenter}`}
          >
            <Lottie
              animationData={BlueanimationData}
              className='mx-auto  size-[300px] object-contain  xl:size-[500px]'
            />
          </motion.div>
        </div>
        <div className='w-3/5 xl:w-1/2'>
          <motion.div
            variants={fadeIn('left', 'tween', 0.2, 1)}
            className='ml-16 flex flex-[0.75] flex-col justify-center xl:ml-24'
          >
            <CodePlanet />

            {/* <TypingText title='| How Docify Works' /> */}
            {/* <TitleText title={<>Get started on Docify</>} /> */}
            <span className='flex items-center  py-2 text-5xl font-extrabold text-white'>
              <span className='border-b-4 border-[#65aedb] pb-1 '>
                Get started on
                <span className='ml-4 rounded bg-[#2940a5] px-2.5 py-0.5 text-3xl font-semibold  text-[#9addfa] '>
                  Docify
                </span>
              </span>
            </span>
            <div className='mt-[31px] flex max-w-[370px] flex-col gap-[24px]'>
              {startingFeatures.map((feature, index) => (
                <StartSteps
                  key={feature}
                  number={`${index < 10 ? '0' : ''} ${index + 1}`}
                  text={feature}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default GetStarted;
