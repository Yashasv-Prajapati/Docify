import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    code: z.coerce.string(),
  }),
});

export async function GET(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  const code = request.nextUrl.searchParams.get('code');
  console.log(code);
  const uri = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;

  const response = await fetch(uri, {
    method: 'post',
  });

  // const data = await response.json()
  const data = await response.text();
  console.log(response);

  return NextResponse.json({ message: `Got code ${data}` }, { status: 200 });
}
