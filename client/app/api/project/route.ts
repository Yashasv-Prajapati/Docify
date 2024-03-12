import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma';
import * as z from 'zod';

import { db } from '@/lib/db';

// pages/api/projects.js

const createProjectSchema = z.object({
  url: z.string(),
  userId: z.string(),
  testing_dir: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { url, userId, testing_dir } = createProjectSchema.parse(data);

    const project = await db.project.create({
      data: {
        url: url,
        userId: userId,
        testing_dir: testing_dir,
      },
    });

    // Construct URL to the README.md file
    const readmeUrl = `${url}/blob/main/README.md`;

    // Fetch the content of the README.md file
    const response = await fetch(readmeUrl,{
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`, //need the access token
      },
    });
    const responseData = await response.json();

    // Extract the Markdown content from the JSON response
    const readmeContent = responseData.richText;

    // Create an entry for the MarkdownFile
    await db.markdownFile.create({
      data: {
        content: readmeContent,
        authorId: userId,
        projectId: project.projectId, // Assuming project.id is the primary key of the newly created project
        
      },
    });    

    // Log the README content
    // console.log('README Content:', readmeContent); 

    return NextResponse.json({
      project: project,
      message: 'Project created successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: 'Project creation failed ' + error.issues[0].message,
        success: false,
      });
    }

    if (error instanceof prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({
        message: 'Project creation failed ' + (error?.message || ''),
        success: false,
      });
    }

    return NextResponse.json({
      message: 'Project creation failed ' + (error?.message || ''),
      success: false,
    });
  }
}
