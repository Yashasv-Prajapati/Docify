'use client';

import { FC } from 'react';
import Image from 'next/image';

interface UMLProps {
  imageUrl: string;
}
const UML: FC<UMLProps> = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl && (
        <Image
          alt='Github Image'
          height='1080'
          src={imageUrl}
          style={{
            aspectRatio: '1920/1080',
          }}
          width='1920'
        />
      )}
    </div>
  );
};

export default UML;
