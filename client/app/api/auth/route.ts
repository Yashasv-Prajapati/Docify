import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import jwt from 'jsonwebtoken';

const routeContextSchema = z.object({
  params: z.object({
    code: z.coerce.string(),
  }),
});

// const generateJWT = () => {
//   const privateKey = process.env.GITHUB_APP_PRIVATE_KEY as string;
//   const appId = process.env.GITHUB_APP_ID as string;
//   console.log(privateKey);
//   const payload = {
//     iat: Math.floor(Date.now() / 1000), // Issued at time
//     exp: Math.floor(Date.now() / 1000) + 60 * 10, // Expiration time (10 minutes from now)
//     iss: appId, // Issuer (GitHub App ID)
//   };
//   const options = {
//     algorithm: 'RS256', // RSA SHA-256 algorithm
//   };
//   return jwt.sign(payload, privateKey, options);
// };

export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const code = req.nextUrl.searchParams.get('code');
    console.log("THE CODE IS ", code);

    // Exchange the temporary code for an access token
    const response = await axios.post(
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

    const accessToken = response.data.access_token;
    // console.log("ACCES TOKEN IS ", accessToken)


    // Make a request to list installations
    // console.log("TOKEN IS ")
    // const token= generateJWT();
    // console.log("TOKEN IS ")
    // console.log(token)
    // const installationsResponse = await axios.get(
    //   'https://api.github.com/app/installations',
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       Accept: 'application/vnd.github.v3+json',
    //     },
    //   }
    // );
    // console.log("Data ", installationsResponse.data)

    // const installations = installationsResponse.data;
    // console.log("The installations are: ", installations);

    // if (installations.length > 0) {
    //   // User has installed the app, proceed with authentication
    //   return NextResponse.redirect('http://localhost:3000/dashboard');
    // } else {
    //   // User has not installed the app, redirect them to the installation page
    //   const appId = process.env.GITHUB_APP_ID;
    //   // const installationUrl = `https://github.com/apps/docify-wiki/installations/new?target_id=${appId}&target_type=app`;
    //   // return NextResponse.redirect(installationUrl);
    // }
  } catch (error) {
    // console.error('Here is the Error:', error.message);

    // Handle any errors
    // const appId = process.env.GITHUB_APP_ID;
    // const installationUrl = `https://github.com/apps/docify-wiki/installations/new?target_id=${appId}&target_type=app`;
    // return NextResponse.redirect(installationUrl);
  }
};
