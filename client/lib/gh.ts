import axios from 'axios';

export async function get_branch_sha(
  github_username: string,
  repository_name: string,
  github_access_token: string,
  branch_name: string
): Promise<string> {
  const api_url = `https://api.github.com/repos/${github_username}/${repository_name}/branches/${branch_name}`;
  const { data } = await axios.get(api_url, {
    headers: {
      Authorization: `token ${github_access_token}`,
    },
  });
  return data.commit.sha;
}

export async function create_new_branch(
  github_username: string,
  repository_name: string,
  github_access_token: string,
  branch_name: string
): Promise<void> {
  const api_url = `https://api.github.com/repos/${github_username}/${repository_name}/git/refs`;
  const master_branch_sha = await get_branch_sha(
    github_username,
    repository_name,
    github_access_token,
    'master'
  );
  const data = {
    ref: `refs/heads/${branch_name}`,
    sha: master_branch_sha,
  };

  await axios.post(api_url, data, {
    headers: {
      Authorization: `token ${github_access_token}`,
    },
  });
}
