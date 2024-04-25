'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {MoreHorizontalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface ProjectCardProps {
  url: string;
  repository_name: string;
  testing_dir: string;
  project_id: string;
  project_type: string;
  access_token: string;
  username: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  url,
  repository_name,
  testing_dir,
  project_id,
  project_type,
  access_token,
  username,
}) => {
  const router = useRouter();

  const handleUmlClick = async () => {
    console.log('UML Clicked');

    const res = await fetch('/api/uml/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: access_token,
        userName: username,
        repoName: repository_name,
        projectType: project_type,
        projectId: project_id,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  const handleTestPlanClick = async () => {
    console.log('Test Plan Clicked');

    const res = await fetch('/api/test_plan/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_id: project_id,
        project_description: `This is a ${project_type} project.`,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className='relative flex flex-col bg-white p-2 text-sm lg:flex-row dark:bg-gray-950'>
      <div className='grid flex-1 gap-1 p-2'>
        <div className='font-medium'>{repository_name}</div>
      </div>
      <Separator className='my-2 lg:hidden' />
      <div className='grid flex-1 gap-1 p-2'>
        <div className=' my-2 flex items-start gap-2'>
        <svg width="24" height="24" viewBox="0 0 24 24" 
        fill="none" stroke="currentColor" strokeWidth="2" 
        strokeLinecap="round" strokeLinejoin="round" 
        className="lucide lucide-github">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <Link href={url} className='hover:underline'>Github</Link>
        </div>
      </div>
      <Separator className='my-2 lg:hidden' />
      <div className='grid flex-1 gap-1 p-2'>
        <div className='flex items-center gap-2'>
          
          Project type
        </div>
        <div className='flex items-center gap-2'>
        <span
            className={`inline-flex size-3 translate-y-1 rounded-full bg-green-400`}
          />
          {project_type}
        </div>
      </div>
      <Separator className='my-2 lg:hidden' />
      <div className='grid flex-1 gap-1 p-2'>
        <div className='flex items-center gap-2'>
          
         Testing Directory
        </div>
        <div className='flex items-center gap-2'>
        <span
            className={`inline-flex size-3 translate-y-1 rounded-full bg-green-400`}
          />
          {testing_dir}
        </div>
      </div>
      <Separator className='my-2 lg:hidden' />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className='absolute right-4 top-4'
            size='icon'
            variant='ghost'
          >
            <MoreHorizontalIcon className='size-4' />
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <button
              onClick={() => {
                router.push(`/generate_readme/${project_id}`);
              }}
            >
              Generate Readme
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem><button onClick={handleTestPlanClick}>Test Plan</button></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button onClick={handleUmlClick}>UML Diagram</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProjectCard;
