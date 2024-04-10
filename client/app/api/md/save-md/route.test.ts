/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';

import * as appHandler from './route';

// Mocking the 'markdown-table' module
jest.mock('markdown-table', () => ({
  markdownTable: jest.fn(() => 'markdown-table'),
}));

describe('POST /api/md/save-md', () => {
  it('POST returns 200', async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            content: 'content',
            authorId: 'clutn863b0000f4rhb9pzrdkc',
            projectId: 'clutn9clr0006f4rhd6o27p3y',
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
});
