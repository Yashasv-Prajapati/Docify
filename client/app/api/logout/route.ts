import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json('Logged out', { status: 200 });
  response.cookies.delete('docify-user');

  return response;
}
