'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { Button } from '../../../components/ui/button';

type SearchParams = {
  data: any;
  onfilteredData: any;
};

const Search: FC<SearchParams> = ({ data, onfilteredData }) => {
  const [search, setSearch] = useState('' as string);
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    filterData(e.target.value);
  };

  const filterData = (search: string) => {
    const filteredData = data.filter((project: any) => {
      return project.repository_name
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    onfilteredData(filteredData);
  };
  return (
    <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4'>
      <Input
        className='bg-white dark:bg-gray-950 md:flex-1'
        placeholder='Search projects...'
        type='search'
        value={search}
        onChange={handleSearch}
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
};

export default Search;
