import { motion } from 'framer-motion';

import { newFeatures } from '../../constants';
import styles from '../../styles';
import { fadeIn, planetVariants, staggerContainer } from '../../utils/motion';
import { NewFeatures, TitleText, TypingText } from './index';

const WhatsNew = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer(0.5, 0)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col gap-8 lg:flex-row`}
    >
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className='flex flex-[0.95] flex-col justify-center'
      >
        <TypingText title='| Whats new?' />
        <TitleText title={<>What&apos;s new about Metaversus?</>} />
        <div className='mt-[48px] flex flex-wrap justify-between gap-[24px]'>
          {newFeatures.map((feature) => (
            <NewFeatures key={feature.title} {...feature} />
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={planetVariants('right')}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <img
          src='/whats-new.png'
          alt='get-started'
          className='size-[90%] object-contain'
        />
      </motion.div>
    </motion.div>
  </section>
);

export default WhatsNew;
