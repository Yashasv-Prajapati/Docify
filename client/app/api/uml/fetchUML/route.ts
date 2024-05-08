// pages/api/fetch-image.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get('username');
  const repoName = searchParams.get('repoName');
  const accessToken = searchParams.get('accessToken');
  // const latest = searchParams.get('latest');
  //specify the branch name where the uml diagram is stored
  // const branch = 'docify';
  const branch = searchParams.get('branchName')||'docify';
  //if branch is undefined then use the default branch name

  //instead receive the branch name from client side
  //since we need the branch name with the latest uml diagram

  //specify the path of the uml diagram
  const path = '.docify-assets/output.png';
  const url = `https://api.github.com/repos/${username}/${repoName}/contents/${path}?ref=${branch}`;
  console.log(url)
  const headers = {
    Authorization: `token ${accessToken}`,
  };
  try {
    const response = await axios.get(url, { headers });
    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
