'use server';

import { cookies } from 'next/headers';
import { User } from '@prisma/client';

import { verify } from '@/lib/jwt';

import { db } from './db';

interface UserSchema {
  github_username: string;
  avatar_url: string;
  github_access_token: string;
  github_refresh_token: string;
  github_access_token_expiry: Date;
  github_installation_id: string;
}

const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = cookies();
  const cookie = cookieStore.has('docify-user');
  if (!cookie) return null;
  const tok = cookieStore.get('docify-user')?.value;
  const tok_decoded = await verify(String(tok), String(process.env.JWT_SECRET));
  const curr: UserSchema = JSON.parse(String(tok_decoded?.payload));

  return await db.user.findUnique({
    where: {
      github_username: curr.github_username,
    },
  });
};

export default getCurrentUser;
