// Page for new Project

import React from 'react';

import Wrapper from '@/components/wrapper';

export default async function Page() {
  const username = 'Yashasv-Prajapati';
  const GITHUB_API_BASE_URL = 'https://api.github.com';

  const uri = `${GITHUB_API_BASE_URL}/users/${username}/repos`;

  const response = await fetch(uri, {
    method: 'get',
  });
  const data = await response.json();

  return (
    <Wrapper>
      <div>Import Github Repository</div>
      <div>
        {data && data.length > 0
          ? data.map((repo: object, index: number) => {
              return (
                <div>
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
