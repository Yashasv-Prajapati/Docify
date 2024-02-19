import { motion, Variants } from 'framer-motion';
import { textContainer, textVariant2 } from '../../utils/motion';

interface TypingTextProps {
  title: string;
  textStyles?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({ title, textStyles }) => (
  <motion.p
    variants={textContainer as Variants} // Type assertion since textContainer may not match Variants exactly
    className={`font-normal text-[14px] text-secondary-white ${textStyles ?? ''}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

interface TitleTextProps {
  title: React.ReactNode;
  textStyles?: string;
}

export const TitleText: React.FC<TitleTextProps> = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles ?? ''}`}
  >
    {title}
  </motion.h2>
);

