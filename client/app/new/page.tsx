// Page for new Project

import { URLSearchParams } from 'url';
import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import getCurrentUser from '@/lib/curr';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Wrapper from '@/components/wrapper';


const GITHUB_API_BASE_URL = 'https://api.github.com';

async function refresh_access_token(
  refresh_token: string | undefined,
  github_username: string | undefined
) {
  try {
    const uri = 'https://github.com/login/oauth/access_token';

    const response = await axios.post(uri, {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    });

    const parsed_data = new URLSearchParams(response.data);
    const new_access_token = parsed_data.get('access_token');
    const new_refresh_token = parsed_data.get('refresh_token');
    const expiry_time_in_seconds = Number(parsed_data.get('expires_in'));

    if (!new_access_token || !new_refresh_token || !expiry_time_in_seconds) {
      return undefined;
    }

    const expiry_time_in_milliseconds = expiry_time_in_seconds * 1000;
    const epoch_time = new Date().getTime() + expiry_time_in_milliseconds;
    const expiry_date_time = new Date(epoch_time);

    await db.user.update({
      where: {
        github_username: github_username,
      },
      data: {
        github_access_token: new_access_token,
        github_refresh_token: new_refresh_token,
        github_access_token_expiry: expiry_date_time,
      },
    });
    return new_access_token;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function get_repositories() {
  try {
    const curr = await getCurrentUser();
    if (!curr) {
      console.log("NO toekn")
      return [];
    }

    let github_access_token = curr.github_access_token;
    const github_expiry_date_time = curr.github_access_token_expiry;

    if (github_expiry_date_time >= new Date()) {
      // if access token is expired
      github_access_token = (await refresh_access_token(
        curr.github_refresh_token,
        curr.github_username
      )) as string;
      if (!github_access_token) {
        console.log("NO toekn")
        return [];
      }
    }

    const requestOptions = {
      headers: {
        Authorization: `token ${github_access_token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Your-App',
        'X-GitHub-Installation-Id': curr.github_installation_id,
      },
      params:{
        type: 'owner'
      }
    };

    const uri = `${GITHUB_API_BASE_URL}/user/repos`;
    const response: AxiosResponse = await axios.get(uri, requestOptions);

    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function Page() {
  // const user = getCurrentUser();
  const github_access_token = process.env.GITHUB_ACCESS_TOKEN;

  const data = await get_repositories();


  return (
    <div className='overflow-hidden bg-[#1b222f]'>
      <Navbar />
      <Wrapper>
        {/* <div>Import Github Repository</div> */}
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
                    <Label htmlFor='email'>Github Username</Label>
                    <Input
                      className='bg-[#1b222f]'
                      type='email'
                      id='email'
                      placeholder={'username'}
                    />
                  </div>
                </div>
              </form>

              <div>
                {data && data.length > 0
                  ? data.map(
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
                              <p className='text-muted-foreground text-sm'>
                                {repo.clone_url}
                              </p>
                            </div>
                            <div className=''>
                              <Button
                                variant='outline'
                                className=' bg-[#1b222f] text-white'
                              >
                                Import
                              </Button>
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
  );
}
