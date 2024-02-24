import { motion } from 'framer-motion';

import styles from '../../styles';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { TitleText, TypingText } from './CustomTexts';

const World = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer(0.5, 0)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title='| People on the World' textStyles='text-center' />
      <TitleText
        title={
          <>
            Track friends around you and invite them to play together in the
            same world
          </>
        }
        textStyles='text-center'
      />

      <motion.div
        variants={fadeIn('up', 'tween', 0.3, 1)}
        className='relative mt-[68px] flex h-[550px] w-full'
      >
        <img src='/map.png' alt='map' className='size-full object-cover' />

        <div className='absolute bottom-20 right-20 size-[70px] rounded-full bg-[#5D6680] p-[6px]'>
          <img src='people-01.png' alt='people' className='size-full' />
        </div>

        <div className='absolute left-20 top-10 size-[70px] rounded-full bg-[#5D6680] p-[6px]'>
          <img src='/people-02.png' alt='people' className='size-full' />
        </div>

        <div className='absolute left-[45%] top-1/2 size-[70px] rounded-full bg-[#5D6680] p-[6px]'>
          <img src='people-03.png' alt='people' className='size-full' />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default World;
