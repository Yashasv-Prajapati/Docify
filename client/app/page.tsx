'use client';

import Image from 'next/image';

import MarkdownEditor from '@/components/markdownEditor';

import { Footer, Navbar } from '../components/index';
import {
  About,
  Explore,
  GetStarted,
  Hero,
  WhatsNew,
} from '../components/landingPage';

const Home = () => {
  return (
    <div>
      <div className='overflow-hidden bg-[#d1d4db]'>
        <Navbar data-testid="navbar"/>
        <Hero data-testid="hero"/>
        <div className='relative'>
          <About data-testid="about"/>
          <div className='gradient-03 z-0' />
          <Explore />
        </div>
        <div className='relative'>
          <GetStarted data-testid="get-started"/>
          <div className='gradient-04 z-0' />
          <WhatsNew />
        </div>
        <Footer />
      </div>
      {/* <MarkdownEditor /> */}
    </div>
  );
};

export default Home;
