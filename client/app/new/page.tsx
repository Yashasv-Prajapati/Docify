// Page for new Project

import React from 'react';

import Wrapper from '@/components/wrapper';
import Navbar from '@/components/Navbar';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function Page() {
  const username = 'Yashasv-Prajapati';
  const GITHUB_API_BASE_URL = 'https://api.github.com';

  const uri = `${GITHUB_API_BASE_URL}/users/${username}/repos`;

  const response = await fetch(uri, {
    method: 'get',
  });
  const data = await response.json();

  return (
    <div className="bg-[#1b222f] overflow-hidden">
      <Navbar />
      <Wrapper>


        {/* <div>Import Github Repository</div> */}
        <div className='m-5' >
          <Card className="w-5/6 bg-[#1b222f] text-white">
            <CardHeader>
              <CardTitle>Import Github Repository</CardTitle>
              <CardDescription>Import your repositories to start using docify</CardDescription>
            </CardHeader>
            <CardContent>

              <form >
                <div className="grid w-1/2 items-center gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Github Username</Label>
                    <Input className='bg-[#1b222f]' type="email" id="email" placeholder={username} />
                  </div>
                </div>
              </form>

              <div>
                {data.map((repo: { name: string, clone_url: string }, index: number) => (
                  <div
                    key={index}
                    className="m-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className='flex flex-row items-center'>
                      <div className="space-y-2 w-3/4">
                        <p className="text-m font-medium leading-none">
                          {repo.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {repo.clone_url}
                        </p>


                      </div>
                      <div className=''>
                        <Button variant="outline" className=' bg-[#1b222f] text-white'>Import</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>
        </div>


      </Wrapper>
    </div>
  );
}
