import { motion } from 'framer-motion';

import styles from '../../styles';
import { insights } from '../../constants';
import { staggerContainer } from '../../utils/motion';
// import { InsightCard, TitleText, TypingText } from './index';
import InsightCard from './InsightCard';
import { TitleText, TypingText } from './CustomTexts';

const Insights = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer(0.5,0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| Insight" textStyles="text-center" />
      <TitleText title={<>Insight about metaverse</>} textStyles="text-center" />
      <div className="mt-[50px] flex flex-col gap-[30px]">
        {insights.map((item, index) => (
          <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default Insights;
