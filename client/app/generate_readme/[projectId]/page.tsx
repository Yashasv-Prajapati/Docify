
import { FC } from 'react';
import { db } from '@/lib/db';
import Avatar from '@/app/dashboard/_components/avatar';
import Nav from '@/app/dashboard/_components/nav';
import GenerateReadmeForm from "../_components/GenerateReadmeForm";
interface Project {
  projectId: string;
  url: string;
  repository_name: string;
  userId: string;
  testing_dir: string;
  project_type: string;
}  
interface PageProps {
  params: { projectId: string };
}
const Page: FC<PageProps>  = async ({params}) => {
  const project = await db.project.findUnique({
    where: { projectId: params.projectId },
  });
  const AvatarComponent = <Avatar />;
  return (
    <div key='1' className='flex h-screen flex-col'>
    <Nav AvatarComponent={AvatarComponent} />
    <GenerateReadmeForm project={project as Project}/>
  </div>
  )
}

export default Page;
