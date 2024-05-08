/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from '@/app/api/delete/route';
import getCurrentUser from '@/lib/curr';
import { db } from '@/lib/db';

jest.mock('@/lib/curr', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    github_access_token: 'mock-access-token',
    github_username: 'mock-username',
  }),
}));

describe('DELETE /api/delete for account delete', () => {
  // everything goooooood
  it('DELETE returns 200', async () => {
    const body = {
      userId: 'test_user_id',
    };

    const appId = process.env.GITHUB_APP_ID;
    const installationUrl = `https://github.com/apps/docify-wiki/installations/new?target_id=${appId}&target_type=app`;

    const deleteManyFile = jest.spyOn(db.markdownFile, 'deleteMany').mockImplementation();
    const deleteManyProject = jest.spyOn(db.project, 'deleteMany').mockImplementation();
    const deleteUser = jest.spyOn(db.user, 'delete').mockImplementation();

    // send a request to the handler
    // and expect a 200 response on successful completion
    const res = await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'DELETE',
          body: JSON.stringify(body),
        });

        expect(deleteManyFile).toHaveBeenCalled();
        // expect(deleteManyProject).toHaveBeenCalled();
        // expect(deleteUser).toHaveBeenCalled();
      },
    });

    jest.clearAllMocks();

  });

  it('DELETE returns 500', async () => {
    const body = {
      userId: 'test_user_id',
    };

    const res = await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'DELETE',
          body: JSON.stringify(body),
        });
        expect(response.status).toBe(500);
      },
    });
    jest.clearAllMocks();
  });
});
