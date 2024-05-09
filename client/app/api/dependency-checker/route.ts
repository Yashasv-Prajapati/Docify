import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { update_project_branch } from '@/actions/project';
import Dockerode from 'dockerode';
import { z } from 'zod';

import getCurrentUser from '@/lib/curr';
import { DependencyCheckerSchema } from '@/lib/validations/dependency-checker';

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
  const branch_name = process.env.NEXT_PUBLIC_BRANCH_NAME + '-' + Date.now();

  try {
    const { project_type, repositoryName, projectId } =
      DependencyCheckerSchema.parse(data);

    const containerImage =
      project_type === 'python' ? 'docify_python:latest' : 'docify_java:latest';

    const binds =
      project_type === 'python'
        ? [parentDir + '/python/dependency-checker:/app']
        : [parentDir + '/java/dependency-checker:/app'];
    const commands =
      project_type === 'python'
        ? [
            'sh',
            '-c',
            `tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < dependency-checker.sh > dep.sh && chmod +x d.sh c.sh dep.sh && ./d.sh ${github_access_token} ${github_username} ${repositoryName} ${branch_name} && ./dep.sh ${repositoryName} && ./c.sh ${github_username} ${repositoryName} ${github_access_token} ${process.env.GITHUB_APP_ID} ${branch_name}`,
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
    await container.start();
    console.log('Container started successfully');

    await new Promise((resolve, reject) => {
      container.wait((error, data) => {
        if (error) {
          console.error('Error waiting for container: ', error);
          reject(error);
        } else {
          console.log('Container stopped: ', data);

          if (data.StatusCode !== 0) {
            console.error('Container exited with non-zero exit code');
            reject(new Error('Container execution failed'));
          } else {
            // update the corresponding branch name in the db for dependency checker
            update_project_branch(projectId, branch_name, 'dependency_checker');
            resolve(data);
          }
        }
      });
    });

    return NextResponse.json({ message: 'Success!' }, { status: 200 });
  } catch (error) {
    console.log(error);
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
