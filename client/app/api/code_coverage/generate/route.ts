// 'use server'
import { NextRequest,NextResponse } from "next/server";
import path from "path";
import {redirect} from "next/navigation";
import Dockerode from "dockerode";
import { env } from "process";
const parentDir = path.resolve(__dirname, '..','..','..','..','..','..','..');//now we are pointing to the repository root

export async function POST(req: NextRequest) {
    try{
    console.log("Request to generate code coverage")
    const docker = new Dockerode();
    const data=await req.json();
    // console.log(data);
    console.log(parentDir)
    const containerImg=(data.lang=="python")?"express-test-net:latest":"express-test-net:latest";
    const containerOptions = {
        Image: containerImg,
        Tty: true,
        HostConfig: {
            AutoRemove: true,
            Binds: [parentDir + `/python_code_coverage:/app`],    
        },
        env: [
            `REPO=${data.repo}`,
            `BRANCH=${data.branch}`,
            `USER=${data.username}`,
            `LANG=${data.lang}`,
        ],
        // CMD :["sh", "-c", "chmod +x python_code_coverage.sh && chmod +x download_repo.sh && ./download_repo.sh  && ./python_code_coverage.sh && tail -f /dev/null"],
        CMD:["sh","-c","echo Hello && echo $USER && echo $REPO && ./download_repo.sh && ./python_code_coverage.sh && ls  && tail -f /dev/null"],
        // CMD:["sh", "-c", "echo Hello && echo $VAR1 && ls && pip install -r requirements.txt && python Docify-Combiner.py && tail -f /dev/null && ls"],
    };
    docker.createContainer(containerOptions, (err, container) => {
        if (err) {
            console.error('Failed to create container:', err);
            return NextResponse.json({ message: 'Failed to create container' },{status:500});
        }
        container?.start((err) => {
            if (err) {
                console.error('Failed to start container:', err);
                return NextResponse.json({ message: 'Failed to start container' },{status:500});
            }
            // return NextResponse.json({ message: 'Successfully started the container' },{status:200});
        });
    });
    return redirect('/dashboard');
    // return redirect('/new')
    // return NextResponse.redirect('https://localhost:3000/dashboard');
    return NextResponse.json({ message: 'Successfully started the container' },{status:200});
    }
    catch(err){
        return NextResponse.json({ message: `Error occured while generating code coverage : ${err}` });
    }
}