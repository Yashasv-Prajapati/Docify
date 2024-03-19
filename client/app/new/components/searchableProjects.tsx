'use client';
import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import Navbar from '@/components/Navbar';
  import Wrapper from '@/components/wrapper';
  import ImportBtn from './import-btn';

  type SearchableProjectsParams = {
    data: any;
    userId: string;
    userName: string;
    }
const SearchableProjects:React.FC<SearchableProjectsParams> = ({ data , userId, userName}) =>{

      const [searchText, setSearchText] = useState('' as string);
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
      
    return (
      
        <div className='overflow-x-hidden bg-[#1b222f]'>
        {/* <Navbar /> */}
        <Wrapper>
          <div className='m-5'>
            <Card className='w-5/6 bg-[#1b222f] text-white'>
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
                        className='bg-[#1b222f]'
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
                            <span className='flex size-2 translate-y-1 rounded-full bg-sky-500' />
                            <div className='flex flex-row items-center'>
                              <div className='w-3/4 space-y-2'>
                                <p className='text-m font-medium leading-none'>
                                  {repo.name}
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                  {repo.clone_url}
                                </p>
                              </div>
                              <div className=''>
                                <ImportBtn
                                  url={repo.clone_url}
                                  repository_name={repo.name}
                                  userId={userId}
                                  testing_dir={'/'} // TODO: add testing dir
                                />
                              </div>
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
      </div>
      
    )
};

export default SearchableProjects;