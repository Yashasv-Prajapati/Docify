"use client"
import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Footer, Navbar } from '../components/index';
import { About, Explore, GetStarted, Hero, Insights, WhatsNew, World } from '../components/landingPage';

const Home = () => (
    <div>
  <div className="bg-[#1b222f] overflow-hidden">
    <Navbar />
    <Hero />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
      <Explore />
    </div>
    <div className="relative">
      <GetStarted />
      <div className="gradient-04 z-0" />
      <Link
      className={buttonVariants({
        size: 'sm',
      })}
      href={`https://github.com/user/installations/{installation_id}/repositories?client_id=${process.env.GITHUB_CLIENT_ID}`}
      >
        Authorize
      </Link>
      <WhatsNew />
    </div>
    
    {/* <World />
    <div className="relative">
      <Insights />
      <div className="gradient-04 z-0" />
    </div> */}
    <Footer />
  </div>
  </div>
);

export default Home;
