'use client';

import Image from 'next/image';

import FirstSection from '@/components/LandingPageNew/first-section/page';
import Navbar from '@/components/LandingPageNew/navbar/page';
import SecondSection from '@/components/LandingPageNew/second-section/page';

const Home = () => {
  return (
    <div>
      <div data-testid='navbar'>
        <Navbar type='home' />
      </div>
      <div data-testid='firstsection'>
        <FirstSection />
      </div>
      <div data-testid='secondsection'>
        <SecondSection />
      </div>
    </div>
  );
};

export default Home;
