import React, { FC, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from './loaderAnimation.json';
import tickAnimation from './tickAnimation.json';

interface LoaderProps {}

interface LoaderItem {
  animationData: any;
  showTick: boolean;
  text: string;
}

const loaders: LoaderItem[] = [
  { animationData: loaderAnimation, showTick: false, text: 'Test Task running' },
  { animationData: loaderAnimation, showTick: false, text: 'Test Task running' },
  { animationData: loaderAnimation, showTick: false, text: 'Test Task running' },
];

const Loader: FC<LoaderProps> = () => {
  const [loaderIndex, setLoaderIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaderIndex < loaders.length) {
        loaders[loaderIndex].showTick = true;
        loaders[loaderIndex].text = 'Successful';
        setLoaderIndex(loaderIndex + 1);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [loaderIndex]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {loaders.map((loader, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '10px', flexGrow: 1 }}>
            <div style={{ width: '100px', height: '100px', marginRight: '10px' }}>
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