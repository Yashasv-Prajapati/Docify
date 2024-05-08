/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';

import getCurrentUser from '@/lib/curr';
import * as appHandler from '@/app/api/delete/route';

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

    // jest.mock('@/lib/curr', () => ({  // replace './curr' with actual import path
    //   getCurrentUser: jest.fn().mockResolvedValue({ id: 'test_user_id' }),
    // }));

    // send a request to the handler
    // and expect a 200 response on successful completion
    const res = await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'DELETE',
          body: JSON.stringify(body),
        });

        // expect(NextResponse.redirect).toHaveBeenCalledWith(installationUrl);
      },
    });

    // getCurrentUser.mockRestore();
    // jest.resetModules();
  });

  it('DELETE return 401', async () => {
    const body = {
      userId: 'test_user_id',
    };

    // send a request to the handler
    // and expect a 401 response on unauthorized access
    const res = await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'DELETE',
          body: JSON.stringify(body),
        });
        expect(response.status).toBe(401);
        expect(await response.json()).toMatchObject({
          message: 'Unauthorized access',
          success: false,
        });
      },
    });
  });

  it('DELETE returns 500', async () => {
    const body = {
      userId: 'test_user_id',
    };

    const appId = process.env.GITHUB_APP_ID;
    const installationUrl = `https://github.com/apps/docify-wiki/installations/new?target_id=${appId}&target_type=app`;

    // send a request to the handler
    // and expect a 200 response on successful completion
    // const getCurrentUserSpy = jest.spyOn({ getCurrentUser }, 'getCurrentUser').mockResolvedValue({ id: 'test_user_id' } as User);
    // const getCurrentUserSpy = jest.spyOn({getCurrentUser}, 'getCurrentUser').mockImplementation(():Promise<any>=>{
    //   console.log("HELLO BETE")
    //   return { id: 'test_user_id' } as any;
    // // .mockImplementation(():Promise<any>=>{
    // //   console.log("HELLO BETE")
    // //   return { id: 'test_user_id' } as any;

    // });
    // expect(getCurrentUserSpy).toHaveBeenCalled();
    // .mockResolvedValue({ id: 'test_user_id' } as any);

    // jest.mocked(getCurrentUser).mockReturnValueOnce({ id: 'test_user_id' } as any);

    const res = await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'DELETE',
          body: JSON.stringify(body),
        });
        // console.log(getCurrentUser())
        expect(await response.json()).toMatchObject({
          message: expect.stringMatching(/^Failed to delete user account */),
        });
        expect(response.status).toBe(500);
      },
    });

    // jest.resetModules();
    // getCurrentUserSpy.mockReset();
    // getCurrentUserSpy.mockRestore();
  });
});
