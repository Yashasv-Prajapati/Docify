import { FC } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Package2Icon } from 'lucide-react';

import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Avatar from '@/app/dashboard/_components/avatar';
import Nav from '@/app/dashboard/_components/nav';

import DownloadBtn from '../_components/download-btn';

interface PageProps {
  params: { projectId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page: FC<PageProps> = async ({ params, searchParams }) => {
  const project = await db.project.findUnique({
    where: { projectId: params.projectId },
  });

  const imageUrl = 'https://generated.vusercontent.net/placeholder.svg';

  if (!project) {
    notFound();
  }

  return (
    <div className='flex h-screen flex-col'>
      <Nav AvatarComponent={<Avatar />} />
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
        <div className='mx-auto grid w-full max-w-6xl gap-2'>
          <h1 className='text-3xl font-semibold'>Projects</h1>
        </div>
        <div className='flex flex-col'>
          <div className='mx-auto grid w-full max-w-6xl gap-6'>
            <header className='flex h-14 items-center gap-4 border-b px-4 dark:border-gray-800 lg:h-[60px]'>
              <Button
                className='size-8 rounded-full'
                size='icon'
                variant='ghost'
              >
                <Package2Icon className='size-6' />
                <span className='sr-only'>Home</span>
              </Button>
              <h1 className='text-lg font-semibold lg:text-2xl'>UML Diagram</h1>
            </header>
          </div>
          <main className='flex-1 overflow-auto p-4'>
            <div className='flex justify-center'>
              <div className='grid w-full max-w-6xl gap-4'>
                <div className='relative aspect-video overflow-hidden rounded-lg'>
                  <Image
                    alt='Image'
                    className='object-cover'
                    height='1080'
                    src={imageUrl}
                    style={{
                      aspectRatio: '1920/1080',
                      objectFit: 'cover',
                    }}
                    width='1920'
                  />
                </div>
                <Card>
                  <CardContent className='p-4'>
                    <div className='grid gap-4'>
                      <DownloadBtn imageUrl={imageUrl} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default Page;
