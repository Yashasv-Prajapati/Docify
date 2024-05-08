import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { update_project_branch } from '@/actions/project';
import Dockerode from 'dockerode';

import { UMLSchema } from '@/lib/validations/uml';

const parentDir = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  '..',
  '..'
); //now we are pointing to the repository root

export async function POST(req: NextRequest) {
  try {
    console.log('Request to generate UML');
    const branch_name = process.env.NEXT_PUBLIC_BRANCH_NAME + '-' + Date.now();

    console.log(parentDir);
    const docker = new Dockerode();
    console.log('Dockerode created');
    const data = await req.json();
    console.log(data);
    const {
      github_access_token: token,
      github_username: username,
      github_repo_name: repo,
      project_type: type,
      projectId: projectId,
      folderPath: folderPath,
    } = UMLSchema.parse(data);

    // const {
    //   accessToken: token,
    //   userName: username,
    //   repoName: repo,
    //   projectType: type,
    //   projectId: projectId,
    // } = data;
    // const folderPath = '/';
    const path = folderPath == '/' ? repo : repo + folderPath;
    let containerOptions;
    const binds =
      type == 'python'
        ? [parentDir + `/python/uml:/app`]
        : [parentDir + `/java/uml:/app`];

    if (type == 'python') {
      containerOptions = {
        Image: 'docify_python:latest',
        Tty: true,
        // Env: Object.entries(envVars).map(([key, value]) => `${key}=${value}`),
        HostConfig: {
          AutoRemove: true,
          Binds: [
            parentDir + `/python/uml:/app`,
            // parentDir + `/python/data:/app/send`,
          ],
        },
        // Cmd:[shellscript('pirocomder','test2')]
        // Cmd:['python','test.py'],
        // Cmd:['echo','Hello' ,'&&','tail','-f','/dev/null']
        Cmd: [
          'sh',
          '-c',
          // `tail -f /dev/null`,
          `tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < uml.sh > u.sh && chmod +x d.sh && chmod +x c.sh && chmod +x u.sh &&./d.sh ${token} ${username} ${repo} ${branch_name} && ./u.sh ${repo} && ./c.sh ${username} ${repo} ${token} ${process.env.GITHUB_APP_ID} `,
        ],
        //this is a dummy command, will be replaced by the bash script
      };
    } else if (type == 'java') {
      containerOptions = {
        Image: 'docify_java:latest',
        Tty: true,
        // Env: Object.entries(envVars).map(([key, value]) => `${key}=${value}`),
        HostConfig: {
          AutoRemove: true,
          Binds: [
            parentDir + `/java/uml:/app`,
            parentDir + `/java/uml:/app/send`,
          ],
        },
        // Cmd:[shellscript('pirocomder','test2')]
        // Cmd:['python','test.py'],
        // Cmd:['echo','Hello' ,'&&','tail','-f','/dev/null']
        Cmd: [
          'sh',
          '-c',
          `tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < uml.sh > u.sh && chmod +x d.sh && chmod +x c.sh && chmod +x u.sh &&./d.sh ${token} ${username} ${repo} && ./u.sh ${repo} && ./c.sh ${username} ${repo} ${token} ${process.env.GITHUB_APP_ID}`,
        ],
        //this is a dummy command, will be replaced by the bash script
      };
    } else {
      return NextResponse.json(
        { message: `Invalid type of project` },
        { status: 400 }
      );
    }
    docker.createContainer(containerOptions, (err, container) => {
      if (err) {
        console.error('Failed to create container:', err);
        // res.status(500).json({ message: 'Failed to create container' });
        return;
      }
      container?.start((err) => {
        if (err) {
          console.error('Failed to start container:', err);
          // res.status(500).json({ message: 'Failed to start container' });
          return NextResponse.json(
            { message: 'Error starting container' },
            { status: 500 }
          );
        }
        console.log('Container started successfully!');
        container.wait(async (err, data) => {
          if (err) {
            console.error('Error waiting for container:', err);
            return NextResponse.json(
              { message: 'Error waiting for container' },
              { status: 500 }
            );
          }
          // update the corresponding branch name in the db for UML generation
          await update_project_branch(projectId, branch_name, 'uml');
          console.log('Container finished its job!');
        });
      });
    });
    // return res.status(200).json({ message: 'Container started successfully!' });
    return NextResponse.json(
      { message: `UML generated successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating UML:', error);
    return NextResponse.json(
      { message: `Error generating UML` },
      { status: 500 }
    );
  }
}
