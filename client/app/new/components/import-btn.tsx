'use client';

import { FC, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface ImportBtnProps {
  url: string;
  repository_name: string;
  userId: string;
  testing_dir: string;
}

const ImportBtn: FC<ImportBtnProps> = ({
  url,
  repository_name,
  userId,
  testing_dir,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleOnClick() {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/project', {
        url,
        repository_name,
        userId,
        testing_dir,
      });

      if (response.data.success) {
        toast.success('Project imported successfully');
      } else {
        toast.error('Project already exists');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return toast.error('Something went wrong');
        }

        return toast.error(error.response?.data);
      }
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      size='sm'
      className='flex gap-2'
      disabled={isLoading}
      onClick={handleOnClick}
    >
      {isLoading ? (
        <Loader2 className='size-6 animate-spin text-zinc-500' />
      ) : (
        'Import'
      )}
    </Button>
  );
};

export default ImportBtn;
