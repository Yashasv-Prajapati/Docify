import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
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
    return NextResponse.json({message:'Unauthorized'}, { status: 401 });
  }

  const { github_access_token, github_username } = currentUser;

  try {
    const { project_type, repositoryName } = DependencyCheckerSchema.parse(data);
    console.log(github_access_token, github_username, project_type, repositoryName);
    const containerImage =
      project_type === 'python'
        ? 'dependency-checker-python:latest'
        : 'dependency-checker-java:latest';
    const binds =
      project_type === 'python'
        ? [parentDir + '/python/dependency-checker:/app']
        : [parentDir + '/java/dependency-checker:/app'];
    const commands =
      project_type === 'python'
        ? [
            'sh',
            '-c',
            `./download.sh ${github_access_token} ${github_username} ${repositoryName} && ./dependency-checker.sh ${repositoryName} && ./commit.sh ${github_username} ${repositoryName} ${github_access_token}`,
          ]
        : [];

    const containerOptions = {
      Image: containerImage,
      Tty: true,
      HostConfig: {
        AutoRemove: true,
        Binds: binds,
      },
      CMD: commands,
    };

    dockerode.createContainer(containerOptions, (error, container) => {
      if (error) {
        console.log('Failed to create container', error);

        return new NextResponse('Failed to create container', { status: 500 });
      }

      container?.start((error) => {
        if (error) {
          console.log('Failed to create container', error);

          return new NextResponse('Failed to create container', {
            status: 500,
          });
        }
      });
    });

    console.log('Container started successfully');

    // return new NextResponse('Success!', { status: 200 });
    return NextResponse.json({message:"Success!"}, {status: 200});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
