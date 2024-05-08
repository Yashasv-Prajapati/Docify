import { redirect } from 'next/navigation';
import axios from 'axios';
import { Table } from 'lucide-react';
import { toast } from 'sonner';

import getCurrentUser from '@/lib/curr';
import { db } from '@/lib/db';
import { CodeCoverageSchema } from '@/lib/validations/code_coverage';
import Nav from '@/components/nav';

import ShowCoverageTable from '../_components/ShowCoverageTable';

interface CodeCoveragePageProps {
  params: { projectId: string };
}

export default async function Page({ params }: CodeCoveragePageProps) {
  const curr_user = await getCurrentUser();
  if (!curr_user) {
    return redirect('/auth/signup');
  }

  const github_access_token = curr_user.github_access_token;
  const github_username = curr_user.github_username;

  const project = await db.project.findUnique({
    where: { projectId: params.projectId },
    select: {
      repository_name: true,
      coverage_latest_branch: true,
      project_type: true,
    },
  });
  if (!project) {
    toast.error('Project not found');
    return redirect('/dashboard');
  }

  const branch_name = project.coverage_latest_branch;
  const repositoryName = project.repository_name;
  let flag = false;

  await axios
    .head(
      `https://api.github.com/repos/${github_username}/${repositoryName}/contents/.docify-assets/COVERAGE.md?ref=${branch_name}`,
      {
        headers: {
          Authorization: `token ${github_access_token}`,
        },
      }
    )
    .catch(async (err) => {
      console.log('COVERAGE.md file does not exist');
      // If head request fails, COVERAGE.md file does not exist and we need to call /api/code_coverage
      // Or maybe the docify branch itself does not exist
      flag = true;

      return redirect('/dashboard');
    });

  if (flag) {
    await axios.post(
      '/api/code_coverage',
      CodeCoverageSchema.parse({
        github_access_token,
        github_username,
        github_repo_name: repositoryName,
        project_type: project.project_type,
        projectId: params.projectId,
      })
    );
  }

  const response = await axios.get(
    `https://api.github.com/repos/${github_username}/${repositoryName}/contents/.docify-assets/COVERAGE.md?ref=${branch_name}`,
    {
      headers: {
        Authorization: `token ${github_access_token}`,
      },
    }
  );

  const htmlTable = Buffer.from(response.data.content, 'base64').toString(
    'utf-8'
  );

  // Project data
  const id = params.projectId;
  const repoUrl = 'https://github.com/example/repository';

  return (
    <div className='flex h-screen flex-col'>
      <Nav />
      <div className='flex flex-col items-center justify-center p-4'>
        <div className='mb-4'>
          <h1 className='text-center text-2xl font-bold'>
            Project Information
          </h1>
          <hr className='my-4' />
          <p className='text-gray-600'>Project ID: {id}</p>
          <p className='text-gray-600'>Repository URL: {repoUrl}</p>
          <hr className='my-4' />
        </div>
        <div>
          <h2 className='mb-2 flex items-center justify-center text-xl font-bold'>
            <Table size={24} className='mr-2' /> Code Coverage Table
          </h2>
          <ShowCoverageTable htmlTable={htmlTable} />
        </div>
      </div>
    </div>
  );
}
