'use client';

import Lottie from 'lottie-react';

import BlueanimationData from '../../../public/Animation - 1711299754830.json';

export default function AnimationContainer() {
  return (
    <div className='m-auto w-1/2 border-l-2'>
      <Lottie
        animationData={BlueanimationData}
        className='mx-auto  size-[300px] object-contain  xl:size-[500px]'
      />
    </div>
  );
}
