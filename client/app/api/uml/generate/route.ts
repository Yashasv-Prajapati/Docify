import path from 'path';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import Dockerode from 'dockerode';
import { nanoid } from 'nanoid';

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
function shellscript(username: String, repoName: String, branchName?: String) {
  return `#!/bin/bash
    echo "Hello World"
    git clone https://github.com/${username}/${repoName}.git
    python test.py
    tail -f /dev/null
    `;
}
type ResponseData = {
  message: String;
};

export async function POST(req: NextRequest) {
  console.log('Request to generate UML');
  if (req.method !== 'POST') {
    return NextResponse.json(
      { message: `Cannot ${req.method} this route ` },
      { status: 405 }
    );
    // res.status(405).json({message:`Cannot ${req.method} this route `});
  }
  console.log(parentDir);
  const docker = new Dockerode();
  console.log('Dockerode created');
  const data = await req.json();
  console.log(data);
  const {
    accessToken: token,
    userName: username,
    repoName: repo,
    projectType: type,
    projectId: projectId,
    folderPath: folderPath,
  } = data;
  const path = folderPath == '/' ? repo : repo + folderPath;
  let containerOptions;
  const binds =
    type == 'python'
      ? [parentDir + `/python/uml:/app`]
      : [parentDir + `/java/uml:/app`];


  if (type == 'python') {
    containerOptions = {
      Image: 'python:latest',
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
        // `tail -f /dev/null`
        // `tr -d "\\r" < download.sh > d.sh && ./d.sh ${token} ${username} ${repo}&& tail -f /dev/null`,
        `tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < uml.sh > u.sh && chmod +x d.sh && chmod +x c.sh && chmod +x u.sh &&./d.sh ${token} ${username} ${repo} && ./u.sh ${repo} && ./c.sh ${username} ${repo} ${token} ${process.env.GITHUB_APP_ID} `,
      ],
      //this is a dummy command, will be replaced by the bash script
    };
  } else if (type == 'java') {
    containerOptions = {
      Image: 'docify-java:latest',
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
        return;
      }
      console.log('Container started successfully!');
      container.wait((err, data) => {
        if (err) {
          console.error('Error waiting for container:', err);
          return NextResponse.json(
            { message: 'Error waiting for container' },
            { status: 500 }
          );
        }
        console.log('Container finished its job!');
        return NextResponse.redirect(`${process.env.NEXT_APP_URL}/uml/${projectId}`);
      });
    });
  });
  // return res.status(200).json({ message: 'Container started successfully!' });
  return NextResponse.json(
    { message: `Container started successfully!` },
    { status: 200 }
  );
}
