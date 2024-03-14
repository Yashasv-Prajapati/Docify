import { FC } from 'react';

import { db } from '@/lib/db';
import { searchParamsSchema } from '@/lib/validations/params';
import Avatar from '@/app/dashboard/components/avatar';
import Nav from '@/app/dashboard/components/nav';
import ProjectCard from '@/app/dashboard/components/project-card';
import Search from '@/app/dashboard/components/search';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const { search } = searchParamsSchema.parse(searchParams);

  const projects = await db.project.findMany({
    where: {
      repository_name: {
        startsWith: search.trim(),
      },
    },
  });

  const AvatarComponent = <Avatar />;

  return (
    <div key='1' className='flex h-screen flex-col'>
      <Nav AvatarComponent={AvatarComponent} />
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
        <div className='mx-auto grid w-full max-w-6xl gap-2'>
          <h1 className='text-3xl font-semibold'>Projects</h1>
        </div>
        <div className='mx-auto grid w-full max-w-6xl gap-6'>
          <Search />
          <div className='grid gap-4 overflow-hidden rounded-lg border lg:gap-px lg:bg-gray-100'>
            {projects.map((project) => (
              <ProjectCard
                key={project.projectId}
                url={project.url}
                repository_name={project.repository_name}
                testing_dir={project.testing_dir}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
