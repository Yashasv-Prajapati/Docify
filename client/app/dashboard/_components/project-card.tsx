'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { MoreHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleUmlClick() {
    console.log('UML Clicked');

    setIsLoading(true);

    const promise = () =>
      axios
        .post('/api/uml/generate', {
          accessToken: access_token,
          userName: username,
          repoName: repository_name,
          projectType: project_type,
          projectId: project_id,
        })
        .then((res) => {
          if (res.status === 200) {
            router.push(`/uml/${project_id}`);
          }
        })
        .finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: 'Generating UML diagram...',
      success: 'UML diagram generated successfully',
      error: 'Failed to generate UML diagram',
    });
  }

  async function handleTestPlanClick() {
    console.log('Test Plan Clicked');

    setIsLoading(true);

    const promise = () =>
      axios
        .post('/api/test_plan/generate', {
          project_id: project_id,
          project_description: `This is a ${project_type} project.`,
        })
        .then((res) => {
          console.log(res.data);
        })
        .finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: 'Generating test plan...',
      success: 'Test plan generated successfully',
      error: 'Failed to generate test plan',
    });
  }

  async function handleDependencyClick() {
    console.log('Dependency Checker Clicked');

    setIsLoading(true);

    const promise = () =>
      axios
        .post('/api/dependency-checker', {
          repositoryName: repository_name,
          project_type: project_type,
          projectId: project_id,
        })
        .then(() => router.push(`/dependency_checker/${project_id}`))
        .finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: 'Running dependency checker...',
      success: 'Dependency checker ran successfully',
      error: 'Error',
    });
  }

  async function handleCodeCoverageClick() {
    console.log('Code Coverage Clicked');

    setIsLoading(true);

    const promise = () =>
      axios
        .post('/api/code-coverage', {
          github_access_token: access_token,
          github_username: username,
          github_repo_name: repository_name,
          language: project_type,
          projectId: project_id,
        })
        .then((res) => {
          if (res.status === 200) {
            router.push(`/code_coverage/${project_id}`);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });

    toast.promise(promise, {
      loading: 'Generating code coverage report...',
      success: 'Code coverage report generated successfully',
      error: 'Failed to generate code coverage report',
    });
  }

  return (
    <div className='relative flex flex-col bg-white p-2 text-sm dark:bg-gray-950 lg:flex-row'>
      <div className='grid flex-1 gap-1 p-2'>
        <div className='font-medium'>{repository_name}</div>
      </div>
      <Separator className='my-2 lg:hidden' />
      <div className='grid flex-1 gap-1 p-2'>
        <div className=' my-2 flex items-start gap-2'>
          <LogoGithub />
          <Link href={url} className='hover:underline'>
            Github
          </Link>
        </div>
      </div>
      <Separator className='my-2 lg:hidden' />
      <div className='grid flex-1 gap-1 p-2'>
        <div className='flex items-center gap-2 font-semibold'>
          Project type
        </div>
        <div className='flex items-center gap-2'>{project_type}</div>
      </div>
      <Separator className='my-2 lg:hidden' />
      <div className='grid flex-1 gap-1 p-2'>
        <div className='flex items-center gap-2 font-semibold'>
          Testing Directory
        </div>
        <div className='flex items-center gap-2'>{testing_dir}</div>
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
          <DropdownMenuItem disabled={isLoading}>
            <Link href={`/generate_readme/${project_id}`}>Generate Readme</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isLoading} onClick={handleTestPlanClick}>
            Test Plan
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={isLoading} onClick={handleUmlClick}>
            UML Diagram
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={handleDependencyClick}
          >
            Dependency Checker
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoading}
            onClick={handleCodeCoverageClick}
          >
            Code Coverage
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

function LogoGithub(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      data-testid='geist-icon'
      height={16}
      strokeLinejoin='round'
      viewBox='0 0 16 16'
      width={16}
      style={{ color: 'currentcolor' }}
    >
      <g clipPath='url(#clip0_872_3147)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_872_3147'>
          <rect width={16} height={16} fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ProjectCard;
