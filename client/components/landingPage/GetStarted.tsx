import { motion } from 'framer-motion';

import { startingFeatures } from '../../constants';
import styles from '../../styles';
import { fadeIn, planetVariants, staggerContainer } from '../../utils/motion';
import { StartSteps, TitleText, TypingText } from './index';

const GetStarted = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer(0.5, 0)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col gap-8 lg:flex-row`}
    >
      <motion.div
        variants={planetVariants('left')}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <img
          src='/get-started.png'
          alt='get-started'
          className='size-[90%] object-contain'
        />
      </motion.div>
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className='flex flex-[0.75] flex-col justify-center'
      >
        <TypingText title='| How Docify Works' />
        <TitleText title={<>Get started with GitHub</>} />
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
    </motion.div>
  </section>
);

export default GetStarted;
