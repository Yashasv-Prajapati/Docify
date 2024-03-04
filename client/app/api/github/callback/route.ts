import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as z from 'zod';

import { db } from '@/lib/db';

const routeContextSchema = z.object({
  params: z.object({
    code: z.coerce.string(),
  }),
});

export async function GET(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  // http://localhost:3000/api/github/callback?code=f3bc6f14850dd2cfe5bb&installation_id=47694144&setup_action=install

  const code = request.nextUrl.searchParams.get('code');
  const installation_id = request.nextUrl.searchParams.get('installation_id');

  // you got the code and installation id, now you can use it to get the access token
  const uri = `https://github.com/login/oauth/access_token`;

  const response = await axios.post(uri, {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: code,
  });

  const parsed_data = new URLSearchParams(response.data);
  const access_token = parsed_data.get('access_token');
  const refresh_token = parsed_data.get('refresh_token');

  if (
    access_token === null ||
    refresh_token === null ||
    installation_id === null
  ) {
    return redirect('/not-found');
  }

  // store the access token and refresh token in the database, along with the installation id to interact with the github api
  await db.user.create({
    data: {
      username: 'test',
      github_access_token: access_token,
      github_refresh_token: refresh_token,
      github_installation_id: installation_id,
    },
  });

  return redirect('/new');
}
