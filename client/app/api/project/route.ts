import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'
import * as z from 'zod';

// pages/api/projects.js

const createProjectSchema = z.object({
    url: z.string(),
    userId: z.string(),
    testing_dir: z.string(),
});

export async function POST(req: NextRequest) 
{
    try {
        const data = await req.json();
        const { url, userId, testing_dir } = createProjectSchema.parse(data);
    
      const project = await prisma.project.create({
        data: {
          url: url,
          userId : userId,
          testing_dir : testing_dir,
        },
      });
      return NextResponse.json({
        project:project,
        message: 'Project created successfully',
        success: true,
      });

    } catch (error) {
      console.error(error);
      if(error instanceof z.ZodError){
        return NextResponse.json({
            message: 'Project creation failed ' + (error.issues[0].message),
            success:false,
        });
      }

      if(error instanceof prisma.PrismaClientKnownRequestError){
        return NextResponse.json({
            message: 'Project creation failed ' + (error?.message || ""),
            success: false,
        });
    }

        return NextResponse.json({
            message: 'Project creation failed ' + (error?.message || ""),
            success: false,
        });
        
    }
}

// export async function POST(request: Request) 
// {
//     const { userId, repo }: Partial<Project> = await request.json()

//     if (!userId || !repo) return NextResponse.json({ "message": "Missing required data" })

//     const res = await fetch(DATA_SOURCE_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'API-Key': API_KEY
//         },
//         body: JSON.stringify({
//             userId, repo, completed: false
//         })
//     })

//     const newProject: Project = await res.json()

//     return NextResponse.json(newProject)
// }



// import { NextResponse } from 'next/server'
// import { MarkdownFileSchema } from '@/lib/validations/md';


// //In data source URL our main API will go
// const DATA_SOURCE_URL = ""

// const API_KEY: string = process.env.DATA_API_KEY as string

// // Just normal fetch function on the server side, nothing special here. 
// // The API key is stored in an environment variable and accessed using process.env.DATA_API_KEY.
// export async function GET() {
//     const res = await fetch(DATA_SOURCE_URL)

//     // Projects is the data type stored in types.d.ts
//     const projects: Project[] = await res.json()

//     return NextResponse.json(projects)
// }

// export async function POST(request: Request) 
// {
//     // const { userId, repo }: Partial<Project> = await request.json()


//     // if (!userId || !repo) return NextResponse.json({ "message": "Missing required data" })

//     // const res = await fetch(DATA_SOURCE_URL, {
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type': 'application/json',
//     //         'API-Key': API_KEY
//     //     },
//     //     body: JSON.stringify({
//     //         userId, repo, completed: false
//     //     })
//     // })

//     // const newProject: Project = await res.json()

//     // return NextResponse.json(newProject)

//     const data = await request.json();
//     try
//     {


//     }
//     catch(error)
//     {

//     }
// }

// // export async function POST(request: NextRequest) {
// //     const data = await request.json();
  
// //     try {
// //       const { content, authorId, projectId } = MarkdownFileSchema.parse(data);
  
// //       const md = await db.markdownFile.create({
// //         data: { content, authorId, projectId },
// //       });
  
// //       return NextResponse.json(md);
// //     } catch (error) {
// //       if (error instanceof z.ZodError) {
// //         return new NextResponse(JSON.stringify(error.issues), { status: 422 });
// //       }
  
// //       return new NextResponse('Internal Server Error', { status: 500 });
// //     }
// //   }

// export async function PUT(request: Request) {
//     const { userId, id, repo }: Project = await request.json()

//     if (!userId || !id || !repo) return NextResponse.json({ "message": "Missing required data" })

//     const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'API-Key': API_KEY
//         },
//         body: JSON.stringify({
//             userId, repo
//         })
//     })

//     const updatedTodo: Project = await res.json()

//     return NextResponse.json(updatedTodo)
// }

// export async function DELETE(request: Request) {
//     const { id }: Partial<Project> = await request.json()

//     if (!id) return NextResponse.json({ "message": "Project id required" })

//     await fetch(`${DATA_SOURCE_URL}/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'API-Key': API_KEY
//         }
//     })

//     return NextResponse.json({ "message": `Todo ${id} deleted` })
// }