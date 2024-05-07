import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as z from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createProjectSchema } from '@/lib/validations/project';
import { db } from '@/lib/db';

export async function DELETE(req: NextRequest) {
  try {
    // Assuming the user ID is sent in the request body or as a query parameter
    const { userId } = await req.json();

    // Delete user data and associated project data
    await db.$transaction(async (db) => {
      // Delete associated project data
      await db.project.deleteMany({
        where: {
          userId: userId,
        },
      });
      
      // Delete associated Markdown data (if any)
      await db.markdownFile.deleteMany({
        where: {
          authorId: userId,
        },
      });

      // Delete user data
      await db.user.delete({
        where: {
          id: userId,
        },
      });
    });

    // Redirect the user to the Docify GitHub app configure page for further account deletion
    const appId = process.env.GITHUB_APP_ID;
    const installationUrl = `https://github.com/apps/docify-wiki/installations/new?target_id=${appId}&target_type=app`;
    return NextResponse.redirect(installationUrl);
  } catch (error) {
    console.error('Error deleting user account:', error);
    return NextResponse.json({
      message: 'Failed to delete user account',
      success: false,
    });
  }
}