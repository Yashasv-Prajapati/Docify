import { NextRequest, NextResponse } from 'next/server';
import { coverageToMd } from '@/actions/update-md';
import { z } from 'zod';

import { CoverageToMdSchema } from '@/lib/validations/md';

// POST method route handler to convert coverage html to markdown
// JSON payload {
//  htmlStr: 'string', (coverage html string)
// }
export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const { htmlStr } = CoverageToMdSchema.parse(data);
    const markdown = coverageToMd(htmlStr);

    return NextResponse.json({ markdown: markdown }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: JSON.stringify(error.issues) },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
