'use client';
import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import Nav from '@/components/nav';

// mock data
const projects = [
  {
    id: '1',
    name: 'Project 1',
    status: 'green',
    time: '2m 35s',
    branch: 'main',
    commit: 'fix: auth issues for third-party integration',
    date: '17m ago',
  },
  {
    id: '2',
    name: 'Project 2',
    status: 'green',
    time: '1m 23s',
    branch: 'max/logging',
    commit: 'feat: implement action logging',
    date: '32m ago',
  },
  {
    id: '3',
    name: 'Project 3',
    status: 'red',
    time: '4m 22s',
    branch: 'feat/history-sidebar',
    commit: 'feat: implement history sidebar',
    date: '1d ago',
  },
];
const handleUmlClick = async () => {
  console.log("UML Clicked");
  const res = await fetch('/api/uml/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({user:'pirocomder',repoName:'test2'}),
    body: JSON.stringify({ user: 'pirocomder', repoName: 'test2' }),
  });
  const data = await res.json();
  console.log(data);
}

export default function Component() {

  // const router = useRouter();


  return (
    <div key='1' className='flex h-screen flex-col'>
      <Nav />
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
        <div className='mx-auto grid w-full max-w-6xl gap-2'>
          <h1 className='text-3xl font-semibold'>Projects</h1>
        </div>
        <div className='mx-auto grid w-full max-w-6xl gap-6'>
          <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4'>
            <Input
              className='bg-white md:flex-1 dark:bg-gray-950'
              placeholder='Search projects...'
              type='search'
            />
            <div className='flex items-center gap-4'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className='flex-1 justify-start bg-white pl-3'
                    variant='outline'
                  >
                    <CalendarClockIcon className='mr-2 size-4 shrink-0' />
                    Select Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent align='end' className='w-auto p-0'>
                  <Calendar mode='range' numberOfMonths={2} />
                </PopoverContent>
              </Popover>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='bg-white dark:bg-gray-950'
                    variant='outline'
                  >
                    Add New...
                    <ChevronDownIcon className='ml-2 size-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuCheckboxItem checked>
                    Project
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='grid gap-4 overflow-hidden rounded-lg border lg:gap-px lg:bg-gray-100'>
            {projects.map((project) => (
              <div
                className='relative flex flex-col bg-white p-2 text-sm lg:flex-row dark:bg-gray-950'
                key={project.id}
              >
                <div className='grid flex-1 gap-1 p-2'>
                  <div className='font-medium'>{project.name}</div>
                </div>
                <Separator className='my-2 lg:hidden' />
                <div className='grid flex-1 gap-1 p-2'>
                  <div className='flex items-start gap-2'>
                    <span
                      className={`inline-flex size-3 translate-y-1 rounded-full bg-green-400`}
                    />
                    <div>
                      Ready
                      <div className='text-gray-500 dark:text-gray-400'>
                        2m 35s
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className='my-2 lg:hidden' />
                <div className='grid flex-1 gap-1 p-2'>
                  <div className='flex items-center gap-2'>
                    <GitBranchIcon className='size-4' />
                    {project.branch}
                  </div>
                  <div className='flex items-center gap-2'>
                    <GitCommitIcon className='size-4' />
                    <span className='line-clamp-1'>{project.commit}</span>
                  </div>
                </div>
                <Separator className='my-2 lg:hidden' />
                <div className='grid flex-1 gap-1 p-2'>
                  <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
                    {project.date}
                  </div>
                </div>
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
                    <DropdownMenuItem>Generate Readme</DropdownMenuItem>
                    <DropdownMenuItem>Test Plan</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button onClick={handleUmlClick}>UML Diagram</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function CalendarClockIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5' />
      <path d='M16 2v4' />
      <path d='M8 2v4' />
      <path d='M3 10h5' />
      <path d='M17.5 17.5 16 16.25V14' />
      <path d='M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z' />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m6 9 6 6 6-6' />
    </svg>
  );
}

function GitBranchIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='6' x2='6' y1='3' y2='15' />
      <circle cx='18' cy='6' r='3' />
      <circle cx='6' cy='18' r='3' />
      <path d='M18 9a9 9 0 0 1-9 9' />
    </svg>
  );
}

function GitCommitIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='3' />
      <line x1='3' x2='9' y1='12' y2='12' />
      <line x1='15' x2='21' y1='12' y2='12' />
    </svg>
  );
}

function MoreHorizontalIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='1' />
      <circle cx='19' cy='12' r='1' />
      <circle cx='5' cy='12' r='1' />
    </svg>
  );
}
