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
<<<<<<< HEAD
    <Wrapper className='mx-auto'>
      <div className='m-5 mx-auto '>
        <Card className='mx-auto w-5/6 border-2 border-[#6785f2] '>
          <CardHeader>
            <CardTitle>Import Github Repository</CardTitle>
            <CardDescription>
              Import your repositories to start using docify
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row p-2 mb-4'>
            <svg
              className='me-2 mr-4 size-6'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                clipRule='evenodd'
              />
            </svg>
            <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold '>
              {userName}
            </code>
            </div>
            <form>
              <div className='grid w-1/2 items-center gap-4'>
                <div className='space-y-1.5'>
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
                            <p className='text-sm text-muted-foreground'>
                              {repo.clone_url}
                            </p>
=======
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
>>>>>>> upstream/main
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
  );
};

export default SearchableProjects;
