/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler'; // Must always be first

import { GET } from './route';

it('GET returns 200', async () => {
  const res = await GET();
  expect(res.status).toBe(200);
  const body = await res.json();
  expect(body.message).toBe('GET request to code coverage');
});
