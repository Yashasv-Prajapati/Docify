import getCurrentUser from '@/lib/curr';
import { db } from '@/lib/db';
import Avatar from '@/app/dashboard/_components/avatar';
import Nav from '@/app/dashboard/_components/nav';

import ImportedProjects from './_components/ImportedProjects';

const Page = async () => {
  const user = await getCurrentUser();

  const projects = await db.$transaction(async(db)=>{
    return await db.project.findMany({
      where: {
        userId: user!.id,
      },
    });
  })

  const AvatarComponent = <Avatar />;

  return (
    <div key='1' className='flex h-screen flex-col'>
      <Nav AvatarComponent={AvatarComponent} />

      <ImportedProjects imported_projects={projects} />
    </div>
  );
};

export default Page;
