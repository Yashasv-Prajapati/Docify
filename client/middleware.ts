import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let res_token = request.cookies.has('docify-user');

  if (!res_token) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/signup';
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/new/:path*'],
};
