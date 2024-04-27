import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import Dockerode from 'dockerode';
import { z } from 'zod';
import getCurrentUser from '@/lib/curr';
import { DependencyCheckerSchema } from '@/lib/validations/dependency-checker';
import { update_project_branch } from '@/actions/project';

const parentDir = path.resolve(__dirname, '..', '..', '..', '..', '..', '..');

// POST method route handler to perform dependency checker action based on project project_type
// JSON payload {
//  project_type: 'java' | 'python', (project language)
//  repositoryName: 'string', (project name)
// }
export async function POST(request: NextRequest) {
  const data = await request.json();
  const dockerode = new Dockerode();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { github_access_token, github_username } = currentUser;

  try {
    const { project_type, repositoryName, projectId } =
      DependencyCheckerSchema.parse(data);

    const containerImage =
      project_type === 'python' ? 'docify_python:latest' : 'docify_java:latest';

    const branch_name = process.env.BRANCH_NAME + '-' + Date.now();

    const binds =
      project_type === 'python'
        ? [parentDir + '/python/dependency-checker:/app']
        : [parentDir + '/java/dependency-checker:/app'];
    const commands =
      project_type === 'python'
        ? [
            'sh',
            '-c',
            `tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < dependency-checker.sh > dep.sh && chmod +x d.sh c.sh dep.sh && ./d.sh ${github_access_token} ${github_username} ${repositoryName} ${branch_name} && ./dep.sh ${repositoryName} && ./c.sh ${github_username} ${repositoryName} ${github_access_token} ${process.env.GITHUB_APP_ID} `,
          ]
        : [
            'sh',
            '-c',
            `tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < dependency-checker.sh > dep.sh && chmod +x d.sh c.sh dep.sh && ./d.sh ${github_access_token} ${github_username} ${repositoryName} ${branch_name} && ./dep.sh ${repositoryName} && ./c.sh ${github_username} ${repositoryName} ${github_access_token} ${process.env.GITHUB_APP_ID} `,
          ];

    const containerOptions = {
      Image: containerImage,
      Tty: true,
      HostConfig: {
        AutoRemove: true,
        Binds: binds,
      },
      CMD: commands,
    };

    const container = await dockerode.createContainer(containerOptions);
    await container.start((err, _)=>{
      if(err){
        console.error('Failed to start container:', err);
        return NextResponse.json(
          { message: 'Failed to start container' },
          { status: 500 }
        );
      }
    });
    console.log('Container started successfully');

    container.wait(async (err, data)=>{
      if(err){
        console.error('Failed to wait for container:', err);
        return NextResponse.json(
          { message: 'Failed to wait for container' },
          { status: 500 }
        );
      }
      // update the corresponding branch name in the db for dependency checker
      await update_project_branch(projectId, branch_name, 'dependency_checker');
      return;
    });
    console.log('Container stopped');

    return NextResponse.json({ message: 'Success!' }, { status: 200 });
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: JSON.stringify(error.issues) },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
