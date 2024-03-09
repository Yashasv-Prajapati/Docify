import { motion, Variants } from 'framer-motion';

import { fadeIn } from '../../utils/motion';

interface InsightCardProps {
  imgUrl: string;
  title: string;
  subtitle: string;
  index: number;
}

const InsightCard: React.FC<InsightCardProps> = ({
  imgUrl,
  title,
  subtitle,
  index,
}) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 1) as Variants} // Type assertion since fadeIn may not match Variants exactly
    className='flex flex-col gap-4 md:flex-row'
  >
    <img
      src={imgUrl}
      alt='planet-01'
      className='h-[250px] w-full rounded-[32px] object-cover md:w-[270px]'
    />
    <div className='flex w-full items-center justify-between'>
      <div className='flex max-w-[650px] flex-1 flex-col md:ml-[62px]'>
        <h4 className='text-[26px] font-normal text-white lg:text-[42px]'>
          {title}
        </h4>
        <p className='text-secondary-white mt-[16px] text-[14px] font-normal lg:text-[20px]'>
          {subtitle}
        </p>
      </div>

      <div className='hidden size-[100px] items-center justify-center rounded-full border-[1px] border-white bg-transparent lg:flex'>
        <img
          src='/arrow.svg'
          alt='arrow'
          className='size-[40%] object-contain'
        />
      </div>
    </div>
  </motion.div>
);

export default InsightCard;
