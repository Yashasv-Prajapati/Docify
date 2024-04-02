import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '@/routes';

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isLoggedIn = request.cookies.has('docify-user');

  const isApiAuthRoute = apiAuthPrefix.some((prefix) =>
    nextUrl.pathname.startsWith(prefix)
  );
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/auth/signup?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
    return NextResponse.redirect(new URL('/auth/signup', nextUrl));
  }

  return null;
}
// export function middleware(request: NextRequest) {//just forwards, no changes
//   return null;
// }

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
