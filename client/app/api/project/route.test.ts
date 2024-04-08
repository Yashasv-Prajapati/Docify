/**
 * @jest-environment node
 */
import axios from 'axios';
import { testApiHandler } from 'next-test-api-route-handler';

import { db } from '@/lib/db';

import * as appHandler from './route';

describe('POST /api/project', () => {
  it('POST returns 200', async () => {
    const body = {
      url: 'test_url',
      repository_name: 'test_repository_name',
      userId: 'test_userId',
      testing_dir: 'test_testing_dir',
      project_type: 'python',
    };

    const mock_user = {
      id: 'test_id',
      github_access_token: 'test_github_access_token',
      github_access_token_expiry: new Date(),
      github_refresh_token: 'test_github_refresh_token',
      github_username: 'test_github_username',
      github_installation_id: 'test_github_installation_id',
      avatar_url: 'test_avatar_url',
    };

    jest.spyOn(db.user, 'findUnique').mockResolvedValue(mock_user);
    jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: { content: 'karan hello' } });
    jest.spyOn(db, '$transaction').mockResolvedValue(null);

    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify(body),
        });
        expect(response.status).toBe(201);
      },
    });
  });

  it('POST returns 401', async () => {
    const body = {
      url: 'test_url',
      repository_name: 'test_repository_name',
      userId: 'test_userId',
      testing_dir: 'test_testing_dir',
      project_type: 'python',
    };

    jest.spyOn(db.user, 'findUnique').mockResolvedValue(null);

    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify(body),
        });
        expect(response.status).toBe(401);
      },
    });
  });

  it('POST returns 422', async () => {
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({}),
        });
        expect(response.status).toBe(422);
      },
    });
  });

  it('POST returns 500', async () => {
    const body = {
      url: 'test_url',
      repository_name: 'test_repository_name',
      userId: 'test_userId',
      testing_dir: 'test_testing_dir',
      project_type: 'python',
    };

    jest.spyOn(db.user, 'findUnique').mockRejectedValue(new Error());

    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify(body),
        });
        expect(response.status).toBe(500);
      },
    });
  });
});
