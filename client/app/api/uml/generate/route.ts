'use server';
// const Dockerode=require('dockerode');
import Dockerode from 'dockerode';
import { NextApiRequest } from 'next';
import { NextRequest,NextResponse } from "next/server";
//const path = require('path');
import path from 'path';
import { ResolvableTo } from "tailwindcss/types/config";

const parentDir = path.resolve(__dirname, '..','..','..','..','..','..','..');//now we are pointing to the repository root
function shellscript(username:String,repoName:String,branchName?:String){
    return `#!/bin/bash
    echo "Hello World"
    git clone https://github.com/${username}/${repoName}.git
    python test.py
    tail -f /dev/null
    `;    
}
type ResponseData={
    message:String
}

export async function POST(req: NextRequest) {
    console.log("Request to generate UML")
    if(req.method !== 'POST'){
        return NextResponse.json({message:`Cannot ${req.method} this route `},{status:405});
    // res.status(405).json({message:`Cannot ${req.method} this route `});
  }
  const docker = new Dockerode();
  console.log("Dockerode created");
  const data=await req.json();
  console.log(data);
  const envVars = {
    VAR1: 'value1',
    VAR2: 'value2',
  };
  const containerOptions = {
    Image: 'express-test-net:latest',
    Tty: true,
    Env: Object.entries(envVars).map(([key, value]) => `${key}=${value}`),
    HostConfig: {
        AutoRemove: true,
        Binds: [parentDir + `/uml_py:/app`,parentDir + `/uml_py/data:/app/send`],    
    },
    // Cmd:[shellscript('pirocomder','test2')]
    // Cmd:['python','test.py'],
    // Cmd:['echo','Hello' ,'&&','tail','-f','/dev/null']
    CMD :["sh", "-c", "echo Hello && echo $VAR1 && ls && pip install -r requirements.txt && python Docify-Combiner.py && tail -f /dev/null && ls"]
    };
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
    });
});
//   res.status(200).json({ message: 'Container started successfully!' });
  return NextResponse.json({message:`Container started successfully!`},{status:200});
}