'use client';

import { FC } from 'react';
import axios from 'axios';
import { DownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface DownloadBtnProps {
  imageUrl: string;
}

const DownloadBtn: FC<DownloadBtnProps> = ({ imageUrl }) => {
  function downloadImage() {
    return axios
      .get(imageUrl, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(response.data);

        const a = document.createElement('a');
        a.href = url;

        const fileName = imageUrl.split('/').pop() || 'image.jpg';
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }

  return (
    <Button size='sm' className='flex gap-2' onClick={downloadImage}>
      <DownloadIcon className='size-4' />
      <span>Download</span>
    </Button>
  );
};

export default DownloadBtn;
