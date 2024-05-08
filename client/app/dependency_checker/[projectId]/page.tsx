import { FC } from 'react';
import axios from 'axios';

import getCurrentUser from '@/lib/curr';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Wrapper from '@/components/wrapper';
import Avatar from '@/app/dashboard/_components/avatar';
import Nav from '@/app/dashboard/_components/nav';

import DownloadBtn from '../_components/download-btn';

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

const Page: FC<PageProps> = async ({ params }) => {
  const project = await db.project.findUnique({
    where: { projectId: params.projectId },
  });
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const { github_access_token, github_username } = currentUser;
  const AvatarComponent = <Avatar />;
  const apiUrl = `https://api.github.com/repos/${github_username}/${project?.repository_name}/contents/.docify-assets/requirements.txt?ref=${project?.dependency_latest_branch}`;

  let project_dependencies = '',
    error = false;
  const currentFile = await axios
    .get(apiUrl, {
      headers: {
        Authorization: `token ${github_access_token}`,
      },
    })
    .then((response) => {
      project_dependencies = Buffer.from(
        response.data.content,
        'base64'
      ).toString('utf-8');
    })
    .catch(() => (error = true));

  return (
    <div key='1' className='flex h-screen flex-col'>
      <Nav AvatarComponent={AvatarComponent} />
      <Wrapper className='mx-auto'>
        <div className='m-5 mx-auto '>
          <Card className='mx-auto w-5/6 '>
            <CardHeader>
              <CardTitle>
                {error
                  ? 'Something went wrong! Sorry this sucks 😔'
                  : 'Dependencies:'}
              </CardTitle>
            </CardHeader>
            {!error && (
              <CardContent>
                <div className='whitespace-pre-wrap break-all'>
                  {project_dependencies}
                </div>
                <div className='flex w-min flex-col'>
                  <DownloadBtn project_dependencies={project_dependencies} />
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </Wrapper>
    </div>
  );
};

export default Page;
