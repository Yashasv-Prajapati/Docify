'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDownIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { Button } from '../../../components/ui/button';

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4'>
      <Input
        className='bg-white dark:bg-gray-950 md:flex-1'
        placeholder='Search projects...'
        type='search'
        onChange={(e) => {
          const search = e.target.value;
          router.push(`${pathname}?search=${search}`);
        }}
      />
      <div className='flex items-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-white dark:bg-gray-950' variant='outline'>
              Add New...
              <ChevronDownIcon className='ml-2 size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuCheckboxItem checked>
              <Link href='/new'>Project</Link>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
