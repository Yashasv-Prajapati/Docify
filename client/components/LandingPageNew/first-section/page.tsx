import animationData from '@/public/white_wave.json';
import Lottie from 'lottie-react';
import { Typewriter } from 'react-simple-typewriter';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const FirstSection = () => {
  const router = useRouter();
  return (
    <section className='relative bg-gray-200 py-10 md:py-20'>
      {/* Lottie animation covering the background */}
      <div className='absolute inset-0 z-0 '>
        <Lottie
          animationData={animationData}
          className='size-full object-cover'
        />
      </div>

      <div className='container relative z-0 mx-auto text-center'>
        <div className='pb-5 text-6xl font-medium md:px-20'>
          Leverage the power of Docify:
        </div>
        <div className='mb-8 flex flex-row justify-center'>
          <span className='flex justify-center text-6xl font-medium md:px-2'>
            Create
          </span>
          <code className='bg-muted relative rounded px-4 py-2 font-mono text-6xl font-medium text-gray-600 shadow-md'>
            <Typewriter
              words={[
                '{Documentation}',
                '{UML Diagrams}',
                '{testing Plans}',
                '{dependancy list}',
              ]}
              typeSpeed={150}
              loop={0}
              cursor
              cursorStyle='|'
            />
          </code>
        </div>

        <p className='md-10 mt-14 bg-gradient-to-r from-black to-gray-400 bg-clip-text text-lg font-normal text-transparent md:text-xl'>
          Streamline your project documentation: Automate analysis, Generate
          essentials!
        </p>
        <div className='flex justify-center gap-4 pt-10'>
          <Button variant='bluebutton' onClick={() => router.push('/auth/signup')}>Get Started</Button>
          <Button variant='outline'>Learn More</Button>
        </div>

        <div className='pt-10'>
          <video className='rounded-xl' autoPlay muted loop>
            <source src='/content/hero-1.mp4' type='video/mp4' />
          </video>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
