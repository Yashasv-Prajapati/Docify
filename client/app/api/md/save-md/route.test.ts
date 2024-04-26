/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';

import * as appHandler from './route';
import { db } from '@/lib/db';

// Mocking the 'markdown-table' module
jest.mock('markdown-table', () => ({
  markdownTable: jest.fn(() => 'markdown-table'),
}));

describe('POST /api/md/save-md', () => {
  it('POST returns 200', async () => {

    const data={
      id:'test id',
      content:'Hello harshit!! Here is your markdown file',
      authorId:'test author id',
      projectId:'test project id',
    };
    jest.spyOn(db.markdownFile, 'create').mockResolvedValue(data);

    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            content: 'content',
            authorId: 'test author id',
            projectId: 'test project id',
          }),
        });
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body).toBeDefined();
      },
    });
  });

  it('POST returns 422', async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({}),
        });
        expect(res.status).toBe(422);
        const body = await res.json();
        expect(body).toBeDefined();
      },
    });
  });

  it('POST returns 500', async () => {
    jest.spyOn(db.markdownFile, 'create').mockRejectedValue(new Error());

    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            content: 'content',
            authorId: 'test author id',
            projectId: 'test project id',
          }),
        });
        expect(res.status).toBe(500);
      },
    });
  });
});
