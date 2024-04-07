// 'use server'
import path from 'path';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import Dockerode from 'dockerode';

const parentDir = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  '..',
); //now we are pointing to the repository root

export async function POST(req: NextRequest) {
  try {
    // console.log('Request to generate code coverage');
    const docker = new Dockerode();
    const data = await req.json();
    const {token,username,repo}=data;

    const containerImg =
      data.lang == 'python'
        ? 'express-test-net:latest'
        : 'dockify_java:latest';
    const binds=
    data.lang=='python'?[
      parentDir + `/python/code_coverage:/app`,
      parentDir+'/docker/docker_bash_files:/bash_files'
    ]:
    [
      parentDir + `/java/code_coverage:/app`,
      parentDir+'/docker/docker_bash_files:/bash_files'
    ]
    ;
    const containerOptions = {
      Image: containerImg,
      Tty: true,
      HostConfig: {
        AutoRemove: true,
        Binds:binds
        // Binds: [parentDir + `/python/code_coverage:/app`,parentDir+'/docker/docker_bash_files:/bash_files'],
      },
      // env: [
      //   `REPO=${data.repo}`,
      //   `BRANCH=${data.branch}`,
      //   `USER=${data.username}`,
      //   `LANG=${data.lang}`,
      // ],
      // CMD :["sh", "-c", "chmod +x python_code_coverage.sh && chmod +x download_repo.sh && ./download_repo.sh  && ./python_code_coverage.sh && tail -f /dev/null"],
      // CMD: [
      //   'sh',
      //   '-c',
      //   'echo Hello && echo $USER && echo $REPO && ./download_repo.sh && ./python_code_coverage.sh && ls  && tail -f /dev/null',
      // ],
      CMD:["sh","-c",`tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < coverage.sh > cov.sh && chmod +x d.sh && chmod +x c.sh && chmod +x cov.sh &&./d.sh ${token} ${username} ${repo} && ./cov.sh ${repo} && ./c.sh ${username} ${repo} ${token} ${process.env.GITHUB_APP_ID}`] // "&& tail -f /dev/null" for not closing and removing the container (can be used for debugging)
      // CMD:["sh", "-c", "echo Hello && echo $VAR1 && ls && pip install -r requirements.txt && python Docify-Combiner.py && tail -f /dev/null && ls"],
    };

    // docker.createContainer(containerOptions, (err, container) => {
    //   if (err) {
    //     console.error('Failed to create container:', err);
    //     return NextResponse.json(
    //       { message: 'Failed to create container' },
    //       { status: 500 }
    //     );
    //   }
    //   container?.start((err) => {
    //     if (err) {
    //       console.error('Failed to start container:', err);
    //       return NextResponse.json(
    //         { message: 'Failed to start container' },
    //         { status: 500 }
    //       );
    //     }
    //     // return NextResponse.json({ message: 'Successfully started the container' },{status:200});
    //   });
    // })

    await new Promise<void>((resolve, reject) => {
      docker.createContainer(containerOptions, (err, container) => {
        if (err) {
          console.error('Failed to create container:', err);
          reject(new Error('Failed to create container'));
        }
        container?.start((err) => {
          if (err) {
            console.error('Failed to start container:', err);
            reject(new Error('Failed to start container'));
          }
          resolve();
        });
      });
    });
    // return redirect('/dashboard');
    // return redirect('/new')
    // return NextResponse.redirect('https://localhost:3000/dashboard');
    return NextResponse.json(
      { message: 'Successfully started the container' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({
      message: `Error occured while generating code coverage : ${err?.message as string}`,
    }, {status:500});

  }
}