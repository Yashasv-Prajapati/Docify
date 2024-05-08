/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server';
import { testApiHandler } from 'next-test-api-route-handler';

import * as appHandler from './route';

jest.mock('axios', () => {
  let myMock = jest
    .fn()
    .mockImplementationOnce((url, { headers }) => {
      return { data: `URL: ${url}, Headers: ${headers}` };
    })
    .mockImplementationOnce(() => {
      throw new Error('Error');
    });
  return {
    get: myMock,
  };
});

describe('GET /api/uml/fetchUML', () => {
  it('POST returns 200 when valid request', async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'GET',
        });
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.data).toBeDefined();
      },
    });
  });

  it('POST returns error message when invalid request', async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'GET',
        });
        expect(res.status).toBe(500);
      },
    });
  });
});
