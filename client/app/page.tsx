
'use client';

import Image from 'next/image';

import Navbar from '@/components/LandingPageNew/navbar/page'
import FirstSection from '@/components/LandingPageNew/first-section/page';
import SecondSection from '@/components/LandingPageNew/second-section/page';

const Home = () => {
  return (
    <div>
      <Navbar type ="home"/>
      <FirstSection/>
      <SecondSection/>
    </div>
  );
};

export default Home;
