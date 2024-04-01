'use client';

import React, { Fragment, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImportProject from '@/components/modal/ImportProject';
import Navbar from '@/components/Navbar';
import Wrapper from '@/components/wrapper';

import ImportBtn from './import-btn';

type SearchableProjectsParams = {
  data: any;
  userId: string;
  userName: string;
};
const SearchableProjects: React.FC<SearchableProjectsParams> = ({
  data,
  userId,
  userName,
}) => {
  const [searchText, setSearchText] = useState('' as string);
  const [visibleModalId, setVisibleModalId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState(data as any[]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    filterProjects(e.target.value);
    // console.log(e.target.value);
  };

  const filterProjects = (searchText: string) => {
    const filteredProjects = data.filter((project: any) => {
      return project.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setSearchResults(filteredProjects);
  };

  const toggleModal = (modalId: string) => {
    setVisibleModalId(modalId === visibleModalId ? null : modalId);
  };

  return (
    <div className='bg-[#1b222f]'>
      <Fragment>
        <Navbar />
        <Wrapper>
          <div className='m-5 min-h-screen'>
            <Card className='w-5/6 '>
              <CardHeader>
                <CardTitle>Import Github Repository</CardTitle>
                <CardDescription>
                  Import your repositories to start using docify
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className='grid w-1/2 items-center gap-4'>
                    <div className='space-y-1.5'>
                      <Label htmlFor='email'>{userName}</Label>
                      <Input
                        className=''
                        type='email'
                        id='email'
                        placeholder={'Search Your Projects...'}
                        value={searchText}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </form>

                <div>
                  {searchResults && searchResults.length > 0
                    ? searchResults.map(
                        (
                          repo: { name: string; clone_url: string; id: string },
                          index: number
                        ) => (
                          <div
                            key={repo.id}
                            className='m-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
                          >
                            <span className='flex size-2 translate-y-1 rounded-full bg-green-400' />
                            <div className='flex flex-row items-center'>
                              <div className='w-3/4 space-y-2'>
                                <p className='text-m font-medium leading-none'>
                                  {repo.name}
                                </p>
                                <p className='text-muted-foreground text-sm'>
                                  {repo.clone_url}
                                </p>
                              </div>
                              <div className=''>
                                <ImportBtn
                                  toggleModal={() => toggleModal(repo.id)}
                                />
                              </div>
                              <ImportProject
                                url={repo.clone_url}
                                repository_name={repo.name}
                                userId={userId}
                                testing_dir={'/'} // TODO: add testing dir
                                isVisible={visibleModalId === repo.id}
                                onClose={() => toggleModal(repo.id)}
                              />
                            </div>
                          </div>
                        )
                      )
                    : null}
                </div>
              </CardContent>
            </Card>
          </div>
        </Wrapper>
      </Fragment>
    </div>
  );
};

export default SearchableProjects;
