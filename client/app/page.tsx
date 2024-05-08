
'use client';

import Image from 'next/image';

import Navbar from '@/components/LandingPageNew/navbar/page'
import FirstSection from '@/components/LandingPageNew/first-section/page';
import SecondSection from '@/components/LandingPageNew/second-section/page';

const Home = () => {
  return (
    <div>
<<<<<<< HEAD
      <div data-testid ="navbar"> 
      <Navbar type ="home"/>
      </div>
      <div data-testid ="firstsection"> 
      <FirstSection/>
      </div>
      <div data-testid ="secondsection"> 
      <SecondSection/>
      </div>
=======
      <Navbar type ="home"/>
      <FirstSection/>
      <SecondSection/>
>>>>>>> main
    </div>
  );
};

export default Home;