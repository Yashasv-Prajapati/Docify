import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const GITHUB_API_BASE_URL = 'https://api.github.com';
  const owner = 'pirocomder';
  const repo = 'test2';

  const uri = `${GITHUB_API_BASE_URL}/users/${owner}/repos`;

  const response = await fetch(uri, {
    method: 'get',
  });

  const data = await response.json();
  console.log(data);

  return NextResponse.json({ message: `Got code }` }, { status: 200 });
}
