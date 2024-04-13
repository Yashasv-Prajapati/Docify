import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { z } from 'zod';

import getCurrentUser from '@/lib/curr';
import { GenerateReadmeSchema } from '@/lib/validations/generate-readme';

// POST method route handler to generate a project README
// JSON payload {
//  project_description: 'string', (project description)
//  project_type: 'java' | 'python', (project language)
//  repositoryName: 'string', (project name)
// }
export async function POST(request: NextRequest) {
  const data = await request.json();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { github_access_token, github_username } = currentUser;

  try {
    const { project_description, project_type, repositoryName } =
      GenerateReadmeSchema.parse(data);

    await axios
      .head(
        `https://api.github.com/repos/${github_username}/${repositoryName}/contents/.docify-assets/requirements.txt?ref=docify`,
        {
          headers: {
            Authorization: `token ${github_access_token}`,
          },
        }
      )
      .catch(async () => {
        await axios.post(
          `${process.env.NEXT_SERVER_URL}/api/dependency-checker`,
          { project_type, repositoryName },
          {
            headers: {
              Cookie: request.headers.get('Cookie'),
            },
          }
        );
      });

    const response = await axios.get(
      `https://api.github.com/repos/${github_username}/${repositoryName}/contents/.docify-assets/requirements.txt?ref=docify`,
      {
        headers: {
          Authorization: `token ${github_access_token}`,
        },
      }
    );

    const project_dependencies = Buffer.from(
      response.data.content,
      'base64'
    ).toString('utf-8');

    const prompt = `Generate a project description using the following project details:
                    - Project Name: ${repositoryName}
                    - Project Description: ${project_description}
                    - Project Type: ${project_type}
                    - Project Dependencies: ${project_dependencies}`;
    const readme = await axios.get(
      `http://127.0.0.1:8000/chat?prompt=${prompt}`
    );

    return NextResponse.json({ readme: readme.data }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: JSON.stringify(error.issues) },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
