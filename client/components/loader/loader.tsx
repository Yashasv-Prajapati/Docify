'use client';

import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import loaderAnimation from './loaderAnimation.json';
import tickAnimation from './tickAnimation.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LoaderProps {
  progressValues: number[]; // Array of progress values
}

interface LoaderItem {
  animationData: any;
  showTick: boolean;
  text: string;
}

const loaders: LoaderItem[] = [
  {
    animationData: loaderAnimation,
    showTick: false,
    text: 'Container starting',
  },
  {
    animationData: loaderAnimation,
    showTick: false,
    text: 'Container executing',
  },
  {
    animationData: loaderAnimation,
    showTick: false,
    text: 'Execution completing',
  }, // Added a fourth loader
];

const Loader: FC<LoaderProps> = ({ progressValues }) => {
  const [loaderIndex, setLoaderIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaderIndex < loaders.length) {
        loaders[loaderIndex].showTick = true;
        loaders[loaderIndex].text = `${progressValues[loaderIndex]}% completed`;
        setLoaderIndex(loaderIndex + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [loaderIndex, progressValues]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {loaders.map((loader, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginRight: '10px',
              flexGrow: 1,
            }}
          >
            <div
              style={{ width: '100px', height: '100px', marginRight: '10px' }}
            >
              {loader.showTick ? (
                <Lottie animationData={tickAnimation} loop={false} />
              ) : (
                <Lottie animationData={loader.animationData} loop={true} />
              )}
            </div>
            <div style={{ fontSize: '1.2em' }}>{loader.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
