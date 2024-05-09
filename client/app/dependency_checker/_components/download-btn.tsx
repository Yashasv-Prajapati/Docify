'use client';

import { FC } from 'react';
import axios from 'axios';
import { DownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface DownloadBtnProps {
  project_dependencies: string;
}

const DownloadBtn: FC<DownloadBtnProps> = ({ project_dependencies }) => {
  async function downloadImage() {
    const wrappedString = `${project_dependencies}`;
    const blob = new Blob([wrappedString], { type: 'text/plain' });
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = 'requirements.txt'; // Set the filename for the downloaded file
    link.click();
    URL.revokeObjectURL(blobURL);
  }

  return (
    <Button size='sm' className='flex gap-2' onClick={downloadImage}>
      <DownloadIcon className='size-4' />
      <span>Download</span>
    </Button>
  );
};

export default DownloadBtn;
