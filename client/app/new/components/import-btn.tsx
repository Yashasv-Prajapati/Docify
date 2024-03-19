'use client';

import { FC, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface ImportBtnProps {
  toggleModal: () => void; // Add toggleModal prop
}

const ImportBtn: FC<ImportBtnProps> = ({
  toggleModal,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Button
      size='sm'
      className='flex gap-2'
      disabled={isLoading}
      onClick={()=> {toggleModal()}}
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
