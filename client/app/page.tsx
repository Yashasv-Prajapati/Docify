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
        <div data-testid='navbar'>
          <Navbar />
        </div>
        <div data-testid="hero">
          <Hero />
        </div>
        {/* <Navbar/> */}
        {/* <Hero/> */}
        <div className='relative'>
          <div data-testid="about">
            <About />
          </div>
          <div className='gradient-03 z-0' />
          <div data-testid="explore">
            <Explore />
          </div>
        </div>
        <div className='relative'>
          <div data-testid="get-started">
            <GetStarted />
          </div>
          <div className='gradient-04 z-0' />
          <div data-testid="whats-new">
            <WhatsNew />
          </div>
        </div>
        <div data-testid="footer">
          <Footer />
        </div>
      </div>
      {/* <MarkdownEditor /> */}
    </div>
  );
};

export default Home;
