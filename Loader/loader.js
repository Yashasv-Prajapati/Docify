import { useEffect, useState } from 'react';
import Lottie from 'lottie-react-web';
import loaderAnimation from './loaderAnimation.json';
import tickAnimation from './tickAnimation.json';

const loaders = [
  { animationData: loaderAnimation, showTick: false, text: 'Test Task running' },
  { animationData: loaderAnimation, showTick: false, text: 'Test Task running' },
  { animationData: loaderAnimation, showTick: false, text: 'Test Task running' },
];

const Loader = () => {
  const [loaderIndex, setLoaderIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaderIndex < loaders.length) {
        loaders[loaderIndex].showTick = true;
        loaders[loaderIndex].text = 'Successful';
        setLoaderIndex(loaderIndex + 1);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [loaderIndex]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1E2A3A', color: 'white' }}>
      <div style={{ flex: 1, backgroundColor: '#1E2A3A' }}></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {loaders.map((loader, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '10px', flexGrow: '1' }}>
              <div style={{ width: '50px', height: '50px', marginRight: '10px' }}>
                {loader.showTick ? (
                  <Lottie
                    options={{
                      animationData: tickAnimation,
                      loop: false,
                    }}
                  />
                ) : (
                  <Lottie
                    options={{
                      animationData: loader.animationData,
                      loop: true,
                    }}
                  />
                )}
              </div>
              <div>{loader.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, backgroundColor: '#1E2A3A' }}></div>
      <div style={{ flex: 1, backgroundColor: '#1E2A3A' }}></div>
    </div>
  );
};

export default Loader;
