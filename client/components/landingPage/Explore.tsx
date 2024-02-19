"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../../styles';
import { exploreWorlds } from '../../constants';
import { staggerContainer } from '../../utils/motion';
import { ExploreCard, TitleText, TypingText } from './index';


interface TitleTextProps {
  title: React.ReactNode; // Update the type to accept JSX elements
  textStyles?: string;
}

const Explore = () => {
  const [active, setActive] = useState('world-2');

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer(0.5,0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        {/* <TypingText title="| The World" textStyles="text-center" /> */}
        <TitleText
          title={<>Features to explore</>}
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
