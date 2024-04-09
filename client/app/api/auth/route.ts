import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosResponse } from 'axios';

import { db } from '@/lib/db';
import { sign } from '@/lib/jwt';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_APP_ID = process.env.GITHUB_APP_ID;
const GITHUB_APP_PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const requestOptions = {
  headers: {
    Authorization: `Bearer ${generateJwtToken()}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Your-App',
  },
};

// Function to generate JWT token for GitHub App authentication
function generateJwtToken() {
  const payload = {
    iat: Math.floor(Date.now() / 1000), // Issued at time
    exp: Math.floor(Date.now() / 1000) + 60, // Expiration time (1 minute from now)
    iss: GITHUB_APP_ID, // GitHub App ID
  };

  // console.log(GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, payload);

  const jwt = require('jsonwebtoken');
  const token = jwt.sign(payload, GITHUB_APP_PRIVATE_KEY, {
    algorithm: 'RS256',
  });

  return token;
}

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    // Exchange the temporary code for an access token
    const oauth_response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    console.log('HELLO');
    const accessToken = oauth_response.data.access_token;

    // Fetch the user's details from github
    const uri = 'https://api.github.com/user';
    const userResponse = await axios.get(uri, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    console.log('HELLO2');

    const response: AxiosResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/app/installations`,
      requestOptions
    );
    const installations = response.data;
    // console.log(installations);

    let installed = false;
    let github_installation_id = '';
    // console.log("Installations", installations);
    if (installations.length > 0) {
      for (let i = 0; i < installations.length; i++) {
        const user_name = installations[i].account.login;
        // const installation_id = installations[i].id;

        if (user_name === userResponse.data.login) {
          installed = true;
          github_installation_id = installations[i].id;
          break;
        }
      }
    }

    if (!installed) {
      // if not installed or installation.length<=0
      const appId = process.env.GITHUB_APP_ID;
      const redirectUri = 'http://localhost:3000/api/github/callback'; // Redirect URI configured in your GitHub App settings
      const installationUrl = `https://github.com/apps/docify-wiki/installations/new?target_id=${appId}&target_type=app`;
      return NextResponse.redirect(installationUrl);
    }

    const github_username = userResponse.data.login;
    const github_user_avatar_url = userResponse.data.avatar_url;
    const github_refresh_token = oauth_response.data.refresh_token;
    const github_access_token_expiry = oauth_response.data.expires_in;

    const expiry_time_in_milliseconds = github_access_token_expiry * 1000;
    const epoch_time = new Date().getTime() + expiry_time_in_milliseconds;
    const expiry_date_time = new Date(epoch_time);

    // check if user exists in the database
    let user = await db.user.findUnique({
      where: {
        github_username: github_username,
      },
    });

    if (!user) {
      // user doesn't not exist, then create
      user = await db.user.create({
        data: {
          github_username: github_username,
          github_access_token: accessToken,
          github_refresh_token: github_refresh_token,
          github_access_token_expiry: expiry_date_time,
          avatar_url: github_user_avatar_url,
          github_installation_id: github_installation_id.toString(),
        },
      });
    } else {
      // update
      user = await db.user.update({
        where: {
          github_username: github_username,
        },
        data: {
          github_access_token: accessToken,
          github_refresh_token: github_refresh_token,
          github_access_token_expiry: expiry_date_time,
        },
      });
    }

    const res = NextResponse.redirect(
      `${process.env.NEXT_SERVER_URL}/dashboard`
    );

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
