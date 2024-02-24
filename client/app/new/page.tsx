// Page for new Project

import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetTokenParams } from 'next-auth/jwt';

import { db } from '@/lib/db';
import Wrapper from '@/components/wrapper';

interface GithubRepository {
  id: string;
  name: string;
  clone_url: string;
}

const GITHUB_API_BASE_URL = 'https://api.github.com';

async function get_repositories(
  github_access_token: string | undefined
): Promise<Array<GithubRepository> | undefined> {
  const user = await db.user.findUnique({
    where: {
      username: 'test',
    },
    select: {
      github_access_token: true,
      github_installation_id: true,
    },
  });
  const installation_id = user?.github_installation_id;
  const access_token = user?.github_access_token;

  const requestOptions = {
    headers: {
      Authorization: `token ${access_token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Your-App',
      'X-GitHub-Installation-Id': installation_id,
    },
  };

  const uri = `${GITHUB_API_BASE_URL}/user/repos`;

  try {
    const response: AxiosResponse = await axios.get(uri, requestOptions);
    return response.data;
  } catch (err) {
    return undefined;
  }
}

export default async function Page() {
  // const user = getCurrentUser();
  const github_access_token = process.env.GITHUB_ACCESS_TOKEN;

  const data = await get_repositories(github_access_token);

  return (
    <Wrapper>
      <div>Import Github Repository</div>
      <div>
        {data && data.length > 0
          ? data.map((repo) => {
              return (
                <div key={repo.id}>
                  <li>
                    {repo.name} - {repo.clone_url}
                  </li>
                </div>
              );
            })
          : null}
      </div>
    </Wrapper>
  );
}
