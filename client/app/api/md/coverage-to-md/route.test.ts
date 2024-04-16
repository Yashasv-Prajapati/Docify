/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';

import * as appHandler from './route';

// Mocking the 'markdown-table' module
jest.mock('markdown-table', () => {
  let myMock = jest
    .fn()
    .mockImplementationOnce(() => 'mocked markdown table')
    .mockImplementationOnce(() => {
      throw new Error('mocked error');
    });
  return {
    markdownTable: myMock,
  };
});

describe('POST /api/md/coverage-to-md', () => {
  it('POST returns 200', async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            htmlStr: '<html><body><h1>Code Coverage</h1></body></html>',
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
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            htmlStr: '<html><body><h1>Code Coverage</h1></body></html>',
          }),
        });
        expect(res.status).toBe(500);
        const body = await res.json();
        expect(body).toBeDefined();
      },
    });
  });
});
