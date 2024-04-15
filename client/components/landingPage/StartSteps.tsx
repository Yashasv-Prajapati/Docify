import styles from '../../styles';

interface StartStepsProps {
  number: string | number;
  text: string;
}

const StartSteps: React.FC<StartStepsProps> = ({ number, text }) => (
  <div className={`${styles.flexCenter} flex-row`}>
    <div
      className={`${styles.flexCenter} size-[70px] rounded-[24px] bg-[#323F5D]`}
    >
      <p className='text-[20px] font-bold text-white'>{number}</p>
    </div>
    <p className='ml-[30px] flex-1 bg-gradient-to-r from-sky-400 to-[#181bda] bg-clip-text text-[20px] font-medium leading-[32.4px] text-transparent'>
      {text}
    </p>
  </div>
);

export default StartSteps;
