import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

import { db } from '@/lib/db';
import { sign } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');
    const installation_id = req.nextUrl.searchParams.get('installation_id');

    // you got the code and installation id, now you can use it to get the access token
    const code_uri = `https://github.com/login/oauth/access_token`;

    const response = await axios.post(code_uri, {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    });

    const parsed_data = new URLSearchParams(response.data);
    // get access token and refresh token and expiry time
    const access_token = parsed_data.get('access_token');
    const refresh_token = parsed_data.get('refresh_token');
    const expiry_time_in_seconds = Number(parsed_data.get('expires_in'));

    // convert the expiry time to DataTime for database
    const expiry_time_in_milliseconds = expiry_time_in_seconds * 1000;
    const epoch_time = new Date().getTime() + expiry_time_in_milliseconds;
    const expiry_date_time = new Date(epoch_time);

    // Fetch the user's details from github
    const uri = 'https://api.github.com/user';
    const userResponse = await axios.get(uri, {
      headers: {
        Authorization: `token ${access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const github_username = userResponse.data.login;
    const github_user_avatar_url = userResponse.data.avatar_url;

    if (
      access_token === null ||
      refresh_token === null ||
      installation_id === null
    ) {
      return redirect('/not-found');
    }

    // store the access token and refresh token in the database, along with the installation id to interact with the github api
    const user = await db.user.create({
      data: {
        github_username: github_username,
        github_access_token: access_token,
        github_refresh_token: refresh_token,
        github_installation_id: installation_id,
        github_access_token_expiry: expiry_date_time,
        avatar_url: github_user_avatar_url,
      },
    });

    const res = NextResponse.redirect(`${process.env.NEXT_APP_URL}/dashboard`);

    const token = await sign(
      JSON.stringify(user),
      String(process.env.JWT_SECRET)
    );

    res.cookies.set('docify-user', token, {
      expires: expiry_date_time,
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return res;
  } catch (error) {
    // @ts-ignore
    console.log(error.message);
    return redirect('/not-found');
  }
}
