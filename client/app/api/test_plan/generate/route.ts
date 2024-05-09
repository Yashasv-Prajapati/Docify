import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { z } from 'zod';

import getCurrentUser from '@/lib/curr';
import { db } from '@/lib/db';
import { GenerateTestingPlanSchema } from '@/lib/validations/generate-testing-plan';

// POST method route handler to generate a testing plan
// JSON payload {
// project_id: 'string', (project id)
//  project_description: 'string', (project description)
// }

export async function POST(request: NextRequest) {
  const data = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { github_access_token, github_username } = currentUser;

  try {
    const { project_id, project_description } =
      GenerateTestingPlanSchema.parse(data);

    const project = await db.project.findUnique({
      where: {
        projectId: project_id,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          message: `Project corresponding with projectId = ${project_id} not found`,
          success: false,
        },
        { status: 404 }
      );
    }

    const repositoryName = project.repository_name;
    const project_type = project.project_type;
    const testing_dir = project.testing_dir;
    const dep_branch_name = project.dependency_latest_branch;

    // Generate UML Diagram for the test folder
    await axios.post(
      `${process.env.NEXT_APP_URL}/api/uml/generate`,
      {
        accessToken: github_access_token,
        userName: github_username,
        repoName: repositoryName,
        projectType: project_type,
        projectId: project_id,
        folderPath: testing_dir,
      },
      {
        headers: {
          Cookie: request.headers.get('Cookie'),
        },
      }
    );

    // To check whether we need to call /api/dependency-checker
    let flag = false;

    // Find the dependencies of the project
    await axios
      .head(
        `https://api.github.com/repos/${github_username}/${repositoryName}/contents/.docify-assets/requirements.txt?ref=${dep_branch_name}`,
        {
          headers: {
            Authorization: `token ${github_access_token}`,
          },
        }
      )
      .then(async () => {
        const response = await axios.get(
          `https://api.github.com/repos/${github_username}/${repositoryName}/commits?sha=${dep_branch_name}&?path=.docify-assets/requirements.txt`,
          {
            headers: {
              Authorization: `token ${github_access_token}`,
            },
          }
        );

        const lastModified = new Date(response.data[0].commit.author.date);
        // const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        const oneWeekAgo = new Date(
          new Date().getTime() - 7 * 24 * 60 * 60 * 1000
        );

        if (lastModified < oneWeekAgo) {
          console.log('requirements.txt file is stale');

          // If requirements.txt file is stale, call /api/dependency-checker
          flag = true;
        }
      })
      .catch(async () => {
        console.log('requirements.txt file does not exist');
        // If head request fails, requirements.txt file does not exist and we need to call /api/dependency-checker
        // Or maybe the docify branch itself does not exist
        flag = true;
      });

    if (flag) {
      await axios.post(
        `${process.env.NEXT_APP_URL}/api/dependency-checker`,
        { project_type, repositoryName, projectId: project_id },
        {
          headers: {
            Cookie: request.headers.get('Cookie'),
          },
        }
      );
    }

    const response = await axios.get(
      `https://api.github.com/repos/${github_username}/${repositoryName}/contents/.docify-assets/requirements.txt?ref=${dep_branch_name}`,
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

    // Generate a testing plan/description based on the project type, description and dependencies
    const prompt = `Generate a testing description for this project based on the provided details:
    Project Name: ${repositoryName}
    Project Description: ${project_description}
    Project Type: ${project_type}
    Project Dependencies: ${project_dependencies}

    Consider the provided dependencies to identify any testing tools or frameworks utilized within the project. Describe the testing environment and procedures, highlighting the testing tools incorporated and their roles in ensuring code quality and reliability. Emphasize the importance of testing in the development process and provide guidelines for running tests, interpreting results, and contributing to test coverage improvement. Maintain a clear and concise tone, addressing both developers familiar with testing practices and those new to the project's testing setup.`;

    const res = await axios.get(
      `${process.env.LLM_API_URL}/chat?prompt=${prompt}`
    );

    return NextResponse.json({ testingPlan: res.data }, { status: 200 });
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
