import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { MarkdownFileSchema } from '@/lib/validations/md';

// POST method route handler to save markdown to db
// JSON payload {
//  content: 'string', (markdown content)
//  authorId: 'string', (user id)
//  projectId: 'string', (project github url))
// }
export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const { content, authorId, projectId } = MarkdownFileSchema.parse(data);

    const md = await db.markdownFile.create({
      data: { content, authorId, projectId },
    });

    return NextResponse.json({ MD: md }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 422 });
    }

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
