'use server';

import { cookies } from 'next/headers';
import { User } from '@prisma/client';

import { verify } from '@/lib/jwt';

const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cookieStore = cookies();
    const cookie = cookieStore.has('docify-user');
    if (!cookie) return null;
    const tok = cookieStore.get('docify-user')?.value;
    const tok_decoded = await verify(
      String(tok),
      String(process.env.JWT_SECRET)
    );
    const curr: User = JSON.parse(String(tok_decoded?.payload));

    return curr;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getCurrentUser;
