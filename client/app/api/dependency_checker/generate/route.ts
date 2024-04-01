// 'use server'
import path from 'path';
import { env } from 'process';
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
  '..'
); //now we are pointing to the repository root

export async function POST(req: NextRequest) {
  try {
    console.log('Request to generate code coverage');
    const docker = new Dockerode();
    const data = await req.json();
    // console.log(data);
    console.log(parentDir);
    let cmd;
    let binds;
    if (data.lang === 'java') {
      binds = [parentDir + `/dep_checker_java:/app`];
      cmd = [
        'sh',
        '-c',
        'git clone https://github.com/$USER/$REPO.git && python java_library_usage.py && tail -f /dev/null',
      ];
    } else {
      binds = [parentDir + `/dep_checker_py:/app`];
      cmd = [
        'sh',
        '-c',
        'git clone https://github.com/$USER/$REPO.git && python python_library_usage.py && tail -f /dev/null',
      ];
    }

    const containerImg = data.lang == 'python' ? 'docr:latest' : 'docr:latest';
    const containerOptions = {
      Image: containerImg,
      Tty: true,
      HostConfig: {
        AutoRemove: true,
        // Source is dep_checker_py and destination is /app
        // Binds: [parentDir + `/dep_checker_py:/app`],
        Binds: binds,
      },
      env: [
        `REPO=${data.repo}`,
        `BRANCH=${data.branch}`,
        `USER=${data.username}`,
        `LANG=${data.lang}`,
      ],
      CMD: cmd,
      // CMD:["sh","-c","echo Hello && echo $USER && echo $REPO && ./download_repo.sh && ./python_code_coverage.sh && ls  && tail -f /dev/null"],
    };
    docker.createContainer(containerOptions, (err, container) => {
      if (err) {
        console.error('Failed to create container:', err);
        return NextResponse.json(
          { message: 'Failed to create container' },
          { status: 500 }
        );
      }
      container?.start((err) => {
        if (err) {
          console.error('Failed to start container:', err);
          return NextResponse.json(
            { message: 'Failed to start container' },
            { status: 500 }
          );
        }
        return NextResponse.json(
          { message: 'Successfully started the container' },
          { status: 200 }
        );
      });
    });
    return redirect('/dashboard');
    // return redirect('/new')
    // return NextResponse.redirect('https://localhost:3000/dashboard');
    return NextResponse.json(
      { message: 'Successfully started the container' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({
      message: `Error occured while generating code coverage : ${err}`,
    });
  }
}
