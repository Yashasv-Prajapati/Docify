'use client';

import { FC, useState } from 'react';
import axios from 'axios';
import { DownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface DownloadBtnProps {
  imageUrl: string;
}

const DownloadBtn: FC<DownloadBtnProps> = ({ imageUrl }) => {
  const [loading, setLoading] = useState<boolean>(false);
  function downloadImage() {
    setLoading(true);
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
      }).finally(()=>{
        setLoading(false);
      });
  }

  return (
    <Button size='sm' className='flex gap-2' onClick={downloadImage} disabled={loading}>
      <DownloadIcon className='size-4' />
      <span>Download</span>
    </Button>
  );
};

export default DownloadBtn;
