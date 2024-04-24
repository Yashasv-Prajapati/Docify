import { FC } from 'react';
import { notFound } from 'next/navigation';
import axios from 'axios';
import { Package2Icon } from 'lucide-react';

import getCurrentUser from '@/lib/curr';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Avatar from '@/app/dashboard/_components/avatar';
import Nav from '@/app/dashboard/_components/nav';

import DownloadBtn from '../_components/download-btn';
import UML from '../_components/UML';

interface PageProps {
  params: { projectId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const fetchUML = async (user: any, project: any): Promise<string> => {
  try {
    const username = user?.github_username;
    const repoName = project?.repository_name;
    const accessToken = user?.github_access_token;
    //****Need to bypass middleware in order to send the request */
    const response = await axios.get(
      `http://localhost:3000/api/uml/fetchUML?username=${username}&repoName=${repoName}&accessToken=${accessToken}`
      // {
      //   responseType: 'blob', // Ensure the response is treated as a blob
      // }
      // {withCredentials: true}
    );
    return response?.data?.data?.download_url;
  } catch (error) {
    console.error('Error Showing UML:', error);
    return '';
  }
};
const Page: FC<PageProps> = async ({ params, searchParams }) => {
  const project = await db.project.findUnique({
    where: { projectId: params.projectId },
  });
  const user = await getCurrentUser();
  // const imageUrl = 'https://generated.vusercontent.net/placeholder.svg';
  const img_url = await fetchUML(user, project);

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
                  <UML imageUrl={img_url as string} />
                </div>
                <Card>
                  <CardContent className='p-4'>
                    <div className='grid gap-4'>
                      <DownloadBtn imageUrl={img_url as string} />
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
