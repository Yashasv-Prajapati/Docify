/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';

import * as appHandler from './route';

// Mocking the 'fs' module
jest.mock('fs', () => {
  let myMock = jest
    .fn()
    .mockImplementationOnce(() => 'mocked file data')
    .mockImplementationOnce(() => {
      throw new Error('mocked error');
    });
  return {
    readFileSync: myMock,
  };
});

describe('POST /api/uml-image', () => {
  it('POST returns 200 and file data when valid request', async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            username: 'testUser',
            reponame: 'testRepo',
          }),
        });
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.message).toBe('mocked file data');
      },
    });
  });

  it('POST returns error message when invalid request', async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({}),
        });
        expect(res.status).toBe(500);
        const body = await res.json();
        expect(body).toBeDefined();
      },
    });
  });
});
