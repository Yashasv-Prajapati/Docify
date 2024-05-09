import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { update_project_branch } from '@/actions/project';
import Dockerode from 'dockerode';

import { CodeCoverageSchema } from '@/lib/validations/code_coverage';

const parentDir = path.resolve(__dirname, '..', '..', '..', '..', '..', '..'); //now we are pointing to the repository root

export async function POST(req: NextRequest) {
  try {
    console.log("Code Coverage API called!!!")
    const dockerode = new Dockerode();
    const data = await req.json();
    console.log("Data: ", data)
    // const {
    //   github_access_token,
    //   github_username,
    //   github_repo_name,
    //   project_type: language,
    //   projectId,
    // } = CodeCoverageSchema.parse(data);
    const {
      github_access_token,
      github_username,
      github_repo_name,
      language: lang,
      projectId,
    } = data;
    console.log("Data: ", data)
    const branch_name = process.env.NEXT_PUBLIC_BRANCH_NAME + '-' + Date.now();
    console.log("Branch Name: ", branch_name)
    console.log(lang)
    const containerImg =
      lang == 'python' ? 'docify_python:latest' : 'docify_java:latest';
    const binds =
      lang == 'python'
        ? [
            parentDir + `/python/code_coverage:/app`,
            parentDir + '/docker/docker_bash_files:/bash_files',
          ]
        : [
            parentDir + `/java/code_coverage:/app`,
            parentDir + '/docker/docker_bash_files:/bash_files',
          ];

    const containerOptions = {
      Image: containerImg,
      Tty: true,
      HostConfig: {
        AutoRemove: true,
        Binds: binds,
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
      CMD: [
        'sh',
        '-c',
        // `tail -f /dev/null`, // "&& tail -f /dev/null" for not closing and removing the container (can be used for debugging)
        `tr -d "\\r" < download.sh > d.sh && tr -d "\\r" < commit.sh > c.sh && tr -d "\\r" < coverage.sh > cov.sh && chmod +x d.sh && chmod +x c.sh && chmod +x cov.sh &&./d.sh ${github_access_token} ${github_username} ${github_repo_name} ${branch_name} && ./cov.sh ${github_repo_name} && ./c.sh ${github_username} ${github_repo_name} ${github_access_token} ${process.env.GITHUB_APP_ID} `,
      ], // "&& tail -f /dev/null" for not closing and removing the container (can be used for debugging)
      // CMD:["sh", "-c", "echo Hello && echo $VAR1 && ls && pip install -r requirements.txt && python Docify-Combiner.py && tail -f /dev/null && ls"],
    };

    // await new Promise<void>((resolve, reject) => {
    //   const container=docker.createContainer(containerOptions, (err, container) => {
    //     if (err) {
    //       console.error('Failed to create container:', err);
    //       reject(new Error('Failed to create container'));
    //     }
    //     container?.start(async (err) => {
    //       if (err) {
    //         console.error('Failed to start container:', err);
    //         reject(new Error('Failed to start container'));
    //       }
    //       resolve();
    //       // update the corresponding branch name in the db for code coverage
    //       await update_project_branch(projectId, branch_name, 'code_coverage');
    //     });
        
        
    //   });

    // });
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
            update_project_branch(projectId, branch_name, 'code_coverage');
            resolve(data);
          }
        }
      });
    });

    return NextResponse.json(
      { message: 'Successfully finished with the container' },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json(
        {
          message: `Error occured while generating code coverage : ${err.message}`,
        },
        { status: 500 }
      );
  }
}
