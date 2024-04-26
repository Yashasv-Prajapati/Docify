import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import Dockerode from 'dockerode';
import { nanoid } from 'nanoid';
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

  try {
    const { project_type, repositoryName } =
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
            `tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < dependency-checker.sh > dep.sh && chmod +x d.sh c.sh dep.sh && ./d.sh ${github_access_token} ${github_username} ${repositoryName} && ./dep.sh ${repositoryName} && ./c.sh ${github_username} ${repositoryName} ${github_access_token} ${process.env.GITHUB_APP_ID} `,
          ]
        : [
            'sh',
            '-c',
            `tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < dependency-checker.sh > dep.sh && chmod +x d.sh c.sh dep.sh && ./d.sh ${github_access_token} ${github_username} ${repositoryName} && ./dep.sh ${repositoryName} && ./c.sh ${github_username} ${repositoryName} ${github_access_token} ${process.env.GITHUB_APP_ID} `,
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

    await container.wait();
    console.log('Container stopped');

    return NextResponse.json({ message: 'Success!' }, { status: 200 });
  } catch (error) {
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
