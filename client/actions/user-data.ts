import { db } from '@/lib/db';

export async function getAllUsers() {
  const users = await db.$transaction(async (db) => {
    const _users = await db.user.findMany();
    return _users;
  });
  return users;
}

export async function getUserId(github_username: string) {
  const userId = await db.$transaction(async (db) => {
    const user = await db.user.findUnique({
      where: {
        github_username: github_username,
      },
      select: {
        id: true,
      },
    });
    return user?.id;
  });

  return userId;
}

export async function getUserById(id: string) {
  const user = await db.$transaction(async (db) => {
    const _user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return _user;
  });
  return user;
}
